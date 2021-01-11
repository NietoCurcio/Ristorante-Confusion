import { useEffect } from 'react'
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
  // eslint-disable-next-line
  withRouter,
} from 'react-router-dom'
// withRouter is necessary to connect the component using react-redux
// answer in the bottom
import { connect } from 'react-redux'
import { addComment, fetchDishes } from '../redux/actionCreators'
import { useStore, useDispatch } from 'react-redux'

function Main(props) {
  // "you can think of useEffect Hook as componentDidMount, componentDidUpdate, and componentWillUnmount combined"
  // it runs af every re-render, the second argument tracks what state we are concerned
  const store = useStore()
  const dispatch = useDispatch()
  const { fetchDishes } = props
  useEffect(() => {
    async function fetchData() {
      console.log('it takes time, test state update and async function')
      console.log(store.getState().dishes)
      console.log('AFTER AWAIT')
      await fetchDishes()
      console.log(store.getState().dishes)
    }
    fetchData()
    // eslint-disable-next-line
    // fetchDishes()
  }, [fetchDishes])
  const HomePage = () => {
    return (
      <Home
        dish={props.dishes.dishes.find((dish) => dish.featured)}
        dishesLoading={props.dishes.isLoading}
        dishesErrMess={props.dishes.errorMessage}
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
        dish={props.dishes.dishes.find(
          (dish) => dish.id === parseInt(match.params.dishId, 10)
        )}
        isLoading={props.dishes.isLoading}
        errMess={props.dishes.errorMessage}
        comments={props.comments.filter(
          (comment) => comment.dishId === Number(params.dishId)
        )}
        addComment={props.addComment}
      />
    )
  }

  const { dishes } = props
  return (
    <div>
      <Header />
      <Switch>
        <Route path="/home" component={HomePage} />
        <Route
          exact
          path="/menu"
          render={(routeProps) => {
            // console.log('passing props')
            // console.log(props)
            // console.log(dishes)
            return <Menu {...routeProps} dishes={dishes} />
          }}
          /* https://ui.dev/react-router-v4-pass-props-to-components/ & https://reactrouter.com/web/api/Route */
          // component={() => <Menu {...props} dishes={props.dishes} />}
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

// https://react-redux.js.org/using-react-redux/connect-mapdispatch
// for mapDispatchToProps we have 2 approaches, as a function:
const mapDispatchToProps = (dispatch) => ({
  addComment: (dishId, rating, author, comment) =>
    dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes: () => dispatch(fetchDishes()),
})
// as a object:
// const mapDispatchToProps = {
//   addComment,
// }

// export default withRouter(connect(mapStateToProps, null)(Main))
//  withRouter allows us to access match and history props from react-router-dom in child components
//  that needs props, like Menu, but since I'm passing these props in {...props} to the Menu component
// through the render router attribute, I can access the route properties, like match and history normally
// If I were using component= router method and passing a function (not appropriate according router documentation)
// it would be necessary
export default connect(mapStateToProps, mapDispatchToProps)(Main)
// return the connected component
