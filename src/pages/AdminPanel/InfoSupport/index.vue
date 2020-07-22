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
          <v-file-input v-model="file" chips show-size label="Загрузите файл" />
          <v-btn
            :style="{margin: '10px 0 10px 30px'}"
            medium
            color="primary"
            @click="uploadFile"
          >Загрузить</v-btn>
        </div>
        <div
          v-for="{file, name, id} in files"
          :key="name"
          :style="{display: 'flex',marginTop: '20px'}"
        >
          <a :style="{margin: 'auto 0'}" :href="file" :download="name">{{name}}</a>
          <iframe height="200px" :src="file" :style="{marginLeft: 'auto'}" />
          <v-btn
            :style="{margin: 'auto 0 auto 30px', color: 'white'}"
            small
            color="red"
            @click="deleteFile(id)"
          >
            <v-icon left small>fas fa-trash</v-icon>Удалить
          </v-btn>
        </div>
        <v-snackbar v-model="snackbar" color="green" :right="true" :top="true">
          {{pushText}}
          <v-btn dark text @click="snackbar = false">Close</v-btn>
        </v-snackbar>
      </v-app>
    </div>
  </v-app>
</template>

<script>
import InfoSupport from "../../../services/info-support";
export default {
  name: "About",
  data: () => ({
    snackbar: false,
    existAbout: false,
    file: "",
    pushText: "Файл добавлен в базу!",
    uploadImageData: {
      displayFileName: null,
      uploadFileData: null,
      file: null
    },
    files: []
  }),
  created() {
    this.init();
  },
  methods: {
    init() {
      InfoSupport.getAllFiles().then(({ data }) => {
        this.files = data;
      });
    },
    uploadFile() {
      if (this.file) {
        this.uploadImageData.file = this.file;
        this.uploadImageData.displayFileName = this.file.name;
        let reader = new FileReader();
        reader.onload = e => {
          this.uploadImageData.uploadFileData = e.target.result;
          InfoSupport.addFile(this.file.name, e.target.result);
          this.init();
        };
        reader.readAsDataURL(this.file);
        this.pushText = "Документ загружен!";
        this.snackbar = true;
        setTimeout(() => {
          this.init();
        }, 1500);
      }
    },
    deleteFile(id) {
      InfoSupport.deleteFile(id);
      const index = this.files.indexOf(file => {
        return file.id === id;
      });
      this.files.splice(index, 1);
      this.pushText = "Файл удалён из базы";
      this.snackbar = true;
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