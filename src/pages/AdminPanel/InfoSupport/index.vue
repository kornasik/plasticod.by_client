<template>
  <v-app>
    <div class="admin-panel-info-support">
      <v-app id="inspire">
        <v-card>
          <v-toolbar color="#00B0F0" dark>
            <v-toolbar-title>Информационная поддержка</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
        </v-card>
        <div class="main">
          <v-file-input chips show-size label="File input" @change="uploadFile" />
          <v-btn medium color="primary">Загрузить</v-btn>
        </div>
        <v-snackbar v-model="snackbar" color="green" :right="true" :top="true">
          Данные сохранены
          <v-btn dark text @click="snackbar = false">Close</v-btn>
        </v-snackbar>
      </v-app>
    </div>
  </v-app>
</template>

<script>
export default {
  name: "About",
  data: () => ({
    snackbar: false,
    existAbout: false,
    file: ""
  }),
  created() {
    this.initPrivacy();
  },
  methods: {
    init() {},
    uploadFile(event) {
      console.log(event);
    }
  }
};
</script>

<style scoped>
.main {
  margin: 30px;
  display: flex;
}

.main__phone {
  width: 400px;
}
</style>