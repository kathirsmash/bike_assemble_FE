import Swal from 'sweetalert2';

export const showErrorAlert = (icon, message) => {
    Swal.fire({ icon: icon, title: message });
};