<template>
     <div v-if="files">
          <nav>
               <div class="container">
                    <div class="level  is-mobile">
                         <!-- Left side -->

                         <div class="level-left">
                              <div class="level-item">
                                   <img src="../assets/images/logo.png" alt="" />
                              </div>
                              <div class="level-item">
                                   <h2>Manage Files</h2>
                              </div>
                         </div>

                         <!-- Right side -->
                         <div class="level-right">
                              <p class="level-item">
                                   <b-button type="is-text" @click="newfile"> <b-icon icon="plus " size="" type="is-primary"> </b-icon></b-button>
                              </p>
                         </div>
                    </div>
               </div>
          </nav>

          <div class="container">
               <div class=" file-section-container">
                    <div class="file-section-header">
                         <div class="columns m-0 is-mobile is-vcentered">
                              <div class="column">
                                   <h2>Uploading</h2>
                              </div>

                              <div>
                                   <b-button class="is-uppercase  is-text  action-btn " @click="cancelCurrentUpload">Cancel upload</b-button>
                              </div>
                              <div>
                                   <div class="status-col">
                                        <b-button type="is-text" @click="() => (this.collapseStatus.uploading = !this.collapseStatus.uploading)">
                                             <b-icon :icon="!collapseStatus.uploading ? 'chevron-down' : 'chevron-up'"> </b-icon>
                                        </b-button>
                                   </div>
                              </div>
                         </div>
                    </div>

                    <b-collapse aria-id="" class="" animation="slide" v-model="this.collapseStatus.uploading">
                         <div class="file-section-body">
                              <div v-if="files.uploading.length == 0" class="placeholder-message">
                                   No files being uploaded
                              </div>
                              <div class="columns is-multiline m-0">
                                   <div class="column is-4 " v-for="item in files.uploading" :key="item.id">
                                        <file-widget :data="item"> </file-widget>
                                   </div>
                              </div>
                         </div>
                    </b-collapse>
               </div>

               <div class=" file-section-container">
                    <div class="file-section-header">
                         <div class="columns m-0  is-mobile is-vcentered">
                              <div class="column">
                                   <h2>Next up</h2>
                              </div>

                              <div>
                                   <b-button class="is-uppercase  is-text action-btn " @click="cancelAll">Cancel all</b-button>
                              </div>
                              <div>
                                   <div class="status-col">
                                        <b-button type="is-text" @click="() => (this.collapseStatus.nextup = !this.collapseStatus.nextup)">
                                             <b-icon :icon="!collapseStatus.nextup ? 'chevron-down' : 'chevron-up'"> </b-icon>
                                        </b-button>
                                   </div>
                              </div>
                         </div>
                    </div>

                    <b-collapse aria-id="" class="" animation="slide" v-model="collapseStatus.nextup">
                         <div class="file-section-body">
                              <div v-if="files.nextup.length == 0" class="placeholder-message">
                                   No file to upload next
                              </div>
                              <div class="columns is-multiline m-0">
                                   <div class="column is-4 " v-for="item in files.nextup" :key="item.id">
                                        <file-widget :data="item" @remove="removeFile(item.id, 'WAITING')"> </file-widget>
                                   </div>
                              </div>
                         </div>
                    </b-collapse>
               </div>

               <div class=" file-section-container">
                    <div class="file-section-header">
                         <div class="columns m-0  is-mobile is-vcentered">
                              <div class="column">
                                   <h2>Completed</h2>
                              </div>
                              <div>
                                   <b-button class="is-uppercase  is-text action-btn " @click="$store.commit('clearCompleted')">Dismiss all</b-button>
                              </div>
                              <div>
                                   <div class="status-col">
                                        <b-button type="is-text" @click="() => (this.collapseStatus.completed = !this.collapseStatus.completed)">
                                             <b-icon :icon="!collapseStatus.completed ? 'chevron-down' : 'chevron-up'"> </b-icon>
                                        </b-button>
                                   </div>
                              </div>
                         </div>
                    </div>

                    <b-collapse aria-id="" class="" animation="slide" v-model="collapseStatus.completed">
                         <div class="file-section-body">
                              <div v-if="files.completed.length == 0" class="placeholder-message">
                                   No file uploads completed yet.
                              </div>
                              <div class="columns is-multiline m-0">
                                   <div class="column is-4 " v-for="item in files.completed" :key="item.id">
                                        <file-widget :data="item" @remove="removeFile(item.id, 'COMPLETED')"> </file-widget>
                                   </div>
                              </div>
                         </div>
                    </b-collapse>
               </div>

               <div class=" file-section-container">
                    <div class="file-section-header">
                         <div class="columns m-0  is-mobile is-vcentered">
                              <div class="column">
                                   <h2>Incomplete Uploads</h2>
                              </div>
                              <div>
                                   <b-button class="is-uppercase  is-text action-btn " @click="retryAllUpload">Retry all</b-button>
                                   <b-button class="is-uppercase  is-text action-btn " @click="$store.commit('clearIncompleted')"
                                        >Dismiss all</b-button
                                   >
                              </div>
                              <div>
                                   <div class="status-col">
                                        <b-button type="is-text" @click="() => (this.collapseStatus.incomplete = !this.collapseStatus.incomplete)">
                                             <b-icon :icon="!collapseStatus.incomplete ? 'chevron-down' : 'chevron-up'"> </b-icon>
                                        </b-button>
                                   </div>
                              </div>
                         </div>
                    </div>

                    <b-collapse aria-id="" class="" animation="slide" v-model="collapseStatus.incomplete">
                         <div class="file-section-body">
                              <div v-if="files.incomplete.length == 0" class="placeholder-message">
                                   No incomplete upoads yet.
                              </div>
                              <div class="columns is-multiline m-0">
                                   <div class="column is-4 " v-for="item in files.incomplete" :key="item.id">
                                        <file-widget :data="item" @retry="retryUpload(item)" @remove="removeFile(item.id, 'FAILED')"> </file-widget>
                                   </div>
                              </div>
                         </div>
                    </b-collapse>
               </div>
          </div>
     </div>
</template>

<script>
     import { mapState, mapGetters } from "vuex";
     import { v4 as uuidv4 } from "uuid";
     import fileWidget from "../components/FileWidget.vue";
     export default {
          data() {
               return {
                    isOpen: false,

                    collapseStatus: {
                         uploading: true,
                         nextup: true,
                         completed: true,
                         incomplete: true,
                    },
                    uploadinterval: false,
               };
          },
          components: {
               fileWidget,
          },
          computed: {
               ...mapGetters({
                    files: "files",
                    currentUploadingFile: "currentUploadingFile",
               }),
          },
          beforeDestroy() {
               clearInterval(this.uploadinterval);
          },
          async mounted() {},

          methods: {
               uploadFile() {
                    this.$store.commit("incrementCurrentUpload");

                    if (this.currentUploadingFile.uploadProgress >= 100) {
                         //download complete
                         this.currentUploadComplete();
                    } else if (this.currentUploadingFile.fail && this.currentUploadingFile.uploadProgress > 50) {
                         //download failed
                         this.currentUploadFailed();
                    }
               },

               async startUpload() {
                    if (this.files.nextup.length > 0) {
                         await this.$store.dispatch("startUpload");

                         //uploadFile() called every 50ms to increment file upload count
                         this.uploadinterval = setInterval(this.uploadFile, 50);
                    }
               },

               //adds new file to the list of files
               async newfile() {
                    let newfile = this.getRandomFile();

                    //check if upload will fail (success = 75%)
                    let uploadWillFail = false;

                    if (Math.random() * 10 + 1 > 7.5) {
                         uploadWillFail = true;
                    }

                    let file = { ...newfile, id: uuidv4(), status: "WAITING", size: "1.2MB", uploadProgress: 0, fail: uploadWillFail };

                    await this.$store.dispatch("addFileToUpload", {
                         file: file,
                    });

                    if (!this.uploadinterval) {
                         this.startUpload();
                    }
               },

               //return a random file name and type
               getRandomFile() {
                    let randomFiles = [
                         { type: "pdf", name: "Random.pdf" },
                         { type: "img", name: "Random.img" },
                         { type: "zip", name: "Random.zip" },
                         { type: "excel", name: "Random.xlsx" },
                    ];

                    return randomFiles[Math.floor(Math.random() * randomFiles.length)];
               },

               /*================================ file upload menthods ==============================*/

               retryUpload(file) {
                    this.$store.commit("retryUpload", { fileID: file.id });

                    if (!this.uploadinterval) {
                         this.startUpload();
                    }
               },
               retryAllUpload() {
                    this.$store.commit("retryAllUploads");

                    if (!this.uploadinterval) {
                         this.startUpload();
                    }
               },
               //triggers when current upload is complete
               currentUploadComplete() {
                    clearInterval(this.uploadinterval);
                    this.uploadinterval = false;

                    this.$store.commit("currentUploadComplete");

                    this.startUpload();
               },

               //triggers when current upload fails
               currentUploadFailed() {
                    clearInterval(this.uploadinterval);
                    this.uploadinterval = false;

                    this.$store.commit("currentUploadFailed");

                    this.startUpload();

                    this.$buefy.snackbar.open({
                         duration: 5000,
                         message: `Upload Failed`,
                         type: "is-danger",
                         position: "is-bottom",
                         actionText: null,
                         queue: false,
                    });
               },

               //call to cancel current upload
               cancelCurrentUpload() {
                    if (this.uploadinterval) {
                         clearInterval(this.uploadinterval);
                         this.uploadinterval = false;

                         this.$store.commit("currentUploadCancelled");

                         this.startUpload();

                         this.$buefy.snackbar.open({
                              duration: 5000,
                              message: "Upload Cancelled",
                              type: "is-danger",
                              position: "is-bottom",
                              actionText: null,
                              queue: false,
                         });
                    }
               },

               //call to cancel all files
               cancelAll() {
                    this.$store.commit("cancelAll");

                    this.$buefy.snackbar.open({
                         duration: 5000,
                         message: "All Upload Cancelled",
                         type: "is-danger",
                         position: "is-bottom",
                         actionText: null,
                         queue: false,
                    });
               },

               //remove file when close button is clicked
               removeFile(fileID, status) {
                    if (status == "WAITING") {
                         this.$store.commit("removeFileFromNextUp", { fileID: fileID });
                    } else if (status == "COMPLETED") {
                         this.$store.commit("removeFileFromCompleted", { fileID: fileID });
                    } else if (status == "FAILED") {
                         this.$store.commit("removeFileFromIncomplete", { fileID: fileID });
                    }
               },
          },
     };
</script>

<style lang="scss" scoped>
     @import "@/assets/styles/variables.scss";

     nav {
          background: #ffffff;

          padding: 14px 0px;
          box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.12);
     }
     .container {
          padding: 14px;
     }

     .file-section-container {
          padding: 30px 0px;

          .file-section-header {
               padding-bottom: 15px;

               border-bottom: 1px solid $border;

               .action-btn {
                    color: $darkblue;
                    font-size: 14px;
               }
          }

          .file-section-body {
               padding-top: 30px;
          }
          .placeholder-message {
               font-size: 15px;
               color: $text-tertiary;

               @media screen and (max-width: $mobile) {
                    text-align: center;
               }
          }
     }

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
