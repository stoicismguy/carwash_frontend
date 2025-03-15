import { useState } from 'react'
import AuthProvider from './AuthContext'
import { RouterProvider } from 'react-router-dom'
import { appRouter } from './routers/app.router'

function App() {

    return (
        <AuthProvider>
            <RouterProvider router={appRouter} />
        </AuthProvider>
    )
}

export default App;
