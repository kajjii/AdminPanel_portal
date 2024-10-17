import { configureStore } from '@reduxjs/toolkit'
import filters from '../components/heroesFilters/filtersSlice';
import heroes from '../components/heroesList/heroesSlice';

const stringMiddleware = () => (next) => (action) => {
    if(typeof action === 'string') {
        return next({
            type: action
        })
    }
    return next(action)
}

// const store = legacy_createStore(
//                     combineReducers({filters, heroes}), 
//                     compose(
//                         applyMiddleware(thunk, stringMiddleware),
//                     ));

const store = configureStore({
    reducer: {filters, heroes},
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
})

export default store;