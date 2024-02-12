import { userGetUserInfoAPI } from '@/api/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'

// 用戶模塊 token setToken removeToken
export const useUserStore = defineStore(
  'big-use',
  () => {
    const token = ref('')
    const setToken = (newToken) => {
      token.value = newToken
    }
    const removeToken = () => {
      token.value = ''
    }

    // 用戶基本信息
    const userInfo = ref({})
    const getUserInfo = async () => {
      const res = await userGetUserInfoAPI()
      userInfo.value = res.data.data
    }
    const setUser = (obj) => {
      userInfo.value = obj
    }
    // 暴露出去
    return {
      token,
      setToken,
      removeToken,
      userInfo,
      getUserInfo,
      setUser
    }
  },
  {
    persist: true
  }
)
