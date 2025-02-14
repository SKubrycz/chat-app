import type { Severity } from './toastTypes'

export default function getSeverity(status: number): Severity {
  if (status > 100 && status <= 199) {
    return 'info'
  }
  if (status > 200 && status <= 299) {
    return 'success'
  }
  if (status > 300 && status <= 399) {
    return 'warn'
  }
  if (status > 400 && status <= 499) {
    return 'error'
  }
  if (status > 500 && status <= 599) {
    return 'error'
  }

  return undefined
}
