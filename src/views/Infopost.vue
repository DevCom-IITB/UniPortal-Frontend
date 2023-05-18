<template>
    <div class="container">
      
      <div class="Header"><Header :headerName="headerName" :headerText="headerText" /></div>
      <div class="Lister"></div>
      <!-- <div v-for="id in ids" :key="id"><InfopostBox :id="id" /></div>
      <InfoBox />
      <router-view></router-view> -->
    </div>
  </template>
  
  <script>
  import Header from '../components/common/Header.vue'
  import InfopostBox from '../components/common/infopostBox.vue';
  import InfoBox from '../components/common/InfoBox.vue';

export default {
  name: 'Infopost',
  data() {
    return {
      headerName : 'Infopost',
      headerText : 'A design system isn’t only a collection of the assets and components you use to build a digital product. According to Emmet Connolly, director of product design at Intercom, “… most Design Systems are really just Pattern Libraries: a big box of UI Lego pieces that can be assembled in near-infinite ways. All the pieces may ',
      infoposts: null
    }
  },
  components: {
    InfopostBox,
    Header,
    InfoBox
  },
  methods:{
    async created() {
      const response = await fetch('http://localhost:3000/infoposts')
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
  </script>
  
  <style scoped>

  .container{
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .Header{
    height: 35.96%;
    width: 100%;
  }

  .Lister{
    height: 64.04%;
    width: 100%;
    border: 5px solid green;
  }

  </style>