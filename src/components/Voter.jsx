import "../Voter.css";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';

export default function Voter({ votes, updateAPILikes, setUserLikes, userLikes, isLikesErr }) {

    const updateAllLikes = (value) => {
        setUserLikes((currentLikes) => {
            return currentLikes + value;
        });
        updateAPILikes(value)
    }

    return (
        <>
        {!isLikesErr ? (
            <div className="button-container">
            <button
                disabled={userLikes === -1}
                aria-label="dislike"
                onClick={() => {
                updateAllLikes(-1);
                }}
            >
                <ThumbDownOffAltIcon/>
            </button>
            <h3>
            {votes + userLikes}
            </h3>
            <button
                disabled={userLikes === 1}
                aria-label="like"
                onClick={() => {
                updateAllLikes(1);
                }}
            >
                <ThumbUpOffAltIcon />
            </button>
            </div>
        ) : (
            <p>Likes not currently working</p>
        )}
        </>
    );
    }
