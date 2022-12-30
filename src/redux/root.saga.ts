import { BrowserHistory } from "history";
import { all, fork } from "typed-redux-saga";
import { navigationMasterSaga } from "./navigation/navigation.master.saga";
import { notesMasterSaga } from "./notes/notes.master.saga";
import { sessionMasterSaga } from "./session/session.master.saga";

export default function* root(history: BrowserHistory) {
    yield* all([
        fork(notesMasterSaga),
        fork(sessionMasterSaga),
        fork(navigationMasterSaga, history)
    ])
}
