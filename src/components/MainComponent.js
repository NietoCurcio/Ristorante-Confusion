import { useEffect, useRef } from 'react'
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
// withRouter is necessary to connect the component using react-redux
// answer in the bottom
import { connect } from 'react-redux'
import {
  postComment,
  fetchDishes,
  fetchComments,
  fetchPromos,
  fetchLeaders,
  postFeedback,
} from '../redux/actionCreators'
import { useStore, useDispatch } from 'react-redux'
import { actions } from 'react-redux-form'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

function Main(props) {
  // "you can think of useEffect Hook as componentDidMount, componentDidUpdate, and componentWillUnmount combined"
  // it runs af every re-render, the second argument tracks what state we are concerned
  const store = useStore()
  const dispatch = useDispatch()
  const { fetchDishes, fetchComments, fetchPromos, fetchLeaders } = props
  const dishesRef = useRef(null)
  console.log('Function Component Life Cycle')
  // dishesRef.current = props.dishes.dishes
  useEffect(() => {
    dishesRef.current = props.dishes.dishes
  })
  useEffect(() => {
    async function fetchData() {
      // console.log('it takes time, test state update and async function')
      // console.log('Begin effect')
      // console.log(store.getState().dishes.dishes)
      // console.log(props.dishes.dishes)
      // console.log(dishesRef.current)
      // await fetchDishes()
      // console.log('After await')
      // console.log(props.dishes.dishes)
      // console.log(dishesRef.current)
      // console.log(store.getState().dishes.dishes)
      // console.log('End effect')
      fetchDishes()
      fetchComments()
      fetchPromos()
      fetchLeaders()
    }
    console.log('UseEffect Life Cycle')
    fetchData()
    // eslint-disable-next-line
    // fetchDishes()
  }, [fetchDishes, fetchComments, fetchPromos])
  const HomePage = () => {
    // console.log(props)
    // console.log(props.dishes.dishes)
    // console.log(props.leaders.leaders)
    return (
      <Home
        dish={props.dishes.dishes.find((dish) => dish.featured)}
        dishesLoading={props.dishes.isLoading}
        dishesErrMess={props.dishes.errorMessage}
        promotion={props.promotions.promotions.find(
          (promotion) => promotion.featured
        )}
        promosLoading={props.promotions.isLoading}
        promosErrMess={props.promotions.errorMessage}
        leader={props.leaders.leaders.find((leader) => leader.featured)}
        leadersLoading={props.leaders.isLoading}
        leadersErrMess={props.leaders.errorMessage}
      />
    )
  }

  const DishWithId = ({ match }) => {
    // Reading react router that may not be appropriate, create a component with that just returns another
    // component to deal the component react router attribute, because of the parent child relationship, when
    // we have an update to the state react has to re-render two components (parent DishWithId and child DishDetail)
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
        comments={props.comments.comments.filter(
          (comment) => comment.dishId === Number(params.dishId)
        )}
        commentsErrMess={props.comments.errorMessage}
        postComment={props.postComment}
      />
    )
  }

  const { dishes } = props
  return (
    <div>
      <Header />
      <TransitionGroup>
        {console.log('Render Method Life Cycle')}
        {/* {console.log(props)} */}
        <CSSTransition key={props.location.key} classNames="page" timeout={300}>
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
            <Route
              exact
              path="/contactus"
              render={(routeProps) => (
                <Contact
                  {...routeProps}
                  resetFeedbackForm={props.resetFeedbackForm}
                  postFeedback={props.postFeedback}
                />
              )}
            />
            <Route
              exact
              path="/aboutus"
              component={() => <About leaders={props.leaders} />}
            />
            <Redirect to="/home" />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
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
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  postComment: (dishId, rating, author, comment) =>
    dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes: () => dispatch(fetchDishes()),
  resetFeedbackForm: () => dispatch(actions.reset('feedback')),
  fetchLeaders: () => dispatch(fetchLeaders()),
  postFeedback: (feedback) => dispatch(postFeedback(feedback)),
})
// as a object:
// const mapDispatchToProps = {
//   addComment,
// }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main))
//  withRouter allows us to access match and history props from react-router-dom in child components
//  that needs props, like Menu, but since I'm passing these props in {...props} to the Menu component
// through the render router attribute, I can access the route properties, like match and history normally
// If I were using component= router method and passing a function (not appropriate according router documentation)
// it would be necessary
// UPDATE knowing that we need to use props.location, it was necessary bring this object
// export default connect(mapStateToProps, mapDispatchToProps)(Main)
// return the connected component
