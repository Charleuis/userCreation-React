import { Container, Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';

const Hero = () => {
  const {userInfo} = useSelector((state) => state.auth);
  return (
   <div className=' py-5'>
  <Container className='d-flex justify-content-center'>
    <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
      {userInfo? <h1 className='text-center mb-4'>Welcome  {userInfo.name}</h1>: <h1 className='text-center mb-4'>Welcome User</h1>}
     
      <p className='text-center mb-4'>
        This is a boilerplate for MERN authentication that stores a JWT in
        an HTTP-Only cookie. It also uses Redux Toolkit and the React
        Bootstrap library
      </p>
      {userInfo ? (
        <div>
          {/* User is logged in */}
          <p>User is logged in </p>
          {/* Add any content you want to show to logged-in users here */}
        </div>
      ) : (
        <div className='d-flex'>
          <LinkContainer to='/login'>
            <Button variant='primary' href='/login' className='me-3'>
              Sign In
            </Button>
          </LinkContainer>
          <LinkContainer to='/register'>
            <Button variant='secondary' href='/register'>
              Sign Up
            </Button>
          </LinkContainer>
        </div>
      )}
    </Card>
  </Container>
</div>

  );
};

export default Hero;