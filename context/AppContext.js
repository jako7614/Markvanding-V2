import { createContext, useContext, useEffect, useState } from "react"
import cookie from "cookie-cutter"

const AppContext = createContext()

export function AppWrapper({children}) {
    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        var bool = cookie.get("loggedin")
        if (bool){
            setLoggedIn(bool)
        }
    }, [])

    return(
        <AppContext.Provider value={{loggedIn, setLoggedIn}}>
            {children}
        </AppContext.Provider>
    )
}

export function UseAppContext() {
    return useContext(AppContext)
}