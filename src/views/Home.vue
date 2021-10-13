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
                                   <b-button class="is-uppercase  is-text " @click="cancelCurrentUpload">Cancel upload</b-button>
                              </div>
                              <div>
                                   <div class="status-col">
                                        <b-button type="is-text" @click="() => (this.collapseStatus.uploading = !this.collapseStatus.uploading)">
                                             <b-icon :icon="!collapseStatus.uploading ? 'menu-down' : 'menu-up'"> </b-icon>
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
                                   <b-button class="is-uppercase  is-text  " @click="cancelAll">Cancel all</b-button>
                              </div>
                              <div>
                                   <div class="status-col">
                                        <b-button type="is-text" @click="() => (this.collapseStatus.nextup = !this.collapseStatus.nextup)">
                                             <b-icon :icon="!collapseStatus.nextup ? 'menu-down' : 'menu-up'"> </b-icon>
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
                                   <h2>Completed</h2>
                              </div>

                              <div>
                                   <div class="status-col">
                                        <b-button type="is-text" @click="() => (this.collapseStatus.completed = !this.collapseStatus.completed)">
                                             <b-icon :icon="!collapseStatus.completed ? 'menu-down' : 'menu-up'"> </b-icon>
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
                                   <h2>Incomplete Uploads</h2>
                              </div>

                              <div>
                                   <div class="status-col">
                                        <b-button
                                             type="is-text"
                                             @click="() => (this.collapseStatus.incompleteUploads = !this.collapseStatus.incompleteUploads)"
                                        >
                                             <b-icon :icon="!collapseStatus.incompleteUploads ? 'menu-down' : 'menu-up'"> </b-icon>
                                        </b-button>
                                   </div>
                              </div>
                         </div>
                    </div>

                    <b-collapse aria-id="" class="" animation="slide" v-model="collapseStatus.incompleteUploads">
                         <div class="file-section-body">
                              <div v-if="files.incompleteUploads.length == 0" class="placeholder-message">
                                   No incomplete upoads yet.
                              </div>
                              <div class="columns is-multiline m-0">
                                   <div class="column is-4 " v-for="item in files.incompleteUploads" :key="item.id">
                                        <file-widget :data="item" @retry="retryUpload(item)"> </file-widget>
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
                         incompleteUploads: true,
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

                    if (this.currentUploadingFile.uploadProgress > 90) {
                         this.currentUploadComplete();
                    } else if (this.currentUploadingFile.fail && this.currentUploadingFile.uploadProgress > 50) {
                         this.currentUploadFailed();
                    }
               },

               async startUpload() {
                    if (this.files.nextup.length > 0) {
                         await this.$store.dispatch("startUpload");
                         this.uploadinterval = setInterval(this.uploadFile, 100);
                    }
               },

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
               currentUploadComplete() {
                    clearInterval(this.uploadinterval);
                    this.uploadinterval = false;

                    this.$store.commit("currentUploadComplete");

                    this.startUpload();
               },
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
