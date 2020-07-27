<template>
    <div class="order">
        <v-progress-circular
                :style="{marginLeft: '400px', paddingTop: '500px!important', display: 'block'}"
                class="ma-auto"
                :size="70"
                :width="7"
                color="purple"
                indeterminate
                v-if="loading"
        ></v-progress-circular>
        <div v-else>
            <div @click="()=>this.$router.go(-1)"
                 :style="{display: 'flex', color: '#305496', marginBottom: '10px', cursor: 'pointer'}">
                <v-icon color="#305496" left medium>mdi-arrow-left</v-icon>
                <div>Назад</div>
            </div>
            <h2>ПОДРОБНОСТИ ЗАКАЗА</h2>
            <hr>
            <div :style="{margin:'10px 0'}"><strong>Номер заказа:</strong> {{Object.keys(order).length > 0 ?
                order.numberOrder : ''}}
            </div>
            <div :style="{margin:'10px 0'}"><strong>Оформлен</strong> {{Object.keys(order).length > 0 ?
                reformateData(order.basket[0].createdAt) : ''}}
            </div>
            <v-data-table
                    :headers="headers"
                    :items="order.basket"
                    class="elevation-1"
                    hide-default-footer
            >
                <template v-slot:item.title="{item}">
                    <div :style="{color: '#305496', display: 'flex'}" @click="transitionOnProduct(item)">
                        <img :style="{height:'120px'}" :src="item.image" alt="">
                        <div :style="{padding: '10px 0 30px 20px'}">
                            <span :style="{cursor: 'pointer'}">{{item.name}}</span>
                        </div>
                    </div>
                </template>
                <template v-slot:item.price="{item}">
                    <div>
                        {{calcPriceForOne(item)}} BYN
                    </div>
                </template>
                <template v-slot:item.countProduct="{item}">
                    <div>
                        {{item.countProduct}}
                    </div>
                </template>
                <template v-slot:item.total="{item}">
                    <div>
                        {{(Number(calcPriceOneProduct(item)) * Number(item.countProduct)).toFixed(2)}} BYN
                    </div>
                </template>
                <template v-slot:footer>
                    <div :style="{ display:'flex', justifyContent: 'space-around', padding: '20px', backgroundColor:'#F2F2F2'}">
                        <div :style="{ marginLeft: 'auto'}">
                            Стоимость заказа: {{calcTotal()}} руб.
                        </div>
                        <div :style="{ margin: 'auto 30px'}">
                            Вес: {{calcWeight()}} кг.
                        </div>
                    </div>
                </template>
            </v-data-table>
        </div>

    </div>
</template>

<script>
    import OrderService from "../../services/order";
    import ProductImagesService from "../../services/productImages";

    export default {
        name: 'ProfileOrder',
        data: () => ({
            order: {},
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
                    value: 'countProduct',
                    sortable: false,
                    align: 'center'
                },
                {
                    text: 'Сумма',
                    value: 'total',
                    sortable: false,
                    align: 'center'
                }
            ]
        }),
        created() {
            OrderService.getOrders(localStorage.getItem('token')).then(({data}) => {
                data.forEach(({order}) => {
                    if (JSON.parse(order).numberOrder === this.$router.history.current.params.id) {
                        let copyOrder = {...JSON.parse(order)};
                        copyOrder.basket.forEach((product) => {
                            return ProductImagesService.getProductImages(product.id).then(({data}) => {
                                product.image = data[0].pathImage;
                            })
                        });
                        setTimeout(() => {
                            this.order = copyOrder
                            this.loading = false;
                        }, 2500);
                    }
                });
            }).catch(() => {
                this.errors.emptyOrders = true;
            });
        },
        methods: {
            reformateData(date) {
                const newFormateDate = +date.split('-')[2].split('T')[0] + '.' + date.split('-')[1] + '.' + date.split('-')[0];
                const newFormateTimes = date.split('-')[2].split('T')[1].split('.')[0];
                return newFormateDate + ' ' + newFormateTimes
            },
            calcTotal() {
                let total = 0;
                this.order.basket.forEach((item) => {
                    total = total + Number(this.calcPriceProduct(item))
                });
                return Number(total).toFixed(2)
            },
            calcWeight() {
                let weight = 0;
                this.order.basket.forEach((item) => {
                    weight = weight + (Number(item.weight) * item.countProduct)
                });
                return weight.toFixed(2)
            },
            transitionOnProduct(product) {
                this.$router.push(`/catalog/${product.group.split(' ').join('').toLowerCase()}/${product.id}`);
            },
            calcPriceOneProduct(item){
                return item.countProduct <= 10 ? item.priceBeforeTen : item.priceBeforeHundred
            },
            calcPriceProduct(product) {
                if (product.priceBeforeTen || product.priceBeforeHundred) {
                    if (product.countProduct <= 10) {
                        return Number(product.priceBeforeTen.split(',')[0]) * product.countProduct
                    }
                    return Number(product.priceBeforeHundred.split(',')[0]) * product.countProduct
                }
                return 0;
            },
            calcPriceForOne(item){
                return (Number(item.countProduct) <= 10) ? item.priceBeforeTen : item.priceBeforeHundred
            }
        }
    }
</script>

<style scoped>
    .order {
        padding: 30px;
    }
</style>