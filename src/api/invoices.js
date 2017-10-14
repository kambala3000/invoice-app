import { API_PREFIX } from './Constants';

export default {
    getInvoices() {
        return fetch(`${API_PREFIX}/api/invoices`).then(response => response.json());
    }
};
