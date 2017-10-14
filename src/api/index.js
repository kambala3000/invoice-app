const apiPrefix = 'http://localhost:8000';

export default {
    createCustomer(data) {
        return fetch(`${apiPrefix}/api/customers`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    },

    getCustomerList() {
        return fetch(`${apiPrefix}/api/customers`).then(response => response.json());
    },

    getCustomerById(id) {
        return fetch(`${apiPrefix}/api/customers/${id}`, { method: 'GET' }).then(response =>
            response.json()
        );
    },

    editCustomerById(id, data) {
        return fetch(`${apiPrefix}/api/customers/${id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    },

    deletetCustomerById(id) {
        return fetch(`${apiPrefix}/api/customers/${id}`, { method: 'DELETE' });
    },

    getProductsList() {
        return fetch(`${apiPrefix}/api/products`).then(response => response.json());
    },

    getInvoices() {
        return fetch(`${apiPrefix}/api/invoices`).then(response => response.json());
    }
};
