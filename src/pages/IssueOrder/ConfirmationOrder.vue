<template>
    <div class="confirmation-order">
        На основании деталей Вашего заказа в ближайшее время будут выставлены платёжные документы с указанием банковских
        реквизитов для оплаты.<br><br>
        Ваши персональные данные будут использоваться для обработки ваших заказов, упрощения вашей работы с сайтом и для
        других целей, описанных в нашей политика конфиденциальности.<br><br>
        <div :style="{display: 'flex'}">
            <v-checkbox
                    v-model="checkbox"
                    value="1"
                    type="checkbox"
                    :error="error.checkbox"
                    :style="{width: 'fit-content'}"
                    required
            ></v-checkbox>
            <div :style="{display: 'flex', flexDirection: 'column', justifyContent: 'center'}">
                <a href="/privacy-policy">Я прочитал (-а) и соглашаюсь с политикой конфиденциальности</a>
            </div>
        </div>

        <Button :text-button="'Подтвердить заказ'" :width="'210px'" @click="sendOrder"/>
    </div>
</template>

<script>
    import Button from "../../shared/elements/Button";

    export default {
        name: 'ConfirmationOrder',
        components: {
            Button
        },
        data: () => ({
            checkbox: false,
            error: {
                checkbox: false
            }
        }),
        methods: {
            sendOrder() {
                if (this.checkbox) {
                    this.error.checkbox = false;
                    this.$emit('emitSendOrder')
                } else {
                    this.error.checkbox = true;
                }
            }
        }
    }
</script>

<style scoped>
    .confirmation-order {
        padding: 30px;
    }
</style>