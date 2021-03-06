<template>
    <div class="history-orders">
        <div class="history-orders__wrapper">
            <h2 :style="{marginBottom: '30px'}">Заказы</h2>
            <v-data-table
                    :headers="headers"
                    :items="orders"
                    class="elevation-1"
                    hide-default-footer
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
                        {{item.status}}
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
            <div v-else>Заказов до сих пор не было!</div>
        </div>
    </div>
</template>

<script>
    import OrderService from "../../services/order";

    export default {
        name: "ProfileOrders",
        data: () => ({
            basket: [],
            errors: {
                emptyOrders: false
            },
            headers: [
                {
                    text: '№ Заказа',
                    align: 'start',
                    value: 'number',
                    width: 120
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
            orders: []
        }),
        created() {
            OrderService.getOrders(localStorage.getItem('token')).then(({data}) => {
                this.errors.emptyOrders = false;
                this.orders = data.map(({order, createdAt}) => {
                    const orderCopy = JSON.parse(order);
                    this.basket = orderCopy.basket;
                    let total = 0;
                    if (orderCopy.basket.length > 1) {
                        total = orderCopy.basket.reduce((next, current) => {
                            return ((current.countProduct <= 10 ? current.priceBeforeTen : current.priceBeforeHundred) * current.countProduct) + ((next.countProduct <= 10 ? next.priceBeforeTen : next.priceBeforeHundred) * next.countProduct)
                        })
                    } else {
                        total = orderCopy.basket[0].countProduct * (orderCopy.basket[0].countProduct <= 10 ? orderCopy.basket[0].priceBeforeTen : orderCopy.basket[0].priceBeforeHundred)
                    }
                    return {
                        number: orderCopy.numberOrder,
                        status: orderCopy.status === 'open' ? "Открытый" : "Закрытый",
                        customer: orderCopy.dataUser.fullName,
                        date: createdAt,
                        delivery: orderCopy.shipping === 'transportCompany' ? "Транспортной компанией" : "Самовывоз",
                        total: total.toFixed(2),
                        email: orderCopy.dataUser.email
                    }
                })
            }).catch(() => {
                this.errors.emptyOrders = true;
            });
        },
        methods: {
            transitionOrder(number) {
                this.$router.push(`/profile/orders/${number}`)
            },
            reformateData(date) {
                let timeInMilliseconds = (new Date(date)).getTime();
                const threeHoursInMilliseconds = 0;
                timeInMilliseconds += threeHoursInMilliseconds;
                const timeInFormat = new Date(timeInMilliseconds)
                const correctDate = timeInFormat.getDate() < 10 ? '0' + timeInFormat.getDate() : timeInFormat.getDate();
                const correctMonth = timeInFormat.getMonth() + 1 < 10 ? '0' + (timeInFormat.getMonth() + 1) : timeInFormat.getMonth() + 1;
                const correctYear = timeInFormat.getFullYear();
                const correctHours = timeInFormat.getHours() < 10 ? '0' + timeInFormat.getHours() : timeInFormat.getHours();
                const correctMinutes = timeInFormat.getMinutes() < 10 ? '0' + timeInFormat.getMinutes() : timeInFormat.getMinutes();
                const correctSeconds = timeInFormat.getSeconds() < 10 ? '0' + timeInFormat.getSeconds() : timeInFormat.getSeconds();
                const newFormatDate = `${correctDate}.${correctMonth}.${correctYear}`;
                const newFormatTimes = `${correctHours}:${correctMinutes}:${correctSeconds}`;
                return newFormatDate + ' ' + newFormatTimes
            }
        }
    }
</script>

<style scoped>
    .history-orders__wrapper {
        padding: 30px;
        margin: 0 auto;
    }
</style>