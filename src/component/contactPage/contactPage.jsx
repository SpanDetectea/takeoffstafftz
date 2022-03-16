import { useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { usersAPI } from "../../api/api";
import { getUsers, deleteUser, editUser, addUser } from "../../redux/contact";
import './contactPage.scss';
import Search from "./search/search";


const ContactPage = ({ getUsers, users, deleteUser, editUser, addUser, search }) => {

    const [id, setId] = useState('');
    const [username, setUsername] = useState('');
    const [status, setStatus] = useState('');
    const [image, setImage] = useState('');
    const [button, setbutton] = useState('Add user');
    const [curSelection, setCurSelection] = useState(null);

    useEffect(() => {
        usersAPI.getUsers().then(response => {
            getUsers(response)
        });
    }, [])

    const clear = function () {
        setId('');
        setUsername('');
        setStatus('');
        setImage('');
    }

    const delUser = (id) => {
        toggleSelection();
        deleteUser(id);
        clear();
        setbutton('Add user');
    }
    const toggleSelection = () => {
        if (curSelection !== null) {
            curSelection.classList.remove('elementSelection');
        }
    }
    const edUserValue = (userId, n, s, i) => {
        toggleSelection();
        setId(userId);
        setUsername(n);
        setStatus(s);
        setImage(i);
        setbutton('Edit');
    }
    const addingUser = () => {
        if (image === '') {
            addUser(username, status, 'https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png');
        } else {
            addUser(username, status, image);
        }
        clear();
    }
    const edUser = () => {
        toggleSelection();
        editUser(id, username, status, image);
        clear();
        setbutton('Add user');
    }
    const elementSelection = (e) => {
        if (e.target.value === 'Edit user') {
            setCurSelection(e.currentTarget);
            e.currentTarget.classList.add('elementSelection');
        }
    }

    return (
        <div className="contact">
            <div className="contact__panel">
                <Search users={users} />
                <input type="text" value={username} onInput={(e) => setUsername(e.target.value)} placeholder='Enter username' maxLength='20'/>
                <input type="text" value={status} onInput={(e) => setStatus(e.target.value)} placeholder='Enter status' maxLength='50'/>
                <input type="text" value={image} onInput={(e) => setImage(e.target.value)} placeholder='Enter Image Url' />
                {button === 'Add user' ? <input className="contact__button updtateData" type="button" value='Add user' onClick={addingUser} /> :
                    <input className="contact__button updtateData" type="button" value='Edit' onClick={edUser} />}
            </div>
            {users.length > 0 ? users.map(item => {
                if (search !== '' && item.name.includes(search)) {
                    return <div className="contact__user" key={item.id} onClick={(e) => elementSelection(e)}>
                        <div>
                            <img className="contact__user__img" src={item.img} alt="" />
                        </div>
                        <div className="contact__user__name">
                            {item.name}
                        </div>
                        <div className="contact__user__status">
                            {item.status}
                        </div>
                        <input className="contact__user__edit contact__button" type="button" value='Edit user' onClick={() => edUserValue(item.id, item.name, item.status, item.img)} />
                        <input className="contact__user__del contact__button" type="button" value='Delete user' onClick={() => delUser(item.id)} />
                    </div>
                }
                else if (search === '') {
                    return <div className="contact__user" key={item.id} onClick={(e) => elementSelection(e)}>
                        <div>
                            <img className="contact__user__img" src={item.img} alt="" />
                        </div>
                        <div className="contact__user__name">
                            {item.name}
                        </div>
                        <div className="contact__user__status">
                            {item.status}
                        </div>
                        <input className="contact__user__edit contact__button" type="button" value='Edit user' onClick={() => edUserValue(item.id, item.name, item.status, item.img)} />
                        <input className="contact__user__del contact__button" type="button" value='Delete user' onClick={() => delUser(item.id)} />
                    </div>
                }
            }) : null}
        </div>
    )
}


let mapStateToProps = (state) => ({
    users: state.contact.users,
    search: state.contact.search
})

export default connect(mapStateToProps, { getUsers, deleteUser, editUser, addUser })(ContactPage);