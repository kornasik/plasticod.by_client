<template>
    <div class="reset-password">
        <div class="reset-password__wrapper">
            <h2>ВОССТАНОВЛЕНИЕ ПАРОЛЯ</h2>
            <v-text-field
                    v-model="password"
                    label="Новый пароль"
                    type="password"
                    :outlined="true"
                    :error-messages="error ? errorMessage : false"
                    :persistent-hint="true"
                    :clearable="true"
            ></v-text-field>
            <v-text-field
                    v-model="confirmPassword"
                    label="Подтверждение пароля"
                    type="password"
                    :outlined="true"
                    :error-messages="error ? errorMessage : false"
                    :persistent-hint="true"
                    :clearable="true"
            ></v-text-field>
            <button class="button" @click="resetPassword">Подтвердить</button>
        </div>
        <v-snackbar
                v-model="snackbar"
                color="success"
                :right="true"
                :top="true"
        >
            Пароль успешно восстановлен!
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
    import UserService from "../../services/user";

    export default {
        name: 'ForgotPassword',
        data: () => ({
            password: '',
            confirmPassword: '',
            token: '',
            snackbar: false,
            error: false,
            errorMessage: 'Пароли не совпадают!'
        }),
        created() {
            this.token = this.$router.history.current.params.token;
        },
        methods: {
            resetPassword() {
                if (this.password === this.confirmPassword) {
                    UserService.updateUser(this.token, {password: this.password});
                    this.snackbar = true;
                    setTimeout(() => {
                        this.$router.push('/login');
                    }, 1500)
                } else {
                    this.error = true
                }
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