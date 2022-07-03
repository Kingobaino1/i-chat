import styled from 'styled-components';
import Robot from '../assets/robot.gif';

const Welcome = ({ currentUser }) => {
  return (
    <Container>
      <img src={Robot} alt="robot"/>
      <h1>Welcome, <span>{currentUser.username}!</span></h1>
      <h3>Please select who you want to chat with to start messaging.</h3>
    </Container>
  )
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  img {
    height: 20rem;
  }
  span {
    color: #4e00ff; 
  }
`;

export default Welcome;
