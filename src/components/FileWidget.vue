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
                              <svg width="25" height="25" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                   <circle cx="10" cy="10" r="10" fill="#00BC78" />
                                   <path d="M5 10.8462L9.61538 13.9231L15.7692 7" stroke="white" stroke-width="1.5" stroke-linecap="round" />
                              </svg>
                         </div>

                         <div class="text-center  mt-1">Done</div>
                    </div>
                    <div v-else-if="data.status == 'FAILED'" @click="$emit('retry')">
                         <div class="text-center">
                              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                   <path
                                        d="M17.9338 5.24415C18.289 5.03118 18.4066 4.5686 18.1677 4.23028C17.0778 2.68746 15.5698 1.48034 13.8142 0.755975C11.8268 -0.064021 9.62816 -0.221724 7.54414 0.306252C5.46012 0.834227 3.60174 2.01977 2.24455 3.68708C0.887358 5.35439 0.103631 7.4147 0.00957479 9.5625C-0.0844811 11.7103 0.516143 13.8312 1.72239 15.6108C2.92863 17.3904 4.67627 18.7338 6.70616 19.442C8.73605 20.1501 10.9401 20.1852 12.9915 19.5421C14.8037 18.9739 16.4115 17.9033 17.632 16.4616C17.8997 16.1455 17.8229 15.6744 17.4876 15.4312C17.1523 15.188 16.6858 15.2652 16.414 15.5777C15.3858 16.7601 14.0471 17.6391 12.5428 18.1107C10.7991 18.6574 8.92564 18.6276 7.20023 18.0257C5.47483 17.4238 3.98934 16.2818 2.96403 14.7692C1.93872 13.2565 1.42819 11.4538 1.50814 9.62813C1.58809 7.8025 2.25425 6.05123 3.40787 4.63402C4.56148 3.2168 6.1411 2.20909 7.91252 1.76031C9.68394 1.31153 11.5528 1.44558 13.2421 2.14258C14.6994 2.7439 15.9561 3.73662 16.877 5.00428C17.1204 5.33941 17.5785 5.45712 17.9338 5.24415Z"
                                        fill="#EE4B69"
                                   />
                                   <path d="M18.6 3C18.6 3.26 18.6 4.84167 18.6 5.6H16" stroke="#EE4B69" stroke-width="1.5" stroke-linecap="round" />
                              </svg>
                         </div>

                         <div class="text-center mt-1">Failed</div>
                    </div>
                    <div v-else-if="data.status == 'CANCELLED'" @click="$emit('retry')">
                         <div class="text-center">
                              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                   <path
                                        d="M17.9338 5.24415C18.289 5.03118 18.4066 4.5686 18.1677 4.23028C17.0778 2.68746 15.5698 1.48034 13.8142 0.755975C11.8268 -0.064021 9.62816 -0.221724 7.54414 0.306252C5.46012 0.834227 3.60174 2.01977 2.24455 3.68708C0.887358 5.35439 0.103631 7.4147 0.00957479 9.5625C-0.0844811 11.7103 0.516143 13.8312 1.72239 15.6108C2.92863 17.3904 4.67627 18.7338 6.70616 19.442C8.73605 20.1501 10.9401 20.1852 12.9915 19.5421C14.8037 18.9739 16.4115 17.9033 17.632 16.4616C17.8997 16.1455 17.8229 15.6744 17.4876 15.4312C17.1523 15.188 16.6858 15.2652 16.414 15.5777C15.3858 16.7601 14.0471 17.6391 12.5428 18.1107C10.7991 18.6574 8.92564 18.6276 7.20023 18.0257C5.47483 17.4238 3.98934 16.2818 2.96403 14.7692C1.93872 13.2565 1.42819 11.4538 1.50814 9.62813C1.58809 7.8025 2.25425 6.05123 3.40787 4.63402C4.56148 3.2168 6.1411 2.20909 7.91252 1.76031C9.68394 1.31153 11.5528 1.44558 13.2421 2.14258C14.6994 2.7439 15.9561 3.73662 16.877 5.00428C17.1204 5.33941 17.5785 5.45712 17.9338 5.24415Z"
                                        fill="#EE4B69"
                                   />
                                   <path d="M18.6 3C18.6 3.26 18.6 4.84167 18.6 5.6H16" stroke="#EE4B69" stroke-width="1.5" stroke-linecap="round" />
                              </svg>
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
