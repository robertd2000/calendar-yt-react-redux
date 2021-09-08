import { useSelector } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useTypedSelector } from '../hooks/UseTypedSelector'
import { privateRoutes, publicRoutes, RouteNames } from '../routes'

const AppRouter = () => {
  const { isAuth } = useTypedSelector((state) => state.auth)
  return isAuth ? (
    <Switch>
      {privateRoutes.map((route) => {
        return (
          <Route
            path={route.path}
            exact={route.exact}
            component={route.component}
            key={route.path}
          />
        )
      })}
      <Redirect to={RouteNames.EVENT} />
    </Switch>
  ) : (
    <Switch>
      {publicRoutes.map((route) => {
        return (
          <Route
            path={route.path}
            exact={route.exact}
            component={route.component}
            key={route.path}
          />
        )
      })}
      <Redirect to={RouteNames.LOGIN} />
    </Switch>
  )
}
export default AppRouter
