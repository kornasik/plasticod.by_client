<template>
    <v-app>
        <div class="admin-panel-news">
            <v-app id="inspire">
                <v-card>
                    <v-toolbar color="#00B0F0" dark>
                        <v-toolbar-title>Управление заказами</v-toolbar-title>
                    </v-toolbar>
                </v-card>
                <div class="main">
                    <h2 :style="{marginBottom: '30px'}">Заказы</h2>
                    <v-data-table
                            :headers="headers"
                            :items="orders"
                            class="elevation-1"
                            :items-per-page="100"
                            v-if="orders.length > 0"
                    >
                        <template v-slot:item.number="{item}">
                            <div
                                    :style="{color: '#305496', display: 'flex', cursor: 'pointer'}"
                                    @click="transitionOrder(item.number)"
                            >
                                {{item.number}}
                            </div>
                        </template>
                        <template v-slot:item.status="{item}">
                            <div>
                                <select name="status" @change="handleStatus($event, item)">
                                    <option value="open" :selected="item.status === 'Открытый'">Открытый</option>
                                    <option value="close" :selected="item.status === 'Закрытый'">Закрытый</option>
                                </select>
                            </div>
                        </template>
                        <template v-slot:item.delivery="{item}">
                            <div>
                                {{item.delivery}}
                            </div>
                        </template>
                        <template v-slot:item.customer="{item}">
                            <div>
                                ФИО: {{item.customer}}
                                <p>E-mail: {{item.email}}</p>
                            </div>
                        </template>
                        <template v-slot:item.date="{item}">
                            <div>
                                {{reformateData(item.date)}}
                            </div>
                        </template>
                        <template v-slot:item.total="{item}">
                            <div>
                                {{item.total}} BYN
                            </div>
                        </template>
                    </v-data-table>

                </div>
                <v-snackbar
                        v-model="snackbar"
                        color="green"
                        :right="true"
                        :top="true"
                >
                    Запись обновлена!
                    <v-btn
                            dark
                            text
                            @click="snackbar = false"
                    >
                        Close
                    </v-btn>
                </v-snackbar>
            </v-app>
        </div>
    </v-app>
</template>

<script>
    import OrderService from "../../../services/order";

    export default {
        name: 'Orders',
        components: {},
        data: () => ({
            snackbar: false,
            allUsers: [],
            orders: [],
            headers: [
                {
                    text: '№ Заказа',
                    align: 'start',
                    value: 'number',
                    width: 120,
                    sortable: true
                },
                {
                    text: 'Статус',
                    value: 'status',
                    width: 150
                },
                {
                    text: 'Способ доставки',
                    value: 'delivery',
                    width: 200
                },
                {text: 'Покупатель', value: 'customer'},
                {text: 'Дата', value: 'date', sortable: true},
                {text: 'Итого', value: 'total'}
            ],
        }),
        created() {
            OrderService.getAllOrders().then(({data}) => {
                this.orders = data.map(({order, createdAt}) => {
                    const orderCopy = JSON.parse(order);
                    this.basket = orderCopy.basket;
                    let total = 0;
                    if (orderCopy.basket.length > 1) {
                        total = orderCopy.basket.reduce((next, current) => {
                            return (current.countProduct < 10 ? current.priceBeforeTen : current.priceBeforeHundred * current.countProduct) + (next.countProduct < 10 ? next.priceBeforeTen : next.priceBeforeHundred * next.countProduct)
                        })
                    } else {
                        total = orderCopy.basket[0].countProduct * orderCopy.basket[0].countProduct < 10 ? orderCopy.basket[0].priceBeforeTen : orderCopy.basket[0].priceBeforeHundred
                    }
                    return {
                        number: orderCopy.numberOrder,
                        status: orderCopy.status === 'open' ? "Открытый" : "Закрытый",
                        customer: orderCopy.dataUser.fullName,
                        date: createdAt,
                        delivery: orderCopy.shipping === 'transportCompany' ? "Транспортной компанией" : "Самовывоз",
                        total: total,
                        email: orderCopy.dataUser.email
                    }
                })
                this.orders.reverse();
            })
        },
        methods: {
            transitionOrder(number) {
                this.$router.push(`/admin/orders/${number}`)
            },
            reformateData(date) {
                const newFormateDate = +date.split('-')[2].split('T')[0] + '.' + date.split('-')[1] + '.' + date.split('-')[0];
                const newFormateTimes = date.split('-')[2].split('T')[1].split('.')[0];
                return newFormateDate + ' ' + newFormateTimes
            },
            async handleStatus(event, item) {
                let order = {};
                await OrderService.getAllOrders().then(({data}) => {
                    const index = data.findIndex((order) => {
                        return JSON.parse(order.order).numberOrder === item.number
                    });
                    order = {...data[index]};
                    return {...data[index]};
                }).then(({order, token}) => {
                    const parseOrder = JSON.parse(order);
                    if (event.target.value === 'open') {
                        parseOrder.status = 'open'
                    } else {
                        parseOrder.status = 'close'
                    }
                    OrderService.updateOrder(JSON.stringify(parseOrder), token).then(() => {
                        this.snackbar = true;
                    })
                });
                console.log(order)

            }
        }
    }
</script>

<style scoped>
    .main {
        margin: 30px;
    }

    .main__phone {
        width: 400px;
    }

    .main__images {

    }
</style>