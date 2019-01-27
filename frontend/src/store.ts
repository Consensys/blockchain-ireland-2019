import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import initReducers from './initReducers';

export default function configureStore() {
 return createStore(
    initReducers,
   applyMiddleware(thunk)
 );
}