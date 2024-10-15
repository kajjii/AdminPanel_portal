import { legacy_createStore, combineReducers, compose, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk'
import filters from '../reducers/filters';
import heroes from '../reducers/heroes';

const stringMiddleware = () => (next) => (action) => {
    if(typeof action === 'string') {
        return next({
            type: action
        })
    }
    return next(action)
}

// const enhancer = (legacy_createStore) => (...args) => {

//     const store = legacy_createStore(...args)

//     const oldDispatch = store.dispatch
//     store.dispatch = (action) => {
//         if(typeof action === 'string') {
//             return oldDispatch({
//                 type: action
//             })
//         }
//         return oldDispatch(action)
//     }

//     return store
// }

const store = legacy_createStore(
                    combineReducers({filters, heroes}), 
                    compose(
                        applyMiddleware(thunk, stringMiddleware),
                    ));

export default store;