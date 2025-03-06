import { useState } from "react";


const LikeButton = () => {

    const [liked, setLiked] = useState(false);

    // Toggle like status
    const toggleLike = () => {
        setLiked(!liked);
    };

    return (
        <div>

            <button className="like-button"
                onClick={toggleLike}
                className={`like-button ${liked ? 'liked' : ''}`}
            >
                {liked ? '❤️ Liked' : '♡ Like'}
            </button>
        </div>

    )
}

export default LikeButton;