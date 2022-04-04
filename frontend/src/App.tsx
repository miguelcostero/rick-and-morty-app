import { Redirect, Router } from '@reach/router';
import HomePage from './pages/home.page';
import LoginPage from './pages/login.page';
import NotFoundPage from './pages/not-found.page';
import SignUpPage from './pages/signup.page';

function App() {
    return (
        <Router>
            <LoginPage path="/login" />
            <SignUpPage path="/signup" />

            <HomePage path="/home" />

            <Redirect from="/" to="/home" />

            <NotFoundPage default />
        </Router>
    );
}

export default App;
