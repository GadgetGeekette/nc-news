import { UserContext } from '../contexts/UserContext';
import { useContext } from 'react';

const Header = () => {
    const {user} = useContext(UserContext);

    return (<p className="header">
        Hello {user.username}
    </p>);
};

export default Header