<template>
     <div id="app">
          <FadeTransition :duration="200" mode="out-in">
               <router-view />
          </FadeTransition>
     </div>
</template>

<script>
     import { FadeTransition } from "vue2-transitions";

     export default {
          components: {
               FadeTransition,
          },
     };
</script>

<style lang="scss">
     #app {
 
       
     }
</style>
