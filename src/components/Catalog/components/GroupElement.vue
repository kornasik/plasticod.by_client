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
        <div class="group-element__products" v-if="productsForView.length > 0">
            <div class="group-element__products__product" v-for="product in productsForView" :key="product.name+product.code"
                 @click="openDetailProduct(product.id)">
                <div class="group-element__products__product__title">
                    {{product.name}}
                </div>
                <div class="group-element__products__product__code">
                    Код: {{product.code}}
                </div>
                <div class="group-element__products__product__image">
                    <img :src="product.img" :alt="product.name">
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
            images: [],
            productsForView: []
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
            init(){
                ProductImagesService.getAllImages().then(({data}) => {
                    this.images = data
                    return data
                }).then((images) => {
                    this.productsForView = this.products.map((product) => {
                        const index = images.findIndex((image) => {
                            return Number(image.productId) === product.id;
                        });
                        return {
                            name: product.name,
                            code: product.code,
                            id: product.id,
                            img: index > -1 ? images[index].pathImage : 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Empty_set.svg/1200px-Empty_set.svg.png'
                        }
                    })
                })
            }
        },
        created() {
            this.init();
        },
        beforeUpdate() {
            this.productsForView = this.products.map((product) => {
                const index = this.images.findIndex((image) => {
                    return Number(image.productId) === product.id;
                });
                return {
                    name: product.name,
                    code: product.code,
                    id: product.id,
                    img: index > -1 ? this.images[index].pathImage : 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Empty_set.svg/1200px-Empty_set.svg.png'
                }
            })
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
        height: 280px;
        width: 33%;
        border: 2px solid black;
        text-align: center;
        margin: 1.4px;
        cursor: pointer;
    }

    .group-element__products__product__image img {
        max-height: 190px;
    }

    .group-element__products__product__image {
        margin: auto 0;
        display: block;
    }

</style>