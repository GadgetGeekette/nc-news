import { UserContext } from '../contexts/UserContext';
import { useContext } from 'react';
import '../styling/header.css';

const Header = ({test}, {two}) => {
    const {user} = useContext(UserContext);
    
    return (<p className="header">
        Hello {user.username}
    </p>);
};

export default Header