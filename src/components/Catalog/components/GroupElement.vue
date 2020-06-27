<template>
    <div class="group-element">
        <div class="group-element__header">
            <div class="group-element__header__title">
                <h1>{{group.name}}</h1>
            </div>
            <div class="group-element__header__description">
                {{group.description}}
            </div>
        </div>
        <div class="group-element__products" v-if="products.length > 0">
            <div class="group-element__products__product" v-for="product in products" :key="product.label"
                 @click="openDetailProduct(product.id)">
                <div class="group-element__products__product__title">
                    {{product.name}}
                </div>
                <div class="group-element__products__product__code">
                    Код: {{product.code}}
                </div>
                <div class="group-element__products__product__image">
                    <img :src="linkMainImage(product.id)" :alt="product.name">
                </div>
            </div>
        </div>
        <div :style="{padding: '30px', fontSize: '23px'}" v-else>
            В данной группе нету товаров!
        </div>
    </div>
</template>

<script>
    import ProductImagesService from "../../../services/productImages";

    export default {
        props: {
            products: Array,
            group: Object
        },
        name: 'GroupElement',
        data: () => ({
            images: []
        }),
        computed: {
            currentRoute() {
                return this.$router.history.current.params.id
            }
        },
        watch: {
            currentRoute() {
                console.log('asd')
            }
        },
        methods: {
            openDetailProduct(url) {
                this.$router.push(`${this.$router.history.current.fullPath}/${url}`)
            },
            linkMainImage(id) {
                const index = this.images.findIndex((image) => {
                    return Number(image.productId) === id;
                });
                return this.images[index].pathImage || 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Empty_set.svg/1200px-Empty_set.svg.png';
            }
        },
        created() {
            ProductImagesService.getAllImages().then(({data}) => {
                this.images = data
            });
        }
    }
</script>

<style scoped>
    .group-element {
    }

    .group-element__header {
        text-align: center;
        background-color: #305496;
        color: white;
        margin-top: 10px;
    }

    .group-element__products__product__title {
        color: #00A2EB;
    }

    .group-element__products__product__code {
        color: red;
    }

    .group-element__header__description {
        padding: 20px;
    }

    .group-element__products {
        display: flex;
        flex-wrap: wrap;
    }

    .group-element__products__product {
        display: flex;
        flex-direction: column;
        height: fit-content;
        width: 33%;
        border: 2px solid black;
        text-align: center;
        margin: 1.4px;
        cursor: pointer;
    }

    .group-element__products__product__image img {
        width: 250px
    }

</style>