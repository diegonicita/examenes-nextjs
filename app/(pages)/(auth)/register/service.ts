// const url = 'http://127.0.0.1:8126/users/login'
const url = 'https://mercado.webapp.ar/users/register'

export const registerService = async (data: any) => {
  try {
    // Enviar la solicitud POST
    const resp = await fetch(url, {
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