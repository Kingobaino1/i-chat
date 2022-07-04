import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Logo from '../assets/logo.svg';

const Contacts = ({ contacts, currentUser, changeChat }) => {
  const [currentUserName, setCurrentUserName] = useState(undefined)
  const [currentUserImage, setCurrentUserImage] = useState(undefined)
  const [currentSelected, setCurrentSelected] = useState(undefined)
  useEffect(() => {
    const fetchCurrentUser = async() => {
      const data = await currentUser
      if(data){
        setCurrentUserName(currentUser.username);
        setCurrentUserImage(currentUser.avatarImage);
      }
    }
    fetchCurrentUser()
  }, [currentUser]);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  }
  return(
    <>
      {
        currentUserName && currentUserImage && (
          <Container>
            <div className="brand">
              <img src={Logo} alt="logo"/>
              <h3>i-chat</h3>
            </div>
            <div className="contacts">
              {
                contacts && contacts.map((contact, index) => {
                  return(
                    <div className={`contact ${
                           index === currentSelected ? 'selected' : ''
                         }`}
                         key={index}
                         onClick={() => changeCurrentChat(index, contact)}
                    >
                      <div className="avatar">
                        <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="avatar"/>
                      </div>
                      <div className="username">
                        <h3>{contact.username}</h3>
                      </div>
                    </div>
                  )
                })
              }
            </div>
            <div className="current-user">
              <div className="avatar">
                  <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="avatar"/>
              </div>
              <div className="username">
                <h2>{currentUserName}</h2>
              </div>
            </div>
          </Container>
        )
      }
    </>
  )
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    align-items: center;
    flex-direction: column;
    overflow: auto;
    gap: 0.8rem;
    &::::-webkit-scrollbar {
      width: .2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff39;
      min-height: 3rem;
      width: 100%;
      cursor: pointer;
      border-radius: 0.2rem;
      padding: 0.4rem;
      gap: 1rem;
      display: flex;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background-color: #9186f3;
    }
  }
  .current-user {
    background-color: #0d0d30
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
  }

  @media screen and (min-width: 720px) and (max-width: 1080px){
    gap: 0.5rem;
    .username {
      font-size: 1rem;
    }
  }
  @media screen and (min-width: 390px) and (max-width: 720px){
    gap: 0.5rem;
    .username {
      font-size: 1rem;
    }
  }
`;

export default Contacts