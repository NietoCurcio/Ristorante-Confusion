import Menu from './MenuComponent'
import Dishdetail from './DishdetailComponent '
import Header from './HeaderComponent'
import Footer from './FooterComponent'
import Home from './HomeComponent'
import Contact from './ContactComponent'
import About from './AboutComponent'
import { DISHES } from '../shared/dishes'
import { PROMOTIONS } from '../shared/promotions'
import { LEADERS } from '../shared/leaders'
import { COMMENTS } from '../shared/comments'
import { useState } from 'react'
import { Switch, Route, Redirect, useParams } from 'react-router-dom'

function Main() {
  const [state, setState] = useState({
    dishes: DISHES,
    comments: COMMENTS,
    leaders: LEADERS,
    promotions: PROMOTIONS,
  })

  const HomePage = () => {
    return (
      <Home
        dish={state.dishes.find((dish) => dish.featured)}
        promotion={state.promotions.find((promotion) => promotion.featured)}
        leader={state.leaders.find((leader) => leader.featured)}
      />
    )
  }

  const DishWithId = ({ match }) => {
    const params = useParams()
    // console.log(JSON.stringify(match))
    // console.log(params)
    return (
      <Dishdetail
        dish={state.dishes.find(
          (dish) => dish.id === parseInt(match.params.dishId, 10)
        )}
        comments={state.comments.filter(
          (comment) => comment.dishId === Number(params.dishId)
        )}
      />
    )
  }

  return (
    <div>
      <Header />
      <Switch>
        <Route path='/home' component={HomePage} />
        <Route
          exact
          path='/menu'
          render={(props) => <Menu {...props} dishes={state.dishes} />}
        />
        {/* https://ui.dev/react-router-v4-pass-props-to-components/ & https://reactrouter.com/web/api/Route */}
        <Route exact path='/menu/:dishId' component={DishWithId} />
        <Route exact path='/contactus' component={Contact} />
        <Route
          exact
          path='/aboutus'
          component={() => <About leaders={state.leaders} />}
        />
        <Redirect to='/home' />
      </Switch>
      <Footer />
    </div>
  )
}

export default Main
