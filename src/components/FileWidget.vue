<template>
     <div class="file-widget">
          <div class="columns is-mobile is-vcentered">
               <div class="file-icon">
                    <img v-once v-if="data.type == 'pdf'" src="../assets/images/file-thumbnail-pdf.svg" alt="" class="" />
                    <img v-once v-if="data.type == 'zip'" src="../assets/images/file-thumbnail-zip.svg" alt="" class="" />
                    <img v-once v-if="data.type == 'img'" src="../assets/images/file-thumbnail-image.svg" alt="" class="" />
                    <img v-once v-if="data.type == 'excel'" src="../assets/images/file-thumbnail-excel.svg" alt="" class="" />
               </div>

               <div class="column">
                    <div class="file-name">
                         {{ data.name }}
                    </div>

                    <div class="file-size">
                         {{ data.size }}
                    </div>
               </div>

               <div class="status-col">
                    <div v-if="data.status == 'UPLOADING'">
                         {{ data.uploadProgress }}
                    </div>
               </div>
          </div>
     </div>
</template>

<script>
     export default {
          data() {
               return {};
          },
          props: {
               data: {
                    Type: Object,
                    default: undefined,
               },
          },
          computed: {},

          mounted() {},
     };
</script>

<style lang="scss" scoped>
     @import "@/assets/styles/variables.scss";
     .file-widget {
          width: 100%;
          margin-bottom: 15px;

          border-radius: 8px;

          background: $background-secondary;
          padding: 20px !important;

          .file-icon {
               height: 60px;
               width: 60px;

               img {
                    width: 100%;
               }
          }

          .status-col {
               width: 50px !important;
          }
          .file-name {
               color: $text-secondary;
               border: none;
               padding: 0;

               height: 30px;
          }
          .file-size {
               color: $text-tertiary;
          }
     }
</style>
