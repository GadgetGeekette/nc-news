import './App.css';
import {Routes,Route} from 'react-router-dom';
import Header from './components/Header';
import Nav from './components/Nav';
import Home from './components/Home';
import ArticleList from './components/ArticleList';
import { UserProvider } from './contexts/UserContext';

function App() {
  const username = '';

  return (
    <UserProvider>
      <Header username={username} />
      <Nav />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/articles/:sort_by?/:order?' element={<ArticleList />}></Route>
        {/* <Route path='/articles/:filterByUser' element={<ArticleList />}></Route> */}
      </Routes>
    </UserProvider>
  )
};

export default App;