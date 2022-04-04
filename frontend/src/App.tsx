import { Router } from '@reach/router';
import HomePage from './pages/home.page';
import LoginPage from './pages/login.page';
import SignUpPage from './pages/signup.page';

function App() {
    return (
        <Router>
            <LoginPage path="/login" />
            <SignUpPage path="/signup" />

            <HomePage path="/" />
        </Router>
    );
}

export default App;
