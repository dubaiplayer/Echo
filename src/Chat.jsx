import "./App.css"
import { getAuth, signOut } from "firebase/auth";
import Cookies from "universal-cookie"
import { useEffect, useState } from 'react';
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy } from "firebase/firestore"
import { db } from "./Firebase"

export const Chat = () => {
    const cookies = new Cookies()
    const auth = getAuth();

    const [newPost, setNewPost] = useState("")
    const postsRef = collection(db, "posts")
    const [posts, setPosts] = useState([])

    const Signout = () => {

        signOut(auth).then(() => {
            cookies.remove('auth-token', { path: '/' });
            console.log("Signed Out")

            window.open("/")
        }).catch((error) => {
            console.error(error)
        });
    }

    useEffect(() => {
        const queryPosts = query(postsRef,
            orderBy("createdAt"))
        const unsuscribe = onSnapshot(queryPosts, (snapshot) => {
            let posts = []
            snapshot.forEach((doc) => {
                posts.push({...doc.data(), id:doc.id})
            })
            setPosts(posts)
        })
        return () => unsuscribe()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (newPost == "") return

        await addDoc(postsRef, {
            text: newPost,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            photo: auth.currentUser.photoURL,
        })

        setNewPost("")
    }
    
  return (
    <div>
        <h1 id="title" className="text">Echo Feed</h1>
        <div>{posts.map((posts) => 
        <div key={posts.id} className="texts">
            <div className="post-container">
                <div className="user-profile-section">
                    <h3 className="single-post">{posts.user}</h3>
                    <img className="profile-pic" src={posts.photo}></img>
                </div>
                <h4 className="single-post">{posts.text}</h4>
                {/* <h5 className="single-post">{posts.createdAt}</h5> */}
                <button className="like" >❤️</button>
            </div>
        </div>)}</div>

        <form onSubmit={handleSubmit} className='new-post-form'>
            <textarea className='new-post-input' onChange={(e) => setNewPost(e.target.value)} value={newPost}>
            </textarea>
            <button type="submit" className='post-button'>Post!</button>
            
        </form>
        <button id="signout" className='homeButton' onClick={()=>{Signout()}}>Sign Out</button>
    </div>
  )
}
