import React, { Component, Fragment } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import DoctorImge from "../../../assets/utils/images/medical/doct.png";
import PageTitle from "../../../Layout/AppMain/PageTitle";
import axios from "axios";
const Constants = require("../../../config/seturl");
var apiBaseUrl = Constants.getAPiUrl();
import {
  Input,
  Row,
  Col,
  Button,
  Card,
  Table,
  CardHeader,
  CardFooter,
} from "reactstrap";

import avatar2 from "../../../assets/utils/images/avatars/2.jpg";

import PopoversExample from "../../Components/TooltipsPopovers";

export default class PatientList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DoctorList: [],
    };
  }
  componentDidMount() {
    axios
      .get(
        `${apiBaseUrl}/composer/client/getDoctors`,

        {
          headers: {
            Authorization: "Bearer " + sessionStorage.token,
          },
        }
      )
      .then((res) => {
        this.setState({
          DoctorList: res.data.doctor_list,
        });
      });
  }

  render() {
    const { DoctorList } = this.state;

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
          <Row>
            <Col md="12">
              <Card className="main-card mb-3">
                <CardHeader>
                  List of Doctors
                  {/* <div className="btn-actions-pane-right">
                    <ButtonGroup size="sm">
                      <NavLink href="#/dashboards/patient-list">
                        <Button className="btn-wide" color="focus">
                          More
                        </Button>
                      </NavLink>
                      <Button caret="true" color="focus">
                            All Month
                          </Button>
                    </ButtonGroup>
                  </div> */}
                </CardHeader>
                <Table
                  responsive
                  hover
                  striped
                  borderless
                  className="align-middle mb-0"
                >
                  <thead>
                    <tr>
                      <th className="">Doctor's Name</th>
                      <th className="">License Number</th>

                      <th className="">Status</th>
                      <th className="">Edit</th>
                      <th className="">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {DoctorList.length > 0 ? (
                      DoctorList.map((doc, idx) => (
                        <tr>
                          <td>
                            <div className="widget-content p-0">
                              <div className="widget-content-wrapper">
                                <div className="widget-content-left mr-3">
                                  <div className="widget-content-left">
                                    <img
                                      width={40}
                                      className="rounded-circle"
                                      src={DoctorImge}
                                      alt=""
                                    />
                                  </div>
                                </div>
                                <div className="widget-content-left flex2">
                                  <div className="widget-heading">
                                    {doc.contact_details.first_name}&nbsp;
                                    {doc.contact_details.last_name}
                                  </div>
                                  <div className="widget-subheading opacity-7">
                                    {doc.contact_details.created}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="">{doc.license}</td>
                          <td className="">
                            {doc.status === "Suspended" ? (
                              <Button size="sm" color="warning">
                                {doc.status}
                              </Button>
                            ) : (
                              <Button size="sm" color="success">
                                {doc.status}
                              </Button>
                            )}
                          </td>
                          <td className="">
                            <Button size="sm" color="alternate">
                              <i className="lnr-cog" /> Edit Permission
                            </Button>
                          </td>
                          <td className="">
                            <Button size="sm" color="success">
                              Approved
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>Not Available....</tr>
                    )}
                  </tbody>
                </Table>
                <CardFooter className="">
                  {/* <Button
                    className="mr-2 btn-icon btn-icon-only"
                    outline
                    color="danger"
                  >
                    <i className="pe-7s-trash btn-icon-wrapper"> </i>
                  </Button> */}

                  {/* <div className="btn-actions-pane-right">
                    <NavLink href="#/dashboards/patient-list">
                      <Button className="btn-wide" color="success">
                        More
                      </Button>
                    </NavLink>
                  </div> */}
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </ReactCSSTransitionGroup>
      </Fragment>
    );
  }
}
