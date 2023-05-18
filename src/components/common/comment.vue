<template>
    <form class="add-form">
    <div class="form-control">
      
      <input type="text" name="text" placeholder="Comment" />
      <div class="send">
        <i class="fas fa-times"></i>
      </div>
      </div>
    </form>
    
    
</template>

<script>
export default {
    name: 'comment',
  
    
}
</script>

<style scoped>
    .add-form {
                margin-right: 10%;
        display: flex;
        position: absolute;
        flex-grow: 1;
    }
    



.form-control input {

  width: 5750%;
  height: 5vh;
  margin-top: 27vh;
  margin-left: 300%;
  padding: 3px 7px;
  font-size: 1rem;
  border-radius: 24px;
  display: flex;
  flex-grow: 1;
  border-width: 2.5px;
  border-color: black;
 
  
 
  
  
}

.fas {
    background-color: pink;
    color: black;
    margin-top: -3vh;
    margin-left: 5820%;
    position: absolute;
    
    
}

</style>
