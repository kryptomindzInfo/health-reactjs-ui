import React, {Fragment} from 'react';
import {connect} from 'react-redux';

import PerfectScrollbar from 'react-perfect-scrollbar';

import Hamburger from 'react-hamburgers';

import Drawer from 'react-motion-drawer';

import Nav from '../../../../../Layout/AppNav/VerticalNavWrapper';

import cx from 'classnames';

import {
    faEllipsisV,
    faBars

} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {
    Button
} from 'reactstrap';

import {
    setEnableClosedSidebar,
    setEnableMobileMenu,
    setEnableMobileMenuSmall,
} from '../../../../../reducers/ThemeOptions';

class HeaderLogo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            mobile: false,
            activeSecondaryMenuMobile: false
        };

    }

    toggleMobileSmall = () => {
        let {enableMobileMenuSmall, setEnableMobileMenuSmall} = this.props;
        setEnableMobileMenuSmall(!enableMobileMenuSmall);
    }

    state = {
        openLeft: false,
        openRight: false,
        relativeWidth: false,
        width: 280,
        noTouchOpen: false,
        noTouchClose: false,
    };

    render() {
        const {
            openRightMobile,
            noTouchOpen,
            noTouchClose
        } = this.state;

        return (
          <Fragment>
           <h1>dddd</h1>

            <div className="app-header__menu">
              <Button
                size="sm"
                className="mr-2 btn-icon btn-icon-only"
                color="primary"
                onClick={() => this.setState({ openRightMobile: true })}
              >
                <div className="btn-icon-wrapper">
                  <FontAwesomeIcon icon={faBars} />
                </div>
              </Button>
              <span onClick={this.toggleMobileSmall}>
                <Button
                  size="sm"
                  className={cx("btn-icon btn-icon-only", {
                    active: this.state.activeSecondaryMenuMobile,
                  })}
                  color="primary"
                  onClick={() =>
                    this.setState({
                      activeSecondaryMenuMobile: !this.state
                        .activeSecondaryMenuMobile,
                    })
                  }
                >
                  <div className="btn-icon-wrapper">
                    <FontAwesomeIcon icon={faEllipsisV} />
                  </div>
                </Button>
              </span>
            </div>

            <Drawer
              right
              className="drawer-content-wrapper p-0"
              width={this.state.width}
              open={openRightMobile}
              onChange={(open) =>
                this.setState({ openRightMobile: open })
              }
              noTouchOpen={noTouchOpen}
              noTouchClose={noTouchClose}
            >
              <PerfectScrollbar>
                <div className="drawer-nav-btn">
                  <Hamburger
                    active={true}
                    type="elastic"
                    onClick={() =>
                      this.setState({ openRightMobile: false })
                    }
                  />
                </div>
                <div className="p-3">
                  <Nav />
                </div>
              </PerfectScrollbar>
            </Drawer>
          </Fragment>
        );
    }
}


const mapStateToProps = state => ({
    enableClosedSidebar: state.ThemeOptions.enableClosedSidebar,
    enableMobileMenu: state.ThemeOptions.enableMobileMenu,
    enableMobileMenuSmall: state.ThemeOptions.enableMobileMenuSmall,
});

const mapDispatchToProps = dispatch => ({

    setEnableClosedSidebar: enable => dispatch(setEnableClosedSidebar(enable)),
    setEnableMobileMenu: enable => dispatch(setEnableMobileMenu(enable)),
    setEnableMobileMenuSmall: enable => dispatch(setEnableMobileMenuSmall(enable)),

});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderLogo);