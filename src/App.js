import logo from './logo.svg'
import './App.css'
import { Navbar } from 'react-bootstrap'

function App() {
  return (
    <div className='App'>
      <Navbar bg='dark' variant='dark'>
        <Navbar.Brand href='#home'>
          <img
            alt=''
            src='/logo.svg'
            width='30'
            height='30'
            className='d-inline-block align-top'
          />{' '}
          React Bootstrap
        </Navbar.Brand>
      </Navbar>
    </div>
  )
}

export default App
