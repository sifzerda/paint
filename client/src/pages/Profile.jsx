import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import '../App.css';
import '../minesweeper.css';

const Profile = () => {
    // Fetch user data
   

    return (
        <div className="profile-container">
            <div className="jumbo-bg-dark">
                <h1 className='jumbo-bg-dark-text'>{user.username}'s Profile</h1>
            </div>
 
            
            <h2 className='profile-text'>Your Conversations:</h2>
            
            {conversationsData?.getConversations.length === 0 ? (
                <p className="black-text">No conversations yet!</p>
            ) : (
                <div className="conversations">
                    {conversationsData.getConversations.map((conv) => (
                        <div key={conv._id} className="conversation">
                            <p className="black-text"><strong>{conv.sender.username}</strong>: {conv.message}</p>
                            <p className="black-text"><em>{new Date(conv.timestamp).toLocaleString()}</em></p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Profile;