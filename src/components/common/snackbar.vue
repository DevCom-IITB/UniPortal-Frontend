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
      text: 'Hi',
      timeout: 3000,
    }),
}
</script>



