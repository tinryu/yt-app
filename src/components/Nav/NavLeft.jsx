import {Link} from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import List from '../Playlists/List';

export default function NavLeft() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <div className="d-flex flex-column">
              <div className="d-inline-block">
                <img alt="" src={"/assets/icon/dududu.png"} width="30" height="30" className="align-top" />
                <span>Dududuplayer</span>
              </div>
              <small style={{fontSize: '0.5rem', textAlign: 'right'}}>design by TinTruong</small>
            </div>
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <Nav defaultActiveKey="/home" className="flex-column">
          <Link className='nav-link' to={'home'}>
            <i className="icon">
              <svg role="img" height="24" width="24" className="home-icon" aria-hidden="true" viewBox="0 0 24 24"><path d="M12.5 3.247a1 1 0 00-1 0L4 7.577V20h4.5v-6a1 1 0 011-1h5a1 1 0 011 1v6H20V7.577l-7.5-4.33zm-2-1.732a3 3 0 013 0l7.5 4.33a2 2 0 011 1.732V21a1 1 0 01-1 1h-6.5a1 1 0 01-1-1v-6h-3v6a1 1 0 01-1 1H3a1 1 0 01-1-1V7.577a2 2 0 011-1.732l7.5-4.33z"></path></svg>
              <svg role="img" height="24" width="24" className="home-active-icon active" aria-hidden="true" viewBox="0 0 24 24"><path d="M13.5 1.515a3 3 0 00-3 0L3 5.845a2 2 0 00-1 1.732V21a1 1 0 001 1h6a1 1 0 001-1v-6h4v6a1 1 0 001 1h6a1 1 0 001-1V7.577a2 2 0 00-1-1.732l-7.5-4.33z"></path></svg>
            </i>
            Home
          </Link>
          <Link className='nav-link' to={'/play-list'}>
            <i className="icon">
              <svg role="img" height="24" width="24" className="collection-icon" aria-hidden="true" viewBox="0 0 24 24"><path d="M14.5 2.134a1 1 0 011 0l6 3.464a1 1 0 01.5.866V21a1 1 0 01-1 1h-6a1 1 0 01-1-1V3a1 1 0 01.5-.866zM16 4.732V20h4V7.041l-4-2.309zM3 22a1 1 0 01-1-1V3a1 1 0 012 0v18a1 1 0 01-1 1zm6 0a1 1 0 01-1-1V3a1 1 0 012 0v18a1 1 0 01-1 1z"></path></svg>
              <svg role="img" height="24" width="24" className="collection-active-icon active" aria-hidden="true" viewBox="0 0 24 24"><path d="M3 22a1 1 0 01-1-1V3a1 1 0 012 0v18a1 1 0 01-1 1zM15.5 2.134A1 1 0 0014 3v18a1 1 0 001 1h6a1 1 0 001-1V6.464a1 1 0 00-.5-.866l-6-3.464zM9 2a1 1 0 00-1 1v18a1 1 0 102 0V3a1 1 0 00-1-1z"></path></svg>
            </i>
            PlayList
          </Link>
          <Link className='nav-link' to={'/create-list'}>
            <i className="icon">
              <svg role="img" height="24" width="24" className="create-icon" aria-hidden="true" viewBox="0 0 16 16"><path d="M15.25 8a.75.75 0 01-.75.75H8.75v5.75a.75.75 0 01-1.5 0V8.75H1.5a.75.75 0 010-1.5h5.75V1.5a.75.75 0 011.5 0v5.75h5.75a.75.75 0 01.75.75z"></path></svg>
            </i>
            Create List
          </Link>
          <Link className='nav-link disabled'>
            <i className="icon">
              <svg role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 16 16"><path d="M15.724 4.22A4.313 4.313 0 0012.192.814a4.269 4.269 0 00-3.622 1.13.837.837 0 01-1.14 0 4.272 4.272 0 00-6.21 5.855l5.916 7.05a1.128 1.128 0 001.727 0l5.916-7.05a4.228 4.228 0 00.945-3.577z"></path></svg>
            </i>
            Liked
          </Link>
        </Nav>
        <hr />
        <Nav>
          <Nav.Link href="/contact" eventKey="contact">Contact</Nav.Link>
        </Nav>
        <List data={[]}/>
      </Container>
    </>
  )
}
