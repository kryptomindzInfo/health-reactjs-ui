import React, {Fragment} from 'react';

import {
    Popover,
    Nav, NavLink, Col, Row, NavItem, Button
} from 'reactstrap';

import bg4 from '../../../assets/utils/images/dropdown-header/city5.jpg';

import {
    faAngleUp,

} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

class FooterMegaMenu extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.toggle2 = this.toggle2.bind(this);
        this.state = {
            popoverOpen: false,
            popoverOpen2: false
        };
    }

    toggle() {
        this.setState({
            popoverOpen: !this.state.popoverOpen
        });
    }

    toggle2() {
        this.setState({
            popoverOpen2: !this.state.popoverOpen2
        });
    }

    state = {};

    render() {
        return (
            <Fragment>
            </Fragment>
        )
    }
}

export default FooterMegaMenu;
