import { useContext, useState } from "react";
import { UsernameContext } from "../context/username";



export default function UserSelect({users}) {
    const { setLoggedUser } = useContext(UsernameContext);
    const [ submitUsername, setSubmitUsername] = useState("");
    const [ usernameInvalid, setUsernameInvalid ] = useState(false);  


    return (
        <>
        <form onSubmit={(event) => {
            event.preventDefault()
            let isTrueOrFalse = true;
            
            users.map(user => {
                if(user.username === submitUsername.toLowerCase()) {
                    setLoggedUser({
                        ...user
                    });
                    isTrueOrFalse = false
                }
                return null;
            })
            setUsernameInvalid(isTrueOrFalse)
        }} className="log-in">
            <h2 className="log-in-title">Log in</h2>
            <label htmlFor="existing-username">username: </label>
            <input value={submitUsername} onChange={(event) => {
                setSubmitUsername(event.target.value)
            }} id="existing-username" placeholder="e.g. jessjelly"></input>
            <button className="submit-btn" type="submit">Go!</button>
            {usernameInvalid ? <p className="username-invalid">could not find existing username, please try again!</p> : null}
        </form>
            <p className="log-in"> some existing usernames you can choose from: <br/>cooljmessy, tickle122, grumpy19 ...</p>
        </>
    )
}