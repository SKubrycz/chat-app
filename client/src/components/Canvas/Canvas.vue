<script setup lang="ts">
import { readCanvasSettings, writeCanvasSettings } from '@/plugins/canvasSetting'
import { onMounted, ref, watch } from 'vue'
import { Checkbox } from 'primevue'

interface Circle {
  id: number
  x: number
  y: number
  r: number
  color: Color
  direction: Direction
}

interface Color {
  r: number
  g: number
  b: number
  a: number
}

interface Direction {
  dx: number
  dy: number
}

const width = ref(window.innerWidth)
const height = ref(window.innerHeight)

const checked = ref<boolean>(true)

const canvas = ref<HTMLCanvasElement | null>(null)
const circles = ref<Circle[]>([])
const interval = ref<number | null>(null)
let circlesCount = 0
const speedMultiplier = 12

let previousDelta = 0
const fps = 30

const createCircle = (x: number, y: number, r: number, color: Color) => {
  const direction: Direction = {
    dx: Math.random() * 2 - 1,
    dy: Math.random() * 2 - 1,
  }
  const circle: Circle = {
    id: circlesCount,
    x: x,
    y: y,
    r: r,
    color: color,
    direction: direction,
  }
  circles.value.push(circle)
  circlesCount++
}

const drawRadialGradient = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  spread: number,
  color: Color,
) => {
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, spread + spread)
  gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`)
  gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0.0)`)
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width.value, height.value)
}

const checkCollision = (x: number, y: number, dx: number, dy: number) => {
  let newX = x
  let newY = y
  let newDx = dx
  let newDy = dy

  if (x > width.value - speedMultiplier) {
    newX = x - speedMultiplier
    newDx = -1 * dx
  } else if (x < speedMultiplier) {
    newX = speedMultiplier
    newDx = -1 * dx
  }
  if (y > height.value - speedMultiplier) {
    newY = y - speedMultiplier
    newDy = -1 * dy
  } else if (y < speedMultiplier) {
    newY = speedMultiplier
    newDy = -1 * dy
  }

  return [newX, newY, newDx, newDy]
}

const draw = () => {
  const ctx = canvas.value?.getContext('2d')
  if (ctx && checked.value) {
    window.requestAnimationFrame(draw)

    let currentDelta = performance.now()
    let delta = currentDelta - previousDelta

    if (fps && delta < 1000 / fps) return

    ctx.clearRect(0, 0, width.value, height.value)

    for (let i = 0; i < circles.value.length; i++) {
      const { x, y, r, color } = circles.value[i]
      drawRadialGradient(ctx, x, y, r, color)
    }

    previousDelta = currentDelta
  }
}

const runAnimation = () => {
  if (interval.value) clearInterval(interval.value)
  if (!checked.value) {
    const ctx = canvas?.value?.getContext('2d')
    if (ctx) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.0)'
      ctx.clearRect(0, 0, width.value, height.value)
    }
    return
  }

  for (let i = 0; i < 8; i++) {
    const r = 400
    const x = Math.floor(Math.random() * width.value)
    const y = Math.floor(Math.random() * height.value)
    const color: Color = {
      r: Math.floor(Math.random() * 60),
      g: Math.floor(Math.random() * 20),
      b: 60 + Math.floor(Math.random() * 160),
      a: 1.0,
    }
    createCircle(x, y, r, color)
  }

  interval.value = setInterval(() => {
    circles.value.forEach((el) => {
      const { direction } = el
      const { dx, dy } = direction
      const arr = checkCollision(el.x, el.y, dx, dy)
      el.x = arr[0]
      el.y = arr[1]
      el.direction.dx = arr[2]
      el.direction.dy = arr[3]

      el.x += el.direction.dx * speedMultiplier
      el.y += el.direction.dy * speedMultiplier
    })
  }, 1000 / fps)

  draw()
}

onMounted(() => {
  window.addEventListener('resize', () => {
    width.value = window.innerWidth
    height.value = window.innerHeight
  })

  const runCanvas = readCanvasSettings()
  if (runCanvas !== null) checked.value = runCanvas

  runAnimation()
})

watch(checked, (newChecked) => {
  writeCanvasSettings(Boolean(newChecked))
  runAnimation()
})
</script>

<template>
  <canvas :width="width" :height="height" ref="canvas"></canvas>
  <div
    :style="{
      width: `fit-content`,
      position: `absolute`,
      top: `90%`,
      left: `90%`,
    }"
  >
    Toggle background animation
    <Checkbox v-model="checked" binary></Checkbox>
  </div>
</template>

<style scoped>
canvas {
  position: absolute;
  z-index: -1;
  background: transparent;
}
</style>
