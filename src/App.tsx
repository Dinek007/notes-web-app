import React from 'react'
import Box from '@mui/material/Box'
import { useDispatch } from 'react-redux'
import { sessionActions } from './redux/session/session.slice'

export const App = () => {
  const dispatch = useDispatch()

  if (window.performance) {
    if (performance.navigation.type == 1) {
      dispatch(sessionActions.refreshPage({}));
    } else {
      dispatch(sessionActions.refreshPage({}));
    }
  }

  return (
    <Box
      sx={{ backgroundColor: ({ palette }) => palette.background.default}}
    >
    </Box>
  )
}

App.displayName = 'AppComponent'