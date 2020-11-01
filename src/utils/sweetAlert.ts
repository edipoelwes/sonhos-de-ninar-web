import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export const sweetAlert = (title: string, icon = 'success') => {
  const Toast = MySwal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  })

  switch (icon) {
    case 'error':
      return Toast.fire({
        icon: 'error',
        title: title,
      })
    case 'warning':
      return Toast.fire({
        icon: 'warning',
        title: title,
      })

    case 'info':
      return Toast.fire({
        icon: 'info',
        title: title,
      })

    default:
      return Toast.fire({
        icon: 'success',
        title: title,
      })
  }
}
