const DEFAULT_LIFE = 3000

export const handleToast = (
  emit: (e: 'showToast', ...args: any[]) => void,
  status: number,
  severity: string,
  summary: string,
  detail: string,
  life?: number,
) => {
  if (!status) return

  if (status < 400) {
    emit('showToast', {
      severity: severity || 'info',
      summary: summary || 'Information',
      detail: detail,
      life: life || DEFAULT_LIFE,
    })
  } else if (status >= 300 && status < 400) {
    emit('showToast', {
      severity: severity || 'warning',
      summary: summary || 'Warning',
      detail: detail,
      life: life || DEFAULT_LIFE,
    })
  } else if (status >= 400) {
    emit('showToast', {
      severity: severity || 'error',
      summary: summary || 'Error',
      detail: detail,
      life: life || DEFAULT_LIFE,
    })
  }
}
