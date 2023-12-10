export const loginService = async (data: any, url: string | undefined, urlAPI: string | undefined) => {
  try {
    if (url && urlAPI) {
      const resp = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
      })
      const responseData = await resp.json()
      console.log(responseData?.token)
      const authorization = await fetch(urlAPI + '/api/authorization', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${responseData?.token}`,
        },
        credentials: 'include',
        body: null, // o el cuerpo de la solicitud si es necesario
      })
      return responseData
    }
  } catch (error) {
    console.log(error)
    return {
      error: true,
      errors: null,
      message: JSON.stringify(error),
      token: null,
      userResponse: {},
    }
  }
}
