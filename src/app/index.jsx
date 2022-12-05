import { Header, Content, Footer, Banner, Icon, ContentBanner } from './styles'
import Navigation from '../components/Navigation'
import { Routes } from 'react-router-dom'
import { Login } from '../components/Login'
import { getContext, CONTEXTS } from '../contexts'
import { RoutesFactory, NavigationItemsFactory } from '../pages'
import { useSwitch } from '../hooks/useSwitch'
import { useApp } from '../hooks/useApp'
import { Home } from '../pages/Home'
import { Skills } from '../pages/Skills'
import { Projects } from '../pages/Projects'
import { Certifications } from '../pages/Certifications'
import { Modal } from '../components/Modal'
import { injectAttrsToReactElements } from '../utils'
import { useEffect, useLayoutEffect, useState } from 'react'
import { useScroll } from '../hooks/useScroll'

export function App() {
  const { clearAuth } = useApp()
  const [{ useStateValue }, ACTIONS] = getContext(CONTEXTS.Global)
  const [{ token, loading: globalLoading }, dispatch] = useStateValue()
  const [showLogin, switchShowLogin] = useSwitch(false, true)
  const [showFixed, setShowFixed] = useState(false)
  // useScroll()

  useEffect(() => {
    const onScroll = (e) => {
      const newShowFixed = window.scrollY > 200
      showFixed !== newShowFixed &&
        setTimeout(() => setShowFixed(newShowFixed), 500) // ? delay effect 500 ms
    }
    document.addEventListener('scroll', onScroll)
  }, [showFixed])

  const pages = [
    'projects',
    'skills',
    'certifications',
    'blog',
  ]

  if (token) pages.unshift('profile')

  const inConstruction = (
    <Modal
      {...{
        over: false,
        injected: (
          <img
            src={
              'https://www.dcs.mx/Manual%20de%20usuario/tutoriales/images/5.jpg'
            }
          />
        ),
      }}
    />
  )

  return (
    <>
      {showLogin && (
        <Login
          {...{
            embedButton: (
              <i
                type="button"
                onClick={switchShowLogin}
                className="far fa-times-circle embed-button"
              />
            ),
          }}
        />
      )}
      <Header showFixed={showFixed}>
        <Navigation
          className="navbar"
          banner={{ title: <Banner>Blogfolio</Banner>, to: '/' }}
        >
          {NavigationItemsFactory({
            pages,
            login: {
              label: () =>
                token ? 'Logout' : 'Login',
                // <Icon
                //   state={Boolean(token)}
                //   className="fa-solid fa-fingerprint"
                // ></Icon>
              onClick: (e) => {
                e.preventDefault()
                switchShowLogin()
                if (token) {
                  if (window.confirm('Are you sure you want logout?')) {
                    clearAuth()
                    dispatch({ type: ACTIONS.reset })
                  }
                }
              },
            },
          }).map((page, index) =>
            injectAttrsToReactElements([page], { key: index }),
          )}
        </Navigation>
        {/* <h1 id="box">°</h1> */}
      </Header>
      <Content>
        {/* <ContentBanner></ContentBanner> */}
        <Routes>
          {RoutesFactory({
            root: '',
            element: <Home />,
          })}
          {RoutesFactory({
            root: 'profile',
            element: inConstruction,
          })}
          {RoutesFactory({
            root: 'projects',
            element: <Projects />,
          })}
          {RoutesFactory({
            root: 'skills',
            element: <Skills />,
          })}
          {RoutesFactory({
            root: 'certifications',
            subDomains: ['uuid', 'title'],
            element: <Certifications />,
          })}
          {RoutesFactory({
            root: 'blog',
            element: inConstruction,
          })}
        </Routes>
      </Content>
      <Footer></Footer>
    </>
  )
}
