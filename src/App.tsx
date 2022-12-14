import React from 'react'

import Box from '@mui/material/Box'
import { LoginComponent } from './pages/login/login.component'
import { SignUpComponent } from './pages/signUp/signUp.component'
import { NotesComponent } from './pages/notes/main.component'
import { MainComponent } from './pages/main/main.component'

export const App = () => {
  return (
    <Box
      sx={{

        backgroundColor: ({ palette }) => palette.background.default,
      }}
    >
    </Box>
  )
}

App.displayName = 'AppComponent'