import AuthMenu from './authMenu'
import AuthBurger from './authBurger'
import { tabs } from './tabs'
import Tab from './tab'
import getInfoAuthCookie from '@/app/server-actions/helpers/getInfoAuthCookie'
import { signIn, signOut } from 'auth'

export const Nav = async () => {
  const payload = await getInfoAuthCookie()
  const isLogged = payload ? true : false

  return (
    <div className="bg-base-200 text-base-content">
      <nav className="px-4 flex gap-4 sm:w-full max-w-[45rem] mx-auto text-sm items-center justify-between">
        <AuthBurger />
        <div role="tablist" className="hidden md:flex tabs tabs-lifted tabs-lg">
          {tabs.map((tab, index) => {
            return (
              tab.requireLogin === false && (
                <Tab name={tab.name} path={tab.path} key={index} />
              )
            )
          })}
          {tabs.map((tab, index) => {
            return (
              isLogged &&
              tab.requireLogin === true && (
                <Tab name={tab.name} path={tab.path} key={index} />
              )
            )
          })}
        </div>
        <div className="flex items-center px-2">
          <div>
            {payload && payload.username && (
              <div className="text-[10px] w-20 text-center">
                {payload.username.substring(0, 18)}
              </div>
            )}
            {!payload && <div className="sm:w-40"></div>}
          </div>
          <AuthMenu isLogged={payload ? true : false} />
        </div>
        <div>
          {payload && payload.username ? (
            <div>
              <form
                action={async () => {
                  'use server'
                  await signOut()
                }}
              >
                <button className="btn" type="submit">
                  Salir
                </button>
              </form>
            </div>
          ) : (
            <form
              action={async () => {
                'use server'
                await signIn(undefined, { callbackUrl: '/' })
              }}
            >
              <button type="submit">Inicia Sesión</button>
            </form>
          )}
        </div>
      </nav>
    </div>
  )
}
