import { toast } from 'react-toastify';

/*Un componente hecho por Edward Peña*/

/**
 * presenta una información en formato de alerta
 * @param alertType success, error, info, dark, default, warning
 * @param message message a mostrar, puede ser un componente
 */
export default function AlertMessage(alertType, message) {
  const parameters = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
  }

  if (alertType === 'success') toast.success(message, parameters);
  if (alertType === 'warning') toast.warning(message, parameters);
  if (alertType === 'error') toast.error(message, parameters);
  if (alertType === 'info') toast.info(message, parameters);
  if (alertType === 'dark') toast.dark(message, parameters);
  if (alertType === 'default') toast(message, parameters);
}