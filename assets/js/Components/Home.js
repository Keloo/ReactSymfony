import React from 'react'
import Grid from 'material-ui/Grid';

class Home extends React.Component {
    render() {
        return (
            <Grid container justify="center">
                <Grid item>
                    <h1>Welcome</h1>
                </Grid>
            </Grid>
        );
    }
}

export default Home;