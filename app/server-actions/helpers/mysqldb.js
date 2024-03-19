import mysql from 'mysql2/promise'

const executeQuery = async (query, data) => {
  try {
    const db = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    })
    const [result] = await db.execute(query, data)
    await db.end()
    return result
  } catch (error) {
    throw error
  }
}

export default executeQuery
