import * as actionType from './actionType';
import { put,  take} from '../redux-saga/effects';

export function* rootSaga() {
    for(let i = 0; i < 3; i++) {
        console.log('等待中')
        yield take(actionType.ASYNC_ADD);
        console.log('等到了')
        yield put({type: actionType.ADD});
    }
    console.log('循环完毕')
}