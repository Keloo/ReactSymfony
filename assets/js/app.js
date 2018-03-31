import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SocialButton from './Components/SocialButton'

import ItemCard from './Components/ItemCard';

const handleSocialLogin = (user) => {
    console.log(user)
}

const handleSocialLoginFailure = (err) => {
    console.error(err)
}

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            entries: []
        };
    }

    componentDidMount() {
        fetch('/data')
            .then(response => response.json())
            .then(entries => {
                this.setState({
                    entries
                });
            });
    }

    render() {
        return (
            <MuiThemeProvider>
                <div style={{ display: 'flex' }}>
                    {/*{this.state.entries.map(*/}
                        {/*({ id, author, avatarUrl, title, description }) => (*/}
                            {/*<ItemCard*/}
                                {/*key={id}*/}
                                {/*author={author}*/}
                                {/*title={title}*/}
                                {/*avatarUrl={avatarUrl}*/}
                                {/*style={{ flex: 1, margin: 10 }}*/}
                            {/*>*/}
                                {/*{description}*/}
                            {/*</ItemCard>*/}
                        {/*)*/}
                    {/*)}*/}

                    <div>
                        <SocialButton
                            provider='facebook'
                            appId='330456840431220'
                            onLoginSuccess={handleSocialLogin}
                            onLoginFailure={handleSocialLoginFailure}
                        >
                            Login with Facebook
                        </SocialButton>
                    </div>
                </div>
            </MuiThemeProvider>

        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));