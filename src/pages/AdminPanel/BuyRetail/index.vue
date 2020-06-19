<template>
    <v-app>
        <div class="admin-panel-news">
            <v-app id="inspire">
                <v-card>
                    <v-toolbar color="#00B0F0" dark>
                        <v-toolbar-title>Купить в розницу</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <div class="my-2">
                            <v-btn small color="green" @click="save">
                                <v-icon size="small" class="mr-2">fas fa-check</v-icon>
                                Сохранить
                            </v-btn>
                        </div>
                    </v-toolbar>
                </v-card>
                <div class="main">
                    <v-btn :style="{margin: '0 0 20px auto'}" small color="yellow" @click="addAddress">
                        <v-icon size="small" class="mr-2">fas fa-plus</v-icon>
                        Добавить адрес
                    </v-btn>
                    <div
                            v-for="(field, indexField) in address"
                            :key="indexField"
                            :style="{display: 'flex'}"
                    >
                        <v-text-field
                                label="Адрес"
                                v-model="address[indexField].address"
                                outlined
                        />
                        <v-icon :style="{padding: '20px', display: 'block', height: 'fit-content'}" size="medium"
                                @click="deleteAddress(field.id)">
                            fas fa-trash
                        </v-icon>
                    </div>
                </div>
                <v-snackbar
                        v-model="snackbar"
                        color="green"
                        :right="true"
                        :top="true"
                >
                    Данные сохранены
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
    import AddressShippingService from "../../../services/address-shipping";

    export default {
        name: 'About',
        data: () => ({
            id: '',
            existAbout: false,
            snackbar: false,
            address: []
        }),
        created() {
            this.init();
        },
        methods: {
            save() {
                AddressShippingService.getShippingService().then(({data}) => {
                    return data
                }).then((addresses) => {
                    addresses.forEach((address) => {
                        this.address.forEach((addressTwo) => {
                            if (address.address !== addressTwo && addressTwo.id === address.id) {
                                AddressShippingService.updateShippingService({
                                    id: addressTwo.id,
                                    address: addressTwo.address
                                })
                            }
                        })
                    });
                });
                this.snackbar = true;
            },
            init() {
                AddressShippingService.getShippingService().then(({data}) => {
                    this.address = data;
                })
            },
            addAddress() {
                AddressShippingService.insertShippingService({
                    address: ''
                }).then(() => {
                    AddressShippingService.getShippingService().then(({data}) => {
                        this.address = data;
                    })
                })
            },
            deleteAddress(id) {
                AddressShippingService.deleteAddress(id).then(() => {
                    AddressShippingService.getShippingService().then(({data}) => {
                        this.address = data;
                    })
                }).catch(() => {
                    AddressShippingService.getShippingService().then(({data}) => {
                        this.address = data;
                    })
                })
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