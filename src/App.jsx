import './styling/App.css';
import {Routes,Route} from 'react-router-dom';
import Header from './components/Header';
import Nav from './components/Nav';
import Home from './components/Home';
import ArticleList from './components/ArticleList';
import Article from './components/Article';
import { UserProvider } from './contexts/UserContext';
import Topics from './components/TopicList';
import SortArticles from './components/SortArticles';
import { useState } from 'react';
import ErrorPage from './components/ErrorPage';

// TODO: create theme to unify and simplify component colour scheme, including dark and light options 

function App() {

  const username = '';
  const [sort, setSort] = useState(null);
  const [topic, setTopic] = useState(null);

  return (
    <UserProvider>
      <Header username={username} />
      <Nav />
      <Topics setTopic={setTopic}/>
      <SortArticles setSort={setSort}/>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/articles/:id' element={<Article />}></Route>
        <Route path='/articles' element={<ArticleList sort={sort} />}></Route>
        <Route path='/*' element={<ErrorPage />}></Route>
      </Routes>
    </UserProvider>
  )
}

export default App;
