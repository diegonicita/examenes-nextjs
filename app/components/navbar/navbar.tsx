import AuthMenu from './authMenu'
import AuthBurger from './authBurger'
import { tabs } from './tabs'
import Tab from './tab'
import ThemeSelector from './theme'
import getInfoAuthCookie from '@/app/server-actions/helpers/getInfoAuthCookie'

export const Nav = async () => {
  const auth = await getInfoAuthCookie()
  const isLogged = auth ? true : false

  return (
    <div className="bg-base-200 text-base-content">
      <nav className="px-4 flex gap-4 sm:w-full max-w-[55rem] mx-auto text-sm items-center justify-between">
        <AuthBurger />
        <div role="tablist" className="hidden md:flex tabs tabs-lifted tabs-lg">
          {tabs.map((tab) => {
            return (
              tab.requireLogin === false && (
                <Tab name={tab.name} path={tab.path} key={tab.name} />
              )
            )
          })}
          {tabs.map((tab) => {
            return (
              isLogged &&
              tab.requireLogin === true && (
                <Tab name={tab.name} path={tab.path} key={tab.name} />
              )
            )
          })}
        </div>
        <div className="flex gap-8">
          <div className="leading-none flex flex-col text-[0.7rem] items-center justify-center gap-2">
            <div>
              {auth?.username}
            </div>
            <div>
              {auth && 'Role:'} {auth?.role}
            </div>
          </div>
          <AuthMenu isLogged={isLogged} />
          <ThemeSelector />
          <a
            href="https://ko-fi.com/E1E6DPG1I"
            target="_blank"
            rel="noreferrer"
          >
            <img
              height="36"
              className="border-0 hidden sm:flex h-12"
              src="https://storage.ko-fi.com/cdn/kofi2.png?v=3"
              alt="Buy Me a Coffee at ko-fi.com"
            />
          </a>
        </div>
      </nav>
    </div>
  )
}
