import { storage } from "../config/config";
import slugify from "slugify";

export const uploadFile = async (file, checkProgress, fileUrl) => {
  if (file) {
    const newFileName = `${new Date().getTime()}-${slugify(file?.name)}`;
    const uploadTask = storage.child(newFileName).put(file);

    if (checkProgress && fileUrl) {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          let progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          if (checkProgress) {
            checkProgress(progress.toFixed(0));
          }
        },
        (error) => {
          // handle error
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            if (fileUrl) {
              fileUrl(downloadURL);
            }
          });
        }
      );
    } else {
      await uploadTask;
      const url = await storage.child(newFileName).getDownloadURL();

      return url;
    }
  }
};
