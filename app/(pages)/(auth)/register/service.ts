export const registerService = async (data: any) => {
  try {
    if (!process.env.URL_REGISTER) {
      throw new Error('URL_REGISTER no definida')
    }
    // Enviar la solicitud POST
    const resp = await fetch(process.env.URL_REGISTER, {
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
