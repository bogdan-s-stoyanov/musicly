let toastTimeout;

function showToast(message, type = "info") {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = message;
  toast.className = "toast-notification";

  if (type === "success") {
    toast.classList.add("toast-success");
  } else if (type === "error") {
    toast.classList.add("toast-error");
  } else {
    toast.classList.add("toast-info");
  }

  clearTimeout(toastTimeout);

  requestAnimationFrame(() => {
    toast.classList.remove("hidden-toast");
  });

  toastTimeout = setTimeout(() => {
    toast.classList.add("hidden-toast");
  }, 2500);
}