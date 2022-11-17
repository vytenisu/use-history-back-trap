import React from 'react'

const BACK_EVENT_TYPE = 'popstate'
const DEFAULT_TRAP_FLAG = 'backTrap'
const DEFAULT_TRAP_TIME = 'backTime'

export type HistoryBackTrapHandler = (resume: () => void) => Promise<boolean>

export interface HistoryBackTrapOptions {
  trapFlag: string
  trapTime: string
}

export const useHistoryBackTrap = (trapHandler: HistoryBackTrapHandler, options?: HistoryBackTrapOptions) => {
  const trapFlag = options?.trapFlag ?? DEFAULT_TRAP_FLAG
  const trapTime = options?.trapTime ?? DEFAULT_TRAP_TIME

  const getStepTimestamp = () => window.history.state[trapTime]
  const isInsideTrap = () => Boolean(window.history.state[trapFlag])

  const injectTrap = () => {
    const timestamp = new Date().getTime()
    window.history.replaceState({[trapFlag]: true, [trapTime]: timestamp}, null, window.location.href)
    window.history.pushState({[trapTime]: timestamp}, null, window.location.href)
  }

  const resume = async () => {
    window.history.back()
  }

  React.useEffect(() => {
    injectTrap()
  }, [])

  React.useEffect(() => {
    let expectedTime = getStepTimestamp()

    const isCorrectTimestamp = (timestamp: number) => timestamp && expectedTime && expectedTime === timestamp

    const trap = async () => {
      if (isInsideTrap()) {
        if (!isCorrectTimestamp(getStepTimestamp())) {
          resume()
          return
        }

        const approved = await trapHandler(resume)

        if (!approved) {
          injectTrap()
          expectedTime = getStepTimestamp()
        }
      }
    }

    window.addEventListener(BACK_EVENT_TYPE, trap)

    return () => {
      window.removeEventListener(BACK_EVENT_TYPE, trap)
    }
  }, [trapHandler])
}
