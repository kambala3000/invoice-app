import React, { Component } from 'react';
import { Switch, Route } from 'react-router';

import Header from './Header';
import Invoices from './Invoices/Component';
import InvoiceEdit from './Invoices/InvoiceEdit';
import Products from './Products';
import Customers from './Customers';

class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <Switch>
                    <Route exact path="/" component={Invoices} />
                    <Route exact path="/invoices/:invoiceId/edit" component={InvoiceEdit} />
                    <Route exact path="/products" component={Products} />
                    <Route exact path="/customers" component={Customers} />
                </Switch>
            </div>
        );
    }
}

export default App;
