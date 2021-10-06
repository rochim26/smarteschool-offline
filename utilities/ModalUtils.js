export const hideModal = (modalId) => {
  const modal = document.getElementById(modalId);
  new bootstrap.Modal(modal).hide();
  modal.classList.remove("show");
  modal.style = "display: none";
  if (document.getElementsByClassName("modal-backdrop").length)
    document.getElementsByClassName("modal-backdrop")[0].className = "";
  if (document.getElementsByClassName("modal-open").length)
    document.getElementsByClassName("modal-open")[0].className = "";
};
