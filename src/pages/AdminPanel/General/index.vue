<template>
    <v-app>
        <div class="admin-panel-news">
            <v-app id="inspire">
                <v-card>
                    <v-toolbar color="#00B0F0" dark>
                        <v-toolbar-title>Общие настройки</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <div class="my-2">
                            <v-btn small color="green" @click="saveGeneralSettings">
                                <v-icon size="small" class="mr-2">fas fa-check</v-icon>
                                Сохранить
                            </v-btn>
                        </div>
                    </v-toolbar>
                </v-card>
                <div class="main">
                    <div class="main__phone">
                        <v-text-field
                                label="Телефон"
                                v-model="phone"
                                outlined
                        ></v-text-field>
                    </div>
                    <hr>
                    <div class="main__images">
                        <h2>Изображения в слайдере</h2>
                        <div :style="{width: 'fit-content', marginTop: '50px'}">
                            <div :style="{fontSize: '38px', fontWeight: 'bold', display: 'flex'}">
                                Загрузить изображение
                                <div :style="{fontSize: '10px', height:'fit-content'}">(больше
                                    7 изображений загрузить нельзя)
                                </div>
                            </div>
                            <input type="file" name="file" @change="onFileChange"/><br><br>
                            <Images :images="images" :flex="true" v-if="this.images.length"
                                    @emitDeleteImage="emitDeleteImage"/>
                            <h2 v-else>Список изображений пуст!!!</h2>
                        </div>
                    </div>
                    <hr>
                    <h4 style="color: navy">Skype - имя пользвателя</h4>
                    <h4 style="color: navy">Viber, Telegram, WhatsApp - номера телефонов</h4>
                    <h4 style="color: navy">Vk, Instagram, Facebook - ссылки (без приставок https, http, www и так далее)</h4><br>
                    <h2>Соц. сети</h2>
                    <div>
                        <v-text-field
                                label="Skype"
                                v-model="skype"
                                outlined
                        ></v-text-field>
                        <v-text-field
                                label="Viber"
                                v-model="viber"
                                outlined
                        ></v-text-field>
                        <v-text-field
                                label="WhatsApp"
                                v-model="whatsapp"
                                outlined
                        ></v-text-field>
                        <v-text-field
                                label="Telegram"
                                v-model="telegram"
                                outlined
                        ></v-text-field>
                        <v-text-field
                                label="Facebook"
                                v-model="facebook"
                                outlined
                        ></v-text-field>
                        <v-text-field
                                label="Вконтакте"
                                v-model="vk"
                                outlined
                        ></v-text-field>
                        <v-text-field
                                label="Instagram"
                                v-model="instagram"
                                outlined
                        ></v-text-field>
                    </div>
                </div>
                <v-snackbar
                        v-model="snackbar"
                        color="green"
                        :right="true"
                        :top="true"
                >
                    {{textPush}}
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
    import GeneralService from "../../../services/general";
    import Images from "../Catalog/elements/Images";
    import SocialService from "../../../services/social";
    import SliderService from "../../../services/slider";

    export default {
        components: {
            Images
        },
        name: 'News',
        data: () => ({
            id: '',
            textPush: 'Данные сохранены',
            phone: '',
            images: [],
            uploadImageData: {
                displayFileName: null,
                uploadFileData: null,
                file: null
            },
            snackbar: false,
            viber: '',
            skype: '',
            instagram: '',
            whatsapp: '',
            facebook: '',
            vk: '',
            telegram: ''
        }),
        created() {
            SocialService.getSocial().then(({data}) => {
                if (data.length > 0) {
                    this.viber = data[0].viber;
                    this.skype = data[0].skype;
                    this.instagram = data[0].instagram;
                    this.whatsapp = data[0].whatsapp;
                    this.facebook = data[0].facebook;
                    this.vk = data[0].vk;
                    this.telegram = data[0].telegram
                }
            });
            GeneralService.getGeneral().then(({data}) => {
                this.phone = data[0].numberPhone;

                if (typeof JSON.parse(data[0].images) === 'object') {
                    this.images = JSON.parse(data[0].images);
                }
            });

            SliderService.getSlider().then(({data}) => {
                this.images = data.map((image) => {
                    return {
                        pathImage: image.pathImage,
                        id: image.id
                    }
                })
            });
        },
        methods: {
            saveGeneralSettings() {
                GeneralService.updateGeneral({
                    numberPhone: this.phone
                });

                SocialService.getSocial().then((response) => {
                    if (response.data.length > 0) {
                        SocialService.updateSocial({
                            viber: this.viber,
                            skype: this.skype,
                            instagram: this.instagram,
                            whatsapp: this.whatsapp,
                            facebook: this.facebook,
                            vk: this.vk,
                            telegram: this.telegram
                        })
                    } else {
                        SocialService.createSocial({
                            viber: this.viber,
                            skype: this.skype,
                            instagram: this.instagram,
                            whatsapp: this.whatsapp,
                            facebook: this.facebook,
                            vk: this.vk,
                            telegram: this.telegram
                        })
                    }
                });
                this.textPush = 'Данные сохранены';
                this.snackbar = true;
            },
            onFileChange(event) {
                if (event.target.files && event.target.files.length && this.images.length < 7) {
                    let file = event.target.files[0];
                    this.uploadImageData.file = file;
                    this.uploadImageData.displayFileName =
                        event.target.files[0].name + " (" + this.calcSize(file.size) + "Kb)";
                    let reader = new FileReader();
                    reader.onload = e => {
                        this.uploadImageData.uploadFileData = e.target.result;
                        SliderService.addSlider({
                            image: e.target.result
                        }).then(() => {
                            SliderService.getSlider().then(({data}) => {
                                this.images = data.map((image) => {
                                    return {
                                        pathImage: image.pathImage,
                                        id: image.id
                                    }
                                })
                            }).then(() => {
                                this.textPush = 'Слайд добавлен в базу!';
                                this.snackbar = true;
                            })
                        })
                    };
                    reader.readAsDataURL(file);
                }
            },
            calcSize(size) {
                const sizeOneMByte = 1024;
                return Math.round(size / sizeOneMByte);
            },
            emitDeleteImage(id) {
                SliderService.deleteSlide({id: id});
                this.images = this.images.filter((image) => {
                    return !(image.id === id.id)
                });
                this.textPush = 'Слайд удалён из базы!';
                this.snackbar = true;
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