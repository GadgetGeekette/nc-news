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
import { useState, useEffect } from 'react';
import ErrorPage from './components/ErrorPage';

function App() {

  const username = '';
  const [sort, setSort] = useState(null);
  const [topic, setTopic] = useState(null);

  const [articlesInput, setArticlesInput] = useState({
    sort: null,
    topic: null
  });
  const [topicsInput, setTopicsInput] = useState({
    topic: null,
    setTopic: setTopic
  });

  useEffect(() => {
    setArticlesInput({
      topic: topic,
      sort: sort
    });
  }, [sort, topic]);

  useEffect(() => {
    setTopicsInput({
      topic: topic,
      setTopic: setTopic
    });
  }, [topic]);

  return (
    <UserProvider>
      <Header username={username} />
      <Nav />
      <Topics topicsInput={topicsInput}/>
      <SortArticles setSort={setSort}/>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/articles/:id' element={<Article />}></Route>
        <Route path='/articles' element={<ArticleList articleListInput={articlesInput} />}></Route>
        <Route path='/*' element={<ErrorPage />}></Route>
      </Routes>
    </UserProvider>
  )
}

export default App;
