import Menu from './MenuComponent'
import Dishdetail from './DishdetailComponent '
import Header from './HeaderComponent'
import Footer from './FooterComponent'
import Home from './HomeComponent'
import Contact from './ContactComponent'
import About from './AboutComponent'
import {
  Switch,
  Route,
  Redirect,
  useParams,
  withRouter,
} from 'react-router-dom'
// why??? "withRouter is necessary to connect the component using react-redux"
// answer in the bottom
import { connect } from 'react-redux'

function Main(props) {
  const HomePage = () => {
    return (
      <Home
        dish={props.dishes.find((dish) => dish.featured)}
        promotion={props.promotions.find((promotion) => promotion.featured)}
        leader={props.leaders.find((leader) => leader.featured)}
      />
    )
  }

  const DishWithId = ({ match }) => {
    const params = useParams()
    // console.log(JSON.stringify(match))
    // console.log(params)
    return (
      <Dishdetail
        dish={props.dishes.find(
          (dish) => dish.id === parseInt(match.params.dishId, 10)
        )}
        comments={props.comments.filter(
          (comment) => comment.dishId === Number(params.dishId)
        )}
      />
    )
  }

  return (
    <div>
      <Header />
      <Switch>
        <Route path="/home" component={HomePage} />
        <Route
          exact
          path="/menu"
          // render={(props) => <Menu {...props} dishes={props.dishes} />}
          /* https://ui.dev/react-router-v4-pass-props-to-components/ & https://reactrouter.com/web/api/Route */
          component={() => <Menu dishes={props.dishes} />}
        />
        <Route exact path="/menu/:dishId" component={DishWithId} />
        <Route exact path="/contactus" component={Contact} />
        <Route
          exact
          path="/aboutus"
          component={() => <About leaders={props.leaders} />}
        />
        <Redirect to="/home" />
      </Switch>
      <Footer />
    </div>
  )
}

const mapStateToProps = (state) => ({
  dishes: state.dishes,
  comments: state.comments,
  promotions: state.promotions,
  leaders: state.leaders,
})

// export default withRouter(connect(mapStateToProps, null)(Main)) why withRouter?, search...
export default connect(mapStateToProps, null)(Main)
// return the connected component
