export const checkEditorType = (editor) => {
  return typeof editor === "object" ? "" : editor
}