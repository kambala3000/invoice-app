import React, { Component } from 'react';
import { Switch, Route } from 'react-router';

import Header from './Header';
import Invoices from './Invoices/Component';
import InvoiceEdit from './Invoices/InvoiceEdit';
import Products from './Products';
import Customers from './Customers';
import CustomModal from './Modal/Component';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            modalData: null
        };
        this.triggerModal = this.triggerModal.bind(this);
    }

    triggerModal(data) {
        this.setState(prevState => ({
            showModal: !prevState.showModal,
            modalData: data
        }));
    }

    render() {
        const { showModal, modalData } = this.state;
        return (
            <div>
                <Header />
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={props => <Invoices triggerModal={this.triggerModal} />}
                    />
                    <Route exact path="/invoices/:invoiceId/edit" component={InvoiceEdit} />
                    <Route
                        exact
                        path="/products"
                        render={props => <Products triggerModal={this.triggerModal} />}
                    />
                    <Route
                        exact
                        path="/customers"
                        render={props => <Customers triggerModal={this.triggerModal} />}
                    />
                </Switch>
                {showModal && <CustomModal modalData={modalData} />}
            </div>
        );
    }
}

export default App;
