<template>
 <div class="askQuesButton"><a class="button" href="#popup1"><i class="fa-solid fa-question"></i>Ask a Question</a></div>
    <div id="popup1" class="overlay">
        <div class="popup">
            <h2>Tanmay Jain</h2>
            <a class="close" href="#">&times;</a>
            <div class="content">
              <textarea class="questionAsk" placeholder="Type in your question..."></textarea>
              <div class="Images">
                <div class="img">
                  <img class = "pics" src="https://www.iitb.ac.in/sites/www.iitb.ac.in/themes/touchm/logo.png">
                  <svg class="imgrem" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>
                </div>
                <div class="img">
                  <img class = "pics" src="https://www.iitb.ac.in/sites/www.iitb.ac.in/themes/touchm/logo.png">
                    <svg class="imgrem" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>
                </div>
                
              </div>
              <button class="addPhotoButton"><svg class="addPhotoButtonlog" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/></svg> Add a photo</button>
              <button id = "discard" class="addPhotoButton" onclick="location.href='#';" >Discard</button>  
              <button id = "post" class="addPhotoButton">Post</button>
            </div>
        </div>
    </div>

 </template>
 
 <script>
 export default {
     name: 'popup'
 }
 </script>
 
 <style scoped>
 .box {
  width: 60%;
  margin: 0 auto;
  background: rgba(255,255,255,0.2);
  padding: 35px;
  border: 2px solid #fff;
  border-radius: 20px/50px;
  background-clip: padding-box;
  text-align: center;
}

.fa-solid {
    color: white;
    background-color: #3E3C5D;
}
.button {
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 24px 40px;
gap: 16px;
z-index: 1;
position: fixed;
width: 16%;
height: 10vh;
left: 55.5%;
top: 87vh;
line-height: 3.3vh;
background: #3E3C5D;
border-color: #3E3C5D;
text-align: center;
color: white;
font-size: x-large;
font-family: Inter;
box-shadow: none;
border-radius: 24px;
text-decoration: none;

}

/* .button:hover {
  background: #06D85F;
} */

.overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  transition: opacity 500ms;
  visibility: hidden;
  opacity: 0;
  z-index: 2;
}
.overlay:target {
  visibility: visible;
  opacity: 1;
}

.popup {
  margin-top: 15%;
  margin-left: 25%;
  padding: 20px;
  /* background: #dbd9d9; */
  border-radius: 20px;
  width: 50%;
  position: relative;
  z-index: 10;

}

.popup h2 {
  margin-top: 0;
  color: #333;
  font-family: Tahoma, Arial, sans-serif;
}
.popup .close {
  position: absolute;
  top: 20px;
  right: 30px;
  transition: all 200ms;
  font-size: 30px;
  font-weight: bold;
  text-decoration: none;
  color: #333;
}
.popup .close:hover {
  color: #b8b8b8;
}
.popup .content {
  max-height: 40%;
  overflow: auto;
}

@media screen and (max-width: 700px){
  .box{
    width: 70%;
  }
  .popup{
    width: 70%;
  }
}

.questionAsk{
height: 200px;
width: 97%;
resize: none;
border-radius: 24PX;
font-size: 18px;
padding: 18px;
border: 1px solid black;
font-family: Arial, Helvetica, sans-serif
}

.pics{
  width: 100px;
  height: 100px;
  margin: 20px;
  position: relative;
}
.imgrem{
  height: 20px;
  width: 20px;
  top: -73%;
    right: 14%;
  position:relative;
  cursor: pointer;
}
.Images{
  display: flex;
  flex-wrap: nowrap;
}
/* .img{
  border-radius: 20px;
  background-color: D9D9D9;
} */

.addPhotoButtonlog{
  height: 20px;
  width: 20px;
  position: relative;
  left: -10px;
  top: 3px;
}
.addPhotoButton{
background-color: white;
border-radius: 24px;
padding: 8px;
padding-left: 25px !important;
padding-right: 25px !important;
font-size: 20px;
border: 0px;
cursor: pointer;
}
#post{
  background-color: #c0bfbf;
  margin-left: 5px;
  margin-right: 10px;
}
#discard{
    margin-left: 43%;
    border: 2px solid #5d5c5c !important;
    background-color: white !important;
    color:#5d5c5c !important;
}
.img{
  background-color:   white;
  border-radius: 24px;
  width: 165px;
  margin: 2% ;
  margin-left: 0 !important;
}
 </style>