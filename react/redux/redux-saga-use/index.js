function * defSaga() {
    yield takeEvery('takeEvery', function*() {
        const state =  yield  select(); // 获取所有state
        const ustate =  yield  select(state => state.user); // 获取user
        yield call(axios.post, 'http://...', {name: 'a', age: 12});

        yield  call(axios.get, '', {
            headers: {
                Authorization: `Beear ${token}` // 设置请求头，加Authorizatuon字段
            }
        })
        while(true) {
          yield take('take'); //阻塞，匹配到了执行
        }
        if(resizeBy.status === 200) {
            yield put({type: 'login_success'}, ...res.data) // put就是来发送action的
        }
    })
    yield takeLatest('takeLast', function*() {
        
    })
    yield throttle(0, 'throttle', function*() {

    })
}


// login_success，如果登录成功，吧token存到本地localStorege.setItem('token', token)
// 页面中怎么判断登录成功没有？ componentWillUpdate(newProps) { if(newProps !== this.props) {}}