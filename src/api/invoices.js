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

    sendInvoiceItem(id, data) {
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
    },

    getInvoiceById(id) {
        return fetch(`${API_PREFIX}/api/invoices/${id}`, { method: 'GET' }).then(response =>
            response.json()
        );
    },

    getInvoiceItemsById(id) {
        return fetch(`${API_PREFIX}/api/invoices/${id}/items`, { method: 'GET' }).then(response =>
            response.json()
        );
    },

    editInvoiceById(id, data) {
        return fetch(`${API_PREFIX}/api/invoices/${id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    },

    editInvoiceItemById(invoiceId, itemId, data) {
        return fetch(`${API_PREFIX}/api/invoices/${invoiceId}/items/${itemId}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    },

    deleteInvoiceById(id) {
        return fetch(`${API_PREFIX}/api/invoices/${id}`, {
            method: 'DELETE'
        });
    },

    deleteInvoiceItemById(invoiceId, itemId) {
        return fetch(`${API_PREFIX}/api/invoices/${invoiceId}/items/${itemId}`, {
            method: 'DELETE'
        });
    }
};
