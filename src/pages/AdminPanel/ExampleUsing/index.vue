<template>
    <v-app>
        <div class="admin-panel-news">
            <v-app id="inspire">
                <v-card>
                    <v-toolbar color="#00B0F0" dark>
                        <v-toolbar-title>Примеры использования</v-toolbar-title>
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
                    <div class="main__images">
                        <div :style="{width: 'fit-content'}">
                            <div :style="{fontSize: '38px', fontWeight: 'bold', display: 'flex'}">
                                Загрузить изображение
                            </div>
                            <input type="file" name="file" @change="onFileChange"/><br><br>
                            <Images :images="images" :flex="true" v-if="this.images.length"/>
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
    import ExampleUsingService from "../../../services/example-using";

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
            existAbout: false
        }),
        created() {
            this.init();
        },
        methods: {
            save() {
                ExampleUsingService.getExampleUsing().then(({data}) => {
                    this.images = data;
                    return data
                }).then((images) => {
                    if (images.length > 0) {
                        ExampleUsingService.updateExampleUsing({
                            image: 'cXdlb2Vybmdlcm1ncXdlb2Vybmdlcm1nO2VybWdvZXJxd21nb2l3ZXJtZ2V3cm1nZXJtZ29pcW1lcmdwJ21xdydpZW9mbSdxd2VpbWcncWV3b2ltcXdlb2Vybmdlcm1nO2VybWdvZXJxd21nb2l3ZXJtZ2V3cm1nZXJtZ29pcW1lcmdwJ21xdydpZW9mbSdxd2VpbWcncWV3b2ltcXdlb2Vybmdlcm1nO2VybWdvZXJxd21nb2l3ZXJtZ2V3cm1nZXJtZ29pcW1lcmdwJ21xdydpZW9mbSdxd2VpbWcncWV3b2ltcXdlb2Vybmdlcm1nO2VybWdvZXJxd21nb2l3ZXJtZ2V3cm1nZXJtZ29pcW1lcmdwJ21xdydpZW9mbSdxd2VpbWcncWV3b2ltcXdlb2Vybmdlcm1nO2VybWdvZXJxd21nb2l3ZXJtZ2V3cm1nZXJtZ29pcW1lcmdwJ21xdydpZW9mbSdxd2VpbWcncWV3b2ltcXdlb2Vybmdlcm1nO2VybWdvZXJxd21nb2l3ZXJtZ2V3cm1nZXJtZ29pcW1lcmdwJ21xdydpZW9mbSdxd2VpbWcncWV3b2ltO2VybWdvZXJxd21nb2l3ZXJtZ2V3cm1nZXJtZ29pcW1lcmdwJ21xdydpZW9mbSdxd2VpbWcncWV3b2lt',
                            id: 1
                        });
                    } else {
                        ExampleUsingService.insertExampleUsing({
                            image: 'cXdlb2Vybmdlcm1ncXdlb2Vybmdlcm1nO2VybWdvZXJxd21nb2l3ZXJtZ2V3cm1nZXJtZ29pcW1lcmdwJ21xdydpZW9mbSdxd2VpbWcncWV3b2ltcXdlb2Vybmdlcm1nO2VybWdvZXJxd21nb2l3ZXJtZ2V3cm1nZXJtZ29pcW1lcmdwJ21xdydpZW9mbSdxd2VpbWcncWV3b2ltcXdlb2Vybmdlcm1nO2VybWdvZXJxd21nb2l3ZXJtZ2V3cm1nZXJtZ29pcW1lcmdwJ21xdydpZW9mbSdxd2VpbWcncWV3b2ltcXdlb2Vybmdlcm1nO2VybWdvZXJxd21nb2l3ZXJtZ2V3cm1nZXJtZ29pcW1lcmdwJ21xdydpZW9mbSdxd2VpbWcncWV3b2ltcXdlb2Vybmdlcm1nO2VybWdvZXJxd21nb2l3ZXJtZ2V3cm1nZXJtZ29pcW1lcmdwJ21xdydpZW9mbSdxd2VpbWcncWV3b2ltcXdlb2Vybmdlcm1nO2VybWdvZXJxd21nb2l3ZXJtZ2V3cm1nZXJtZ29pcW1lcmdwJ21xdydpZW9mbSdxd2VpbWcncWV3b2ltO2VybWdvZXJxd21nb2l3ZXJtZ2V3cm1nZXJtZ29pcW1lcmdwJ21xdydpZW9mbSdxd2VpbWcncWV3b2lt'
                        })
                    }
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
                        this.images.push(e.target.result);
                    };
                    reader.readAsDataURL(file);
                }
            },
            calcSize(size) {
                const sizeOneMByte = 1024;
                return Math.round(size / sizeOneMByte);
            },
            init() {
                ExampleUsingService.getExampleUsing().then(({data}) => {
                    this.images = data;
                })/*.catch(() => {
                    alert('Неполадки с сервером.');
                    ExampleUsingService.insertExampleUsing({
                        image: ''
                    }).then(()=>{
                        ExampleUsingService.getExampleUsing().then(({data}) => {
                            this.image = data[0].images;
                            this.id = data[0].id;
                        })
                    })
                })*/
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