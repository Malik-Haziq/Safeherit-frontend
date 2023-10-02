import { useAppSelector } from '@/redux/hooks'
import { SnackbarProvider, enqueueSnackbar } from 'notistack'
import { useEffect } from 'react'

export const CustomToast = () => {
  const toast = useAppSelector(state => state.toast)
  
  useEffect(() => {
    if (toast.message) {
      enqueueSnackbar(toast.message, {
        variant: toast.variant,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right'
        }
      })
    }
  }, [toast.message])
  
  return (
    <SnackbarProvider
      autoHideDuration={3000}
      preventDuplicate={true}
      maxSnack={2}
    />
  )
}