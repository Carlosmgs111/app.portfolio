import { Header, Content, Footer, Banner, Icon } from './styles'
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
import { useEffect } from 'react'

export function App() {
  const { clearAuth } = useApp()
  const [{ useStateValue }, ACTIONS] = getContext(CONTEXTS.Global)
  const [{ token, loading: globalLoading }, dispatch] = useStateValue()
  const [showLogin, switchShowLogin] = useSwitch(false, true)

  const pages = [
    'projects',
    'technologies',
    'skills',
    'certifications',
    'organizations',
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

  console.log(document.onscroll /* ("scroll",(e)=>console.log({e})) */)

  useEffect(() => {
    dispatch({
      type: ACTIONS.setNavbarHeight,
      payload: document.getElementById('navbar')?.offsetHeight,
    })
  }, [])

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
      <Header>
        <Navigation
          className="navbar"
          banner={{ title: <Banner>Blogfolio</Banner>, to: '/' }}
        >
          {NavigationItemsFactory({
            pages,
            login: {
              label: () => (
                <Icon
                  state={Boolean(token)}
                  className="fa-solid fa-fingerprint"
                ></Icon>
              ),
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
      </Header>
      <Content>
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
            root: 'technologies',
            element: inConstruction,
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
            root: 'organizations',
            element: inConstruction,
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
