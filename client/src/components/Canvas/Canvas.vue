<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

interface Circle {
  x: number
  y: number
  r: number
  color: Color
}

interface Color {
  r: number
  g: number
  b: number
  a: number
}

const width = ref(window.innerWidth)
const height = ref(window.innerHeight)

const canvas = ref<HTMLCanvasElement | null>(null)
const circles = ref<Circle[]>([])

let previousDelta = 0
const fps = 24

const drawRect = (ctx: CanvasRenderingContext2D) => {
  ctx.fillStyle = 'transparent'
  ctx.fillRect(0, 0, width.value, height.value)
}

const createCircle = (x: number, y: number, r: number, color: Color) => {
  const circle: Circle = {
    x: x,
    y: y,
    r: r,
    color: color,
  }
  circles.value.push(circle)
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
  for (let i = 0; i < 5; i++) {
    const r = 600 + i
    const x = Math.floor(Math.random() * width.value)
    const y = Math.floor(Math.random() * height.value)
    const color: Color = {
      r: Math.floor(Math.random() * 255),
      g: Math.floor(Math.random() * 255),
      b: Math.floor(Math.random() * 255),
      a: 1.0,
    }
    createCircle(x, y, r, color)
  }

  const interval = setInterval(() => {
    const multiplier = 10
    circles.value.forEach((el) => {
      el.x += 1 * multiplier - Math.random() * 2 * multiplier
      el.y += 1 * multiplier - Math.random() * 2 * multiplier
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
