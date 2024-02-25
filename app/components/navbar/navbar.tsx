import AuthMenu from './authMenu'
import AuthBurger from './authBurger'
import { tabs } from './tabs'
import Tab from './tab'
import { UserButton, auth } from '@clerk/nextjs'
import getInfoAuthCookie from '@/app/server-actions/helpers/getInfoAuthCookie'

export const Nav = async () => {
  const { userId } = auth()
  const payload = await getInfoAuthCookie(userId)

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
              payload &&
              tab.requireLogin === true && (
                <Tab name={tab.name} path={tab.path} key={index} />
              )
            )
          })}
        </div>
        <div className="flex justify-center items-center">
          <AuthMenu isLogged={payload ? true : false} />
          <UserButton />
        </div>
      </nav>
    </div>
  )
}
