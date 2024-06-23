import { createContext, useState } from "react";

// TODO: add user roles when implementing CRUD for articles

export const UserContext = createContext()

export const UserProvider = (({ children }) => {
    const [user, setUser] = useState({ id:1, username: 'cooljmessy' }) // TODO: update after user login functionality added

    return (
        <UserContext.Provider value={({ user, setUser })}>
            {children}
        </UserContext.Provider>
    )
})

export default UserProvider
