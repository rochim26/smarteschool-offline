import React, { useEffect } from "react";
import { baseURL } from "../../../client/clientAxios";
import { uploadFile } from "../../../client/uploadFileClient";

// class MyUploadAdapter {
//   constructor(loader) {
//     // The file loader instance to use during the upload.
//     this.loader = loader;
//   }

//   // Starts the upload process.
//   upload() {
//     return this.loader.file.then(
//       (file) =>
//         new Promise((resolve, reject) => {
//           const toBase64 = (file) =>
//             new Promise((resolve, reject) => {
//               const reader = new FileReader();
//               reader.readAsDataURL(file);
//               reader.onload = () => resolve(reader.result);
//               reader.onerror = (error) => reject(error);
//             });

//           return toBase64(file).then(async (cFile) => {
//             const d = await uploadFile(cFile);
//             if (d) {
//               if (d.status) {
//                 this.loader.uploaded = true;
//                 resolve({
//                   default: d.response.url,
//                 });
//               } else {
//                 reject(`Couldn't upload file: ${file.name}.`);
//               }
//             }
//           });
//         })
//     );
//   }
// }

// function MyCustomUploadAdapterPlugin(editor) {
//   editor.plugins.get("FileRepository").createUploadAdapter = async (loader) => {
//     const file = await loader.file;
//     return new MyUploadAdapter(file);
//   };
// }

const Editor = ({ id, defaultValue }) => {
  useEffect(() => {
    // set value to editor:
    // get value to editor: window.$(`#${id}`).summernote("code");

    window.$(document).ready(function () {
      window.$(`#${id}`).summernote({
        airMode: false,
        callbacks: {
          onImageUpload: async (files) => {
            const data = await uploadFile(files[0]);
            if (data) {
              const img = `<img src="${data}"/>`;
              // upload image to server and create imgNode...
              window.$(`#${id}`).summernote("pasteHTML", img);
            }
          },
          // onChange: () => onChange(window.$(`#${id}`).summernote("code")),
        },
      });

      window.$(`#${id}`).summernote("code", defaultValue);
    });

    // window.ClassicEditor.create(document.querySelector("#editor"), {
    //   extraPlugins: [MyCustomUploadAdapterPlugin],
    // }).catch((error) => {
    //   console.error(error);
    // });
  }, []);
  return (
    <>
      {/* {" "}
      <div id="editor">
        <p>This is some sample content.</p>
      </div> */}
      <textarea id={id}></textarea>
    </>
  );
};

export default Editor;
