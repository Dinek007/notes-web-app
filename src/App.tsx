import React from 'react'

import Box from '@mui/material/Box'
import { LoginComponent } from './pages/login/login.component'
import { SignUpComponent } from './pages/signUp/signUp.component'

export const App = () => {
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: ({ palette }) => palette.background.default,
      }}
    >
    <LoginComponent />
    {/* <SignUpComponent /> */}
    </Box>
  )
}

App.displayName = 'AppComponent'