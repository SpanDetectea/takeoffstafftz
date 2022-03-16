import { useState } from "react";
import { connect } from "react-redux";
import {searchUser} from '../../../redux/contact';


const Search = ({searchUser}) => {
    const [search, setSearch] = useState('');

    const searchingUser = (e) => {
        searchUser(e);
    }

    return (
        <div className="contact__panel__search">
            <h3>Enter username to search</h3>
            <input type="text" value={search} onInput={(e) => {
                setSearch(e.target.value);
                searchingUser(e.target.value)
            }} />
        </div>
    );
}

export default connect(null, {searchUser})(Search);