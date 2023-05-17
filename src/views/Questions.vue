<template>
    <div class="container">
     
      <Header :headerName="headerName" />
      <Question />
      <form @submit.prevent="postData">
      <!-- Form inputs -->
      <button type="submit">Submit</button>
      </form>
      <div>
    <button @click="getData">Get Data</button>
    <div>{{ responseData }}</div>
  </div>
      
    </div>
  </template>
  
  <script>

  import Question from '../components/common/questionBox.vue'
  import Header from '../components/common/Header.vue'

  
  export default {
    
    name: 'Questions',
    
  //   data() {
  //   return {
  //     Header_Name : 'Questions'
  //   }
  // },

  data() {
    return {
      responseData: '',
      headerName : 'Questions'
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
        "id": 11,
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

      fetch("api/infoposts", requestOptions)
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

      fetch("api/infoposts", requestOptions)
        .then(response => response.text())
        .then(result => this.responseData = result)
        .catch(error => console.log('error', error));
    }
  }
  }
  </script>
  
  <style>
  </style>