import React, { useState } from 'react'
export const userDataContext = React.createContext()

function UserContext({ children }) {
    const [userData, setUserData] = useState(null)
    
    const value = {
        userData,
        setUserData
    }

    return (
        <userDataContext.Provider value={value}>
            {children}
        </userDataContext.Provider>
    )
}

export default UserContext
