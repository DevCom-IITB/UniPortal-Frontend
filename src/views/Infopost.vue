<template>
    <div class="container">
      
      <div class="Header"><Header :headerName="headerName" :headerText="headerText" :background="background" :color="color"/></div>
      <div class="Lister">
        <!-- <InfoBox :infoPosts="infoposts" /> -->
        <div :key="infopost.id" v-for="infopost in infoposts" class="InfoPostBox">
          <InfoBox :infopost="infopost"/>
        </div>
      </div>
      
      <!-- <InfoBox />
      <router-view></router-view> --> 
    </div>
  </template>
  
  <script>
  import Header from '../components/common/Header.vue'
  import InfoBox from '../components/common/InfoBox.vue'

export default {
  name: 'Infopost',
  data() {
    return {
      headerName : 'Infopost',
      headerText : 'Infoposts from SMPCs',
      infoposts: [],
      background: '#FFF9E5',
      color : '#CCB160'
    }
  },
  components: {
    Header,
    InfoBox,
  },
  methods:{
    async fetchInfoPosts() {
      const res = await fetch('api/infoposts')
      const data = await res.json()
      console.log(data)
      return data
    },
  },
  async mounted() {
    this.infoposts = await this.fetchInfoPosts()
    console.log(this.infoposts);
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
    width: 84.98%;
  }

  .Lister{
    height: 64.04%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content:start;
    overflow-y: scroll;
    overflow-x: hidden;
  }

 /* width */
.Lister::-webkit-scrollbar {
  width: 8px;
}

/* Track */
 
/* Handle */
.Lister::-webkit-scrollbar-thumb {
  background: #CCB160; 
  border-radius: 10px;
}

/* Handle on hover */
.Lister::-webkit-scrollbar-thumb:hover {
  background: #52492E; 
}

  .InfoPostBox{
    height: fit-content;
    width: 84.98%;
    margin-top: 16px;
    margin-bottom: 16px;
    color: black;
    /* border: 5px solid red; */
  }

  </style>