import Link from 'next/link';
import { Container, Navbar, Nav } from 'react-bootstrap';

const UserNav = () => {
  return (
    <Container fluid>
      {/* Header */}
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#">Club Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="mr-auto">
            <Nav.Link href="#">Overview</Nav.Link>
            <Nav.Link href="#">Events</Nav.Link>
            <Nav.Link href="#">Activities</Nav.Link>
            <Nav.Link href="#">Resources</Nav.Link>
            <Nav.Link href="#">Committees</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
  </Container>

  )
}

export default UserNav


// {
// DRIBBLE,BEHANCE, FREEPICK

// }