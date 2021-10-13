import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
     state: {
          uploading: [],
          nextup: [],
          completed: [],
          incomplete: [],
     },

     getters: {
          files: (state) => {
               return {
                    uploading: state.uploading,
                    nextup: state.nextup,
                    completed: state.completed,
                    incomplete: state.incomplete,
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
               state.incomplete.unshift(file);
          },
          currentUploadCancelled(state, params) {
               let file = state.uploading.pop();
               file.status = "CANCELLED";

               state.incomplete.unshift(file);
          },

          cancelAll(state, params) {
               while (state.nextup.length > 0) {
                    let file = state.nextup.pop();
                    file.status = "CANCELLED";

                    state.incomplete.unshift(file);
               }
          },

          retryAllUploads(state, params) {
               while (state.incomplete.length > 0) {
                    let file = state.incomplete.pop();
                    file.status = "WAITING";
                    file.fail = false;
                    file.uploadProgress = 0;
                    state.nextup.unshift(file);
               }
          },

          retryUpload(state, params) {
               let fileID = params.fileID;

               const itemIndex = state.incomplete.findIndex((file) => file.id === fileID);
               let file = state.incomplete[itemIndex];

               file.status = "WAITING";
               file.fail = false;
               file.uploadProgress = 0;

               state.incomplete.splice(itemIndex, 1);
               state.nextup.push(file);
          },

          removeFileFromNextUp(state, params) {
               console.log("hi");
               let fileID = params.fileID;
               const itemIndex = state.nextup.findIndex((file) => file.id === fileID);
               state.nextup.splice(itemIndex, 1);
               console.log(itemIndex);
          },
          removeFileFromCompleted(state, params) {
               let fileID = params.fileID;
               const itemIndex = state.completed.findIndex((file) => file.id === fileID);
               state.completed.splice(itemIndex, 1);
          },
          removeFileFromIncomplete(state, params) {
               let fileID = params.fileID;
               const itemIndex = state.incomplete.findIndex((file) => file.id === fileID);
               state.incomplete.splice(itemIndex, 1);
          },

          clearCompleted(state, params) {
               state.completed = [];
          },

          clearIncompleted(state, params) {
               state.incomplete = [];
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
