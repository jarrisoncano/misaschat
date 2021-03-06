export const signUpController = async (
  data,
  setRequestInProgress,
  setModal,
  router
) => {
  setRequestInProgress(true)
  const res = await window.fetch('/api/sign_up', {
    method: 'POST',
    headers: new window.Headers([['Content-type', 'application/json']]),
    body: JSON.stringify(data)
  })

  if (res.ok) {
    setRequestInProgress(false)
    router.push('/signIn')
  } else {
    setRequestInProgress(false)
    res
      .json() //
      .then((res) =>
        setModal({
          token: true,
          principalText: res.message
        })
      )
  }
}

export const signInController = async (
  data,
  router,
  JWT_TOKEN_NAME,
  setModal
) => {
  const res = await window.fetch('/api/sign_in', {
    method: 'POST',
    headers: new window.Headers([['Content-type', 'application/json']]),
    body: JSON.stringify(data)
  })

  if (res.ok) {
    res
      .json() //
      .then((token) => {
        window.localStorage.setItem(JWT_TOKEN_NAME, JSON.stringify(token))
        router.push('/dashboard')
      })
  } else {
    res
      .json() //
      .then((res) =>
        setModal({
          token: true,
          principalText: res.message
        })
      )
  }
}
