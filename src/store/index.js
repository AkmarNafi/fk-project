import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
     state: {
          uploading: [],
          nextup: [
               //  { id: 1, type: "img", name: "test.png", status: "WAITING", size: "1.2MB", uploadProgress: 0, fail: true },
               //  { id: 2, type: "zip", name: "test.zip", status: "WAITING", size: "1.2MB", uploadProgress: 0, fail: false },
               //  { id: 3, type: "pdf", name: "test.pdf", status: "WAITING", size: "1.2MB", uploadProgress: 0, fail: true },
          ],
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
               let uploadedFile = state.uploading.pop();
               state.completed.unshift(uploadedFile);
          },
          currentUploadFailed(state, params) {
               let uploadedFile = state.uploading.pop();

               uploadedFile.failed = true;
               state.incompleteUploads.unshift(uploadedFile);
          },
          currentUploadCancelled(state, params) {
               let uploadedFile = state.uploading.pop();

               uploadedFile.cancelled = true;
               state.incompleteUploads.unshift(uploadedFile);
          },

          cancelAll(state, params) {
               while (state.nextup.length > 0) {
                    let uploadedFile = state.nextup.pop();

                    uploadedFile.cancelled = true;
                    state.incompleteUploads.unshift(uploadedFile);
               }
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
