<template>
    <div class="group-sidebar">
        <a
                class="button"
                v-for="group in groups"
                :class="[group.name.split(' ').join('').toLowerCase() === currentGroup ? 'active' : '']"
                :key="group.id"
                :href="`/catalog/${group.name.split(' ').join('').toLowerCase()}`"
                @click="transitionLink(group.name)"
        >
            {{group.name}}
        </a>
    </div>
</template>

<script>
    import GroupsService from "../../../services/groups";

    export default {
        name: 'Sidebar',
        props: {
          currentGroup: {
              type: String,
              default: 'Группа 1'
          }
        },
        data: () => ({
            groups: [],
            currentGroup: ''
        }),
        created() {
            GroupsService.getGroups().then(({data}) => {
                this.groups = data;
            });

            this.$store.commit('setCurrentGroup', this.currentGroup.toLowerCase());
            this.currentGroup = this.currentGroup.toLowerCase();
        },
        methods: {
            transitionLink(nameGroup) {
                this.$store.commit('setCurrentGroup', nameGroup);
                this.currentGroup = nameGroup.split(' ').join('').toLowerCase();
            }
        }
    }
</script>

<style scoped>
    .button {
        padding: 10px;
        background-color: #00B0F0;
        margin: 10px 20px;
        width: 180px;
        color: white;
        text-decoration: none;
        text-align: center;
    }

    .button:hover {
        background-color: #305496;
    }

    .group {
        display: flex;
    }

    .group-sidebar {
        display: flex;
        flex-direction: column;
    }

    .active {
        background-color: #305496;
    }
</style>