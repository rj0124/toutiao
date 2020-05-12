// 本地存储封装模块
export const getItem = name => {
  const data = window.localStorage.getItem(name)
  // 为什么要把JSON.parse放到try-catch中? 因为
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}

export const setItem = (name, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(name, value)
}
export const removeItem = name => {
  window.localStorage.removeItem(name)
}
