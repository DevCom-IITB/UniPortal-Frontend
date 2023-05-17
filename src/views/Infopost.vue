<template>
    <div class="container">
      
      <Header :headerName="headerName" />
      <div v-for="id in ids" :key="id"><InfopostBox :id="id" /></div>
      <router-view></router-view>
    </div>
  </template>
  
  <script>
  import Header from '../components/common/Header.vue'
  import InfopostBox from '../components/common/infopostBox.vue';
  
export default {
  name: 'Infopost',
  data() {
    return {
      headerName : 'Infopost',
      infoposts: null
    }
  },
  components: {
    InfopostBox,
    Header
  },
  methods:{
    async created() {
      const response = await fetch("http://localhost:5000/infoposts")
      const data = await response.json()
      console.log(data)
      this.infoposts = data
    },
    computed: {
      ids() {
        return this.infoposts ? this.infoposts.map(i => i.id) : []
      }
    }
  }
}
// fdfdfdf
  </script>
  
  <style>
  </style>