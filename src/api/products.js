import { API_PREFIX } from './Constants';

export default {
    createProduct(data) {
        return fetch(`${API_PREFIX}/api/products`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    },

    getProductsList() {
        return fetch(`${API_PREFIX}/api/products`).then(response => response.json());
    },

    getProductById(id) {
        return fetch(`${API_PREFIX}/api/products/${id}`, { method: 'GET' }).then(response =>
            response.json()
        );
    },

    editProductById(id, data) {
        return fetch(`${API_PREFIX}/api/products/${id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    },

    deleteProductById(id) {
        return fetch(`${API_PREFIX}/api/products/${id}`, { method: 'DELETE' });
    }
};
