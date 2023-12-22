import AuthMenu from './authMenu'
import AuthBurger from './authBurger'
import { tabs } from './tabs'
import Tab from './tab'

export const Nav = () => {
  return (
    <div className="bg-base-200 text-base-content">
      <nav className="px-4 pt-4 flex gap-4 sm:w-full max-w-[55rem] mx-auto text-sm items-center justify-between">
        <AuthBurger />
        <div role="tablist" className="hidden md:flex tabs tabs-lifted tabs-lg">
          {tabs.map((tab, index) => (
            <Tab name={tab.name} path={tab.path} key={index} />
          ))}
        </div>
        <AuthMenu />
      </nav>
    </div>
  )
}
