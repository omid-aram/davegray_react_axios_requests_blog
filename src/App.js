import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Header from './Header';
import Nav from './Nav';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing';
import Footer from './Footer';
import { format } from 'date-fns';

function App() {
  const API_URL = "http://localhost:3500/posts";

  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error("Please Reload the Page");

        const result = await response.json();
        setPosts(result);

      } catch (err) {
        console.log(err);
      }
    }

    //fetchPosts();
    (async () => await fetchPosts())();
  }, []);

  useEffect(() => {
    const filteredResults = posts.filter(x =>
      ((x.title).toLowerCase()).includes(search.toLowerCase())
      || ((x.title).toLowerCase()).includes(search.toLowerCase()));

    setSearchResults(filteredResults.reverse());
  }, [posts, search])

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, datetime, title: postTitle, body: postBody };
    const allPosts = [...posts, newPost];
    setPosts(allPosts);
    setPostTitle('');
    setPostBody('');
    navigate("/");
  }

  const handleDelete = (id) => {
    const postsList = posts.filter(x => x.id !== id);
    setPosts(postsList);
    navigate("/");
  };

  return (
    <div className="App">
      <Header title="React JS Blog" />
      <Nav search={search} setSearch={setSearch} />
      <Routes>
        <Route path="/" element={
          <Home
            posts={searchResults}
          />
        } />
        <Route path="/post" element={
          <NewPost
            handleSubmit={handleSubmit}
            postTitle={postTitle}
            setPostTitle={setPostTitle}
            postBody={postBody}
            setPostBody={setPostBody}
          />
        } />
        <Route path="/post/:id" element={
          <PostPage
            posts={posts}
            handleDelete={handleDelete} />
        } />
        <Route path="/about" element={
          <About />
        } />
        <Route path="*" element={
          <Missing />
        } />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
