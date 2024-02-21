import { useEffect, useState } from "react"
import axios from "axios";
import './style.css';


function Search() {

    const [users, setUser] = useState([])
    const [showModal, setShow] = useState({})
    const FetchData = async (event) => {
        event.preventDefault();

        // fetch("https://api.github.com/search/users?q=abhishekgarfield").then((res) => res.json()).then((val) => console.log("----1---",val))
        const response = await axios.get("https://api.github.com/search/users?q="+event.target.userName.value).then((val) => val.data)
        setUser(response.items)
    }

    const handleClick = (url) => {
        setShow({status: true, path: url})
    }

    return (
    <div>
        <form onSubmit={(event) => FetchData(event)} style = {{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <label htmlFor = ""> Enter User name</label><br/>
            <div style = {{display: "flex", justifyContent: "space-between", flexDirection: "row"}}>
                <input name = "userName" style = {{marginRight: "10px", border: "none", border: "1px solid black", 
                borderRadius: "10px"}}></input><br/>
                <input type = "submit" style = {{backgroundColor: "black", color: "white", padding: "10px",
            boxShadow: "2px 3px 10px black", borderRadius: "30px"}}></input><br/>
            </div>
        </form>   

    <table>
        <tbody>
            {users.map((val, index) => <tr key = {index}>
            <td><img src = {val.avatar_url}></img></td>
            <td>{val.login}</td>
            <td><button onClick= {() => handleClick(val.followers_url)}>Followers</button></td>
            <td><button onClick={() => handleClick(val.following_url.replace(/{\/other_user}/g,""))}>Following</button></td></tr> )} 
        </tbody>
    </table>
    {showModal.status == true  && <Display showModal = {showModal} setShow = {setShow}/> }

    </div>
    )
}
 
export const Display = ({showModal, setShow}) => {
    const [FollowList, setFollowList] = useState([])
    const getFollowers = async () => {
        const response = await axios.get(showModal.path).then((res) => res.data)
        setFollowList(response)
    }   

    useEffect(() => {
        getFollowers()
    }, [showModal.path])

    return (<div className="followListDiv">
        <div className="followList">
        <div className="followListCloseButton">
                <button onClick={() => setShow({status: false, url: ''})}>X</button>
        </div>
        <div style={{overflow: "scroll", height: "inherit"}}>
            <table>
            <tbody>
                {FollowList.map(({login, avatar_url}, index) => <tr key = {index}><td>{login}</td>
                <td><img src = {avatar_url}/></td></tr>)}
                </tbody>
            </table>
        </div>
        </div>
    </div>)
}

export default Search