<template>
    <v-app>
        <div :style="{display: 'flex', justifyContent: 'space-around'}">
            <v-icon @click="$router.go(-1)" :style="{height: 'fit-content', marginTop: '30px'}">fas fa-arrow-left
            </v-icon>
            <div class="add-product">
                <h1 class="title">Добавление товара</h1>
                <v-select
                        :items="groups"
                        label="Группа"
                        v-model="product.group"
                ></v-select>
                <v-text-field v-model="product.name" label="Название товара" :rules="rules"
                              hide-details="auto"></v-text-field>
                <v-text-field v-model="product.code" label="Код"></v-text-field>
                <v-text-field v-model="product.color" label="Цвета корпуса"></v-text-field>
                <v-text-field v-model="product.drawer" label="Выдвижной ящик"></v-text-field>
                <v-text-field v-model="product.volumeOneBox" label="Объем одного ящика см.3"></v-text-field>
                <v-text-field v-model="product.volumeAllBox" label="Объем всех ящиков см.3"></v-text-field>
                <v-text-field v-model="product.weight" label="Вес, кг."></v-text-field>
                <v-text-field v-model="product.codeCompatibility" label="Стыкуется с кодами:"></v-text-field>
                <v-text-field v-model="product.priceBeforeTen" label="1-10 шт."></v-text-field>
                <v-text-field v-model="product.priceBeforeHundred" label="11-100 шт."></v-text-field>
                <v-text-field v-model="product.priceAfterHundred" label="от 100 шт."></v-text-field>
                <v-btn text small @click="addProduct">Создать</v-btn>
            </div>
            <div :style="{width: '30%', marginTop: '50px'}">
                <h1>Загрузить изображение</h1>
                <input type="file" name="file" @change="onFileChange"/><br><br>
                <Images :images="images" @emitDeleteImage="emitDeleteImage"/>
            </div>
        </div>
    </v-app>
</template>

<script>
    import PostService from "../../../services/products";
    import GroupsService from "../../../services/groups";
    import Images from "./elements/Images";
    import ProductImagesService from "../../../services/productImages";

    export default {
        name: 'AddProduct',
        components: {
            Images
        },
        data: () => ({
            files: [],
            groups: [],
            images: [],
            product: {
                name: '',
                group: '',
                code: '',
                color: '',
                drawer: '',
                volumeOneBox: '',
                volumeAllBox: '',
                weight: '',
                codeCompatibility: '',
                priceBeforeTen: '',
                priceBeforeHundred: '',
                priceAfterHundred: ''
            },
            uploadImageData: {
                displayFileName: null,
                uploadFileData: null,
                file: null
            }
        }),
        methods: {
            addProduct() {
                PostService.insertProducts(this.product).then(({data}) => {
                    this.products = {
                        name: '',
                        group: '',
                        code: '',
                        color: '',
                        drawer: '',
                        volumeOneBox: '',
                        volumeAllBox: '',
                        weight: '',
                        codeCompatibility: '',
                        priceBeforeTen: '',
                        priceBeforeHundred: '',
                        priceAfterHundred: '',
                    };
                    return data.id
                }).then((id) => {
                    this.images.forEach((image) => {
                        ProductImagesService.insertImagesProduct({
                            image: image.pathImage,
                            productId: id
                        })
                    })
                });
                this.$router.go(-1);
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
                let copyImages = [...this.images];
                copyImages.splice(id, 1);
                this.images = copyImages;
            }
        },
        created() {
            GroupsService.getGroups().then((response) => {
                this.groups = response.data.map((group) => {
                    return group.name
                })
            })
        }
    }
</script>

<style scoped>
    .add-product {
        width: 400px;
        margin: 0 auto;
    }

    .add-product h1 {
        text-align: center;
    }
</style>