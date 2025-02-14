import type { ToastMessageOptions } from 'primevue'
import getSeverity from './getSeverity'
import type { Severity } from './toastTypes'

const DEFAULT_LIFE = 3000

export const handleToast = (
  showToast: (payload: ToastMessageOptions) => void,
  status: number,
  severity: Severity | null = null,
  summary: string | null = null,
  detail: string | null = null,
  life?: number,
) => {
  if (!status) return
  const statusSeverity = getSeverity(status)

  showToast({
    severity: statusSeverity || severity || 'error',
    summary: summary || '',
    detail: detail || '',
    life: life || DEFAULT_LIFE,
  })

  // if (status < 300) {
  //   emit('showToast', {
  //     severity: severity || 'info',
  //     summary: summary || 'Information',
  //     detail: detail,
  //     life: life || DEFAULT_LIFE,
  //   })
  // } else if (status >= 300 && status < 400) {
  //   emit('showToast', {
  //     severity: severity || 'warning',
  //     summary: summary || 'Warning',
  //     detail: detail,
  //     life: life || DEFAULT_LIFE,
  //   })
  // } else if (status >= 400) {
  //   emit('showToast', {
  //     severity: severity || 'error',
  //     summary: summary || 'Error',
  //     detail: detail,
  //     life: life || DEFAULT_LIFE,
  //   })
  // }
}
