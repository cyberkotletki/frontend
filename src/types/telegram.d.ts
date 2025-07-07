export {}

declare global {
    interface Window {
        Telegram?: {
            WebApp: {
                initData: string
                initDataUnsafe: {
                    user?: {
                        id?: number
                        first_name?: string
                        last_name?: string
                        username?: string
                        language_code?: string
                    }
                    [key: string]: any
                }
                sendData?: (data: string) => void
                close?: () => void
                expand?: () => void
            }
        }
    }
}