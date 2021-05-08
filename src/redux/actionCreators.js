import * as ActionTypes from './actionTypes'
import { DISHES } from '../shared/dishes'
import { baseUrl } from '../shared/baseURL'
import { auth, fireauth, firestore, firebasestore } from '../firebase/firebase'

export const addComment = (comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: comment,
})

export const postComment = (dishId, rating, author, comment) => (dispatch) => {
  console.log('POST COMMENT ACTION CREATOR')
  console.log(auth)
  console.log(auth.currentUser)
  console.log(firebasestore)
  console.log(firebasestore.FieldValue)
  if (!auth.currentUser) {
    console.log('No user logged in')
    return
  }

  return firestore
    .collection('comments')
    .add({
      author: {
        _id: auth.currentUser.uid,
        firstname: auth.currentUser.displayName
          ? auth.currentUser.displayName
          : auth.currentUser.email,
      },
      dish: dishId,
      rating: rating,
      comment: comment,
      createdAt: firebasestore.FieldValue.serverTimestamp(),
      updatedAt: firebasestore.FieldValue.serverTimestamp(),
    })
    .then((docRef) => {
      console.log('EAE')
      console.log(docRef)
      firestore
        .collection('comments')
        .doc(docRef.id)
        .get()
        .then((doc) => {
          console.log('EAE2')
          console.log(doc)
          if (doc.exists) {
            const data = doc.data()
            console.log('EAE3')
            console.log(data)
            const _id = doc.id
            const comment = { _id, ...data }
            dispatch(addComment(comment))
          } else {
            console.log('No document')
          }
        })
    })

  // Before: using json-server with db.json
  // const newComment = {
  //   dishId,
  //   rating,
  //   author,
  //   comment,
  // }
  // newComment.date = new Date().toISOString()

  // fetch(baseUrl + 'comments', {
  //   method: 'POST',
  //   body: JSON.stringify(newComment),
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   credentials: 'same-origin',
  // })
  //   .then(
  //     (response) => {
  //       if (response.ok) return response
  //       else {
  //         console.log('response is not ok ' + response.ok + response.status)
  //         let error = new Error(
  //           'Error ' + response.status + ': ' + response.statusText
  //         )
  //         error.response = response
  //         throw error
  //       }
  //     },
  //     (error) => {
  //       let errMsg = new Error(error.message)
  //       throw errMsg
  //     }
  //   )
  //   .then((response) => response.json())
  //   .then((comment) => dispatch(addComment(comment)))
  //   .catch((error) => {
  //     console.log(console.log('Post comments ', error.message))
  //     alert('Your Comment could not be posted\nError: ' + error.message)
  //   })
}

export const fetchDishes = () => async (dispatch) => {
  dispatch(dishesLoading(true))
  return firestore
    .collection('dishes')
    .get()
    .then((snapshot) => {
      console.log('DISHES SNAPSHOT FIREBASE')
      console.log(snapshot)
      const dishes = []
      snapshot.forEach((doc) => {
        const data = doc.data()
        const _id = doc.id
        dishes.push({ _id, ...data })
      })
      console.log('FETDISHES FIREBASE')
      console.log(dishes)
      return dishes
    })
    .then((dishes) => dispatch(addDishes(dishes)))
    .catch((error) => dispatch(dishesFailed(error.message)))
  // Before: using json-server with db.json
  // dispatch(dishesLoading(true))
  // // function delay() {
  // //   return new Promise((resolve, reject) => {
  // //     setTimeout(() => {
  // //       resolve(DISHES)
  // //     }, 2000)
  // //   })
  // // }
  // // const response = await delay()
  // // dispatch(addDishes(response))
  // return fetch(baseUrl + 'dishes')
  //   .then(
  //     (response) => {
  //       // here is when we get a response from the server
  //       console.log('First argument promise (we get a response)')
  //       if (response.ok) return response
  //       else {
  //         console.log('reponse is not ok ' + response.ok + response.status)
  //         let error = new Error(
  //           'Error ' + response.status + ': ' + response.statusText
  //         )
  //         error.response = response
  //         throw error
  //       }
  //     },
  //     (error) => {
  //       // when we do not hear anything from the server, test with the server not runing
  //       console.log('Second argument promise')
  //       let errMsg = new Error(error.message)
  //       throw errMsg
  //     }
  //   )
  //   .then((response) => response.json())
  //   .then((dishes) => dispatch(addDishes(dishes)))
  //   .catch((error) => {
  //     console.log('Catch rejected promise')
  //     console.log(error)
  //     dispatch(dishesFailed(error.message))
  //   })
}

export const dishesLoading = () => ({
  type: ActionTypes.DISHES_LOADING,
})

export const dishesFailed = (error) => ({
  type: ActionTypes.DISHES_FAILED,
  payload: error,
})

export const addDishes = (dishes) => ({
  type: ActionTypes.ADD_DISHES,
  payload: dishes,
})

export const fetchComments = () => async (dispatch) => {
  return firestore
    .collection('comments')
    .get()
    .then((snapshot) => {
      let comments = []
      snapshot.forEach((doc) => {
        const data = doc.data()
        const _id = doc.id
        comments.push({ _id, ...data })
      })
      return comments
    })
    .then((comments) => dispatch(addComments(comments)))
    .catch((error) => dispatch(commentsFailed(error.message)))
  // Before: using json-server with db.json
  // fetch(baseUrl + 'comments')
  //   .then(
  //     (response) => {
  //       if (response.ok) return response
  //       else {
  //         let error = new Error(
  //           'Error ' + response.status + ': ' + response.statusText
  //         )
  //         error.response = response
  //         throw error
  //       }
  //     },
  //     (error) => {
  //       let errMsg = new Error(error.message)
  //       throw errMsg
  //     }
  //   )
  //   .then((response) => response.json())
  //   .then((comments) => dispatch(addComments(comments)))
  //   .catch((error) => {
  //     dispatch(commentsFailed(error.message))
  //   })
}

export const commentsFailed = (error) => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: error,
})

export const addComments = (comments) => {
  return {
    type: ActionTypes.ADD_COMMENTS,
    payload: comments,
  }
}

export const fetchPromos = () => async (dispatch) => {
  dispatch(promosLoading(true))

  return firestore
    .collection('promotions')
    .get()
    .then((snapshot) => {
      let promos = []
      snapshot.forEach((doc) => {
        const data = doc.data()
        const _id = doc.id
        promos.push({ _id, ...data })
      })
      return promos
    })
    .then((promos) => dispatch(addPromos(promos)))
    .catch((error) => dispatch(promosFailed(error.message)))
  // Before: using json-server with db.json
  // dispatch(promosLoading(true))
  // fetch(baseUrl + 'promotions')
  //   .then(
  //     (response) => {
  //       if (response.ok) return response
  //       else {
  //         let error = new Error(
  //           'Error ' + response.status + ': ' + response.statusText
  //         )
  //         error.response = response
  //         throw error
  //       }
  //     },
  //     (error) => {
  //       let errMsg = new Error(error.message)
  //       throw errMsg
  //     }
  //   )
  //   .then((response) => response.json())
  //   .then((promos) => dispatch(addPromos(promos)))
  //   .catch((error) => {
  //     dispatch(promosFailed(error.message))
  //   })
}

export const promosLoading = () => ({
  type: ActionTypes.PROMOS_LOADING,
})

export const promosFailed = (error) => ({
  type: ActionTypes.PROMOS_FAILED,
  payload: error,
})

export const addPromos = (promos) => ({
  type: ActionTypes.ADD_PROMOS,
  payload: promos,
})

export const fetchLeaders = () => async (dispatch) => {
  // Before: using json-server with db.json
  // dispatch(leadersLoading(true))
  // fetch(baseUrl + 'leaders')
  //   .then(
  //     (response) => {
  //       if (response.ok) return response
  //       else {
  //         let error = new Error(
  //           'Error ' + response.status + ': ' + response.statusText
  //         )
  //         error.response = response
  //         throw error
  //       }
  //     },
  //     (error) => {
  //       let errMsg = new Error(error.message)
  //       throw errMsg
  //     }
  //   )
  //   .then((response) => response.json())
  //   .then((Leaders) => dispatch(addLeaders(Leaders)))
  //   .catch((error) => {
  //     dispatch(leadersFailed(error.message))
  //   })
  dispatch(leadersLoading())

  return firestore
    .collection('leaders')
    .get()
    .then((snapshot) => {
      let leaders = []
      snapshot.forEach((doc) => {
        const data = doc.data()
        const _id = doc.id
        leaders.push({ _id, ...data })
      })
      return leaders
    })
    .then((leaders) => dispatch(addLeaders(leaders)))
    .catch((error) => dispatch(leadersFailed(error.message)))
}

export const leadersLoading = () => ({
  type: ActionTypes.LEADERS_LOADING,
})

export const leadersFailed = (error) => ({
  type: ActionTypes.LEADERS_FAILED,
  payload: error,
})

export const addLeaders = (leaders) => ({
  type: ActionTypes.ADD_LEADERS,
  payload: leaders,
})

export const postFeedback = (feedback) => (dispatch) => {
  return firestore
    .collection('feedback')
    .add(feedback)
    .then((response) => {
      console.log('Feedback', response)
      alert('Thank you for your feedback!')
    })
    .catch((error) => {
      console.log('Feedback', error.message)
      alert('Your feedback could not be posted\nError: ' + error.message)
    })
  // return fetch(baseUrl + 'feedback', {
  //   method: 'POST',
  //   body: JSON.stringify(feedback),
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   credentials: 'same-origin',
  // })
  //   .then(
  //     (response) => {
  //       if (response.ok) return response
  //       else {
  //         let error = new Error(
  //           'Error ' + response.status + ': ' + response.statusText
  //         )
  //         error.response = response
  //         throw error
  //       }
  //     },
  //     (error) => {
  //       let errMsg = new Error(error.message)
  //       throw errMsg
  //     }
  //   )
  //   .then((response) => response.json())
  //   .then((feedback) => JSON.stringify(feedback))
  //   .catch((error) => {
  //     alert('Feedback could not be posted\nError: ' + error.message)
  //   })
}

export const requestLogin = () => {
  return {
    type: ActionTypes.LOGIN_REQUEST,
  }
}

export const receiveLogin = (user) => {
  console.log('RECEIVE LOGIN FELIPAO')

  return {
    type: ActionTypes.LOGIN_SUCCESS,
    user,
  }
}

export const loginError = (message) => {
  return {
    type: ActionTypes.LOGIN_FAILURE,
    message,
  }
}

export const loginUser = (creds) => (dispatch) => {
  // We dispatch requestLogin to kickoff the call to the API
  dispatch(requestLogin(creds))
  return auth
    .signInWithEmailAndPassword(creds.username, creds.password)
    .then(() => {
      var user = auth.currentUser
      localStorage.setItem('user', JSON.stringify(user))
      // Dispatch the success action
      dispatch(fetchFavorites())
      dispatch(receiveLogin(user))
    })
    .catch((error) => dispatch(loginError(error.message)))
}

export const requestLogout = () => {
  return {
    type: ActionTypes.LOGOUT_REQUEST,
  }
}

export const receiveLogout = () => {
  return {
    type: ActionTypes.LOGOUT_SUCCESS,
  }
}

// Logs the user out
export const logoutUser = () => (dispatch) => {
  dispatch(requestLogout())
  auth
    .signOut()
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    })
  localStorage.removeItem('user')
  dispatch(favoritesFailed('Error 401: Unauthorized'))
  dispatch(receiveLogout())
}

export const postFavorite = (dishId) => (dispatch) => {
  if (!auth.currentUser) {
    console.log('No user logged in!')
    return
  }

  return firestore
    .collection('favorites')
    .add({
      user: auth.currentUser.uid,
      dish: dishId,
    })
    .then((docRef) => {
      firestore
        .collection('favorites')
        .doc(docRef.id)
        .get()
        .then((doc) => {
          if (doc.exists) {
            dispatch(fetchFavorites())
          } else {
            // doc.data() will be undefined in this case
            console.log('No such document!')
          }
        })
    })
    .catch((error) => dispatch(favoritesFailed(error.message)))
}

export const deleteFavorite = (dishId) => (dispatch) => {
  if (!auth.currentUser) {
    console.log('No user logged in!')
    return
  }

  var user = auth.currentUser

  return firestore
    .collection('favorites')
    .where('user', '==', user.uid)
    .where('dish', '==', dishId)
    .get()
    .then((snapshot) => {
      console.log(snapshot)
      snapshot.forEach((doc) => {
        console.log(doc.id)
        firestore
          .collection('favorites')
          .doc(doc.id)
          .delete()
          .then(() => {
            dispatch(fetchFavorites())
          })
      })
    })
    .catch((error) => dispatch(favoritesFailed(error.message)))
}

export const fetchFavorites = () => (dispatch) => {
  if (!auth.currentUser) {
    console.log('No user logged in!')
    return
  }

  var user = auth.currentUser

  dispatch(favoritesLoading(true))

  return firestore
    .collection('favorites')
    .where('user', '==', user.uid)
    .get()
    .then((snapshot) => {
      let favorites = { user: user, dishes: [] }
      snapshot.forEach((doc) => {
        const data = doc.data()
        favorites.dishes.push(data.dish)
      })
      console.log(favorites)
      return favorites
    })
    .then((favorites) => dispatch(addFavorites(favorites)))
    .catch((error) => dispatch(favoritesFailed(error.message)))
}

export const favoritesLoading = () => ({
  type: ActionTypes.FAVORITES_LOADING,
})

export const favoritesFailed = (errmess) => ({
  type: ActionTypes.FAVORITES_FAILED,
  payload: errmess,
})

export const addFavorites = (favorites) => ({
  type: ActionTypes.ADD_FAVORITES,
  payload: favorites,
})

export const googleLogin = () => (dispatch) => {
  const provider = new fireauth.GoogleAuthProvider()

  auth
    .signInWithPopup(provider)
    .then((result) => {
      var user = result.user
      localStorage.setItem('user', JSON.stringify(user))
      // Dispatch the success action
      dispatch(fetchFavorites())
      dispatch(receiveLogin(user))
    })
    .catch((error) => {
      dispatch(loginError(error.message))
    })
}
