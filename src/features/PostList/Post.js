import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, selectPosts } from '../../app/redditSlice'

const Post = () => {

    const dispatch = useDispatch();
    const subreddits = useSelector(selectPosts);
  
    useEffect(() => {
      dispatch(fetchPosts());
    }, [dispatch]);

    return (
        <div>
            <ul className="subreddits-list">
                {subreddits.map((redditPost) => (
                <li key={redditPost.id}>
                    <img 
                        src={redditPost.icon_img || `https://api.adorable.io/avatars/25/${redditPost.display_name}`}
                        alt={`${redditPost.display_name}`}
                    />
                    {redditPost.display_name}
                </li>
                ))}
            </ul>
        </div>

        // <div className="PostContainer">
        //     <h2>Subreddits</h2>
        //     <ul>
        //         {subreddits.map((redditPost) => (
        //             <li key={redditPost.id}>
        //                 <button type="button">
        //                     <img src={ redditPost.icon_img || `https://api.adorable.io/avatars/25/${redditPost.display_name}`} alt={`${redditPost.display_name}`} />
        //                     {redditPost.display_name}
        //                 </button>
        //             </li>
        //         ))}
        //     </ul>
        // </div>
    )
}

export default Post;