import "./App.css"
import { getAuth, signOut } from "firebase/auth";
import Cookies from "universal-cookie"
import { useEffect, useState } from 'react';
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy } from "firebase/firestore"
// import { getStorage, ref, uploadBytes } from "firebase/storage";
import { db } from "./Firebase"


export const Chat = () => {
    const cookies = new Cookies()
    const auth = getAuth();
    // const storage = getStorage();

    const [newPost, setNewPost] = useState("")
    const postsRef = collection(db, "posts")
    const [posts, setPosts] = useState([])

    // const storageRef = ref(storage, `images/${newPost}`);

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

    const scroll = () =>{
        window.scrollTo(0, document.body.scrollHeight);
    }
    
  return (
    <div>
        <div className="navbar">
            <h1 id="title" className="text">Echo Feed</h1>
            <button id="signout" className='homeButton' onClick={()=>{Signout()}}>Sign Out</button>
            <button id="new-post-side-button" className="homeButton" onClick={()=>{scroll()}}>Go Down</button>
        </div>

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
            <textarea maxLength="500"className='new-post-input' onChange={(e) => setNewPost(e.target.value)} value={newPost}>
            </textarea>
            {/* <input type="file" onChange={(res) => setNewPost(res.target.files[0])}></input> */}
            <button type="submit" className='post-button'>Post!</button>
        </form>
    </div>
  )
}
