export const getContactsController = async (
  token,
  router,
  JWT_TOKEN_NAME,
  setModal
) => {
  const res = await window.fetch('/api/get_contacts', {
    method: 'GET',
    headers: new window.Headers([
      ['Content-type', 'application/json'],
      ['Authorization', `Bearer ${token ? token.token : ' '}`]
    ])
  })

  if (res.ok) {
    return res.json().then((res) => res)
  } else {
    res.json().then((res) => {
      if (res.err) {
        setModal({
          token: true,
          principalText: res.message
        })
        window.localStorage.removeItem(JWT_TOKEN_NAME)
      } else {
        setModal({
          token: true,
          principalText: res.message
        })
      }
      router.push('/')
      return []
    })
  }
}
