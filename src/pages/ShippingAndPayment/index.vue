<template>
    <div class="shipping-and-payment">
        <div class="shipping-and-payment__title">
            Доставка
        </div>
        <div class="shipping-and-payment__shipping">
            Мы работаем с юридическими лицами и индивидуальными предпринимателями. <br>
            Получить приобретённый товар можно по адресу: {{address}}
            <transition-group name="thumbnailfade" tag="div">
                <img v-for="thumb in images"
                     :key="thumb.id"
                     @click="showLightbox(thumb.name)"
                     :src="thumb.name"
                     :alt="thumb.alt"
                     :title="thumb.alt"/>
            </transition-group>

            <lightbox id="mylightbox"
                      ref="lightbox"
                      :images="images"
                      :filter="galleryFilter"
                      :timeoutDuration="5000"
            />
        </div>
        <div class="demarcation-strip"/>

        <div class="shipping-and-payment__about-company">
            <div class="shipping-and-payment__about-company__logo" v-if="logoTransportCompany.length > 0">
                <img v-for="image in logoTransportCompany" :src="image" alt="AutoSpace" :key="image">
            </div>
            <div class="shipping-and-payment__about-company__description">
                {{textTransportCompany}}
            </div>
        </div>

        <div class="demarcation-strip"/>

        <div class="shipping-and-payment__sentence">
            Мы готовы передать товар любой другой транспортной компании с которой сотрудничает "Покупатель" с
            оформлением всех необходимых товарно-транспортных документов.
        </div>

        <div class="shipping-and-payment__title">
            Оплата
        </div>

        <div class="shipping-and-payment__conditions">
            Оплата за товар производится только по безналичному расчёту после выставления «Покупателю» счёта на оплату. <br>
            В случае неоплаты заказа в течение трех банковских дней после выставления "Продавцом" документов для оплаты,
            без предварительного уведомления о задержке платежа, заказ расформировывается.<br>
            <br>
            Реквизиты для оплаты:<br>
            {{requisites}}
            <img src="../../assets/bsbbank.png" alt="BsbBank">
        </div>
    </div>
</template>

<script>
    import TutorialsService from "../../services/tutorials";

    export default {
        name: 'ShippingAndPayment',
        data: () => ({
            images: [],
            galleryFilter: 'all',
            temp: 'Р/с BY66 UNBS 301 301 143 800 100 079 33',
            address: '',
            requisites: '',
            logoTransportCompany: [],
            textTransportCompany: ''
        }),
        methods: {
            showLightbox: function (imageName) {
                this.$refs.lightbox.show(imageName);
            },
            updateFilter(filterName) {
                this.galleryFilter = filterName;
            },
            init() {
                TutorialsService.getTutorials().then(({data}) => {
                    if (data.photos) {
                        if (JSON.parse(data.photos)) {
                            this.images = JSON.parse(data.photos).map((photo, indexPhoto) => {
                                return {
                                    'name': photo,
                                    'filter': 'image',
                                    'id': 'image' + indexPhoto
                                }
                            })
                        } else {
                            this.images = []
                        }
                    } else {
                        this.images = []
                    }
                    if (data.imageTransportCompany !== null) {
                        if (JSON.parse(data.imageTransportCompany)) {
                            this.logoTransportCompany = JSON.parse(data.imageTransportCompany)
                        } else {
                            this.logoTransportCompany = []
                        }
                    } else {
                        this.logoTransportCompany = []
                    }
                    this.address = data.address;
                    this.requisites = data.requisites;
                    this.textTransportCompany = data.textTranposrtCompany;
                })
            }
        },
        computed: {
            filteredImages: function () {
                if (this.galleryFilter === 'all') {
                    return this.images;
                } else {
                    return this.images.filter(image => image.filter === this.galleryFilter);
                }

            }
        },
        created() {
            this.init();
        }
    }
</script>

<style scoped>
    .shipping-and-payment__title {
        color: white;
        font-size: 18px;
        font-weight: bold;
        text-align: center;
        background-color: #305496;
    }

    .shipping-and-payment__shipping {
        padding: 20px;
    }

    .demarcation-strip {
        background-color: #00B0F0;
        width: 100%;
        height: 20px;
    }

    .shipping-and-payment__about-company {
        display: flex;
        align-items: center;
        padding: 20px;
    }

    .shipping-and-payment__about-company__logo img {
        margin-right: 20px;
    }

    .shipping-and-payment__shipping img {
        padding: 10px;
        width: 33.3%;
        height: 200px;
    }

    .shipping-and-payment__sentence {
        padding: 20px;
    }

    .shipping-and-payment__conditions {
        display: flex;
        flex-direction: column;
        padding: 20px;
        overflow-wrap: break-word;
        white-space: break-spaces;
    }

    .shipping-and-payment__conditions img {
        padding: 10px;
        width: 185px;
    }

    .shipping-and-payment__about-company__description {
        word-wrap: break-word;
        white-space: break-spaces;
    }
</style>