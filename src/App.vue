<template>
  <div id="app">
    <edit-modal></edit-modal>
    <div class="directives">
      <!-- put the most outer layer of directives -->
      <directive-folder :data="item" v-for="item in directive" :key="item.id"></directive-folder>
    </div>
  </div>
</template>

<script>
import EditModal from './components/editModal.vue';
export default {
    name: "App",
    computed: {
        directive() {
            return this.$store.getters.getDirective;
        }
    },
    components: { EditModal }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.directives {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
