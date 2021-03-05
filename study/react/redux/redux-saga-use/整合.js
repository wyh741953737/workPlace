export function * combineSage() {
    yield all([loginSage(), listSage()])
}

//整合，依次调用（combineReducer）