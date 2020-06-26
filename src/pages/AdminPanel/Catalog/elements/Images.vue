<template>
    <div :class="{'d-flex': flex}" :style="{padding: '10px', flexWrap: 'wrap'}">
        <div v-for="(image, imageIndex) in images" :key="image.pathImage"
             :style="{position: 'relative', width: 'fit-content', padding: '15px'}">
            <img :style="{maxWidth: '300px'}" :src="image.pathImage" alt="Image">
            <v-icon size="is-small" :style="{position: 'absolute', top: '-10px', right: '-5px'}"
                    @click="deleteImage(image.id ? image.id : imageIndex)">fas fa-times
            </v-icon>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            images: {
                type: Array
            },
            flex: {
                type: Boolean
            }
        },
        name: 'Images',
        methods: {
            deleteImage(id) {
                this.$emit('emitDeleteImage', {
                    id
                })
            }
        }
    }

</script>

<style scoped>

</style>