import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, Button } from 'react-bootstrap';

class ProductItem extends Component {
    render() {
        const { num, name, price } = this.props;
        return (
            <tr>
                <td>{num}</td>
                <td>{name}</td>
                <td>{price}</td>
                <td>
                    <ButtonToolbar>
                        <Button bsStyle="primary">edit</Button>
                        <Button bsStyle="danger">delete</Button>
                    </ButtonToolbar>
                </td>
            </tr>
        );
    }
}

ProductItem.propTypes = {
    id: PropTypes.number.isRequired,
    num: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
};

export default ProductItem;
