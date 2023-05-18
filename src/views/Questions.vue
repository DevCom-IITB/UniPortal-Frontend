<template>
    <div class="container">
     
      <div class="Header"><Header :headerName="headerName" :headerText="headerText" /></div>
      <div class="Lister"></div>
      <!-- <div class="Header"><Header :headerName="headerName" /></div>
      <div class="Questions"><Question /></div> -->
  </div>
      
</template>
  
<script>

  import Question from '../components/common/questionBox.vue'
  import Header from '../components/common/Header.vue'

  
  export default {
    
  name: 'Questions',

  data() {
    return {
      headerName : 'Questions',
      headerText : 'A design system isn’t only a collection of the assets and components you use to build a digital product. According to Emmet Connolly, director of product design at Intercom, “… most Design Systems are really just Pattern Libraries: a big box of UI Lego pieces that can be assembled in near-infinite ways. All the pieces may '
   }
  },
  
  
  components: {
    Question,
    Header
   
  },

  methods: {
    postData() {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify({
        "id": 1110,
        "user_ID": 123,
        "hidden": true,
        "body": "QuesAkshattion 1",
        "subject": "subject1",
        "status": true,
        "answers": [],
        "upvotes": 12,
        "asked_At": 12,
        "comments": []
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch("http://localhost:3000/infoposts", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    },
    getData() {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch("http://localhost:3000/infoposts", requestOptions)
        .then(response => response.text())
        .then(result => this.responseData = result)
        .catch(error => console.log('error', error));
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