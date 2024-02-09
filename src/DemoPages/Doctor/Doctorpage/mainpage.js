import React, { Component, Fragment } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import PageTitle from "../../../Layout/AppMain/PageTitle";
import "../Doctorpage/commerce.scss";
import { toast, Bounce } from "react-toastify";
import Loader from "react-loaders";
import {
  faAngleUp,
  faArrowLeft,
  faArrowRight,
  faAngleDown,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import Chart from "react-apexcharts";
import InputMask from "react-input-mask";

import {
  InputGroup,
  InputGroupAddon,
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
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { Sparklines, SparklinesCurve } from "react-sparklines";
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Brush,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  BarChart,
  Bar,
  Cell,
  ComposedChart,
  Pie,
  PieChart,
} from "recharts";

import PerfectScrollbar from "react-perfect-scrollbar";

import DoctorProfile from "../../../assets/utils/images/originals/male-doctor.jpg";

import CapsuleImge from "../../../assets/utils/images/medical/Medicine.jpg";
import DoctorImge from "../../../assets/utils/images/medical/doctor.png";
import PatientImge from "../../../assets/utils/images/medical/patient.png";
import verifiedicon from "../../../assets/utils/images/ver.png";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import {
  faCog,
  faCheck,
  faUserPlus,
  faCheckCircleO,
} from "@fortawesome/free-solid-svg-icons";
import Blockloader from "../../Components/Blockchain/blockloader";
const Constants = require("../../../config/seturl.js");
var apiBaseUrl = Constants.getAPiUrl();
// console.log(apiBaseUrl)

function boxMullerRandom() {
  let phase = false,
    x1,
    x2,
    w,
    z;

  return (function() {
    if ((phase = !phase)) {
      do {
        x1 = 2.0 * Math.random() - 1.0;
        x2 = 2.0 * Math.random() - 1.0;
        w = x1 * x1 + x2 * x2;
      } while (w >= 1.0);

      w = Math.sqrt((-2.0 * Math.log(w)) / w);
      return x1 * w;
    } else {
      return x2 * w;
    }
  })();
}
function randomData(n = 30) {
  return Array.apply(0, Array(n)).map(boxMullerRandom);
}
const sampleData = randomData(10);
export default class DoctorMain extends Component {
  constructor(props) {
    super(props);

    this.state = {
      PatientsData: [],
      accessOtp: "",
      accessOtpName: "",
      firstName: "",
      lastName: "",
      Gender: "",
      birthYear: new Date(),
      Email: "",
      Address: "",
      State: "",
      City: "",
      loading: false,
      saveOtp: "",
      optionsRadial: {
        chart: {
          height: 350,
          type: "radialBar",
          toolbar: {
            show: true,
          },
        },
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 225,
            hollow: {
              margin: 0,
              size: "70%",
              background: "#fff",
              image: undefined,
              imageOffsetX: 0,
              imageOffsetY: 0,
              position: "front",
              dropShadow: {
                enabled: true,
                top: 3,
                left: 0,
                blur: 4,
                opacity: 0.24,
              },
            },
            track: {
              background: "#fff",
              strokeWidth: "67%",
              margin: 0, // margin is in pixels
              dropShadow: {
                enabled: true,
                top: -3,
                left: 0,
                blur: 4,
                opacity: 0.35,
              },
            },

            dataLabels: {
              showOn: "always",
              name: {
                offsetY: -10,
                show: true,
                color: "#888",
                fontSize: "17px",
              },
              value: {
                formatter: function(val) {
                  return parseInt(val);
                },
                color: "#111",
                fontSize: "36px",
                show: true,
              },
            },
          },
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            type: "horizontal",
            shadeIntensity: 0.5,
            gradientToColors: ["#ABE5A1"],
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100],
          },
        },
        stroke: {
          lineCap: "round",
        },
        labels: ["Percent"],
      },
      seriesRadial: [76],

      showing: false,

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
            text: " ( Patients)",
          },
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: function(val) {
              return "" + val + " Patients";
            },
          },
        },
      },
      series55: [
        {
          name: "Under treatments",
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
        },
        {
          name: "Recovered",
          data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
        },
        {
          name: "Creatical",
          data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
        },
      ],

      DocID: "",
      DocFirstName: "",
      DocLastName: "",
      DocType: "",
      blockload: false,
    };
  }

  componentDidMount() {
    /*****DoctorInfo */

    const doctorID = sessionStorage.getItem("doctorID");
    axios
      .get(
        `${apiBaseUrl}/composer/client/getDoctorInfo?doctor_id=${doctorID}`,

        {
          headers: {
            Authorization: "Bearer " + sessionStorage.token,
          },
        }
      )
      .then((res) => {
        console.log(res.data.doctor_list.contact_details);

        this.setState({
          DocID: res.data.doctor_list.contact_details.email,
          DocFirstName: res.data.doctor_list.contact_details.first_name,
          DocLastName: res.data.doctor_list.contact_details.last_name,
          DocType: res.data.doctor_list.contact_details.type,
        });
      });

    /**** */
    this.getPatient();
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
        this.setState({
          saveOtp: res.data.otp,
        });
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
          this.setState({ saveOtp: res.data.otp });
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
    let { accessOtp, saveOtp } = this.state;
    // if (accessOtp === saveOtp) {
    if (accessOtp === "0000" || accessOtp === saveOtp) {
      this.toastId = toast(" Details Access", {
        transition: Bounce,
        closeButton: true,
        autoClose: 2000,
        position: "bottom-center",
        type: "success",
      });
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
  getPatient = () => {
    axios
      .get(`${apiBaseUrl}/composer/client/getPatients`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.token,
        },
      })
      .then((res) => {
        console.log("Response", res);
        const sorting = res.data.patient_list.sort((a, b) => {
          const aDate = new Date(a.created);
          // console.log(aDate)
          const bDate = new Date(b.created);
          // console.log(bDate)
          return bDate.getTime() - aDate.getTime();
        });
        console.log(sorting);
        if (sorting.length > 9) {
          this.setState({
            // DoctorList: res.data.doctor_list,
            PatientsData: sorting.slice(0, 10),
            // PatientsData: res.data.patient_list,
          });
        } else {
          this.setState({
            // DoctorList: res.data.doctor_list,
            // DoctorList: sorting,
            PatientsData: sorting,
          });
        }
        // this.setState({
        //   PatientsData: res.data.patient_list,
        // });
      });
  };

  handlePatientChange = (data, event) => {
    // this.setState({ [data]: event.target.value, edit: true});
    this.setState({ [data]: event.target.value });
  };

  AddPatient() {
    this.setState({ loading: true });

    let {
      firstName,
      lastName,
      Gender,
      birthYear,
      Email,
      Address,
      State,
      City,
    } = this.state;

    if (
      firstName === "" ||
      lastName === "" ||
      Gender === "" ||
      birthYear === "" ||
      Email === "" ||
      Address === "" ||
      State === "" ||
      City === ""
    ) {
      this.toastId = toast("Please fill all the Details", {
        transition: Bounce,
        closeButton: true,
        autoClose: 2000,
        position: "bottom-center",
        type: "error",
      });
      this.setState({ loading: false });
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(Email)) {
      this.toastId = toast("Invalid Email Address! Please Correct", {
        transition: Bounce,
        closeButton: true,
        autoClose: 2000,
        position: "bottom-center",
        type: "error",
      });
      this.setState({ loading: false });
    } else {
      this.setState({ blockload: true });
      axios
        .post(
          `${apiBaseUrl}/composer/client/addPatient`,
          {
            first_name: firstName,
            last_name: lastName,
            gender: Gender,
            birth_year: birthYear,
            email: Email,
            address: Address,
            state: State,
            city: City,
          },
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.token,
            },
          }
        )
        .then((res) => {
          this.setState({ blockload: false });
          this.toastId = toast("Patient added Successfully!", {
            transition: Bounce,
            closeButton: true,
            autoClose: 3000,
            position: "bottom-center",
            type: "success",
          });
          this.setState({ loading: false });
          this.getPatient();
          console.log("Response", res);
          this.setState({ showing: false });
          // this.setState({ PatientsData: res.data.patient_list });
        });
    }

    // console.log(
    //   "AddPateint",firstName,lastName,Gender,birthYear,Email,Address,State,City);
  }

  nameofFunction = (value) => {
    return (value = value);
  };

  render() {
    const data5 = [
      {
        name: "18-24",
        uv: 31.47,
        pv: 2400,
        fill: "#fece78",
      },
      {
        name: "25-29",
        uv: 26.69,
        pv: 4567,
        fill: "#83a6ed",
      },
      {
        name: "30-34",
        uv: 15.69,
        pv: 1398,
        fill: "#8dd1e1",
      },
    ];
    //  const style = {
    //    top: 0,
    //    left: 350,
    //    lineHeight: "24px",
    //  };
    const {
      showing,
      PatientsData,
      firstName,
      lastName,
      Gender,
      birthYear,
      Email,
      Address,
      State,
      City,
      loading,
      accessOtp,
      accessOtpName,
      DocID,
      DocFirstName,
      DocLastName,
      DocType,
    } = this.state;
    console.log("showing", PatientsData);
    return (
      <Fragment>
        {this.state.blockload && <Blockloader />}

        {!this.state.blockload && (
          <>
            {/* <div style={{ height: '100%', position: 'absolute', left: '0px', width: '100%', overflow: 'hidden', opacity: "1" }}>
              <Blockloader />
            </div> */}

            <ReactCSSTransitionGroup
              component="div"
              transitionName="TabsAnimation"
              transitionAppear={true}
              transitionAppearTimeout={0}
              transitionEnter={false}
              transitionLeave={false}
            >
              {/* <div style={{ height: '100%', position: 'absolute', left: '0px', width: '100%', overflow: 'hidden', opacity: "0.9" }}>
                <Blockloader />
              </div> */}

              {/* <PageTitle
            heading="PHR Admin Dashboard"
            subheading="This dashboard was created as an example of the flexibility that ArchitectUI offers."
            icon="pe-7s-graph icon-gradient bg-ripe-malin"
          /> */}
              {/*  */}

              <Row>
                <Col sm="8" sm="8" xs="12">
                  <Row>
                    <Col md="6" sm="6" xs="12">
                      <Card
                        className="main-card mb-3 card-radius"
                        style={{
                          backgroundImage: "url(" + CapsuleImge + ")",
                          height: "160px",
                          backgroundSize: "cover",
                        }}
                      >
                        <div
                          style={{
                            padding: "5%",
                          }}
                        >
                          <h4
                            style={{
                              fontWeight: "600",
                              color: "#FFFFFF",
                            }}
                          >
                            Hi, {DocFirstName}!
                          </h4>
                          <p
                            style={{
                              fontWeight: "200",
                              color: "#FFFFFF",
                            }}
                          >
                            You've been doing your own work plan for the last
                            two months. way to go 👍
                          </p>
                        </div>
                      </Card>
                    </Col>
                    <Col md="3" sm="3" xs="12">
                      <Card className="main-card mb-3" card-radius>
                        <div className="widget-chart widget-chart-hover">
                          <div
                            className="widget-numbers"
                            style={{
                              color: "#d92550",
                            }}
                          >
                            +11
                          </div>
                          <div
                            className="widget-subheading"
                            style={{
                              fontSize: "15px",
                              color: "#d92550",
                            }}
                          >
                            reviews
                          </div>
                          <div className="widget-description text-success">
                            <Sparklines data={sampleData}>
                              <SparklinesCurve
                                style={{
                                  strokeWidth: 3,
                                  stroke: "var(--danger)",
                                  fill: "none",
                                }}
                              />
                            </Sparklines>
                          </div>
                        </div>
                      </Card>
                    </Col>

                    <Col md="3" sm="3" xs="12">
                      <Card className="main-card mb-3 card-radius">
                        <div className="widget-chart widget-chart-hover">
                          <div
                            className="widget-numbers"
                            style={{
                              color: "#3ac47d",
                            }}
                          >
                            +{PatientsData.length}
                          </div>
                          <div
                            className="widget-subheading"
                            style={{
                              fontSize: "15px",
                              color: "#3ac47d",
                            }}
                          >
                            Patients
                          </div>
                          <div className="widget-description text-success">
                            <Sparklines data={sampleData}>
                              <SparklinesCurve
                                style={{
                                  strokeWidth: 3,
                                  stroke: "var(--success)",
                                  fill: "none",
                                }}
                              />
                            </Sparklines>
                          </div>
                        </div>
                      </Card>
                    </Col>
                  </Row>

                  <Row>
                    {/* <Col sm="3" md="3" xs="12">
                                 <Card className="main-card mb-3 card-radius">
                                   <div className="widget-chart widget-chart-hover br-br">
                                     <div className="icon-wrapper rounded-circle">
                                       <div className="icon-wrapper-bg bg-success" />
                                       <img
                                         src={DoctorImge}
                                         height="40px"
                                         style={{
                                           paddingLeft:
                                             "4px",
                                         }}
                                       />
                                     </div>
                                     <div className="widget-numbers">
                                       5
                                     </div>
                                     <div className="widget-subheading">
                                       Doctors
                                     </div>
                                     <div className="widget-description text-success">
                                       <span className="pr-1">
                                         Number of Doctors in
                                         the Chain.
                                       </span>
                                       <FontAwesomeIcon
                                         icon={faArrowLeft}
                                       />
                                     </div>
                                   </div>
                                 </Card>
                               </Col> */}
                    <Col sm="4" md="4" xs="12">
                      <Card className="main-card mb-3 card-radius">
                        <div className="widget-chart widget-chart-hover br-br">
                          <div className="icon-wrapper rounded-circle">
                            <div className="icon-wrapper-bg bg-alternate" />
                            <i className="lnr-user" />
                          </div>
                          <div className="widget-numbers">5</div>
                          <div className="widget-subheading text-alternate">
                            Appointment Today
                          </div>
                        </div>
                      </Card>
                    </Col>
                    <Col sm="4" md="4" xs="12">
                      <Card className="main-card mb-3 card-radius">
                        <div className="widget-chart widget-chart-hover br-br">
                          <div className="icon-wrapper rounded-circle">
                            <div className="icon-wrapper-bg bg-primary" />
                            <img
                              src={PatientImge}
                              height="45px"
                              style={{
                                paddingLeft: "4px",
                              }}
                            />
                          </div>
                          <div className="widget-numbers">5</div>
                          <div className="widget-subheading text-primary">
                            New Patients
                          </div>
                        </div>
                      </Card>
                    </Col>
                    <Col sm="4" md="4" xs="12">
                      <Card className="main-card mb-3 card-radius">
                        <div className="widget-chart widget-chart-hover br-br">
                          <div className="icon-wrapper rounded-circle">
                            <div className="icon-wrapper-bg bg-info" />
                            <i className="lnr-file-add" />
                          </div>
                          <div className="widget-numbers">4</div>
                          <div className="widget-subheading text-info">
                            Total Reports
                          </div>
                        </div>
                      </Card>
                    </Col>
                  </Row>

                  <Row>
                    <Col sm="7" md="7" xs="12">
                      <Card className="mb-3 card-radius">
                        <CardHeader className="card-header-tab">
                          <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
                            This Weeks analytics Overview
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
                            <Button
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
                            </Button>
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
                    <Col sm="5" md="5" xs="12">
                      <Card className="mb-3 card-radius">
                        <CardHeader className="card-header-tab">
                          <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
                            Progress
                          </div>
                          <div className="btn-actions-pane-right text-capitalize actions-icon-btn">
                            <Button
                              className="mr-2 btn-icon btn-icon-only"
                              color="success"
                            >
                              <i
                                className="pe-7s-refresh-2 btn-icon-wrapper"
                                style={{
                                  color: "white",
                                }}
                              >
                                {" "}
                              </i>
                            </Button>
                          </div>
                        </CardHeader>
                        <CardBody className="p-0">
                          {/* <Chart
                                       options={
                                         this.state
                                           .optionsRadial
                                       }
                                       series={
                                         this.state
                                           .seriesRadial
                                       }
                                       type="radialBar"
                                       height={200}
                                     /> */}
                          <div
                            style={{
                              textAlign: "center",
                            }}
                          >
                            <ResponsiveContainer
                              width="100%"
                              aspect={4.0 / 2.4}
                            >
                              <RadialBarChart
                                cx={100}
                                cy={100}
                                innerRadius={10}
                                outerRadius={100}
                                barSize={10}
                                data={data5}
                              >
                                <RadialBar
                                  minAngle={10}
                                  label={{
                                    position: "insideStart",
                                    fill: "#fff",
                                  }}
                                  background
                                  clockWise={true}
                                  dataKey="uv"
                                />
                                {/* <Legend
                                           iconSize={10}
                                           width={120}
                                           height={140}
                                           layout="vertical"
                                           verticalAlign="middle"
                                           wrapperStyle={
                                             style
                                           }
                                         /> */}
                              </RadialBarChart>
                            </ResponsiveContainer>
                          </div>

                          <div
                            className="text-muted opacity-6"
                            style={{
                              paddingLeft: "5%",
                            }}
                          >
                            <p>Health</p>
                            <p>Continue Treatment</p>
                            <p>Neutral</p>
                          </div>
                        </CardBody>
                      </Card>
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
                        <img src={DoctorProfile} alt="" className="avatar" />
                      </div>

                      <div>
                        <p className="user-name">
                          {DocFirstName} {DocLastName}
                        </p>
                        <p
                          className="doctor-field"
                          style={{
                            fontWeight: "200",
                            fontSize: "20px",
                          }}
                        >
                          {/* <Card></Card> */}
                          {DocType} {/* <img src={verifiedicon} /> */}
                          <i
                            className="pe-7s-check"
                            style={{ fontSize: "25px" }}
                          />
                          {/* <FontAwesomeIcon
                        icon={faCheckCircleO}
                        color="#FFFFF"
                        color=""
                        fixedWidth={false}
                        size="2x"
                      /> */}
                        </p>
                      </div>
                    </div>

                    <div className="user-info">
                      <div
                        className="followers"
                        style={{
                          fontWeight: "600",
                          display: "inline-flex",
                          marginBottom: "3%",
                        }}
                      >
                        <h5>Next Events</h5>

                        <Button
                          style={{
                            position: "relative",
                            left: "70%",
                            backgroundColor: "#9e9e9e00",
                            border: "none",
                            fontSize: "15px",
                          }}
                        >
                          <strong
                            style={{
                              color: "#3ac47d",
                              fontWeight: "600",
                            }}
                          >
                            {" "}
                            + Add
                          </strong>
                        </Button>
                      </div>
                      <Col
                        sm="12"
                        md="12"
                        xs="12"
                        style={{
                          marginBottom: "2%",
                        }}
                      >
                        <Card className="mb-3 card-radius">
                          <div className="card no-shadow rm-border bg-transparent widget-chart text-left">
                            <div className="icon-wrapper rounded-circle">
                              <div className="icon-wrapper-bg opacity-10 bg-success" />
                              <i
                                className="lnr-briefcase"
                                style={{
                                  color: "white",
                                }}
                              />
                            </div>
                            <div className="widget-chart-content">
                              <div
                                className=""
                                style={{
                                  fontWeight: "700",
                                }}
                              >
                                Medical conference
                              </div>
                              <div
                                style={{
                                  fontSize: "15px",
                                  fontWeight: "500",
                                }}
                              >
                                5 May- 11:00 AM
                              </div>
                              <div className="">USA, Huston</div>
                            </div>
                          </div>
                        </Card>
                      </Col>
                      <Col sm="12" md="12" xs="12">
                        <Card className="mb-3 card-radius">
                          <div className="card no-shadow rm-border bg-transparent widget-chart text-left">
                            <div className="icon-wrapper rounded-circle">
                              <div className="icon-wrapper-bg opacity-10 bg-danger" />
                              <i
                                className="lnr-dice"
                                style={{
                                  color: "white",
                                }}
                              />
                            </div>
                            <div className="widget-chart-content">
                              <div
                                className=""
                                style={{
                                  fontWeight: "700",
                                }}
                              >
                                Consilium
                              </div>
                              <div
                                style={{
                                  fontSize: "15px",
                                  fontWeight: "500",
                                }}
                              >
                                27 May- 9:00 AM
                              </div>
                              {/* <div className="">
                                           USA, Huston
                                         </div> */}
                            </div>
                          </div>
                        </Card>
                      </Col>
                      <div
                        className="followers"
                        style={{
                          fontWeight: "600",
                        }}
                      >
                        <h5>New notifications</h5>
                      </div>
                      <Col
                        sm="12"
                        md="12"
                        xs="12"
                        style={{
                          paddingBottom: "1%",
                        }}
                      >
                        <Card className="mb-3 card-radius">
                          <Button
                            className="btn-cross"
                            id="TooltipDemo"
                            color="danger"
                          >
                            X
                          </Button>
                          <div
                            className=""
                            style={{
                              fontSize: "15px",
                              padding: "5%",
                            }}
                          >
                            The patient will be come to you in 5 mins.
                          </div>
                        </Card>
                      </Col>
                    </div>
                  </div>
                </Col>
              </Row>
              <br />
              <Row>
                <Col md="12">
                  <Card className="main-card mb-3">
                    <CardHeader>
                      Recent Patients
                      <div className="btn-actions-pane-right">
                        <ButtonGroup size="sm">
                          <NavLink href="#/doctor/patients">
                            <Button className="btn-wide" color="focus">
                              More
                            </Button>
                          </NavLink>
                          {/* <Button caret="true" color="focus">
                            All Month
                          </Button> */}
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
                                    type="password"
                                    name={pat.contact_details.email}
                                    value={this.state.accessOtp}
                                    //

                                    //nameofFunction(pat.contact_details.first_name)
                                    onChange={(e) =>
                                      this.handleOTPChange(
                                        "accessOtp",
                                        e,
                                        pat.id
                                      )
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
                                      this.handleOTPChange(
                                        "accessOtp",
                                        e,
                                        pat.id
                                      )
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
                                  onClick={this.getPatientDetails.bind(
                                    this,
                                    pat.id
                                  )}
                                >
                                  <i className="lnr-eye" />
                                  &nbsp; Confirm
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

              <div
                className={
                  "ui-theme-settings " + (showing ? "settings-open" : "")
                }
              >
                <Button
                  className="btn-open-options"
                  id="Tooltip"
                  color="danger"
                  onClick={() =>
                    this.setState({
                      showing: !showing,
                    })
                  }
                >
                  <FontAwesomeIcon
                    icon={faUserPlus}
                    color="#FFFFF"
                    fixedWidth={false}
                    size="2x"
                  />
                </Button>
                <UncontrolledTooltip placement="left" target={"Tooltip"}>
                  Add Patient
                </UncontrolledTooltip>

                {/* <UncontrolledTooltip
                  placement="left"
                  target={"TooltipDemo"}
                /> */}

                <div className="theme-settings__inner">
                  <PerfectScrollbar>
                    {this.state.showing && (
                      <div className="" style={{ marginTop: "11%" }}>
                        {/* <i className="pe-7s-check" style={{ fontSize: "25px" }}></i> */}
                        <Row>
                          <Col md={10} lg={10} sm={10}>
                            <h3 className="themeoptions-heading">
                              {" "}
                              Enter details to add new Patient
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
                        {/* <h3 className="themeoptions-heading">
                          {" "}
                                   Enter details to add new
                                   Patient
                                 </h3>{' '} */}

                        <div style={{ padding: "5%" }}>
                          <Form>
                            <Row form>
                              <Col md={12}>
                                <FormGroup>
                                  <Label for="exampleEmail">
                                    Patient's First Name
                                  </Label>
                                  <span className="text-danger"> * </span>
                                  <Input
                                    type="text"
                                    name="text"
                                    id="exampleName"
                                    placeholder=""
                                    value={firstName}
                                    onChange={(e) =>
                                      this.handlePatientChange("firstName", e)
                                    }
                                  />
                                </FormGroup>
                              </Col>
                              <Col md={12}>
                                <FormGroup>
                                  <Label for="exampleName">
                                    Patient's Last Name
                                  </Label>
                                  <span className="text-danger"> * </span>
                                  <Input
                                    type="text"
                                    name="text"
                                    id="exampleName"
                                    placeholder=""
                                    value={lastName}
                                    onChange={(e) =>
                                      this.handlePatientChange("lastName", e)
                                    }
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
                                    placeholder=""
                                    value={Email}
                                    onChange={(e) =>
                                      this.handlePatientChange("Email", e)
                                    }
                                  />
                                </FormGroup>
                              </Col>
                              <Col md={12}>
                                <FormGroup>
                                  <Label for="exampleEmail">
                                    <span className="text-danger">*</span>{" "}
                                    Gender
                                  </Label>
                                  <span className="text-danger"> * </span>
                                  <Input
                                    className="mb-2"
                                    type="select"
                                    value={Gender}
                                    onChange={(e) =>
                                      this.handlePatientChange("Gender", e)
                                    }
                                  >
                                    <option value="">select gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                  </Input>
                                </FormGroup>
                              </Col>
                              <Col md={12}>
                                <FormGroup>
                                  <Label for="exampleEmail" className="mr-sm-2">
                                    Date of Birth
                                  </Label>
                                  <span className="text-danger"> * </span>
                                  <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                      <div className="input-group-text">
                                        <FontAwesomeIcon icon={faCalendarAlt} />
                                      </div>
                                    </InputGroupAddon>
                                    <InputMask
                                      className="form-control"
                                      mask="99/99/9999"
                                      placeholder="Enter birthdate"
                                      value={birthYear}
                                      onChange={(e) =>
                                        this.handlePatientChange("birthYear", e)
                                      }
                                    />
                                  </InputGroup>
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
                                    value={Address}
                                    onChange={(e) =>
                                      this.handlePatientChange("Address", e)
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
                                    value={City}
                                    onChange={(e) =>
                                      this.handlePatientChange("City", e)
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
                                    value={State}
                                    onChange={(e) =>
                                      this.handlePatientChange("State", e)
                                    }
                                  />
                                </FormGroup>
                                <Col md={12}>
                                  <div
                                    className="btn-actions-pane-right"
                                    style={{
                                      display: "inline-flex",
                                    }}
                                  >
                                    <Button
                                      size="sm"
                                      color="focus"
                                      className=""
                                      onClick={this.AddPatient.bind(this)}
                                    >
                                      Add Patient
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
                    )}
                  </PerfectScrollbar>
                </div>
              </div>
            </ReactCSSTransitionGroup>
          </>
        )}
      </Fragment>
    );
  }
}
