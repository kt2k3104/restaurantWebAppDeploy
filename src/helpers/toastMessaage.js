import Swal from "sweetalert2";

const showToastMessage = (title, icon) => {
  const Toast = Swal.mixin({
    position: "center",
    width: 600,
    // height: 300,
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    backdrop: `
    rgba(0, 0, 0, 0.5)
    `,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({
    title,
    icon,
  });
};

export default showToastMessage;
