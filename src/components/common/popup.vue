<template>
 <div class="askQuesButton"><a class="button" href="#popup1"><i class="fa-solid fa-question"></i>Ask a Question</a></div>
    <div id="popup1" class="overlay" >
      <div class="popupholder">
        <div class="popup">
            <h2>Tanmay Jain</h2>
            <a class="close" href="#"><img class="imgrem" id="closebut" src="../icons/cancel.svg" alt="SVG Image"></a>
            <div class="content">
              <textarea id="myTextBox" class="questionAsk" placeholder="Type in your question..." ></textarea>
              <div class="Images">
                <div class="img">
                  <img class = "pics" src="https://www.iitb.ac.in/sites/www.iitb.ac.in/themes/touchm/logo.png" alt="internet load kar">
                  <img class="imgrem" src="../icons/cancel.svg" alt="SVG Image">                </div>
                <div class="img">
                  <img class = "pics" src="https://www.iitb.ac.in/sites/www.iitb.ac.in/themes/touchm/logo.png">
                  <img class="imgrem" src="../icons/cancel.svg" alt="SVG Image">
                </div>
                
              </div>
              <div class="pupButCont">
                <div class="button-container">
                  <input type="file" id="photo-upload" accept="image/*" style="display: none;">
                   <button class="addPhotoButton" onclick="document.getElementById('photo-upload').click()"><img class="svg-image" src="../icons/add_photo_alternate.svg" alt="SVG Image"><p class="addphototext">Add a photo</p> </button>
             
                    <div class="right-buttons">
                      <button id = "discard" class="addPhotoButton" onclick="location.href='#';clearTextBox();" >Discard</button>  
                      <button id = "post" class="addPhotoButton">Post</button>
                    </div>
                </div>
              </div>
            </div>
        </div>
    </div>
    </div>

 </template>
 
 <script>
 export default {
     name: 'popup',
     clearTextBox() {
  document.getElementById("myTextBox").value = "";
  },
 }
 </script>
 
 <style scoped>
 .popupholder{
  display: flex;
    justify-content: center;
    align-items: center;
    top: 12%;
    /* position: fixed; */
    /* top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999; */
 }

 #closebut{
  height: 32px !important;
 }
 .button-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .right-buttons {
    display: flex;
  }

 .addphototext{
  display: inline;
  top: -5px;
  margin-left: 10px;
 }
 .svg-image {
    width: 20%;
    height: auto;
    margin-left:-20px ;
    margin-top: 4px;
  }
 /* .addCircle{
height: 2px;
width: 20px;
 } */

.popButCont{
    display: flex;
    flex-direction: column;
    align-items: center;
 }

 #post{
  background-color: #c0bfbf;
  margin-left: 5px;
  margin-right: 10px;
}
#discard{
    border: 2px solid #5d5c5c !important;
    background-color: white !important;
    color:#5d5c5c !important;
}

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
  /* margin-top: 15%;
  margin-left: 25%; */
  padding: 20px;
  background: #dbd9d9;
  border-radius: 20px;
  width: 50%;
  /* position: relative; */
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
    right: 6%;
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
order: 0;
}

.img{
  background-color:   white;
  border-radius: 24px;
  width: 165px;
  margin: 2% ;
  margin-left: 0 !important;
}
 </style>