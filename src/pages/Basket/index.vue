<template>
    <div class="basket">
        <div v-if="!loading">
            <div class="basket__title">
                СОДЕРЖИМОЕ КОРЗИНЫ:
            </div>
            <div v-if="emptyBasket" class="empty-basket">
                Корзина пустая. Перейдите в <a href="/catalog">каталог</a>.
            </div>
            <div v-else>
                <div class="basket__header">
                    <Button @click="$router.push('/catalog')" :text-button="'Продолжить покупки'" :width="'200px'"/>
                    <Button @click="clearBasket" :text-button="'Очистить корзину'" :width="'200px'"/>
                </div>
                <div class="list-product">
                    <v-data-table
                            :headers="headers"
                            :items="products"
                            class="elevation-1"
                            hide-default-footer
                    >
                        <template v-slot:item.title="{item}">
                            <div :style="{color: '#305496', display: 'flex'}">
                                <img :style="{height:'110px', padding: '5px 0'}" :src="item.image" alt="">
                                <div :style="{padding: '10px 0 30px 20px'}">
                                <span @click="transitionOnProduct(item)"
                                      :style="{cursor: 'pointer'}">{{item.name}}
                                </span>
                                    <div :style="{padding: '10px 0 0 0'}">Код: {{item.code}}</div>
                                    <div :style="{padding: '20px 0 0 0', cursor: 'pointer'}"
                                         @click="deleteProduct(item)">
                                        Удалить товар
                                        <v-icon color="black">mdi-delete</v-icon>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <template v-slot:item.price="{item}">
                            <div>
                                {{calcPrice(item)}} BYN
                            </div>
                        </template>
                        <template v-slot:item.count="{item}">
                            <div>
                                <input type="number" v-model="item.countProduct" @change="changeCount">
                            </div>
                        </template>
                        <template v-slot:item.total="{item}">
                            <div>
                                {{(Number(calcPrice(item).split(',')[0]) * Number(item.countProduct)).toFixed(2)}} BYN
                            </div>
                        </template>
                        <template v-slot:item.weight="{item}">
                            <div>
                                {{(+item.weight * +item.countProduct).toFixed(2)}} кг.
                            </div>
                        </template>
                        <template v-slot:footer>
                            <div :style="{ display:'flex', justifyContent: 'space-around', padding: '20px', backgroundColor:'#F2F2F2'}">
                                <div :style="{ marginLeft: 'auto'}">
                                    Стоимость Вашего заказа: {{(calcTotal()).toFixed(2)}} руб.
                                </div>
                                <div :style="{ margin: 'auto 30px'}">
                                    Вес: {{calcWeight()}} кг.
                                </div>
                            </div>
                        </template>
                    </v-data-table>
                </div>
                <Button @click="$router.push('/issue-order')" :width="'200px'"
                        :style="{margin: '20px 20px 20px auto'}"/>
            </div>
        </div>
        <v-progress-circular
                :style="{marginLeft: '400px', paddingTop: '500px!important', display: 'block'}"
                class="ma-auto"
                :size="70"
                :width="7"
                color="purple"
                indeterminate
                v-else
        ></v-progress-circular>
    </div>
</template>

<script>
    import Button from "../../shared/elements/Button";
    import ProductImagesService from "../../services/productImages";
    import UserService from '../../services/user';

    export default {
        name: 'Basket',
        components: {
            Button
        },
        data: () => ({
            loading: true,
            headers: [
                {
                    text: 'Товар',
                    align: 'left',
                    sortable: false,
                    value: 'title',
                },
                {
                    text: 'Цена за ед.',
                    value: 'price',
                    sortable: false,
                    align: 'center'
                },
                {
                    text: 'Количество',
                    value: 'count',
                    sortable: false,
                    align: 'center'
                },
                {
                    text: 'Итого',
                    value: 'total',
                    sortable: false,
                    align: 'center'
                },
                {
                    text: 'Вес',
                    value: 'weight',
                    sortable: false,
                    align: 'center'
                }
            ],
            products: [],
            emptyBasket: true,
            images: []
        }),
        methods: {
            transitionOnProduct(product) {
                this.$router.push(`catalog/${product.group.split(' ').join('').toLowerCase()}/${product.id}`);
            },
            asd() {
                console.log('asd')
            },
            calcPrice(item) {
                return item.countProduct < 10 ? item.priceBeforeTen : item.priceBeforeHundred
            },
            clearBasket() {
                localStorage.removeItem('basket');
                this.products = [];
                this.emptyBasket = true;
            },
            calcTotal() {
                let total = 0;
                this.products.forEach((item) => {
                    total = total + this.calcPriceProduct(item)
                });
                return total
            },
            calcWeight() {
                let weight = 0;
                this.products.forEach((item) => {
                    weight = weight + (Number(item.weight) * item.countProduct)
                });
                return weight.toFixed(2)
            },
            deleteProduct(item) {
                let id = -1;
                this.products.findIndex((el, index) => {
                    if (el === item) {
                        id = index
                    }
                });
                this.products.splice(id, 1);
                localStorage.setItem('basket', JSON.stringify(this.products));
                if(localStorage.getItem('token')){
                        UserService.updateUser(localStorage.getItem('token'), {basket: JSON.stringify(this.products)});
                    }
                if (this.products.length < 1) {
                    this.emptyBasket = true;
                    localStorage.removeItem('basket')
                    UserService.updateUser(localStorage.getItem('token'), {basket: ''});
                }
            },
            changeCount() {
                const copyProducts = this.products.filter((product) => {
                    return Number(product.countProduct) > 0
                })
                this.products = copyProducts;
                if (copyProducts.length === 0) {
                    localStorage.removeItem('basket');
                    this.products = []
                    this.emptyBasket = true;
                } else {
                    localStorage.setItem('basket', JSON.stringify(copyProducts));
                }
            },
            calcPriceProduct(product) {
                if (product.priceBeforeTen || product.priceBeforeHundred) {
                    if (product.countProduct <= 10) {
                        return Number(product.priceBeforeTen.split(',')[0]) * product.countProduct
                    }
                    return Number(product.priceBeforeHundred.split(',')[0]) * product.countProduct
                }
                return 0;
            }
        },
        created() {
            this.emptyBasket = localStorage.getItem('basket') === null;
            if (!this.emptyBasket) {
                let copyProducts = JSON.parse(localStorage.getItem('basket'));
                copyProducts.map((product) => {
                    ProductImagesService.getProductImages(product.id).then(({data}) => {
                        return data
                    }).then((images) => {
                        product.image = images[0].pathImage;
                    });
                    return product
                });
                setTimeout(() => {
                    this.products = copyProducts;
                    this.loading = false
                }, 1500)
            } else {
                this.loading = false
            }
        }
    }
</script>

<style scoped>
    .basket__title {
        padding: 20px;
        font-size: 25px;
        font-weight: bold;
    }

    .basket__header {
        display: flex;
        justify-content: space-between;
        padding: 20px;
    }

    .empty-basket {
        padding: 20px;
        font-size: 25px;
    }

    input {
        outline: none;
        width: 50px;
        text-align: center;
    }

    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
        height: 30px;
        width: 30px;
        padding: 2px
    }

    input[type=number] {
        -moz-appearance: textfield;
    }
</style>