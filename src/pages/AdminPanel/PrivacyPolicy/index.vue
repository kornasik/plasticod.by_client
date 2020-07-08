<template>
    <v-app>
        <div class="admin-panel-news">
            <v-app id="inspire">
                <v-card>
                    <v-toolbar color="#00B0F0" dark>
                        <v-toolbar-title>Политика конфиденциальности</v-toolbar-title>
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
                    <v-textarea
                            v-model="about"
                            :filled="true"
                            :solo="true"
                    ></v-textarea>
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
    import PrivacyPolicyService from "../../../services/privacy-policy";

    export default {
        name: 'About',
        data: () => ({
            id: '',
            about: '',
            snackbar: false,
            existAbout: false
        }),
        created() {
            this.initPrivacy();
        },
        methods: {
            saveGeneralSettings() {
                if (this.existAbout) {
                    PrivacyPolicyService.updatePrivacy({
                        text: this.about
                    });
                } else {
                    PrivacyPolicyService.insertPrivacy({
                        text: this.about
                    }).then(() => {
                        setTimeout(() => {
                            this.initPrivacy()
                        }, 2500)
                    })
                }

                this.snackbar = true;
            },
            initPrivacy() {
                PrivacyPolicyService.getPrivacy().then(({data}) => {
                    this.about = data[0].text;
                    this.id = data[0].id;
                    this.existAbout = true;
                }).catch(() => {
                    this.existAbout = false;
                    alert('Неполадки на сервере.')
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