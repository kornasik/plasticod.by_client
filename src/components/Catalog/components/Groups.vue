<template>
    <div class="groups">
        <a class="groups__header" :href="`catalog/${group.name.split(' ').join('').toLowerCase()}`" @click="openGroup(group.name)">
            <div class="groups__header__title">{{group.name}}</div>
            <div class="groups__header__description">{{group.description}}</div>
        </a>
        <div class="groups-body">
            <img
                    v-for="(image, imageIndex) in images"
                    :key="`${group.id}${imageIndex}`"
                    :src="image.pathImage"
                    alt="image"
            />
        </div>
    </div>
</template>

<script>
    import GroupImagesService from "../../../services/groupImages";

    export default {
        name: 'Group',
        props: {
            group: Object
        },
        data: () => ({
            images: []
        }),
        methods: {
            openGroup(nameGroup) {
                this.$store.commit('setCurrentGroup', nameGroup);
            }
        },
        created() {
            GroupImagesService.getAllGroupsImages().then(({data}) => {
                this.images = data.filter((image) => {
                    return image.groupId === this.group.id
                });
            })
        }
    }
</script>

<style scoped>
    .groups__header {
        display: flex;
        align-items: center;
        background-color: #305496;
        color: white;
        border-bottom: 2px solid black;
        cursor: pointer;
        text-decoration: none;
    }

    .groups__header:hover {
        background-color: #0070C0;
    }

    .groups__header__title {
        margin: 20px;
        width: 10%;
        word-wrap: break-word;
        text-align: center;
    }

    .groups__header__description {
        width: 80%;
        padding: 10px;
    }

    .groups-body {
        display: flex;
        justify-content: space-evenly;
        flex-wrap: wrap;
    }

    .groups-body img {
        padding: 5px;
        height: 150px;
    }
</style>