import {createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import createSagaMiddle  from '../redux-saga/middleware';
import { rootSaga } from './saga'; // saga其实是一个生成器

const sagaMiddleware = createSagaMiddle();
console.log(sagaMiddleware)

const store = applyMiddleware(sagaMiddleware)(createStore)(reducer);
sagaMiddleware.run(rootSaga);
export default store;