import React, { Component, Fragment } from "react";

import axios from "axios";
import { toast, Bounce } from "react-toastify";
import PageTitle from "../../../Layout/AppMain/PageTitle";
import {
  Input,
  Row,
  Col,
  Button,
  Nav,
  NavItem,
  Card,
  CardBody,
  CardTitle,
  NavLink,
  Container,
  Table,
  CardHeader,
  CardFooter,
  ButtonGroup,
  UncontrolledTooltip,
  Popover,
  PopoverBody,
  ListGroupItem,
  ListGroup,
} from "reactstrap";
import Tabs, { TabPane } from "rc-tabs";
import TabContent from "rc-tabs/lib/SwipeableTabContent";
import PatientImge from "../../../assets/utils/images/medical/patient.png";
import avatar1 from "../../../assets/utils/images/avatars/1.jpg";
import avatar2 from "../../../assets/utils/images/avatars/2.jpg";
import avatar3 from "../../../assets/utils/images/avatars/3.jpg";
import avatar4 from "../../../assets/utils/images/avatars/4.jpg";
import ScrollableInkTabBar from "rc-tabs/lib/ScrollableInkTabBar";

// // Examples
// import AnalyticsDashboard1 from "./Examples/Variation1";
// import AnalyticsDashboard2 from "./Examples/Variation2";
import PopoversExample from "../../Components/TooltipsPopovers";
const Constants = require("../../../config/seturl");
var apiBaseUrl = Constants.getAPiUrl();

export default class PatientList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      PatientsData: "",
    };
  }

  componentDidMount() {
    this.getPatient();
  }

  getPatient = () => {
    axios
      .get(`${apiBaseUrl}/composer/client/getPatients`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.token,
        },
      })
      .then((res) => {
        console.log("Response", res);
        this.setState({
          PatientsData: res.data.patient_list,
        });
      });
  };

  handleOTPChange = (data, event, id) => {
    // this.setState({ [data]: event.target.value, edit: true});
    //     console.log('id',id);
    //      const sdd = this.state.PatientsData.filter((newRow) => newRow.id == id);
    // console.log(sdd[0].id);
    //   if (sdd[0].id === id) {

    //     this.setState({ [data]: event.target.value });
    //   }
    let accessOtpName = event.target.name;
    console.log(accessOtpName, event.target.name);
    this.setState({
      accessOtp: event.target.value,
      accessOtpName,
    });
  };
  getPatientDetails(id) {
    let { accessOtp } = this.state;
    if (accessOtp === "0000") {
      // this.toastId = toast(" Details Access", {
      //   transition: Bounce,
      //   closeButton: true,
      //   autoClose: 2000,
      //   position: "bottom-center",
      //   type: "success",
      // });
      console.log("details", accessOtp);
      window.location.href = `#/doctor/patient-view/` + id;
    } else {
      this.toastId = toast("Failed", {
        transition: Bounce,
        closeButton: true,
        autoClose: 2000,
        position: "bottom-center",
        type: "error",
      });
    }
  }

  getPatientEmail(ID) {
    console.log("ID", ID);

    axios
      .get(`${apiBaseUrl}/composer/client/generateOTP?email=${ID}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.token,
        },
      })
      .then((res) => {
        // this.setState({ PatientsData: res.data.patient_list });
        if (res.data.result === "success") {
          this.toastId = toast(
            "An OTP has been sent to the registerd email ID. Please use the OTP for access. OTP is valid only for 5 minutes.",
            {
              transition: Bounce,
              closeButton: true,
              autoClose: 2000,
              position: "bottom-center",
              type: "success",
            }
          );
        } else {
          this.toastId = toast("Failed", {
            transition: Bounce,
            closeButton: true,
            autoClose: 2000,
            position: "bottom-center",
            type: "error",
          });
        }
      });
  }
  render() {
    const { PatientsData } = this.state;
    return (
      <Fragment>
        <Row>
          <Col md="12">
            <Card className="main-card mb-3">
              <CardHeader>List of Patients</CardHeader>
              <Table
                responsive
                hover
                striped
                borderless
                className="align-middle mb-0"
              >
                <thead>
                  <tr>
                    {/* <th className="text-center">#</th> */}

                    <th className="">Patient's Name</th>
                    <th className="">Request Access</th>

                    <th className="">Access OTP</th>
                    <th className="">Confirm</th>
                  </tr>
                </thead>
                <tbody>
                  {PatientsData.length > 0 ? (
                    PatientsData.map((pat, i) => (
                      <tr>
                        <td>
                          <div className="widget-content p-0">
                            <div className="widget-content-wrapper">
                              <div className="widget-content-left mr-3">
                                <div className="widget-content-left">
                                  <img
                                    width={40}
                                    className="rounded-circle"
                                    src={PatientImge}
                                    alt=""
                                  />
                                </div>
                              </div>
                              <div className="widget-content-left flex2">
                                <div className="widget-heading">
                                  {pat.contact_details.first_name}
                                  &nbsp;
                                  {pat.contact_details.last_name}
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="">
                          <Button
                            size="sm"
                            color="primary"
                            onClick={this.getPatientEmail.bind(
                              this,
                              pat.contact_details.email
                            )}
                          >
                            Request Access
                          </Button>
                        </td>
                        {this.state.accessOtpName ==
                        pat.contact_details.email ? (
                          <td className="">
                            <Input
                              style={{
                                width: "50%",
                              }}
                              type="text"
                              name={pat.contact_details.email}
                              value={this.state.accessOtp}
                              //

                              //nameofFunction(pat.contact_details.first_name)
                              onChange={(e) =>
                                this.handleOTPChange("accessOtp", e, pat.id)
                              }
                            />
                          </td>
                        ) : (
                          <td className="">
                            <Input
                              style={{
                                width: "50%",
                              }}
                              type="text"
                              name={pat.contact_details.email}
                              value=""
                              //

                              //nameofFunction(pat.contact_details.first_name)
                              onChange={(e) =>
                                this.handleOTPChange("accessOtp", e, pat.id)
                              }
                            />
                          </td>
                        )}
                        <td className="">
                          <Button
                            disabled={
                              !(
                                this.state.accessOtpName ==
                                pat.contact_details.email
                              )
                            }
                            size="sm"
                            color="alternate"
                            onClick={this.getPatientDetails.bind(this, pat.id)}
                          >
                            Confirm
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>data....</tr>
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
      </Fragment>
    );
  }
}
