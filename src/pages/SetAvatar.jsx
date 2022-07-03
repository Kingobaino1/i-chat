import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Loader from '../assets/loader.gif';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import * as routes from '../utils/APIRoutes';
import { Buffer } from 'buffer';

const SetAvatar = () => {
  const api = `https://api.multiavatar.com/4645645`;
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const toastOptions = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark'
  }
  useEffect(() => {
    if(!localStorage.getItem('i-chat-user')){
      navigate('/login')
    }
  }, []);
  const setProfilePicture = async() => {
     if(selectedAvatar === undefined) {
       toast.error('Please select and image to continue', toastOptions);
     } else {
       const user = await JSON.parse(localStorage.getItem('i-chat-user'));
       const data = await axios.post(`${routes.SetAvatarRoute}/${user._id}`, {
         image: avatars[selectedAvatar],
       });
       if(data.data.isSet) {
         user.isAvatarImageSet = true;
         user.avatarImage = data.data.image;
         localStorage.setItem('i-chat-user', JSON.stringify(user));
         navigate('/');
       } else {
         toast.error('Encountered an error while setting your profile picture', toastOptions);
       }
     }
  };

  useEffect(() => {
    const fetchImage = async() => {
      const data = [];
      for(let i = 0; i < 4; i++){
        const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
        const buffer = Buffer(image.data);
        const u8 = new Uint8Array(buffer);
        const b64 = Buffer.from(u8).toString('base64')
        data.push(b64);
      }
      setAvatars(data);
      setIsLoading(false);
    }
    fetchImage();
  }, [])

 return(
   <>
    {
      isLoading ? <Container>
        <img src={Loader} alt="loader" className='loader' />
      </Container> :
      <Container>
      <div className="title-container">
        <h1>Pick one image to use as profile picture</h1>
      </div>
      <div className="avatars">
        {avatars.map((avatar, index) => {
          return (
            <div
              key={index}
              className={`avatar ${
                selectedAvatar === index ? 'selected' : ''
              }`} 
            >
              <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar"
                   onClick={() => setSelectedAvatar(index)}
              />
            </div>
          )
        })}
      </div>
      <button className='submit-btn' onClick={setProfilePicture}> Set Profile picture</button>
    </Container>
    }
    
    <ToastContainer />
   </>
 )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw
  gap: 3rem;
  background-color: #131324;
  .loader {
    max-inline-size: 100%;
  }
  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;
    margin-top: 4rem;
    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: .5s ease-in-out;
      img {
        height: 6rem;
      }
    }
    .selected {
      border: .4rem solid #4e0eff;
    }
  }
  .submit-btn {
    background-color: #997af0;
    color: white;
    padding: 1rem 2rem;
    margin-top: 4rem;
    border: none;
    font-weight: bold;
    border-radius: .4rem;
    cursor: pointer;
    font-size: 1rem;
    text-transform: uppercase;
    transition: .5s ease-in-out;
    &:hover {
      background-color: #4e0eff;
      
    }
  }
`;

export default SetAvatar;
