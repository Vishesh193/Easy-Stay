import React, { useState, useEffect } from 'react'
export const authDataContext = React.createContext()

function AuthContext({ children }) {
    const [loading, setLoading] = useState(false)
    const [userData, setUserData] = useState(null)
    let serverUrl = "http://localhost:8000"

    useEffect(() => {
        const storedUser = localStorage.getItem('userData')
        if (storedUser) {
            setUserData(JSON.parse(storedUser))
        }
    }, [])

    let value = {
        serverUrl,
        loading,
        setLoading,
        userData,
        setUserData
    }
    return (
        <authDataContext.Provider value={value}>
            {children}
        </authDataContext.Provider>
    )
}

export default AuthContext
