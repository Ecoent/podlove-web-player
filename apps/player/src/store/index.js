import Vue from 'vue'
import sagas from '@podlove/sagas'
import runtimeSaga from '@podlove/sagas/runtime'
import lifecycleSaga from '@podlove/sagas/lifecycle'
import playerSaga from '@podlove/sagas/player'
import componentsSaga from '@podlove/sagas/components'
import chaptersSaga from '@podlove/sagas/chapters'
import quantilesSaga from '@podlove/sagas/quantiles'
import versionSaga from '@podlove/sagas/version'
import { createStore, applyMiddleware, compose } from 'redux'
import { connect } from 'redux-vuex'
import { version } from '../../package';

import reducers from './reducers'
import actions from './actions'
import selectors from './selectors'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducers, composeEnhancers(applyMiddleware(sagas.middleware)))

connect({ Vue, store, actions })

// Connect Sagas
sagas.run(
  lifecycleSaga,
  runtimeSaga,
  componentsSaga,
  quantilesSaga,
  chaptersSaga({ selectDuration: selectors.duration, selectPlaytime: selectors.playtime, selectCurrentChapter: selectors.chapters.current, selectChapterList: selectors.chapters.list }),
  playerSaga({ selectMedia: selectors.media, selectPlaytime: selectors.playtime }),
  versionSaga({ version })
)

export default store