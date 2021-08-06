import React, { useRef, useState, useEffect } from 'react';
import { RiChatSmile2Line } from 'react-icons/ri';
import { FiLogOut } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { auth } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';
import { Helmet } from 'react-helmet';
import './Chats.css';
import axios from 'axios';

const Chats = () => {

    const history = useHistory();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);

    const handleLogout = async () => {
        await auth.signOut();

        history.push('./')
    }

    const getFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob();
        return new File([data], "userPhoto.jpg", {type: 'image/jpeg'});
    }

    useEffect(() => {
        if(!user) {
            history.push('./');
            return;
        }

        axios.get('https://api.chatengine.io/users/me', {
            headers: {
                "project-id": process.env.REACT_APP_CHAT_ENGINE_ID,
                "user-name": user.email,
                "user-secret": user.uid
            }
        })
        .then(() => {
            setLoading(false);
        })
        .catch(() => {
            let formdata = new FormData();
            formdata.append('email', user.email);
            formdata.append('username', user.email);
            formdata.append('secret', user.uid);

            getFile(user.photoURL)
                .then((avatar) => {
                    formdata.append('avatar', avatar, avatar.name);
                    axios.post(
                        'https://api.chatengine.io/users',
                        formdata,
                        {
                            headers: {
                                "private-key": process.env.REACT_APP_CHAT_ENGINE_KEY
                            }
                        }
                    )
                    .then(() => setLoading(false))
                    .catch((error) => console.log(error))
                })
        })
    }, [user, history]);

    if(!user || loading) return "Loading...";

    return (
        <div className='chats-page'>
            <Helmet>
                <title>Dilog | My Chats</title>
                <meta
                    name="description"
                    content="Chat with others using Dilog."
                />
            </Helmet>
            <div className='nav-bar'>
                <div className='logo-tab'>
                    <h1>
                        Dilog<RiChatSmile2Line/>
                    </h1>
                </div>
                <div
                    className='logout-tab'
                    onClick={handleLogout}
                >
                    <button className='logout-button'>
                        <FiLogOut/><span className='logout-text'>Logout</span>
                    </button>
                </div>
            </div>
            <ChatEngine
                height='calc(100vh - 66px)'
                projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
                userName={user.email}
                userSecret={user.uid}
            />
        </div>
    )
}

export default Chats;