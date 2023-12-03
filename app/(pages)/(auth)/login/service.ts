export const loginService = async (data: any) => {
  try {
    if (!process.env.URL_LOGIN) {
      throw new Error('URL_LOGIN no definida')
    }	
    const resp = await fetch(process.env.URL_LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const responseData = await resp.json()
    return responseData
  } catch (error) {
    return {
      error: true,
      errors: null,
      message: 'Error al enviar la solicitud',
      token: null,
      userResponse: {},
    }
  }
}
