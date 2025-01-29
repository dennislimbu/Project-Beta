import React from 'react';
import { Navbar, Container, Image } from 'react-bootstrap';
import './header.css';

function Header({ user }) {
  return (
    <Navbar className="header-custom">
      <Container fluid className="d-flex justify-content-between align-items-center">
        <Navbar.Brand className="text-white"></Navbar.Brand>
        {user ? (
          <div className="user-info d-flex align-items-center ml-auto">
            <Image src={user.image || 'default-image-url'} roundedCircle className="user-image me-2" />
            <div className="user-details text-dark">
              <div className="user-name">{user.firstName} {user.lastName}</div>
              <div className="user-position">{user.position}</div>
            </div>
          </div>
        ) : (
          <div className="text-white ml-auto">User not logged in</div>
        )}
      </Container>
    </Navbar>
  );
}

export default Header;