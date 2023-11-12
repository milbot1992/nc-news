const UserPopup = ({ onClose, onLogout }) => (
    <div className="user-popup">
        <div className="user-popup-option" onClick={onClose}>
        User Profile
        </div>
        <div className="user-popup-option" onClick={onLogout}>
        Logout
        </div>
    </div>
);

export default UserPopup;