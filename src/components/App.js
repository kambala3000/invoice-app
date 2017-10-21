import React, { Component } from 'react';
import { Switch, Route } from 'react-router';

import Header from './Header';
import Greetings from './Greetings';
import Invoices from './Invoices/Component';
import InvoiceForm from './Invoices/InvoiceForm';
import Products from './Products';
import Customers from './Customers';
import CustomModal from './Modals/CustomModal';
import DialogModal from './Modals/DialogModal';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCustomModal: false,
            showDialogModal: false,
            modalData: null
        };
        this.customModalHandler = this.customModalHandler.bind(this);
        this.dialogModalHandler = this.dialogModalHandler.bind(this);
    }

    customModalHandler(data) {
        this.setState(prevState => ({
            showCustomModal: !prevState.showCustomModal,
            modalData: data
        }));
    }

    dialogModalHandler(data) {
        this.setState(prevState => ({
            showDialogModal: !prevState.showDialogModal,
            modalData: data
        }));
    }

    render() {
        const { showCustomModal, showDialogModal, modalData } = this.state;
        return (
            <div>
                <Header />
                <Switch>
                    <Route exact path="/" component={Greetings} />
                    <Route
                        exact
                        path="/invoices"
                        render={() => <Invoices dialogModalHandler={this.dialogModalHandler} />}
                    />
                    <Route
                        exact
                        path="/invoices/:invoiceId/edit"
                        render={() => <InvoiceForm title="Edit invoice" />}
                    />
                    <Route
                        exact
                        path="/invoices/create"
                        render={() => <InvoiceForm title="Create invoice" history={history} />}
                    />
                    <Route
                        exact
                        path="/products"
                        render={() => (
                            <Products
                                customModalHandler={this.customModalHandler}
                                dialogModalHandler={this.dialogModalHandler}
                            />
                        )}
                    />
                    <Route
                        exact
                        path="/customers"
                        render={() => (
                            <Customers
                                customModalHandler={this.customModalHandler}
                                dialogModalHandler={this.dialogModalHandler}
                            />
                        )}
                    />
                </Switch>
                {showCustomModal && (
                    <CustomModal
                        modalData={modalData}
                        customModalHandler={this.customModalHandler}
                    />
                )}
                {showDialogModal && (
                    <DialogModal
                        modalData={modalData}
                        dialogModalHandler={this.dialogModalHandler}
                    />
                )}
            </div>
        );
    }
}

export default App;
