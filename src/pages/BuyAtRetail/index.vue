`
<template>
    <div class="buy-at-retail">
        <div class="buy-at-retail__description">
            Представленные на нашем сайте пластиковые органайзеры с выдвижными ячейками можно приобрести у наших
            торговых партнёров по следующим адресам:
        </div>
        <ol class="buy-at-retail__list">
            <li class="buy-at-retail__list__address" v-for="{address} in listAddress" :key="address">
                {{address}}
            </li><br>
        </ol>
    </div>
</template>

<script>
    import AddressShippingService from "../../services/address-shipping";

    export default {
        name: 'buyAtRetail',
        data: () => ({
            listAddress: []
        }),
        created() {
            AddressShippingService.getShippingService().then(({data}) => {
                console.log(data)
                this.listAddress = data;
            })
        }
    }
</script>

<style scoped>
    .buy-at-retail {
        padding: 20px;
    }
</style>