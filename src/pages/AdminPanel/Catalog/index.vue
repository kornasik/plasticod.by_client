<template>
    <v-app>
        <div class="admin-panel-catalog">
            <v-app id="inspire">
                <v-card>
                    <v-toolbar color="#00B0F0" dark>
                        <v-toolbar-title>Каталог</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-text-field
                                flat
                                v-model="searchCode"
                                hide-details
                                label="Поиск по коду товара"
                                solo-inverted
                        ></v-text-field>
                        <div class="my-2">
                            <v-dialog v-model="isModalAddGroup" persistent max-width="800">
                                <template v-slot:activator="{ on }">
                                    <v-btn :style="{margin: '0 20px'}" small color="green" v-on="on">
                                        <v-icon size="small" class="mr-2">fas fa-plus-circle</v-icon>
                                        Добавить группу
                                    </v-btn>
                                </template>
                                <v-card>
                                    <div :style="{padding: '20px'}">
                                        <v-text-field v-model="newGroupName"
                                                      label="Название группы"></v-text-field>
                                        <v-textarea
                                                solo
                                                name="input-7-4"
                                                label="Описание группы"
                                                v-model="newGroupDescription"
                                        ></v-textarea>
                                        <div :style="{width: 'fit-content', marginTop: '50px'}">
                                            <h1>Загрузить изображение</h1>
                                            <input type="file" name="file" @change="onFileChange"/><br><br>
                                            <Images :images="images" @emitDeleteImage="emitDeleteImage"/>
                                        </div>
                                        <v-card-actions>
                                            <v-btn color="green darken-1" text @click="cancelCreateOrEditGroup">
                                                Отмена
                                            </v-btn>
                                            <v-btn color="green darken-1" text
                                                   @click="modeDialog === 'add' ? createNewGroup() : editGroup()">
                                                {{modeDialog === 'add' ? 'Добавить' : 'Изменить'}}
                                            </v-btn>
                                        </v-card-actions>
                                    </div>
                                </v-card>
                            </v-dialog>

                            <v-btn small color="green" @click="$router.push('/admin/catalog/add')">
                                <v-icon size="small" class="mr-2">fas fa-plus-circle</v-icon>
                                Добавить товар
                            </v-btn>
                        </div>
                    </v-toolbar>
                    <v-tabs vertical>
                        <v-tab>
                            Список товаров
                        </v-tab>
                        <v-tab>
                            Список групп
                        </v-tab>

                        <v-tab-item>
                            <div :style="{display: 'flex !important', flexWrap: 'wrap'}">
                                <v-card flat v-for="product in products" :key="product.name + product.code"
                                        :style="{width: 'fit-content'}">
                                    <v-card-text>
                                        <v-card
                                                max-width="300"
                                        >
                                            <v-img
                                                    class="white&#45;&#45;text align-end"
                                                    height="200px"
                                                    :src="product.image"
                                            >
                                                <v-card-title>
                                                    <div :style="{backgroundColor: 'white', padding: '5px', borderRadius: '4px'}">
                                                        {{product.name}}
                                                    </div>
                                                </v-card-title>
                                            </v-img>

                                            <v-card-subtitle class="pb-0">{{product.group}}</v-card-subtitle>

                                            <v-card-text class="text--primary">
                                                <div>Код: {{product.code}}</div>
                                            </v-card-text>

                                            <v-card-actions>
                                                <v-btn
                                                        color="orange"
                                                        text
                                                        @click="$router.push(`catalog/edit/${product.id}`)"
                                                >
                                                    Изменить
                                                </v-btn>

                                                <v-btn
                                                        color="red"
                                                        text
                                                        @click="deleteProduct(product.id)"
                                                >
                                                    Удалить
                                                </v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-card-text>
                                </v-card>
                            </div>
                        </v-tab-item>
                        <v-tab-item>
                            <v-list
                                    three-line="true"
                                    v-if="groups.length > 0"
                            >
                                <v-list-item
                                        v-for="group in groups"
                                        :key="group.id"
                                        :inactive="true"
                                >

                                    <v-list-item-content>
                                        <v-list-item-title v-html="group.name"></v-list-item-title>
                                        <v-list-item-subtitle v-html="group.description"></v-list-item-subtitle>
                                    </v-list-item-content>

                                    <v-icon size="small" :style="{padding: '0 10px'}" @click="openDialog(group.id)">fas
                                        fa-pen
                                    </v-icon>
                                    <v-icon size="small" @click="deleteGroup(group.id)">fas fa-trash</v-icon>
                                </v-list-item>
                            </v-list>
                            <div v-else><h3>Список групп пуст!</h3></div>
                        </v-tab-item>
                    </v-tabs>
                </v-card>
            </v-app>

            <v-snackbar
                    v-model="snackbar"
                    color="00B0F0"
                    :right="true"
                    :top="true"
            >
                {{snackbarText}}
                <v-btn
                        dark
                        text
                        @click="snackbar = false"
                >
                    Close
                </v-btn>
            </v-snackbar>
        </div>
    </v-app>
</template>

<script>
    import PostService from "../../../services/products";
    import GroupsService from "../../../services/groups";
    import Images from "./elements/Images";
    import ProductImagesService from "../../../services/productImages";
    import GroupImagesService from "../../../services/groupImages";

    export default {
        name: 'AdminPanelCatalog',
        components: {
            Images
        },
        data: () => ({
            searchCode: '',
            copyProducts: [],
            products: [],
            isModalAddGroup: false,
            groups: [],
            snackbar: false,
            newGroupName: '',
            newGroupDescription: '',
            snackbarText: '',
            modeDialog: 'add',
            tempIDGroup: '',
            uploadImageData: {
                displayFileName: null,
                uploadFileData: null,
                file: null
            },
            images: []
        }),
        watch: {
            searchCode(value) {
                this.products = this.copyProducts.filter((product) => {
                    return product.code.indexOf(value) >= 0
                })
            }
        },
        methods: {
            deleteProduct(id) {
                PostService.deleteProducts(id);
                this.products.splice(this.products.findIndex((product) => {
                    return product.id === id
                }), 1);
                this.snackbarText = "Товар был удален";
                this.snackbar = true;
                setTimeout(() => {
                    this.snackbar = false;
                }, 5000)
            },
            createNewGroup() {
                GroupsService.insertGroups({
                    name: this.newGroupName,
                    description: this.newGroupDescription
                }).then(() => {
                    this.newGroupName = '';
                    this.newGroupDescription = '';
                    this.images = [];
                    this.isModalAddGroup = false;
                    setTimeout(() => {
                        this.getGroups();
                    }, 2000);
                })
            },
            deleteGroup(id) {
                GroupsService.deleteGroups(id).then(() => {
                    this.groups.splice(this.groups.findIndex((group) => {
                        return group.id === id
                    }), 1)
                }).then(() => {
                    this.snackbarText = "Группа была удалена";
                    this.snackbar = true;
                    setTimeout(() => {
                        this.snackbar = false;
                    }, 5000)
                })
            },
            sortProducts(a, b) {
                if (Number(a.numberProduct) < Number(b.numberProduct)) {
                    return -1;
                }
                if (Number(a.numberProduct) > Number(b.numberProduct)) {
                    return 1;
                }
                return 0;
            },
            getProducts() {
                PostService.getProducts().then(async (products) => {
                    let copyProducts = [...products.data];
                    copyProducts.sort(this.sortProducts);
                    let tempProduct = [];
                    copyProducts.forEach((product) => {
                        ProductImagesService.getProductImages(product.id).then((images) => {
                            let productCopy = {...product};
                            if (images.data.length > 0) {
                                productCopy.image = images.data[0].pathImage;
                            } else {
                                productCopy.image = '';
                            }
                            tempProduct.push(productCopy)
                            tempProduct.sort(this.sortProducts)
                        });
                    })
                    this.products = tempProduct;
                    this.copyProducts = tempProduct;
                })
            },
            getGroups() {
                GroupsService.getGroups().then((groups) => {
                    this.groups = groups.data;
                })
            },
            openDialog(id) {
                this.modeDialog = 'edit';
                const index = this.groups.findIndex((group) => {
                    return group.id === id
                });
                this.newGroupName = this.groups[index].name;
                this.newGroupDescription = this.groups[index].description;
                this.tempIDGroup = this.groups[index].id;
                GroupImagesService.getGroupImages(this.tempIDGroup).then(({data}) => {
                    data.forEach((image) => {
                        this.images.push({
                            pathImage: image.pathImage,
                            id: image.id
                        })
                    })
                });
                this.isModalAddGroup = true;
            },
            editGroup() {
                GroupsService.updateGroups(this.tempIDGroup, {
                    name: this.newGroupName,
                    description: this.newGroupDescription,
                }).then(() => {
                    this.newGroupName = '';
                    this.newGroupDescription = '';
                    this.tempIDGroup = '';
                    this.images = [];
                    this.isModalAddGroup = false;
                }).then(() => {
                    this.getGroups();
                })
            },
            cancelCreateOrEditGroup() {
                this.newGroupName = '';
                this.newGroupDescription = '';
                this.tempIDGroup = '';
                this.isModalAddGroup = false;
                this.images = []
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
                        if (this.tempIDGroup) {
                            GroupImagesService.insertImagesGroup({
                                groupId: this.tempIDGroup,
                                pathImage: e.target.result
                            }).then(() => {
                                this.snackbarText = "Изоражение добавлено!";
                                this.snackbar = true;
                            })
                        }
                    };
                    reader.readAsDataURL(file);
                }
            },
            calcSize(size) {
                const sizeOneMByte = 1024;
                return Math.round(size / sizeOneMByte);
            },
            pathImage() {
                return '../../../assets/no-product.jpg'
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
                console.log(id)
                GroupImagesService.deleteGroupImage(id)
                this.images = this.images.filter((image) => {
                    return !(image.id === id)
                })
            }
        },
        created() {
            this.getProducts();
            this.getGroups();
        }
    }
</script>

<style scoped>
    .admin-panel-catalog {
        background-color: lightgray;
        height: 100vh;
    }
</style>