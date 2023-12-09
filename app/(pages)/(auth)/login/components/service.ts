export const loginService = async (data: any, url: string | undefined) => {
  try {
    if (url) {
      const resp = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), 
        credentials: 'include',       
      })
      const responseData = await resp.json()
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
