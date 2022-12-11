import { BrowserHistory } from 'history';
import { call } from 'typed-redux-saga';
import { NavigationActions } from './navigation.slice';

export function* navigationSaga(
    history: BrowserHistory,
    action: NavigationActions['navigate']
) {
    yield* call(history.push, action.payload)
}
