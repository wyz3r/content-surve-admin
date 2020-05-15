const isLogin = () => {
  const token = window.localStorage.idToken
  if (!token || token === '') return false

  return true
}

export default isLogin
