<template>
    <div class="privacy-policy">
        <div class="privacy-policy__title">
            Политика конфиденциальности
        </div>
        <div style="word-wrap: break-word;white-space: break-spaces">{{privacy}}</div>
    </div>
</template>

<script>
    import PrivacyPolicyService from "../../services/privacy-policy";

    export default {
        data: ()=> ({
            privacy: '',
            id: 0
        }),
        created() {
            PrivacyPolicyService.getPrivacy().then(({data}) => {
                this.privacy = data[0].text;
                this.id = data[0].id;
            })
        }
    }

</script>

<style scoped>
    .privacy-policy__title {
        color: white;
        font-size: 18px;
        font-weight: bold;
        text-align: center;
        background-color: #305496;
    }
</style>