import React, { Component, Fragment } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { toast, Bounce } from "react-toastify";
import "../Commerce/commerce.scss";
import axios from "axios";
import Loader from "react-loaders";
import {
  faUserPlus,
  faUsers,
  faInfoCircle,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import Chart from "react-apexcharts";

import {
  Row,
  Col,
  Button,
  Card,
  CardBody,
  NavLink,
  Table,
  CardHeader,
  CardFooter,
  ButtonGroup,
  UncontrolledTooltip,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

import PerfectScrollbar from "react-perfect-scrollbar";

import classnames from "classnames";

import AdminImg from "../../../assets/utils/images/call_center.png";
import DocImge from "../../../assets/utils/images/medical/report2.png";

import DoctorImge from "../../../assets/utils/images/medical/doct.png";
import NewPatImge from "../../../assets/utils/images/medical/patientadd.png";
import PatientImge from "../../../assets/utils/images/medical/patient.png";
import AppoImge from "../../../assets/utils/images/medical/doctor-appoi.png";
import PenDocImge from "../../../assets/utils/images/medical/docpanding.png";
import { Doughnut } from "react-chartjs-2";

import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Blockloader from "../../Components/Blockchain/blockloader";
const Constants = require("../../../config/seturl.js");
var apiBaseUrl = Constants.getAPiUrl();

export default class CommerceDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      doctfirstname: "",
      doctlastname: "",
      doctemail: "",
      doctlicence: "",
      doctadress: "",
      doctcity: "",
      doctstate: "",
      DoctorList: [],
      seriesRadial: [76],
      blockload: false,

      showing: false,
      loading: false,

      options55: {
        chart: {
          height: 350,
          type: "bar",
          sparkline: {
            enabled: true,
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            endingShape: "rounded",
            columnWidth: "55%",
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        xaxis: {
          categories: [
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
          ],
        },
        yaxis: {
          title: {
            text: "$ (thousands)",
          },
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: function(val) {
              return "Number " + val + "";
            },
          },
        },
      },
      options66: {
        chart: {
          height: 350,
          type: "bar",
          sparkline: {
            enabled: true,
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            endingShape: "rounded",
            columnWidth: "55%",
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        xaxis: {
          categories: [
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
          ],
        },
        yaxis: {
          title: {
            text: "$ (thousands)",
          },
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: function(val) {
              return "" + val + "";
            },
          },
        },
      },
      series55: [
        {
          name: "Patient Recovered",
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
        },
        {
          name: "Patient Under Treatment",
          data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
        },
      ],
      series66: [
        {
          name: "Pateint",
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
        },
      ],
    };
  }

  componentDidMount() {
    this.getDoctors();
  }

  getDoctors = () => {
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
        console.log(res.data.doctor_list);
        const sorting = res.data.doctor_list.sort((a, b) => {
          const aDate = new Date(a.created);
          const bDate = new Date(b.created);
          return bDate.getTime() - aDate.getTime();
        });
        console.log(sorting);
        if (sorting.length > 9) {
          this.setState({
            // DoctorList: res.data.doctor_list,
            DoctorList: sorting.slice(0, 10),
          });
        } else {
          this.setState({
            // DoctorList: res.data.doctor_list,
            DoctorList: sorting,
          });
        }
      });
  };
  handleDoctorChange = (data, event) => {
    this.setState({ [data]: event.target.value });
  };
  AddDoctor() {
    this.setState({ loading: true });
    let {
      DoctorList,
      doctfirstname,
      doctlastname,
      doctemail,
      doctlicence,
      doctadress,
      doctcity,
      doctstate,
    } = this.state;
    this.setState({ blockload: true });
    axios
      .post(
        `${apiBaseUrl}/composer/client/addDoctor`,
        {
          first_name: doctfirstname,
          last_name: doctlastname,
          license_no: doctlicence,
          status: "Active",
          email: doctemail,
          address: doctadress,
          state: doctstate,
          city: doctcity,
        },
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.token,
          },
        }
      )
      .then((res) => {
        console.log("adddoctor", res);
        this.setState({ blockload: false });
        this.toastId = toast("Doctor have been Added...!", {
          transition: Bounce,
          closeButton: true,
          autoClose: 3000,
          position: "bottom-center",
          type: "success",
        });
        this.setState({ loading: false });
        this.getDoctors();
        this.setState({ showing: false });
      })
      .catch((res) => {
        this.setState({ blockload: false });
        this.toastId = toast("Failed !", {
          transition: Bounce,
          closeButton: true,
          autoClose: 3000,
          position: "bottom-center",
          type: "error",
        });
      });
  }
  render() {
    const {
      DoctorList,
      doctfirstname,
      doctlastname,
      doctemail,
      doctlicence,
      doctadress,
      doctcity,
      doctstate,
      loading,
    } = this.state;
    console.log("DoctorList", DoctorList);
    const data = {
      labels: [" 5-15", "16-30", "30-65+"],
      datasets: [
        {
          data: [30, 50, 20],
          backgroundColor: ["#8dace7", "#71deb9", "#ef869e"],
          hoverBackgroundColor: ["#7097e1", "#4dd6a7", "#eb6886"],
        },
      ],
    };

    const patient = {
      labels: ["Male", "Female"],
      datasets: [
        {
          data: [60, 40],
          backgroundColor: ["#8dace7", "#71deb9"],
          hoverBackgroundColor: ["#7097e1", "#4dd6a7"],
        },
      ],
    };
    const { showing } = this.state;
    console.log("showing", showing);
    return (
      <Fragment>
        {this.state.blockload && <Blockloader />}

        {!this.state.blockload && (
          <>
            <ReactCSSTransitionGroup
              component="div"
              transitionName="TabsAnimation"
              transitionAppear={true}
              transitionAppearTimeout={0}
              transitionEnter={false}
              transitionLeave={false}
            >
              <Row>
                <Col sm="8" sm="8" xs="12">
                  <Row>
                    <Col md="4" sm="4" xs="12">
                      <div className="card mb-3 widget-chart widget-chart-hover card-radius">
                        <div className="">
                          <div className="" />

                          <img
                            src={AppoImge}
                            width={80}
                            style={{
                              paddingLeft: "5px",
                            }}
                          />
                        </div>
                        <div className="widget-numbers">5+</div>
                        <div
                          className="widget-subheading text-primary"
                          style={{ fontWeight: "700" }}
                        >
                          Number of Appointments
                        </div>
                      </div>
                    </Col>
                    <Col md="4" sm="4" xs="12">
                      <div className="card mb-3 widget-chart widget-chart-hover card-radius">
                        <div className="">
                          <div className="" />

                          <img
                            src={PatientImge}
                            width={80}
                            style={{
                              paddingLeft: "5px",
                            }}
                          />
                        </div>
                        <div className="widget-numbers">11+</div>
                        <div
                          className="widget-subheading text-info"
                          style={{ fontWeight: "700" }}
                        >
                          Number of Patients
                        </div>
                      </div>
                    </Col>

                    <Col md="4" sm="4" xs="12">
                      <div className="card mb-3 widget-chart widget-chart-hover card-radius">
                        <div className="">
                          <div className="" />

                          <img
                            src={DocImge}
                            width={80}
                            style={{
                              paddingLeft: "5px",
                            }}
                          />
                        </div>
                        <div className="widget-numbers">5+</div>
                        <div
                          className="widget-subheading text-danger"
                          style={{ fontWeight: "700" }}
                        >
                          Number of Reports
                        </div>
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col sm="4" md="4" xs="12">
                      <div className="card mb-3 widget-chart text-left widget-chart-hover br-br card-radius">
                        <div className="">
                          <div className="icon-wrapper-bg bg-primary" />
                          <img
                            src={NewPatImge}
                            width={80}
                            style={{
                              paddingLeft: "4px",
                            }}
                          />
                        </div>
                        <div className="widget-chart-content">
                          <div className="widget-subheading fsize-1">
                            Total Patients
                          </div>
                          <div
                            className="widget-numbers"
                            style={{ paddingLeft: "10%" }}
                          >
                            5+
                          </div>
                          <div className="widget-description text-success">
                            <FontAwesomeIcon icon={faUsers} />
                            <span className="pl-1 fsize-2">New Add</span>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col sm="4" md="4" xs="12">
                      <div className="card mb-3 widget-chart text-left widget-chart-hover br-br card-radius">
                        <div className="">
                          <div className="icon-wrapper-bg bg-primary" />
                          <img
                            src={DoctorImge}
                            width={80}
                            style={{
                              paddingLeft: "4px",
                            }}
                          />
                        </div>
                        <div className="widget-chart-content">
                          <div className="widget-subheading fsize-1">
                            Doctor Register
                          </div>
                          <div
                            className="widget-numbers"
                            style={{ paddingLeft: "10%" }}
                          >
                            {DoctorList.length}+
                          </div>
                          <div className="widget-description text-success">
                            <FontAwesomeIcon icon={faCheckCircle} />
                            <span className="pl-1 fsize-2">Active</span>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col sm="4" md="4" xs="12">
                      <div className="card mb-3 widget-chart text-left widget-chart-hover br-br card-radius">
                        <div className="">
                          <div className="icon-wrapper-bg bg-primary" />
                          <img
                            src={PenDocImge}
                            width={80}
                            style={{
                              paddingLeft: "4px",
                            }}
                          />
                        </div>
                        <div className="widget-chart-content">
                          <div className="widget-subheading fsize-1">
                            Total Doctors
                          </div>
                          <div
                            className="widget-numbers"
                            style={{ paddingLeft: "10%" }}
                          >
                            5+
                          </div>
                          <div className="widget-description text-warning">
                            <FontAwesomeIcon icon={faInfoCircle} />
                            <span className="pl-1 fsize-2">Pending</span>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col sm="4" sm="4" xs="12">
                  {/* <div>
                               <CommerceDashboard1 />
                             </div> */}

                  <div className="container">
                    {/* <h1 class="title">Profile</h1> */}
                    <div className="user-profile">
                      <div className="avatar-container">
                        <img src={AdminImg} alt="" className="avatar" />
                      </div>

                      <div style={{ paddingBottom: "5%" }}>
                        {/* <p className="user-name">Alina Mclourd</p> */}
                        <p className="user-name">Admin</p>
                        <p
                          className="doctor-field"
                          style={{
                            fontWeight: "200",
                            fontSize: "20px",
                          }}
                        >
                          Administrator
                        </p>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col sm="6" md="6" xs="12">
                  <Card className="mb-3 card-radius">
                    <CardHeader className="card-header-tab">
                      <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
                        Every Month Patients Recovery analytics Overview
                      </div>
                      <div className="btn-actions-pane-right text-capitalize actions-icon-btn">
                        <Button
                          className="mr-2 btn-icon btn-icon-only"
                          color="success"
                        >
                          <i
                            className="pe-7s-graph3 btn-icon-wrapper"
                            style={{
                              color: "white",
                            }}
                          >
                            {" "}
                          </i>
                        </Button>
                        {/* <Button
                      className="mr-2 btn-icon btn-icon-only"
                      color="white"
                    >
                      <i
                        className="pe-7s-graph2 btn-icon-wrapper"
                        style={{
                          color: "success",
                        }}
                      >
                        {" "}
                      </i>
                    </Button> */}
                      </div>
                    </CardHeader>
                    <CardBody>
                      {/* <Column /> */}

                      <div className="column">
                        <Chart
                          options={this.state.options55}
                          series={this.state.series55}
                          type="bar"
                          width="100%"
                        />
                      </div>
                    </CardBody>
                  </Card>
                </Col>
                <Col sm="6" md="6" xs="12">
                  <Card className="mb-3 card-radius">
                    <CardHeader className="card-header-tab">
                      <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
                        Number of Patients Joined in Every Months
                      </div>
                      <div className="btn-actions-pane-right text-capitalize actions-icon-btn">
                        <Button
                          className="mr-2 btn-icon btn-icon-only"
                          color="success"
                        >
                          <i
                            className="pe-7s-graph3 btn-icon-wrapper"
                            style={{
                              color: "white",
                            }}
                          >
                            {" "}
                          </i>
                        </Button>
                        {/* <Button
                      className="mr-2 btn-icon btn-icon-only"
                      color="white"
                    >
                      <i
                        className="pe-7s-graph2 btn-icon-wrapper"
                        style={{
                          color: "success",
                        }}
                      >
                        {" "}
                      </i>
                    </Button> */}
                      </div>
                    </CardHeader>
                    <CardBody>
                      {/* <Column /> */}

                      <div className="column">
                        <Chart
                          options={this.state.options66}
                          series={this.state.series66}
                          type="bar"
                          width="100%"
                        />
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col sm="6" md="6" xs="12">
                  <Card className="mb-3 card-radius">
                    <CardHeader className="card-header-tab">
                      <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
                        Patient Age Analytics
                      </div>
                      <div className="btn-actions-pane-right text-capitalize actions-icon-btn">
                        <Button
                          className="mr-2 btn-icon btn-icon-only"
                          color="success"
                        >
                          <i
                            className="pe-7s-graph3 btn-icon-wrapper"
                            style={{
                              color: "white",
                            }}
                          >
                            {" "}
                          </i>
                        </Button>
                        {/* <Button
                      className="mr-2 btn-icon btn-icon-only"
                      color="white"
                    >
                      <i
                        className="pe-7s-graph2 btn-icon-wrapper"
                        style={{
                          color: "success",
                        }}
                      >
                        {" "}
                      </i>
                    </Button> */}
                      </div>
                    </CardHeader>
                    <CardBody>
                      {/* <Column /> */}
                      <div>
                        <Doughnut data={data} />
                      </div>
                    </CardBody>
                  </Card>
                </Col>
                <Col sm="6" md="6" xs="12">
                  <Card className="mb-3 card-radius">
                    <CardHeader className="card-header-tab">
                      <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
                        Patient Gender Analytics
                      </div>
                      <div className="btn-actions-pane-right text-capitalize actions-icon-btn">
                        <Button
                          className="mr-2 btn-icon btn-icon-only"
                          color="success"
                        >
                          <i
                            className="pe-7s-graph3 btn-icon-wrapper"
                            style={{
                              color: "white",
                            }}
                          >
                            {" "}
                          </i>
                        </Button>
                        {/* <Button
                      className="mr-2 btn-icon btn-icon-only"
                      color="white"
                    >
                      <i
                        className="pe-7s-graph2 btn-icon-wrapper"
                        style={{
                          color: "success",
                        }}
                      >
                        {" "}
                      </i>
                    </Button> */}
                      </div>
                    </CardHeader>
                    <CardBody>
                      {/* <Column /> */}
                      <div>
                        <Doughnut data={patient} />
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
              <br />
              <Row>
                <Col md="12">
                  <Card className="main-card mb-3">
                    <CardHeader>
                      List of Doctors
                      <div className="btn-actions-pane-right">
                        <ButtonGroup size="sm">
                          <NavLink href="#/dashboards/doctor-list">
                            <Button className="btn-wide" color="focus">
                              More
                            </Button>
                          </NavLink>
                        </ButtonGroup>
                      </div>
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
                    <CardFooter className="" />
                  </Card>
                </Col>
              </Row>

              <div
                className={
                  "ui-theme-settings " + (showing ? "settings-open" : "")
                }
              >
                <Button
                  className="btn-open-options"
                  id="TooltipDemo"
                  color="danger"
                  onClick={() => this.setState({ showing: !showing })}
                >
                  <FontAwesomeIcon
                    icon={faUserPlus}
                    color="#FFFFF"
                    fixedWidth={false}
                    size="2x"
                  />
                </Button>
                <UncontrolledTooltip placement="left" target={"TooltipDemo"}>
                  Add Doctor
                </UncontrolledTooltip>
                <div className="theme-settings__inner">
                  {this.state.showing && (
                    <PerfectScrollbar>
                      <div className="" style={{ marginTop: "11%" }}>
                        {/* <h3 className="themeoptions-heading">
                          {" "}
                    Enter details to add new Doctor
                  </h3> */}
                        <Row>
                          <Col md={10} lg={10} sm={10}>
                            <h3 className="themeoptions-heading">
                              {" "}
                              Enter details to add new Doctor
                            </h3>
                          </Col>
                          <Col md={2} lg={2} sm={2}>
                            <center>
                              <i
                                className="pe-7s-close themeoptions-heading"
                                style={{ fontSize: "25px", cursor: "pointer" }}
                                onClick={() => {
                                  this.setState({ showing: false });
                                }}
                              />
                            </center>
                          </Col>
                        </Row>

                        <div style={{ padding: "5%" }}>
                          <Form>
                            <Row form>
                              <Col md={12}>
                                <FormGroup>
                                  <Label for="exampleEmail">
                                    Doctor's First Name
                                  </Label>
                                  <span className="text-danger"> * </span>
                                  <Input
                                    type="text"
                                    name="text"
                                    value={doctfirstname}
                                    onChange={(e) =>
                                      this.handleDoctorChange(
                                        "doctfirstname",
                                        e
                                      )
                                    }
                                    id="exampleName"
                                    placeholder=""
                                  />
                                </FormGroup>
                              </Col>
                              <Col md={12}>
                                <FormGroup>
                                  <Label for="exampleName">
                                    Doctor's Last Name
                                  </Label>
                                  <Input
                                    type="text"
                                    name="text"
                                    id="exampleName"
                                    value={doctlastname}
                                    onChange={(e) =>
                                      this.handleDoctorChange("doctlastname", e)
                                    }
                                    placeholder=""
                                  />
                                </FormGroup>
                              </Col>
                              <Col md={12}>
                                <FormGroup>
                                  <Label for="exampleName">Email</Label>
                                  <span className="text-danger"> * </span>
                                  <Input
                                    type="email"
                                    name="email"
                                    id="exampleEmail"
                                    value={doctemail}
                                    onChange={(e) =>
                                      this.handleDoctorChange("doctemail", e)
                                    }
                                    placeholder=""
                                  />
                                </FormGroup>
                              </Col>

                              <Col md={12}>
                                <FormGroup>
                                  <Label for="exampleName">
                                    License Number
                                  </Label>
                                  <span className="text-danger"> * </span>
                                  <Input
                                    type="text"
                                    name="licienceNumber"
                                    id="licienceNumber"
                                    placeholder=""
                                    value={doctlicence}
                                    onChange={(e) =>
                                      this.handleDoctorChange("doctlicence", e)
                                    }
                                  />
                                </FormGroup>
                              </Col>
                              <Col md={12}>
                                <FormGroup>
                                  <Label for="exampleName">Address</Label>
                                  <span className="text-danger"> * </span>
                                  <Input
                                    type="text"
                                    name="text"
                                    id="exampleName"
                                    placeholder=""
                                    value={doctadress}
                                    onChange={(e) =>
                                      this.handleDoctorChange("doctadress", e)
                                    }
                                  />
                                </FormGroup>
                              </Col>
                              <Col md={12}>
                                <FormGroup>
                                  <Label for="exampleName">City</Label>
                                  <span className="text-danger"> * </span>
                                  <Input
                                    type="text"
                                    name="text"
                                    id="exampleName"
                                    placeholder=""
                                    value={doctcity}
                                    onChange={(e) =>
                                      this.handleDoctorChange("doctcity", e)
                                    }
                                  />
                                </FormGroup>
                              </Col>
                              <Col md={12}>
                                <FormGroup>
                                  <Label for="exampleName">State</Label>
                                  <span className="text-danger"> * </span>
                                  <Input
                                    type="text"
                                    name="text"
                                    id="exampleName"
                                    placeholder=""
                                    value={doctstate}
                                    onChange={(e) =>
                                      this.handleDoctorChange("doctstate", e)
                                    }
                                  />
                                </FormGroup>
                                <Col md={12}>
                                  <div
                                    className="btn-actions-pane-right"
                                    style={{ display: "flex-inline" }}
                                  >
                                    <Button
                                      size="sm"
                                      color="focus"
                                      className=""
                                      onClick={this.AddDoctor.bind(this)}
                                    >
                                      Add Doctor
                                    </Button>
                                    {loading ? (
                                      <Loader type="ball-clip-rotate" />
                                    ) : null}
                                  </div>
                                </Col>
                              </Col>
                            </Row>
                          </Form>
                        </div>
                      </div>
                    </PerfectScrollbar>
                  )}
                </div>
              </div>
            </ReactCSSTransitionGroup>
          </>
        )}
      </Fragment>
    );
  }
}
