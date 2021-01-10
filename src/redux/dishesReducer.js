import { DISHES } from '../shared/dishes'

export const Dishes = (state = DISHES, action) => {
  switch (action.type) {
    default:
      return state
    // remember, accodding FCC is always important return the defaut state, since when an action is
    // dispatched, others reducers even not related to the action will run
  }
}
