<template>
  <div class="info-support">
    <h2>ИНФОРМАЦИОННАЯ ПОДДЕРЖКА</h2>
    <hr />
    <br />
    <h3 v-if="files.length === 0">В данном разделе нету материала!</h3>
    <div v-else :style="{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}">
      <div
        v-for="{file, name} in files"
        :key="name"
        :style="{display: 'flex', flexDirection: 'column', width: '150px', margin: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.2)', padding: '10px'}"
      >
        <img :style="{width: '100%'}" :src="fileImg" alt="file" />
        <a
          :style="{margin: 'auto 0', wordBreak: 'break-all', textAlign: 'center'}"
          :href="file"
          :download="name"
        >{{name}}</a>
      </div>
    </div>
  </div>
</template>

<script>
import InfoSupport from "../../services/info-support";
import fileImg from "../../assets/file.png";
export default {
  name: "infoSupport",
  data: () => ({
    files: [],
    fileImg: fileImg
  }),
  created() {
    this.init();
  },
  methods: {
    init() {
      InfoSupport.getAllFiles().then(({ data }) => {
        this.files = data;
      });
    }
  }
};
</script>

<style scoped>
.info-support {
  padding: 30px;
}
</style>