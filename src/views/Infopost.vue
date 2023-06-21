<template>
    <div class="container">
      
      <div class="Header"><Header :headerName="headerName" :headerText="headerText" :background="background" :color="color"/></div>
      <div class="Lister">
        <div :key="infopost.id" v-for="infopost in infoposts" class="InfoPostBox" >
          <InfoBox :infopost="infopost" @expand="$emit('expand')"/>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Header from '../components/common/Header.vue'
  import InfoBox from '../components/common/InfoBox.vue'

  import { useAuthStore } from '../stores/auth'
  import { useListStore } from '../stores/list'
  import { useColourStore } from '../stores/colour'

export default {
  name: 'Infopost',
  setup(){
    const authStore = useAuthStore();
    const listStore = useListStore();
    const colourStore = useColourStore();
    return { authStore, listStore,colourStore }
  },
  data() {
    return {
      headerName : 'Infopost',
      headerText : 'Infoposts from SMPCs',
      infoposts: [],
      
    }
  },
  components: {
    Header,
    InfoBox,
  },
  methods:{
    async fetchInfoPosts() {
      const bearer = `Bearer ${this.authStore.accessToken}`

      console.log('bearer : ', bearer);

      console.log("fetching info posts");

      const res = await fetch('api/info/get',{
        method : 'GET',
        headers : {
          'Content-Type' : 'application/json',
          'Authorization' : bearer
        }
      })

      console.log("response : ", res);

      console.log('request sent');

      if(res.status === 200){
        console.log('received response');
        const data = await res.json()
        console.log(data);
        this.listStore.SetList(data);
        return data
      }
      else{
        if(res.status === 403){
          console.log('refreshing token');
          const res = await this.authStore.Refresh();

          if(res.status === 200){
            console.log('refreshed token');
            const bearer = `Bearer ${this.authStore.accessToken}`
            console.log('new bearer : ', bearer);
            const res = await fetch('api/info/get',{
              method : 'GET',
              headers : {
                'Content-Type' : 'application/json',
                'Authorization' : bearer
              },
            })
            console.log('new request sent');
            const data = await res.json()
            console.log(data);
            this.listStore.SetList(data);
            return data
          }
          else{
            console.log('refresh failed');
            await this.authStore.Logout()
          }
        }
        else{
          alert('not enough permissions')
          await this.authStore.Logout() 
        }
      }
    },
  },
  async mounted() {
    await this.fetchInfoPosts();
    this.infoposts = this.listStore.list;
    console.log(this.infoposts);
    // calling colour infopost
    await this.colourStore.colourInfopost();
    
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
    width: 100%;
    margin-top: 16px;
    margin-bottom: 16px;
    /* border: 5px solid red; */
  }

@media only screen and (max-width:750px){

.Header{
  width: 100%;
  height: 30%;
}

.Lister::-webkit-scrollbar {
  width : 4px;
}

.InfoPostBox{
  width: 100%;
}

}

  </style>