import React, { Component, Fragment } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import PageTitle from "../../../Layout/AppMain/PageTitle";

import CountUp from "react-countup";

import {
  faAngleUp,
  faAngleDown,
  faCommentDots,
  faBullhorn,
  faBusinessTime,
  faCog,
  faUsers,
  faUserCircle,
  faEnvelope,
  faVenus,
  faBirthdayCake
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ScrollableInkTabBar from "rc-tabs/lib/ScrollableInkTabBar";


import {
  Row,
  Col,
  Button,
  CardHeader,
  Table,
  ButtonGroup,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Popover,
  PopoverBody,
  Progress,
  Card,
  CardBody,
  CardFooter,
} from "reactstrap";
export default class PatientsDashboard extends Component {
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
            heading="Patient Dashboard"
            subheading="This is an example dashboard created using build-in elements and components."
            icon="pe-7s-car icon-gradient bg-mean-fruit"
          />

          <Row>
            <Col sm="12" md="7">
              <Row>
                <Col sm="12" md="6">
                  <Card className="card-shadow-primary mb-3 widget-chart widget-chart2 text-left">
                    <div className="widget-chat-wrapper-outer">
                      <div className="widget-chart-content">
                        <h6 className="widget-subheading">
                          Patient's Name
                        </h6>
                        <div className="widget-chart-flex">
                          <div className="widget-numbers mb-0 w-100">
                            <div className="widget-chart-flex">
                              <div className="fsize-1">John Warner</div>
                              <div className="ml-auto">
                                <div className="widget-title ml-auto font-size-lg font-weight-normal text-muted">
                                  <span className="text-primary pl-2">
                                    <span className="pr-1">
                                      <FontAwesomeIcon
                                        icon={faUserCircle}
                                      />
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Col>
                <Col sm="12" md="6">
                  <Card className="card-shadow-primary mb-3 widget-chart widget-chart2 text-left">
                    <div className="widget-chat-wrapper-outer">
                      <div className="widget-chart-content">
                        <h6 className="widget-subheading">
                          Patient's Email
                        </h6>
                        <div className="widget-chart-flex">
                          <div className="widget-numbers mb-0 w-100">
                            <div className="widget-chart-flex">
                              <div className="fsize-1">
                                johnwarner22@yahoo.com
                              </div>
                              <div className="ml-auto">
                                <div className="widget-title ml-auto font-size-lg font-weight-normal text-muted">
                                  <span className="text-alternate pl-2">
                                    <span className="pr-1">
                                      <FontAwesomeIcon icon={faEnvelope} />
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Col>
                <Col sm="12" md="6">
                  <Card className="card-shadow-primary mb-3 widget-chart widget-chart2 text-left">
                    <div className="widget-chat-wrapper-outer">
                      <div className="widget-chart-content">
                        <h6 className="widget-subheading">
                          Patient's Gender
                        </h6>
                        <div className="widget-chart-flex">
                          <div className="widget-numbers mb-0 w-100">
                            <div className="widget-chart-flex">
                              <div className="fsize-1">Male</div>
                              <div className="ml-auto">
                                <div className="widget-title ml-auto font-size-lg font-weight-normal text-muted">
                                  <span className="text-success pl-2">
                                    <span className="pr-1">
                                      <FontAwesomeIcon icon={faVenus} />
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Col>
                <Col sm="12" md="6">
                  <Card className="card-shadow-primary mb-3 widget-chart widget-chart2 text-left">
                    <div className="widget-chat-wrapper-outer">
                      <div className="widget-chart-content">
                        <h6 className="widget-subheading">
                          Patient's Birth Date
                        </h6>
                        <div className="widget-chart-flex">
                          <div className="widget-numbers mb-0 w-100">
                            <div className="widget-chart-flex">
                              <div className="fsize-1">02/12/98</div>
                              <div className="ml-auto">
                                <div className="widget-title ml-auto font-size-lg font-weight-normal text-muted">
                                  <span className="text-danger pl-2">
                                    <span className="pr-1">
                                      <FontAwesomeIcon
                                        icon={faBirthdayCake}
                                      />
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Col>
              </Row>
            </Col>
            <Col sm="12" md="5">
              <Card className="mb-3">
                <CardBody>
                  <Col md="7" sm="7" xs="12">
                    <div>
                      <div className="text-focus fsize-2">
                        Other Details
                      </div>
                    </div>
                    <hr />
                    <div>
                      <div className="fsize-1">
                        <p className="text-focus">
                          Mobile No:{" "}
                          <span style={{ fontWeight: "300" }}>
                            9033998812
                          </span>
                        </p>
                        <p className="text-focus">
                          Address:{" "}
                          <span style={{ fontWeight: "300" }}>
                            21,Hamilton Street,fedrick,maryland
                          </span>
                        </p>
                      </div>
                    </div>
                  </Col>
                  
                  <Col md="5" sm="5" xs="12">
                      
                  </Col>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </ReactCSSTransitionGroup>
      </Fragment>
    );
  }
}
