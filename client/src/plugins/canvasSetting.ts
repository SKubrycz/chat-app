export function readCanvasSettings(): boolean | null {
  const setting = window.localStorage.getItem('runCanvas')
  if (setting) {
    if (setting === 'true') {
      return true
    } else {
      return false
    }
  }

  return null
}

export function writeCanvasSettings(runCanvas: boolean) {
  window.localStorage.setItem('runCanvas', String(runCanvas))
}
