import { SnackbarProvider, enqueueSnackbar } from 'notistack'

export const CustomToast = () => {
  return (
    <SnackbarProvider
      autoHideDuration={3000}
      preventDuplicate={true}
      maxSnack={2}
      disableWindowBlurListener={true}
    />
  )
}

export const toast = (message: string, variant: "default" | "error" | "success" | "warning" | "info") => {
  enqueueSnackbar(message, {
    variant: variant,
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'right'
    }
  })
}