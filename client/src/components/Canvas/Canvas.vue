<script setup lang="ts">
import { onMounted, ref } from 'vue'

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

const canvas = ref<HTMLCanvasElement | null>(null)
const circles = ref<Circle[]>([])
let circlesCount = 0
const speedMultiplier = 15

let previousDelta = 0
const fps = 30

const drawRect = (ctx: CanvasRenderingContext2D) => {
  ctx.fillStyle = 'transparent'
  ctx.fillRect(0, 0, width.value, height.value)
}

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
  if (ctx) {
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

onMounted(() => {
  for (let i = 0; i < 20; i++) {
    const r = 300
    const x = Math.floor(Math.random() * width.value)
    const y = Math.floor(Math.random() * height.value)
    const color: Color = {
      r: Math.floor(Math.random() * 60),
      g: Math.floor(Math.random() * 60),
      b: 100 + Math.floor(Math.random() * 50),
      a: 1.0,
    }
    createCircle(x, y, r, color)
  }

  const interval = setInterval(() => {
    circles.value.forEach((el) => {
      const { direction } = el
      const { dx, dy } = direction
      const arr = checkCollision(el.x, el.y, dx, dy)
      el.x = arr[0] //1 * multiplier - Math.random() * 2 * multiplier
      el.y = arr[1] //1 * multiplier - Math.random() * 2 * multiplier
      el.direction.dx = arr[2]
      el.direction.dy = arr[3]

      el.x += el.direction.dx * speedMultiplier
      el.y += el.direction.dy * speedMultiplier
    })
  }, 1000 / fps)

  draw()
})
</script>

<template>
  <canvas :width="width" :height="height" ref="canvas"></canvas>
</template>

<style scoped>
canvas {
  position: absolute;
  z-index: -1;
  background: transparent;
}
</style>
