<template>
     <div class="file-widget">
          <div class="close-btn" @click="$emit('remove')" v-if="data.status !== 'UPLOADING'">
               <b-icon icon="close" size="is-small"> </b-icon>
          </div>

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

               <div class="status-col  ">
                    <div v-if="data.status == 'UPLOADING'">
                         <div>
                              <radial-progress-bar
                                   style="margin:auto"
                                   :diameter="40"
                                   :completed-steps="data.uploadProgress"
                                   :total-steps="100"
                                   startColor="#2E6DDE"
                                   stopColor="#2E6DDE"
                                   innerStrokeColor="#D1D2D5"
                                   :innerStrokeWidth="3"
                                   :strokeWidth="3"
                                   :isClockwise="false"
                                   :animateSpeed="100"
                              >
                              </radial-progress-bar>
                         </div>

                         <div class="text-center  mt-1">Uploading</div>
                    </div>

                    <div v-if="data.status == 'WAITING'">
                         <div>
                              <radial-progress-bar
                                   style="margin:auto"
                                   :diameter="40"
                                   :completed-steps="data.uploadProgress"
                                   :total-steps="100"
                                   startColor="#2E6DDE"
                                   stopColor="#2E6DDE"
                                   innerStrokeColor="#D1D2D5"
                                   :innerStrokeWidth="3"
                                   :strokeWidth="3"
                                   :isClockwise="false"
                                   :animateSpeed="100"
                              >
                              </radial-progress-bar>
                         </div>

                         <div class="text-center  mt-1">Waiting</div>
                    </div>

                    <div v-else-if="data.status == 'SUCCESS'">
                         <div class="text-center">
                              <img style="width:25px" src="../assets/images/done.svg" alt="" />
                         </div>

                         <div class="text-center  mt-1">Done</div>
                    </div>
                    <div v-else-if="data.status == 'FAILED'" @click="$emit('retry')">
                         <div class="text-center">
                              <img src="../assets/images/retry.svg" alt="" />
                         </div>

                         <div class="text-center mt-1">Failed</div>
                    </div>
                    <div v-else-if="data.status == 'CANCELLED'" @click="$emit('retry')">
                         <div class="text-center">
                              <img src="../assets/images/retry.svg" alt="" />
                         </div>

                         <div class="text-center  mt-1">Cancelled</div>
                    </div>
               </div>
          </div>
     </div>
</template>

<script>
     import RadialProgressBar from "vue-radial-progress";

     export default {
          data() {
               return {};
          },
          components: {
               RadialProgressBar,
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
          position: relative;
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

          .close-btn {
               position: absolute;
               top: 8px;
               right: 10px;
               cursor: pointer;
          }

          .status-col {
               width: 90px;
               margin-left: 10px;

               color: $text-tertiary;
               font-size: 13px;
          }
          .file-name {
               color: $text-secondary;
               border: none;
               padding: 0;

               height: 30px;
          }
          .file-size {
               color: $text-tertiary;
               font-size: 13px;
          }
     }
</style>
