<template>
    <div class="header">
        <div class="header__authorization-basket">
            <div v-if="!$store.state.User.login" :style="{width: 'fit-content',marginLeft: 'auto'}">
                <div style="display: flex">
                    <a class="header__authorization-basket__basket button" href="/basket">
                        <v-icon color="black" left small>mdi-basket</v-icon>
                        Корзина
                    </a>
                    <button class="header__authorization-basket__authorization button" @click="openSubButton">
                        Вход/Регистрация
                    </button>
                </div>
                <div style="display: flex" class="header__wrapper-for-login-registration" v-if="isLoginView">
                    <a class="header__wrapper-for-login-registration__login button" @click="transitionOnPageLogin" href="/login">
                        Войти
                    </a>
                    <a class="header__wrapper-for-login-registration__registration button" href="/registration"
                            @click="()=>{
                                this.isLoginView = false;
                            }">Регистрация
                    </a>
                </div>
            </div>

            <div v-else :style="{width: 'fit-content',marginLeft: 'auto', display: 'flex'}">
                <a class="header__authorization-basket__basket button" href="/basket">
                    <v-icon color="black" left small>mdi-basket</v-icon>
                    Корзина
                </a>
                <button class="header__authorization-basket__authorization button" @click="openDropdown">
                    Мой профиль
                </button>
                <div v-if="isDropdown"
                     :style="{position: 'absolute', right: 0, backgroundColor: 'white', width: '179px',marginTop: '32px', zIndex: 999}">
                    <div class="dropdown-item">{{$store.state.User.dataUser.nameCompany}}</div>
                    <a class="dropdown-item" href="/profile" @click="()=>{
                        this.isDropdown = false
                    }">Личный кабинет</a>
                <a class="dropdown-item" href="/profile/orders" @click="()=>{
                        this.isDropdown = false
                    }">Заказы
                </a>
                <a class="dropdown-item" href="/profile/information-support" @click="()=>{
                        this.isDropdown = false
                    }">Информ.поддержка
                </a>
                <div class="dropdown-item" @click="logout">Выйти</div>
            </div>
        </div>

    </div>
    <div class="header__contacts">
        <div class="header__contacts__left-part">
            <h1 :style="{width: '630px'}">Пластиковые органайзеры с выдвижными ячейками</h1>
            <h3>оптовые продажи {{$store.state.General.numberPhone}}; info@plasticod.by</h3>
        </div>
        <div class="header__contacts__right-part">
            <div class="header__contacts__right-part__logo" @click="$router.push('/')">
                PLASTIC<br>Organizers<br>with<br>Drawers
            </div>
        </div>
    </div>
    <div v-if="currentRoute === 'about'" class="header__slider">
        <v-carousel
                cycle
                height="400"
                width="fit-content"
                hide-delimiter-background
                show-arrows-on-hover
        >
            <v-carousel-item
                    v-for="(image, i) in this.$store.state.General.images"
                    :key="i"
            >
                <img class="carousel-img" :src="image" :alt="`slide-${i}`">
            </v-carousel-item>
        </v-carousel>
    </div>
    <div class="header__menu">
        <a
                class="button btn-menu"
                :class="[currentRoute === item.id ? 'active' : '']"
                v-for="item in menu"
                :key="item.label"
                :href="item.link"
                @click="transitionOnRoute(item.id)"
        >
            <div style="margin: auto 0; height: fit-content">{{item.label}}</div>
        </a>
    </div>
    </div>
</template>

<script>
    export default {
        name: 'Header',
        data: () => ({
            colors: [
                'indigo',
                'warning',
                'pink darken-2',
                'red lighten-1',
                'deep-purple accent-4',
            ],
            slides: [
                'First',
                'Second',
                'Third',
                'Fourth',
                'Fifth',
            ],
            menu: [
                {label: 'Каталог', link: '/catalog', id: 'catalog'},
                {label: 'О нас', link: '/about', id: 'about'},
                {label: 'Примеры использования', link: '/examples-using', id: 'examples-using'},
                {label: 'Условия доставки и оплаты', link: '/shipping-payment', id: 'shipping-payment'},
                {label: 'Новости', link: '/news', id: 'news'},
                {label: 'Купить в розницу', link: '/buy-retail', id: 'buy-retail'},
                {label: 'Контакты', link: '/contacts', id: 'contacts'}
            ],
            currentRoute: '',
            isLoginView: false,
            isDropdown: false
        }),
        methods: {
            transitionOnRoute(id) {
                this.$store.commit('setCurrentRoute', id);
                this.currentRoute = id;
            },
            openSubButton() {
                this.isLoginView = !this.isLoginView;
            },
            transitionOnPageLogin() {
                this.isLoginView = false;
            },
            openDropdown() {
                this.isDropdown = !this.isDropdown
            },
            logout() {
                localStorage.removeItem('token');
                this.$store.commit('setDataUser', {});
                this.$store.commit('setLogin', false);
                this.$store.commit('setToken', '');
                this.isDropdown = false;
                this.$router.push('/')
                localStorage.removeItem('basket');
            }
        },
        created() {
            this.currentRoute = this.$router.history.current.name;
            document.body.addEventListener('click', (event) => {
                if (event.target.className !== 'header__authorization-basket__authorization button') {
                    this.isDropdown = false;
                }
            })
        }
    }
</script>

<style scoped>
    .header__authorization-basket {
        margin-left: auto;
        border-bottom: 1px solid #000080;
        border-right: 1px solid black;
        display: flex;
    }

    .header__authorization-basket a {
        color: black;
    }

    .button {
        padding: 3px 10px;
        background-color: #00B0F0;
        border-left: 1px solid black;
        border-top: 1px solid black;
        margin-left: auto;
        width: 180px;
    }

    .btn-menu{
        color: white;
        display: flex;
        justify-content: center;
    }

    .button:hover {
        background-color: #305496;
    }

    .header__contacts {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-left: 1px solid #000080;
        border-right: 1px solid #000080;
        height: 200px
    }

    .header__contacts__left-part {
        width: fit-content;
        padding: 0 20px;
    }

    .header__contacts__left-part h1 {
        line-height: 60px;
        font-size: 47px;
        color: #0070C0;
        position: relative;
        top: -3px;
    }

    .header__contacts__left-part h3 {
        font-size: 22px;
        color: #00B0F0;
        position: relative;
        top: 5px;
    }

    .header__contacts__right-part {
        padding: 0 30px;
    }

    .header__contacts__right-part__logo {
        text-align: center;
        font-size: 30px;
        font-weight: bold;
        color: #036BCF;
        line-height: 30px;
        padding: 4px;
        border: 5px solid #036BCF;
    }

    .header__menu {
        display: flex;
        color: white;
        font-size: 15px;
        border-bottom: 1px solid black;
        border-left: 1px solid black;
        border-right: 1px solid black;
    }

    .header__menu .button:first-child {
        border-left: none;
    }

    .header__menu .button:last-child {
        border-right: 1px solid #00B0F0;
    }

    .active {
        background-color: #305496;
    }

    .header__slider {
        border-top: 1px solid #000080;
        border-left: 1px solid #000080;
        border-right: 1px solid #000080;
    }

    .dropdown-item {
        display: block;
        background-color: #0070C0;
        color: white!important;
        text-align: center;
        padding: 7px;
        font-size: 13px;
        border: 1px solid white;
        cursor: pointer;
    }

    .dropdown-item:first-child {
        cursor: default;

    }

    .dropdown-item:hover {
        background-color: #00B0F0;
    }

    .dropdown-item:first-child:hover {
        background-color: #0070C0;
    }

    .carousel-img {
        height: 100%;
        margin: 0 auto;
        display: block;
    }

    a{
        display: block;
        text-decoration: none;
        text-align: center;
        color: black;
    }
</style>