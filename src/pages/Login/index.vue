<template>
    <div class="login">
        <div class="login-wrapper">
            <h2>Войти</h2>
            <v-text-field
                    v-model="email"
                    label="E-mail"
                    :outlined="true"
                    :persistent-hint="true"
                    :clearable="true"
                    :error="errors.auth"
                    @keydown.enter="login"
            ></v-text-field>
            <v-text-field
                    v-model="password"
                    :error="errors.auth"
                    :messages="errors.auth ? 'Неправильный email или пароль' : ''"
                    label="Пароль"
                    :outlined="true"
                    :persistent-hint="true"
                    :clearable="true"
                    type="password"
                    @keydown.enter="login"
            ></v-text-field>
            <a class="remember-password" @click="$router.push('/reset-password')">Забыли пароль?</a>
            <button class="button" @click="login">Войти</button>
        </div>
        <v-snackbar v-model="snackbar" color="red" :right="true" :top="true">
            E-mail или пароль введены не верно!
            <v-btn text color="success" @click="snackbar = false">Закрыть</v-btn>
        </v-snackbar>
    </div>
</template>

<script>
    import UserService from "../../services/user";

    export default {
        name: "Login",
        props: {
            url: {
                type: String,
                default: "profile"
            }
        },
        data: () => ({
            email: "",
            password: "",
            snackbar: false,
            errors: {
                auth: false
            }
        }),
        methods: {
            login() {
                UserService.getUser(this.email, this.password).then(
                    ({data, status}) => {
                        this.errors.auth = false;
                        if (status === 200) {
                            localStorage.setItem("token", data.token);
                            this.$store.commit("setLogin", true);
                            this.$store.commit("setDataUser", data);
                            this.$store.commit("setToken", data.token);
                            if (localStorage.getItem("basket")) {
                                UserService.updateUser(data.token, {
                                    basket: localStorage.getItem("basket")
                                });
                            } else {
                                if (data.basket.length > 0) {
                                    localStorage.setItem("basket", data.basket);
                                } else {
                                    localStorage.setItem("basket", JSON.stringify([]));
                                }
                            }
                            this.$router.push(this.url);
                            this.$emit("emitLogin");
                        }
                    }
                );
                setTimeout(() => {
                    this.errors.auth = true;
                }, 1500);
            }
        }
    };
</script>

<style scoped>
    .login {
        position: relative;
        width: 100%;
    }

    .login-wrapper {
        width: 450px;
        margin: auto;
        position: relative;
        padding-top: 80px;
    }

    .remember-password {
        position: absolute;
        right: 0;
        top: 180px;
    }

    .button {
        padding: 10px;
        background-color: #00b0f0;
        margin: 10px 10px 10px 0;
        width: 180px;
        color: white;
    }
</style>