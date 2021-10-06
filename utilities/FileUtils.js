export const shortFileName = (file) => {
  return file
    .split("?")[0]
    .replace(
      "https://firebasestorage.googleapis.com/v0/b/smart-school-300211.appspot.com/o/",
      ""
    );
};
