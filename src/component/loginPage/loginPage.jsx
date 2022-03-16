import { useState } from 'react';
import { connect } from 'react-redux';
import { usersAPI } from '../../api/api';
import './loginPage.scss';
import {setAuthorized} from '../../redux/login';

const LoginPage = ({setAuthorized}) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    
    const clickHandler = () => {
        usersAPI.getAuth()
        .then((response) => {
            response.forEach(item => {
                if (item.login === login && item.password == password) {
                    setAuthorized();
                }
            });
        });
    }

    return (
        <div className="form__wrapper">
            <div className="form">
                <h1>Login</h1>
                <div className="form__input">
                    <input type="text" placeholder='username' value = {login} onChange ={e => setLogin(e.target.value)}/>
                </div>
                <div className="form__input">
                    <input type="password" placeholder='password' value = {password} onChange ={e => setPassword(e.target.value)}/>
                </div>
                <input type="button" className='form__button' value='Sign in' onClick={clickHandler}/>
            </div>
        </div>
    )
}

export default connect(null,{setAuthorized})(LoginPage);