import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
     state: {
          uploading: [],
          nextup: [],
          completed: [],
          incompleteUploads: [],
     },

     getters: {
          files: (state) => {
               return {
                    uploading: state.uploading,
                    nextup: state.nextup,
                    completed: state.completed,
                    incompleteUploads: state.incompleteUploads,
               };
          },

          currentUploadingFile: (state) => {
               return state.uploading[0];
          },
     },

     mutations: {
          startNextUpload(state, params) {
               let file = state.nextup.shift();
               file.status = "UPLOADING";
               file.uploadProgress = 0;
               state.uploading.push(file);
          },
          addNewFile(state, params) {
               state.nextup.push(params.file);
          },
          incrementCurrentUpload(state, params) {
               state.uploading[0].uploadProgress += 3;
          },

          currentUploadComplete(state, params) {
               let file = state.uploading.pop();
               file.status = "SUCCESS";
               state.completed.unshift(file);
          },
          currentUploadFailed(state, params) {
               let file = state.uploading.pop();

               file.status = "FAILED";
               state.incompleteUploads.unshift(file);
          },
          currentUploadCancelled(state, params) {
               let file = state.uploading.pop();
               file.status = "CANCELLED";

               state.incompleteUploads.unshift(file);
          },

          cancelAll(state, params) {
               while (state.nextup.length > 0) {
                    let file = state.nextup.pop();
                    file.status = "CANCELLED";

                    state.incompleteUploads.unshift(file);
               }
          },

          retryAllUploads(state, params) {
               while (state.incompleteUploads.length > 0) {
                    let file = state.incompleteUploads.pop();
                    file.status = "WAITING";
                    file.fail = false;
                    file.uploadProgress = 0;
                    state.nextup.unshift(file);
               }
          },

          retryUpload(state, params) {
               let fileID = params.fileID;

               const itemIndex = state.incompleteUploads.findIndex((file) => file.id === fileID);
               let file = state.incompleteUploads[itemIndex];

               file.status = "WAITING";
               file.fail = false;
               file.uploadProgress = 0;

               state.incompleteUploads.splice(itemIndex, 1);
               state.nextup.push(file);
          },

          clearCompleted(state, params) {
               state.completed = [];
          },

          clearIncompleted(state, params) {
               state.incompleteUploads = [];
          },
     },
     actions: {
          async startUpload({ state, commit }, params) {
               //move next file to upload
               commit("startNextUpload");

               //uploading increment
          },
          async addFileToUpload({ state, commit }, params) {
               //move next file to upload
               commit("addNewFile", { file: params.file });

               //uploading increment
          },
     },
     modules: {},
});
