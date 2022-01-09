import React from 'react';
import { Button, Container, Navbar } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';

export const Header = () => {
  const user = useTracker(() => Meteor.user());
  const logout = () => Meteor.logout();

  return (
    <Navbar sticky='top' bg='light' expand='lg'>
      <Container>
        <Navbar.Brand>Discussion Board</Navbar.Brand>
        {user && user.emails && (
          <Navbar.Text className='justify-content-end'>
            <span style={{ fontSize: '14px' }}>{user.emails[0].address}</span>
            <Button
              variant='outline-dark'
              size='sm'
              className='mx-2'
              onClick={logout}
            >
              Logout
            </Button>
          </Navbar.Text>
        )}
      </Container>
    </Navbar>
  );
};
