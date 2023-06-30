<template>
    <div class="test-snackbar">
        
        <v-snackbar class="snackbar"
      v-model="snackbar"
      :timeout = "timeout"
      multi-line
      bottom
    >
    {{ text }}
        </v-snackbar>
    </div>
</template>

<script>
export default {
    name: "Snackbar",
    data: () => ({
      snackbar: true, //set this to false when actually integrating with errors
      text: 'Welcome aboard With the all new freshers portal clear all your doubts regarding the admission process',
      timeout: 3000,
    }),
}
</script>

<style scoped>
div {
  padding: 16px 48px;
  background: rgba(255, 255, 255, 0.90);
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
  border-radius: 24px;
  text-align: center;
}
</style>



