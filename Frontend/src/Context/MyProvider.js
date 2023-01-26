import { createContext, useContext, useState, useEffect } from "react"

const MyContext = createContext();



export const MyProvider = ({ children }) => {
    const [user, setUser] = useState({})
    const [selectedChat,setSelectedChat]=useState();
    const [contacts,setContacts]=useState([])
    
    useEffect(() => {

        const data = JSON.parse(localStorage.getItem("userDetails"))
        setUser(data)

    }, [])


    return (
        <MyContext.Provider value={{ user, setUser, selectedChat, setSelectedChat, contacts, setContacts }}>
            {children}
        </MyContext.Provider>
    )
}
export const ChatState = () => {
    return useContext(MyContext)
}

