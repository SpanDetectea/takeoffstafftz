import { connect } from 'react-redux';
import './App.css';
import ContactPage from './component/contactPage/contactPage.jsx';
import LoginPage from './component/loginPage/loginPage.jsx';

function App({auth}) {
  return (
    <div className="App">
      {auth ? <ContactPage /> : <LoginPage />}
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.login.authorized
})

export default connect(mapStateToProps)(App);
