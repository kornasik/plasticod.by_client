<template>
    <v-app>
        <div class="admin-panel-news">
            <v-app id="inspire">
                <v-card>
                    <v-toolbar color="#00B0F0" dark>
                        <v-toolbar-title>Условия доставки и оплаты</v-toolbar-title>
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
                    <v-text-field
                            label="Адрес"
                            v-model="address"
                            outlined
                    ></v-text-field>
                    <v-textarea
                            placeholder="Реквизиты"
                            v-model="requisites"
                            :filled="true"
                            :solo="true"
                    ></v-textarea>
                    <div class="main__images">
                        <div :style="{width: 'fit-content'}">
                            <div :style="{fontSize: '38px', fontWeight: 'bold', display: 'flex'}">
                                Загрузить изображение
                            </div>
                            <input type="file" name="file" @change="onFileChange"/><br><br>
                            <Images :images="images" :flex="true" v-if="this.images.length" @emitDeleteImage="emitDeleteImage"/>
                            <h2 v-else>Список изображений пуст!!!</h2>
                        </div>
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
    import Images from "../Catalog/elements/Images";
    import TutorialsService from "../../../services/tutorials";

    export default {
        name: 'About',
        components: {
            Images
        },
        data: () => ({
            id: '',
            images: [],
            uploadImageData: {
                displayFileName: null,
                uploadFileData: null,
                file: null
            },
            snackbar: false,
            existAbout: false,
            address: '',
            requisites: ''
        }),
        created() {
            this.init();
        },
        methods: {
            save() {
                const images = this.images.map((photos) => {
                    return photos.pathImage
                })
                TutorialsService.updateTutorials({
                    photos: JSON.stringify(images),
                    requisites: this.requisites,
                    address: this.address
                });
                this.snackbar = true;
            },
            onFileChange(event) {
                if (event.target.files && event.target.files.length) {
                    let file = event.target.files[0];
                    this.uploadImageData.file = file;
                    this.uploadImageData.displayFileName =
                        event.target.files[0].name + " (" + this.calcSize(file.size) + "Kb)";
                    let reader = new FileReader();
                    reader.onload = e => {
                        this.uploadImageData.uploadFileData = e.target.result;
                        this.images.push({
                            pathImage: e.target.result
                        });
                    };
                    reader.readAsDataURL(file);
                }
            },
            calcSize(size) {
                const sizeOneMByte = 1024;
                return Math.round(size / sizeOneMByte);
            },
            init() {
                TutorialsService.getTutorials().then(({data}) => {
                    if (data.photos) {
                        if (JSON.parse(data.photos)) {
                            this.images = JSON.parse(data.photos).map((photo) => {
                                return {pathImage: photo}
                            })
                        } else {
                            this.images = []
                        }
                    } else {
                        this.images = []
                    }
                    this.address = data.address;
                    this.requisites = data.requisites;
                })
            },
            emitDeleteImage(index){
                this.images.splice(index, 1)
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