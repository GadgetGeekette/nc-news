import { createContext, useState } from "react";

export const UserContext = createContext()

export const UserProvider = (({ children }) => {
    const [user, setUser] = useState({ id:1, username: 'Nina' }) // TODO: update after user login functionality added

    return (
        <UserContext.Provider value={({ user, setUser })}>
            {children}
        </UserContext.Provider>
    )
})

export default UserProvider

