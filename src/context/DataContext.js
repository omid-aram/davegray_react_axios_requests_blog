import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import api from '../api/posts';
import useWindowSize from '../hooks/useWindowSize';
import useAxiosFetch from '../hooks/useAxiosFetch';

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const [editTitle, setEditTitle] = useState('');
    const [editBody, setEditBody] = useState('');
  
    const navigate = useNavigate();
    const { width } = useWindowSize();
  
    const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts');
  
    useEffect(() => {
      setPosts(data);
    }, [data]);
  
    useEffect(() => {
      const filteredResults = posts.filter(x =>
        ((x.title).toLowerCase()).includes(search.toLowerCase())
        || ((x.title).toLowerCase()).includes(search.toLowerCase()));
  
      setSearchResults(filteredResults.reverse());
    }, [posts, search])
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
      const datetime = format(new Date(), 'MMMM dd, yyyy pp');
      const newPost = { id, datetime, title: postTitle, body: postBody };
      try {
        const response = await api.post('/posts', newPost);
        const allPosts = [...posts, response.data /*newPost*/];
        setPosts(allPosts);
        setPostTitle('');
        setPostBody('');
        navigate("/");
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    }
  
    const handleEdit = async (id) => {
      const datetime = format(new Date(), 'MMMM dd, yyyy pp');
      const updatedPost = { id, datetime, title: editTitle, body: editBody };
      try {
        const response = await api.put(`/posts/${id}`, updatedPost);
        setPosts(posts.map(x => x.id === id ? { ...response.data } : x));
        setEditTitle('');
        setEditBody('');
        navigate("/");
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    }
  
    const handleDelete = async (id) => {
      try {
        await api.delete(`/posts/${id}`);
        const postsList = posts.filter(x => x.id !== id);
        setPosts(postsList);
        navigate("/");
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    };
  
    return (
        <DataContext.Provider value={{
            width, search, setSearch,
            searchResults, fetchError, isLoading,
            handleSubmit, postTitle, setPostTitle, postBody, setPostBody,
            posts, handleDelete,
            handleEdit, editTitle, setEditTitle, editBody, setEditBody
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;