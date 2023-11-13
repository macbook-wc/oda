// 获取assets静态资源
export const getAssetsFile = (url) => {
  return new URL(`../assets/images/${url}`, import.meta.url).href;
};
export const localGet = (key) => {
  const value = window.sessionStorage.getItem(key);
  try {
    return JSON.parse(window.sessionStorage.getItem(key));
  } catch (error) {
    return value;
  }
};
export const downloadApi = (res) => {
  debugger
  // 从content-disposition拿到后端返回的filename，并用decodeURI解码，防止乱码
  let fileName = decodeURI(res.headers['content-disposition'].split('=')[1]);
  const bolb = new Blob([res.data], { type: "" })
  // const bolb = new Blob([res.data], { type: `${res.data.type};charset=UTF-8` })
  if ('download' in document.createElement('a')) {
    const link = document.createElement('a')
    link.download = fileName
    link.style.display = 'none'
    link.href = URL.createObjectURL(bolb)
    document.body.appendChild(link)
    link.click()
    URL.revokeObjectURL(link.href)
    document.body.removeChild(link)
  }
};
