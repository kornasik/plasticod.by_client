<template>
    <v-app>
        <div v-if="!loading">
            <v-card>
                <v-toolbar color="#00B0F0" dark>
                    <v-toolbar-title>Подробности заказа: №{{order.numberOrder}}</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
            </v-card>
            <div class="order">
                <div @click="()=>this.$router.go(-1)"
                     :style="{display: 'flex', color: '#305496', marginBottom: '10px', cursor: 'pointer'}">
                    <v-icon color="#305496" left medium>mdi-arrow-left</v-icon>
                    <div>Назад</div>
                </div>
                <hr>
                <div :style="{margin:'10px 0'}"><strong>Оформлен</strong> {{reformateData(order.basket[0].createdAt)}}
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
                            {{calcPrice(item)}} BYN
                        </div>
                    </template>
                    <template v-slot:item.countProduct="{item}">
                        <div>
                            {{item.countProduct}}
                        </div>
                    </template>
                    <template v-slot:item.total="{item}">
                        <div>
                            {{calcPriceProduct(item)}} BYN
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
            <hr>
            <h3>Данные клиента</h3>
            <table border="1" :style="{width: '40%',margin: '30px'}">
                <tr>
                    <td>Название компании</td>
                    <td>{{order.dataUser.nameCompany}}</td>
                </tr>
                <tr>
                    <td>Юридический адрес</td>
                    <td>{{order.dataUser.legalAddress}}</td>
                </tr>
                <tr>
                    <td>Почтовый адрес</td>
                    <td>{{order.dataUser.postAddress}}</td>
                </tr>
                <tr>
                    <td>Почтовый индекс</td>
                    <td>{{order.dataUser.postcode}}</td>
                </tr>
                <tr>
                    <td>E-mail</td>
                    <td>{{order.dataUser.email}}</td>
                </tr>
                <tr>
                    <td>УНП</td>
                    <td>{{order.dataUser.unp}}</td>
                </tr>
                <tr>
                    <td>Кем выдано</td>
                    <td>{{order.dataUser.whoIssued}}</td>
                </tr>
                <tr>
                    <td>Рассчётный счёт</td>
                    <td>{{order.dataUser.paymentAccount}}</td>
                </tr>
                <tr>
                    <td>Название банка</td>
                    <td>{{order.dataUser.nameBank}}</td>
                </tr>
                <tr>
                    <td>Код банка</td>
                    <td>{{order.dataUser.codeBank}}</td>
                </tr>
                <tr>
                    <td>Адрес банка</td>
                    <td>{{order.dataUser.addressBank}}</td>
                </tr>
                <tr>
                    <td>ФИО</td>
                    <td>{{order.dataUser.fullName}}</td>
                </tr>
                <tr>
                    <td>Номер телефона</td>
                    <td>{{order.dataUser.phoneNumber}}</td>
                </tr>
                <tr>
                    <td>Страна</td>
                    <td>{{order.dataUser.country}}</td>
                </tr>
                <tr>
                    <td>Регион</td>
                    <td>{{order.dataUser.region}}</td>
                </tr>
                <tr>
                    <td>Город</td>
                    <td>{{order.dataUser.city}}</td>
                </tr>
                <tr>
                    <td>Дом</td>
                    <td>{{order.dataUser.home}}</td>
                </tr>
                <tr>
                    <td>Корпус</td>
                    <td>{{order.dataUser.body}}</td>
                </tr>
                <tr>
                    <td>Офис, пемещение</td>
                    <td>{{order.dataUser.apartment}}</td>
                </tr>
            </table>
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
    </v-app>
</template>

<script>
    import OrderService from "../../../services/order";
    import ProductImagesService from "../../../services/productImages";

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
            ],
            headersUser: [
                'Название компании',
                'Юридический адрес',
                'Почтовый адрес',
                'E-mail',
                'УНП',
                'Кем выдано',
                'Рассчётный счёт',
                'Наименование банка',
                'Код банка',
                'Адрес банка',
                'ФИО',
                'Номер телефона',
                'Страна',
                'Регион',
                'Город',
                'Улица',
                'Дом',
                'Корпус',
                'Офис, помещение',
            ]
        }),
        async created() {
            await OrderService.getAllOrders().then(({data}) => {
                const indexOrder = data.findIndex((order) => {
                    return JSON.parse(order.order).numberOrder === this.$router.history.current.params.id
                });
                const copyOrder = {...JSON.parse(data[indexOrder].order)};
                const copyProducts = [...copyOrder.basket];

                copyProducts.map((product) => {
                    ProductImagesService.getProductImages(product.id).then(({data}) => {
                        return data
                    }).then((images) => {
                        product.image = images[0].pathImage;
                    });
                    return product
                });
                setTimeout(()=>{
                    this.order = copyOrder
                    this.loading = false;
                }, 3000)
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
                    total = total + this.calcPriceProduct(item)
                });
                return total
            },
            calcWeight() {
                let weight = 0;
                this.order.basket.forEach((item) => {
                    weight = weight + (Number(item.weight) * item.countProduct)
                });
                return weight.toFixed(2)
            },
            transitionOnProduct(product) {
                this.$router.push(`/catalog/${product.group.split(' ').join('').toLowerCase()}/${product._id}`);
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
            calcPrice(item) {
                return item.countProduct < 10 ? item.priceBeforeTen : item.priceBeforeHundred
            },
        }
    }
</script>

<style scoped>
    .order {
        padding: 30px;
    }
</style>