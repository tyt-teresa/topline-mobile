/**
 封装本地存储
 */
export const setItem = (key, item) => window.localStorage.setItem(key, JSON.stringify(item))

export const getItem = key => JSON.parse(window.localStorage.getItem(key))

export const removeItem = key => window.localStorage.removeItem(key)
