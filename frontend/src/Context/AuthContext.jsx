import React, { useState } from 'react'
export const authDataContext = React.createContext()

function AuthContext({ children }) {
    const [loading, setLoading] = useState(false)
    let serverUrl = "http://localhost:8000"
    let value = {
        serverUrl,
        loading,
        setLoading
    }
    return (
        <authDataContext.Provider value={value}>
            {children}
        </authDataContext.Provider>
    )
}

export default AuthContext
