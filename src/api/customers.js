import { API_PREFIX } from './Constants';

export default {
    createCustomer(data) {
        return fetch(`${API_PREFIX}/api/customers`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    },

    getCustomerList() {
        return fetch(`${API_PREFIX}/api/customers`).then(response => response.json());
    },

    getCustomerById(id) {
        return fetch(`${API_PREFIX}/api/customers/${id}`, { method: 'GET' }).then(response =>
            response.json()
        );
    },

    editCustomerById(id, data) {
        return fetch(`${API_PREFIX}/api/customers/${id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    },

    deletetCustomerById(id) {
        return fetch(`${API_PREFIX}/api/customers/${id}`, { method: 'DELETE' });
    }
};
