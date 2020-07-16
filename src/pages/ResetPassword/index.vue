<template>
    <div class="reset-password">
        <div class="reset-password__wrapper">
            <h2>ВОССТАНОВИТЬ ПАРОЛЬ</h2>
            <v-text-field
                    v-model="email"
                    label="E-mail"
                    :error-messages="error ? errorMessage : false"
                    :outlined="true"
                    :persistent-hint="true"
                    :clearable="true"
            ></v-text-field>
            <button class="button" @click="resetPassword">Сбросить пароль</button>
        </div>
        <v-snackbar
                v-model="snackbar"
                color="success"
                :right="true"
                :top="true"
        >
            Сообщение отправлено на почту!
            <v-btn
                    text
                    color="success"
                    @click="snackbar = false"
            >
                Закрыть
            </v-btn>
        </v-snackbar>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: 'ResetPassword',
        data: () => ({
            email: '',
            snackbar: false,
            error: false,
            errorMessage: 'Пользователя с такой почтой не существует.'
        }),
        methods: {
            resetPassword() {
                axios.post('http://plasticod.by/api/post-mail/forgot-password', {
                    email: this.email
                }, {
                    headers: {
                        "Access-Control-Allow-Origin": '*',
                        "Access-Control-Allow-Methods": '*',
                        "Access-Control-Allow-Headers": 'Origin, X-Requested-With, Content-Type, Accept'
                    }
                }).then(async ({data: {exist}}) => {
                    if (exist) {
                        this.error = false;
                        this.snackbar = true;
                        setTimeout(() => {
                            this.$router.push('/')
                        }, 2000)
                    } else {
                        this.error = true;
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .reset-password {
        padding: 30px;
        width: 100%;
    }

    .reset-password__wrapper {
        width: 400px;
    }

    .button {
        padding: 10px;
        background-color: #00B0F0;
        margin: 10px 10px 10px 0;
        width: 180px;
        color: white;
    }
</style>