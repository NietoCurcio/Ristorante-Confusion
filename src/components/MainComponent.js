import Menu from './MenuComponent'
import Dishdetail from './DishdetailComponent '
import Header from './HeaderComponent'
import Footer from './FooterComponent'
import Home from './HomeComponent'
import { DISHES } from '../shared/dishes'
import { useState } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

function Main() {
  const [dishes, setDishes] = useState(DISHES)

  const HomePage = () => {
    return <Home />
  }

  return (
    <div>
      <Header />
      <Switch>
        <Route path='/home' component={HomePage} />
        <Route
          exact
          path='/menu'
          render={(props) => <Menu {...props} dishes={dishes} />}
        />
        {/* https://ui.dev/react-router-v4-pass-props-to-components/ */}
        {/* https://reactrouter.com/web/api/Route */}
        <Redirect to='/home' />
      </Switch>
      <Footer />
    </div>
  )
}

export default Main
