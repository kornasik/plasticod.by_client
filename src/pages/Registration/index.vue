<template>
  <div>
    <v-expansion-panels v-model="isOpen" accordion light>
      <v-expansion-panel v-model="isOpen">
        <v-expansion-panel-header color="#0070C0">
          <span :style="{color: 'white', textAlign: 'center'}">Регистрация постоянного клиента</span>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-app>
            <v-text-field
              v-model="valueFields.email"
              label="E-mail *"
              :rules="[rules.required, rules.email]"
              :error="errors.email"
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="Пароль *"
              :type="'password'"
              :rules="[rules.required]"
              :error="errors.password"
            ></v-text-field>
            <v-text-field
              v-model="confirmPassword"
              :type="'password'"
              label="Подтверждение пароля *"
              :rules="[rules.required]"
              :error="errors.confirmPassword"
            ></v-text-field>
            <v-text-field
              v-model="valueFields.nameCompany"
              label="Наименование организации, ИП *"
              :rules="[rules.required]"
              :error="errors.nameCompany"
            ></v-text-field>
            <v-text-field
              v-model="valueFields.legalAddress"
              label="Юридический адрес *"
              :rules="[rules.required]"
              :error="errors.legalAddress"
            ></v-text-field>
            <v-text-field
              v-model="valueFields.postAddress"
              label="Почтовый адрес *"
              :rules="[rules.required]"
              :error="errors.postAddress"
            ></v-text-field>
            <v-text-field
              v-model="valueFields.postCode"
              label="Почтовый индекс*"
              :rules="[rules.required]"
              :error="errors.postCode"
            ></v-text-field>
            <v-text-field
              v-model="valueFields.unp"
              label="УНП(№ свидетельства) *"
              :rules="[rules.required]"
              :error="errors.unp"
            ></v-text-field>
            <v-menu
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="100px"
              locale="ru"
            >
              <template v-slot:activator="{ on }">
                <v-text-field v-model="date" label="Дата выдачи" readonly v-on="on"></v-text-field>
              </template>
              <v-date-picker v-model="date" @input="menu2 = false" locale="ru"></v-date-picker>
            </v-menu>
            <v-text-field v-model="valueFields.whoIssued" label="Кем выдано"></v-text-field>
            <v-text-field v-model="valueFields.paymentAccount" label="Расчётный счёт"></v-text-field>
            <v-text-field v-model="valueFields.nameBank" label="Наименование банка"></v-text-field>
            <v-text-field v-model="valueFields.codeBank" label="Код банка"></v-text-field>
            <v-text-field v-model="valueFields.addressBank" label="Адрес банка"></v-text-field>
            <v-text-field
              v-model="valueFields.fullName"
              label="Ф.И.О. контактного лица *"
              :rules="[rules.required]"
              :error="errors.fio"
            ></v-text-field>
            <v-text-field
              v-model="valueFields.phoneNumber"
              label="Телефон (Пример: 291111111) *"
              prefix="+375"
              :rules="[rules.phone]"
              type="tel"
              :error="errors.phoneNumber"
            ></v-text-field>
          </v-app>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header color="#0070C0">
          <span :style="{color: 'white',textAlign : 'center'}">Адрес доставки</span>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-col class="d-flex flex-column" cols="12" sm="6">
            <v-select :items="countrys" v-model="address.country" filled label="Страна"></v-select>
            <v-text-field v-model="address.region" label="Область/район" required></v-text-field>
            <v-text-field v-model="address.city" label="Город" required></v-text-field>
            <v-text-field v-model="address.street" label="Улица" required></v-text-field>
            <v-text-field v-model="address.home" label="Дом" required></v-text-field>
            <v-text-field v-model="address.body" label="Корпус" required></v-text-field>
            <v-text-field v-model="address.apartment" label="Офис, помещение, квартира:" required></v-text-field>
            <v-textarea outlined name="input-7-4" label="Комментарий" :v-model="address.comment"></v-textarea>
          </v-col>

          <div :style="{margin: '-20px 0 0 20px'}">
            Ваши персональные данные будут использоваться для обработки ваших заказов, упрощения вашей
            работы с сайтом
            и для других целей, описанных в нашей политика конфиденциальности
          </div>
          <div :style="{display: 'flex'}">
            <v-checkbox
              :style="{margin: '16px 0 0 20px'}"
              v-model="iAgree"
              required
              :error="errors.iAgree"
            ></v-checkbox>
            <div :style="{display: 'flex', flexDirection: 'column', justifyContent: 'center'}">
              <a href="/privacy-policy">Я прочитал (-а) и соглашаюсь с политикой конфиденциальности</a>
            </div>
          </div>

          <div class="button" @click="registrationUser">Регистрация</div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import UserService from "../../services/user";
import axios from "axios";

export default {
  name: "Registration",
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    email: "",
    iAgree: false,
    password: "",
    confirmPassword: "",
    menu: false,
    modal: false,
    menu2: false,
    isOpen: 0,
    valueFields: {
      nameCompany: "",
      legalAddress: "",
      postAddress: "",
      postCode: "",
      email: "",
      unp: "",
      whoIssued: "",
      paymentAccount: "",
      nameBank: "",
      codeBank: "",
      addressBank: "",
      fullName: "",
      phoneNumber: ""
    },
    countrys: ["Беларусь"],
    address: {
      country: "Беларусь",
      region: "",
      city: "",
      street: "",
      home: "",
      body: "",
      apartment: "",
      comment: ""
    },
    rules: {
      required: value => !!value || "Required.",
      phone: value => value.length > 8 || "Слишком короткий телефон",
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      }
    },
    errors: {
      email: false,
      password: false,
      confirmPassword: false,
      nameCompany: false,
      legalAddress: false,
      postAddress: false,
      postCode: false,
      unp: false,
      fio: false,
      phoneNumber: false,
      iAgree: false
    }
  }),
  methods: {
    registrationUser() {
      if (
        this.valueFields.email &&
        this.password &&
        this.confirmPassword &&
        this.valueFields.nameCompany &&
        this.valueFields.legalAddress &&
        this.valueFields.postCode &&
        this.valueFields.postAddress &&
        this.valueFields.unp &&
        this.valueFields.fullName &&
        this.valueFields.phoneNumber &&
        this.iAgree
      ) {
        if (this.confirmPassword === this.password) {
          this.errors.email = false;
          this.errors.password = false;
          this.errors.confirmPassword = false;
          this.errors.nameCompany = false;
          this.errors.legalAddress = false;
          this.errors.postAddress = false;
          this.errors.postCode = false;
          this.errors.unp = false;
          this.errors.fio = false;
          this.errors.phoneNumber = false;
          this.errors.iAgree = false;
          UserService.insertUser({
            ...this.valueFields,
            ...this.address,
            password: this.password,
            dateIssue: this.date
          });
          axios.post("http://plasticod.by/api/post-mail/new-client", {
            ...this.valueFields,
            ...this.address,
            dateIssue: this.date
          });
          axios.post("http://plasticod.by/api/post-mail/done-registration", {
            ...this.valueFields,
            ...this.address,
            password: this.password,
            dateIssue: this.date
          });
          this.$router.push("/login");
        } else {
          this.isOpen = 0;
          this.errors.password = true;
          this.errors.confirmPassword = true;
        }
      } else {
        this.isOpen = 0;
        this.errors.email = !this.valueFields.email;
        this.errors.password = !this.password;
        this.errors.confirmPassword = !this.confirmPassword;
        this.errors.nameCompany = !this.valueFields.nameCompany;
        this.errors.legalAddress = !this.valueFields.legalAddress;
        this.errors.postAddress = !this.valueFields.postAddress;
        this.errors.postCode = !this.valueFields.postCode;
        this.errors.unp = !this.valueFields.unp;
        this.errors.fio = !this.valueFields.fullName;
        this.errors.phoneNumber = !this.valueFields.phoneNumber;
        this.errors.iAgree = !this.iAgree;
      }
    }
  }
};
</script>

<style scoped>
.button {
  padding: 13px;
  margin: 20px;
  width: 250px;
  height: 50px;
  background-color: #00b0f0;
  color: white;
  text-align: center;
}

.button:hover {
  background-color: #006c9c;
}
</style>