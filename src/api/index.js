const apiPrefix = 'http://localhost:8000';

export default {
    getCustomerList() {
        return fetch(`${apiPrefix}/api/customers`).then(response => response.json());
    },

    getCustomerById(id) {
        return fetch(`${apiPrefix}/api/customers/${id}`).then(response => response.json());
    },

    getProductsList() {
        return fetch(`${apiPrefix}/api/products`).then(response => response.json());
    },

    getInvoices() {
        return fetch(`${apiPrefix}/api/invoices`).then(response => response.json());
    }
};
