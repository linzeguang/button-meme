import { t } from '@lingui/core/macro'
import { type ClassValue, clsx } from 'clsx'
import toast from 'react-hot-toast'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function randomColor() {
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)
  return `rgba(${r},${g},${b},${1})`
}

export function copy(text: string) {
  navigator.clipboard.writeText(text)
  toast.success(t`copied`)
}

export function toggleLight() {
  document.documentElement.classList.toggle('light')

  return document.documentElement.classList.contains('light')
}
