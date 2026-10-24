'use client'

import { intlLocale, type Locale } from '@/i18n/dictionaries'
import { formatTimeAnnouncement } from './time-signal'

let activeUtterance: SpeechSynthesisUtterance | null = null

export const isSpeechSupported = () =>
  typeof window !== 'undefined' &&
  'speechSynthesis' in window &&
  typeof SpeechSynthesisUtterance !== 'undefined'

export const cancelTimeAnnouncement = () => {
  if (!isSpeechSupported()) return
  if (activeUtterance) window.speechSynthesis.cancel()
  activeUtterance = null
}

export const speakTimeAnnouncement = (date: Date, locale: Locale, onEnd?: () => void) => {
  if (!isSpeechSupported()) return false

  if (activeUtterance) window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(formatTimeAnnouncement(date, locale))
  utterance.lang = intlLocale(locale)
  if (locale === 'ja') {
    utterance.rate = 0.95
  } else if (locale === 'zh-CN') {
    utterance.rate = 0.85
  } else {
    utterance.rate = 0.8
  }
  utterance.pitch = 0.9

  const voice = window.speechSynthesis
    .getVoices()
    .find((candidate) => candidate.lang.toLowerCase().startsWith(locale))
  if (voice) utterance.voice = voice

  utterance.onend = () => {
    activeUtterance = null
    onEnd?.()
  }
  utterance.onerror = () => {
    activeUtterance = null
    onEnd?.()
  }
  activeUtterance = utterance
  window.speechSynthesis.speak(utterance)
  return true
}
