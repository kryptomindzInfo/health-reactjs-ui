import React, { Fragment } from "react";

import Ionicon from "react-ionicons";

import PerfectScrollbar from "react-perfect-scrollbar";

import {
  DropdownToggle,
  DropdownMenu,
  Nav,
  Col,
  Row,
  Button,
  NavItem,
  NavLink,
  UncontrolledTooltip,
  UncontrolledButtonDropdown,
} from "reactstrap";

import { toast, Bounce } from "react-toastify";

import axios from "axios";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import city3 from "../../../assets/utils/images/dropdown-header/city3.jpg";
import avatar1 from "../../../assets/utils/images/medical/patient.png";
import avatar3 from "../../../assets/utils/images/medical/call_center.png";
import avatar2 from "../../../assets/utils/images/medical/doct.png";
const Constants = require("../../../config/seturl");
var apiBaseUrl = Constants.getAPiUrl();

class UserBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      UserName: "",
      UserLastName: "",
      UserID: "",
      UserType: "",
    };
  }

  componentDidMount() {
    const patientid = sessionStorage.getItem("patientID");
    const doctorid = sessionStorage.getItem("doctorID");
    const asAdmin = sessionStorage.getItem("admin");
    const asDoctor = sessionStorage.getItem("doctor");
    const asPatient = sessionStorage.getItem("patient");

    if (asDoctor === "Doctor") {
      axios
        .get(
          `${apiBaseUrl}/composer/client/getDoctorInfo?doctor_id=${doctorid}`,

          {
            headers: {
              Authorization: "Bearer " + sessionStorage.token,
            },
          }
        )
        .then((res) => {
          this.setState({
            UserName: res.data.doctor_list.contact_details.first_name,
            UserLastName: res.data.doctor_list.contact_details.last_name,
            UserType: res.data.doctor_list.contact_details.type,
          });
        });
    } else if (asPatient === "Patient") {
      axios
        .get(
          `${apiBaseUrl}/composer/client/getPatientInfo?patient_id=${patientid}`,

          {
            headers: {
              Authorization: "Bearer " + sessionStorage.token,
            },
          }
        )
        .then((res) => {
          console.log(res.data.patient_list);

          this.setState({
            UserName: res.data.patient_list.contact_details.first_name,
            UserLastName: res.data.patient_list.contact_details.last_name,
            UserType: res.data.patient_list.contact_details.type,
          });
        });
    }
  }

  LogoutUser() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("patientID");
    sessionStorage.removeItem("patient");
    sessionStorage.removeItem("Patient");
    sessionStorage.removeItem("doctor");
    sessionStorage.removeItem("admin");
    sessionStorage.removeItem("doctorID");
    window.location.href = "/#/pages/login";
  }

  notify2 = () =>
    (this.toastId = toast(
      "You don't have any new items in your calendar for today! Go out and play!",
      {
        transition: Bounce,
        closeButton: true,
        autoClose: 5000,
        position: "bottom-center",
        type: "success",
      }
    ));

  render() {
    const { UserName, UserLastName, UserType } = this.state;

    return (
      <Fragment>
        <div className="header-btn-lg pr-0">
          <div className="widget-content p-0">
            <div className="widget-content-wrapper">
              <div className="widget-content-left">
                <UncontrolledButtonDropdown>
                  <DropdownToggle color="link" className="p-0">
                    {UserType === "patient" ? (
                      <img
                        width={42}
                        className="rounded-circle"
                        src={avatar1}
                        alt=""
                      />
                    ) : UserType === "doctor" ? (
                      <img
                        width={42}
                        className="rounded-circle"
                        src={avatar2}
                        alt=""
                      />
                    ) : (
                      <img
                        width={42}
                        className="rounded-circle"
                        src={avatar3}
                        alt=""
                      />
                    )}
                    <FontAwesomeIcon
                      className="ml-2 opacity-8"
                      icon={faAngleDown}
                    />
                  </DropdownToggle>
                  <DropdownMenu right className="rm-pointers dropdown-menu-lg">
                    <div className="dropdown-menu-header">
                      <div className="dropdown-menu-header-inner bg-info">
                        <div
                          className="menu-header-image opacity-2"
                          style={{
                            backgroundImage: "url(" + city3 + ")",
                          }}
                        />
                        <div className="menu-header-content text-left">
                          <div className="widget-content p-0">
                            <div className="widget-content-wrapper">
                              <div className="widget-content-left mr-3">
                                {UserType === "patient" ? (
                                  <img
                                    width={42}
                                    className="rounded-circle"
                                    src={avatar1}
                                    alt=""
                                  />
                                ) : UserType === "doctor" ? (
                                  <img
                                    width={42}
                                    className="rounded-circle"
                                    src={avatar2}
                                    alt=""
                                  />
                                ) : (
                                  <img
                                    width={42}
                                    className="rounded-circle"
                                    src={avatar3}
                                    alt=""
                                  />
                                )}
                              </div>
                              <div className="widget-content-left">
                                <div className="widget-heading">
                                  {UserName || "Admin"}{" "}
                                  {/* {UserLastName || " Mclourd"} */}
                                </div>
                                <div className="widget-subheading opacity-8">
                                  {UserType || "Admininstrator"}
                                </div>
                              </div>
                              <div className="widget-content-right mr-2">
                                <Button
                                  onClick={this.LogoutUser.bind(this)}
                                  className="btn-pill btn-shadow btn-shine"
                                  color="focus"
                                >
                                  Logout
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="scroll-area-xs"
                      style={{
                        height: "150px",
                      }}
                    >
                      <PerfectScrollbar>
                        {/* <Nav vertical>
                          <NavItem className="nav-item-header">
                            Activity
                          </NavItem>
                          <NavItem>
                            <NavLink href="javascript:void(0);">
                              Chat
                              <div className="ml-auto badge badge-pill badge-info">
                                8
                              </div>
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink href="javascript:void(0);">
                              Recover Password
                            </NavLink>
                          </NavItem>
                          <NavItem className="nav-item-header">
                            My Account
                          </NavItem>
                          <NavItem>
                            <NavLink href="javascript:void(0);">
                              Settings
                              <div className="ml-auto badge badge-success">
                                New
                              </div>
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink href="javascript:void(0);">
                              Messages
                              <div className="ml-auto badge badge-warning">
                                512
                              </div>
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink href="javascript:void(0);">
                              Logs
                            </NavLink>
                          </NavItem>
                        </Nav> */}
                      </PerfectScrollbar>
                    </div>
                    <Nav vertical>
                      <NavItem className="nav-item-divider mb-0" />
                    </Nav>
                    <div className="grid-menu grid-menu-2col">
                      {/* <Row className="no-gutters">
                        <Col sm="6">
                          <Button
                            className="btn-icon-vertical btn-transition btn-transition-alt pt-2 pb-2"
                            outline
                            color="warning"
                          >
                            <i className="pe-7s-chat icon-gradient bg-amy-crisp btn-icon-wrapper mb-2">
                              {" "}
                            </i>
                            Message Inbox
                          </Button>
                        </Col>
                        <Col sm="6">
                          <Button
                            className="btn-icon-vertical btn-transition btn-transition-alt pt-2 pb-2"
                            outline
                            color="danger"
                          >
                            <i className="pe-7s-ticket icon-gradient bg-love-kiss btn-icon-wrapper mb-2">
                              {" "}
                            </i>
                            <b>Support Tickets</b>
                          </Button>
                        </Col>
                      </Row> */}
                    </div>
                    {/* <Nav vertical>
                      <NavItem className="nav-item-divider" />
                      <NavItem className="nav-item-btn text-center">
                        <Button
                          size="sm"
                          className="btn-wide"
                          color="primary"
                        >
                          Open Messages
                        </Button>
                      </NavItem>
                    </Nav> */}
                  </DropdownMenu>
                </UncontrolledButtonDropdown>
              </div>
              <div className="widget-content-left  ml-3 header-user-info">
                <div className="widget-heading">
                  {UserName || "Admin"}
                  {/* {UserName || "Admin"} {UserLastName || " Mclourd"} */}
                </div>
                <div className="widget-subheading">
                  {" "}
                  {UserType || "Administrator"}
                </div>
              </div>

              {/* <div className="widget-content-right header-user-info ml-3">
                <Button
                  className="btn-shadow p-1"
                  size="sm"
                  onClick={this.notify2}
                  color="info"
                  id="Tooltip-1"
                >
                  <Ionicon
                    color="#ffffff"
                    fontSize="20px"
                    icon="ios-calendar-outline"
                  />
                </Button>
                <UncontrolledTooltip
                  placement="bottom"
                  target={"Tooltip-1"}
                >
                  Click for Toastify Notifications!
                </UncontrolledTooltip>
              </div> */}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default UserBox;
