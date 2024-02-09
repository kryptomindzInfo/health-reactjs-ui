import React, { Component, Fragment } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import PageTitle from "../../../Layout/AppMain/PageTitle";

export default class OtherMain extends Component {
  render() {
    return (
      <Fragment>
        <ReactCSSTransitionGroup
          component="div"
          transitionName="TabsAnimation"
          transitionAppear={true}
          transitionAppearTimeout={0}
          transitionEnter={false}
          transitionLeave={false}
        >
          <PageTitle
            heading="Other Page"
            subheading="This is an example dashboard created using build-in elements and components."
            icon="pe-7s-car icon-gradient bg-mean-fruit"
          />
        </ReactCSSTransitionGroup>
      </Fragment>
    );
  }
}
