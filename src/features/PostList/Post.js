import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, selectPosts } from '../../app/redditSlice'

const Post = () => {

    const dispatch = useDispatch();
    const subreddits = useSelector(selectPosts);

    const map1 = subreddits.map(x => x);

    console.log(map1);
  
    useEffect(() => {
      dispatch(fetchPosts());
    }, [dispatch]);

    return (

        <div className="PostContainer">

            <button type="button" onClick={() => dispatch(fetchPosts())}>Fetch Posts</button>

            <h2>Subreddits</h2>
            <ul>
                {subreddits.map((redditPost) => (
                    <li key={redditPost.id}>
                        <button type="button">
                            <img src={ redditPost.icon_img || `https://api.adorable.io/avatars/25/${redditPost.display_name}`} alt={`${redditPost.display_name}`} />
                            {redditPost.display_name}
                        </button>
                    </li>
                ))}
            </ul>
            {/* <div className="SquareContainer">
                <div className="ImageContainer">

                </div>
            </div>
            <h2>Post Title</h2>
            <div className="PostInfo">
                <p></p>
                <p>Time since post</p>
                <p>Comments Number</p>
            </div> */}
        </div>
    )
}

export default Post;