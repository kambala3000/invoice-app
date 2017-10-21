import React from 'react';
import { Grid, Jumbotron, Button } from 'react-bootstrap';

const Greetings = () => {
    return (
        <Grid>
            <Jumbotron>
                <h1>Welcome!</h1>
                <p>This app will help you manage invoices, products, and customers.</p>
                <p>
                    <Button bsStyle="primary" href="/invoices">
                        Start work
                    </Button>
                </p>
            </Jumbotron>
        </Grid>
    );
};

export default Greetings;
