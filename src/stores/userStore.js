import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

export const useUserStore = defineStore('user', () => {
    const userLogin = useLocalStorage('user', '')

    const setUserLogin = (user) => {
        userLogin.value = user
    }

    return {
        userLogin,
        setUserLogin
    }
  })