import { API_PREFIX } from './Constants';

export default {
    createInvoice(data) {
        return fetch(`${API_PREFIX}/api/invoices`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json());
    },

    sendInvoiceItems(id, data) {
        return fetch(`${API_PREFIX}/api/invoices/${id}/items`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    },

    getInvoices() {
        return fetch(`${API_PREFIX}/api/invoices`).then(response => response.json());
    }
};
