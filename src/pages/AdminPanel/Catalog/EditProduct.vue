<template>
    <v-app>
        <div :style="{display: 'flex', justifyContent: 'space-around'}">
            <v-icon @click="$router.go(-1)" :style="{height: 'fit-content', marginTop: '30px'}">fas fa-arrow-left
            </v-icon>
            <div class="edit-product">
                <h1 class="title">Редактирование товара</h1>
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
                <v-btn text small @click="editProduct">Редактировать</v-btn>
            </div>
            <div :style="{width: '30%', marginTop: '50px'}">
                <h1>Загрузить изображение</h1>
                <input type="file" name="file" @change="onFileChange"/><br><br>
                <Images :images="images" @emitDeleteImage="emitDeleteImage"/>
            </div>
        </div>
        <v-snackbar
                v-model="loading"
                :color="colorPush"
                :right="true"
                :top="true"
        >
            {{pushText}}
            <v-btn
                    dark
                    text
                    @click="loading = false"
            >
                Close
            </v-btn>
        </v-snackbar>
    </v-app>
</template>

<script>
    import PostService from "../../../services/products";
    import GroupsService from "../../../services/groups";
    import ProductImagesService from "../../../services/productImages";
    import Images from "./elements/Images";

    export default {
        name: 'AddProduct',
        components: {
            Images
        },
        data: () => ({
            loading: false,
            colorPush: 'green',
            pushText: 'Изображение добавлено в базу!',
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
        created() {
            const idProduct = Number(this.$router.history.current.params.id);
            PostService.getProducts().then((response) => {
                const id = response.data.findIndex((product) => {
                    return product.id === idProduct;
                });
                this.product = response.data[id];
            });

            GroupsService.getGroups().then((response) => {
                this.groups = response.data.map((group) => {
                    return group.name
                });
            });

            this.getImages();
        },
        methods: {
            editProduct() {
                PostService.updateProduct(this.product).then(() => {
                    this.$router.go(-1);
                });
            },
            onFileChange(event) {
                const idProduct = Number(this.$router.history.current.params.id);
                if (event.target.files && event.target.files.length) {
                    let file = event.target.files[0];
                    this.uploadImageData.file = file;
                    this.uploadImageData.displayFileName =
                        event.target.files[0].name + " (" + this.calcSize(file.size) + "Kb)";
                    let reader = new FileReader();
                    reader.onload = e => {
                        this.uploadImageData.uploadFileData = e.target.result;
                        if (this.images.length < 5) {
                            ProductImagesService.insertImagesProduct({
                                image: e.target.result,
                                productId: idProduct
                            }).then(() => {
                                this.getImages();
                                this.pushText = 'Изображение добавлено в базу!';
                                this.loading = true;
                            })
                        } else {
                            this.asd();
                        }
                    };
                    reader.readAsDataURL(file);
                }
            },
            asd(){
                this.colorPush = 'red';
                this.pushText = 'Достигнут лимит изображений!';
                this.loading = true;
                setTimeout(() => {
                    this.colorPush = 'green'
                }, 10000)
            },
            calcSize(size) {
                const sizeOneMByte = 1024;
                return Math.round(size / sizeOneMByte);
            },
            getImages() {
                const idProduct = Number(this.$router.history.current.params.id);
                ProductImagesService.getProductImages(idProduct).then(({data}) => {
                    let imagesArray = [];
                    data.forEach((image) => {
                        imagesArray.push({
                            pathImage: image.pathImage,
                            id: image.id
                        });
                        this.images = imagesArray;
                    })
                });
            },
            emitDeleteImage({id}) {
                ProductImagesService.deleteProductImage(id);
                this.images = this.images.filter((image)=>{
                   return !(image.productId === id)
                });
                this.getImages();
                this.pushText = 'Изображение удалено из базы!';
                this.loading = true;
            }
        }
    }
</script>

<style scoped>
    .edit-product {
        width: 400px;
        margin: 0 auto;
    }

    .edit-product h1 {
        text-align: center;
    }
</style>