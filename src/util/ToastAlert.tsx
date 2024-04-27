import { Zoom, toast, TypeOptions, ToastOptions, ToastPosition } from 'react-toastify';

type toastAlert = (type?: TypeOptions, message?: string, position?: ToastPosition) => void

export const toastAlert: toastAlert = (type, message = "Alert !", position = 'top-center'): void => {

    const toastOptions: ToastOptions = {
        position,
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Zoom,
        type
    };

    toast(message, toastOptions);

}