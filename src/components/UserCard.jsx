export default function UserCard({ username, name, avatar_url }) {
    
    
    return (
        <section className="user-card">
            <img
            src={avatar_url}
            alt={`a photo to depict the user: ${name}`}
            />
            <div className="user-card-content">
            <h2>{name}</h2>
            <p>{username}</p>
            </div>
        </section>
    );
}