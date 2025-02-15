import type { ToastMessageOptions } from 'primevue'
import { getSeverity, getSummary } from './getToastProps'

const DEFAULT_LIFE = 3000

export const handleToast = (
  showToast: (payload: ToastMessageOptions) => void,
  status: number,
  detail: string | null = null,
  life?: number,
) => {
  if (!status) return
  const severity = getSeverity(status)
  const summary = getSummary(severity)

  showToast({
    severity: severity || 'error',
    summary: summary || '',
    detail: detail || '',
    life: life || DEFAULT_LIFE,
  })
}
