<template>
    <div class="container">
     
      <div class="Header"><Header :headerName="headerName" /></div>
      <div class="Questions"><Question /></div>
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
  
  <style>

    .container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .header {
      flex: 3;
    }

    .questions {
      flex: 6;
    }

  </style>