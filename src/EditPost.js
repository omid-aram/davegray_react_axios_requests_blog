import { useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import DataContext from './context/DataContext';

const EditPost = () => {
    const { posts, handleEdit, editTitle, setEditTitle, editBody, setEditBody } = useContext(DataContext);

    const { id } = useParams();
    const post = posts.find(x => (x.id).toString() === id);

    useEffect(() => {
        if (post) {
            setEditTitle(post.title);
            setEditBody(post.body);
        }
    }, [post , setEditTitle, setEditBody]);

    return (
        <main className='NewPost'>
            {editTitle &&
                <>
                    <h2>Edit Post</h2>
                    <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
                        <label htmlFor="postTitle">Title:</label>
                        <input
                            id="postTitle"
                            type="text"
                            required
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                        />
                        <label htmlFor="postBody">Post:</label>
                        <textarea
                            id="postBody"
                            required
                            value={editBody}
                            onChange={(e) => setEditBody(e.target.value)}
                        />
                        <button type="submit" onClick={() => handleEdit(post.id)}>Submit</button>
                    </form>
                </>
            }
            {!editTitle &&
                <>
                    <h2>Post Not Found</h2>
                    <p>Well, that's disappointing.</p>
                    <p>
                        <Link to="/">Visit Our HomePage</Link>
                    </p>
                </>
            }
        </main >
    )
}

export default EditPost