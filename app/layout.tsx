/* Components */
import { Providers } from '@/lib/providers'
import { Nav } from './components/Nav'

/* Instruments */
import styles from './styles/layout.module.css'
import './styles/globals.css'

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <Providers>
      <html lang="en">
        <body>
          <section className="block max-w-2xl mx-auto">
            <div className="flex justify-center gap-4"><Nav />
            </div>
            <div className="flex flex-col items-center">
              <p className="font-semibold p-2 text-xl">Tareas realizadas y pendientes:</p>
              <ul>
                <li>Instalar Redux Toolkit ✔️</li>
                <li>Crear un nuevo Slice ✔️ </li>
                <li>Instalar Tailwind CSS ✔️</li>
                <li>Cambiar el PORT del build de nextjs ✔️</li>
                <li>RTK Query para buscar una pregunta, varias preguntas, buscar preguntas por palabra clave</li>
                <li>RTK Query para buscar varias preguntas con paginado</li>
                <li>RTk Query para buscar una o varias preguntas por palabra clave</li>
                <li>Login con Google usando Nextjs Auth</li>
                <li>Login y Register usando el servidor de Webapp</li>
                <li>Crear un proyecto paralelo usando React Native</li>
              </ul>
            </div>
            <header className={styles.header}>
              <img src="/logo.svg" className={styles.logo} alt="logo" />
            </header>

            <main className={styles.main}>{props.children}</main>

            <footer className={styles.footer}>
              <span>Learn </span>
              <a
                className={styles.link}
                href="https://reactjs.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                React
              </a>
              <span>, </span>
              <a
                className={styles.link}
                href="https://redux.js.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Redux
              </a>
              <span>, </span>
              <a
                className={styles.link}
                href="https://redux-toolkit.js.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Redux Toolkit
              </a>
              ,<span> and </span>
              <a
                className={styles.link}
                href="https://react-redux.js.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                React Redux
              </a>
            </footer>
          </section>
        </body>
      </html>
    </Providers>
  )
}
