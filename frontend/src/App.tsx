import { Redirect, Router } from '@reach/router';
import CharacterDetailPage from './pages/character-detail.page';
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
            <CharacterDetailPage path="/character/:id" />

            <Redirect from="/" to="/home" />

            <NotFoundPage default />
        </Router>
    );
}

export default App;
