import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { allUsers, host } from '../utils/APIRoutes';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import { io } from 'socket.io-client';

const Chat = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  const socket = useRef();

  useEffect(() => {
    const fetchCurrentUser = async() => {
      if(!localStorage.getItem('i-chat-user')){
        navigate('/login');
      } else {
      setCurrentUser(await JSON.parse(localStorage.getItem('i-chat-user')));
      setIsLoaded(true);
      }
    }
    fetchCurrentUser()

  }, []);

  useEffect(() => {
    if(currentUser) {
      socket.current = io(host);
      socket.current.emit('add-user', currentUser._id);
    }
  }, [currentUser])

  useEffect(() => {
    const fetchUsers = async() => {
      if(currentUser){
        if(currentUser.isAvatarImageSet){
          const data = await axios.get(`${allUsers}/${currentUser._id}`);
          setContacts(data.data.users);
        } else {
          navigate('/setAvatar');
        }
      }
    }
    fetchUsers();
  }, [currentUser])

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  }
  return (
    <Container>
      <div className="container">
        <Contacts
          contacts={contacts}
          currentUser={currentUser}
          changeChat={handleChatChange}
        />
        { isLoaded && currentChat === undefined ? (
          <Welcome currentUser={currentUser} /> 
        ) :
        (
          currentUser && (
            <ChatContainer
              currentChat={currentChat}
              currentUser={currentUser}
              socket={socket}
            />
          )
        )
        }

      </div>
    </Container>
  )
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  .container {
    height: 90vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px){
      grid-template-columns: 35% 65%;
    }
    @media screen and (min-width: 390px) and (max-width: 844px){
      grid-template-rows: 40% 55%;
    }
  }
`;


export default Chat;
