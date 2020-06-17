<template>
    <v-app>
        <div class="admin-panel-news">
            <v-app id="inspire">
                <v-card>
                    <v-toolbar color="#00B0F0" dark>
                        <v-toolbar-title>Примеры использования</v-toolbar-title>
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
    import logo from '../../../assets/autospace.png';

    export default {
        name: 'About',
        components: {
            Images
        },
        data: () => ({
            logo: logo,
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
                        ExampleUsingService.insertExampleUsing({
                            image: e.target.result
                        })
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
                    this.images = data.map((image)=>{
                        return image.image
                    })
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