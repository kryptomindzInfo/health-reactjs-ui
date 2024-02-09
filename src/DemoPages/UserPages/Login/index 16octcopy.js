import React, { Fragment, Component } from "react";

import Slider from "react-slick";
import { toast, Bounce } from "react-toastify";
import bg1 from "../../../assets/utils/images/originals/city.jpg";
import bg2 from "../../../assets/utils/images/originals/citydark.jpg";
import bg3 from "../../../assets/utils/images/originals/citynights.jpg";
import LogoImg from "../../../assets/utils/images/originals/kmindz_.png";
import axios from "axios";
import { Col, Row, Button, Form, FormGroup, Label, Input } from "reactstrap";
const Constants = require("../../../config/seturl.js");
var apiBaseUrl = Constants.getAPiUrl();
console.log(apiBaseUrl);

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailID: "",
      Otp: "",
      getotpnumber: "",
      role: "",
    };
  }

  componentDidMount() {
    //http://167.172.191.215/setAdmin/mustafa.kmindz@gmail.com
    // axios.get(`${apiBaseUrl}/setAdmin/mustafa.kmindz@gmail.com`)
    //   .then((res) => {
    //     console.log(res)
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //   })
  }

  LoginDoctor() {
    let { emailID, Otp, role } = this.state;

    if (role == "") {
      this.toastId = toast("Please Select Role Before Login", {
        transition: Bounce,
        closeButton: true,
        autoClose: 5000,
        position: "bottom-center",
        type: "warning",
      });
    } else if (emailID == "") {
      this.toastId = toast("Please Select Email Before Login", {
        transition: Bounce,
        closeButton: true,
        autoClose: 5000,
        position: "bottom-center",
        type: "warning",
      });
    } else if (Otp == "") {
      this.toastId = toast("Please Select OTP Before Login", {
        transition: Bounce,
        closeButton: true,
        autoClose: 5000,
        position: "bottom-center",
        type: "warning",
      });
    } else if (
      Otp != this.state.getotpnumber &&
      emailID != "blockchain.hlfabric@gmail.com"
    ) {
      this.toastId = toast("OTP Number Doesn't Match", {
        transition: Bounce,
        closeButton: true,
        autoClose: 5000,
        position: "bottom-center",
        type: "warning",
      });
    }

    // if (Otp === "0000" || emailID === "blockchain.hlfabric@gmail.com") {
    if (
      Otp == this.state.getotpnumber ||
      emailID === "blockchain.hlfabric@gmail.com"
    ) {
      axios
        .post(`${apiBaseUrl}/composer/client/login`, {
          email: emailID,
          otp: Otp,
          type: role,
        })
        .then((res) => {
          console.log("Response", res.data.result);
          if (res.data.result === "success") {
            const token = res.data.token;
            if (typeof Storage !== "undefined") {
              // Code for localStorage/sessionStorage.
              sessionStorage.token = token;
            } else {
              // Sorry! No Web Storage support..
              console.log("No Storage support");
            }

            if (role === "Admin") {
              window.location.href = "/#/dashboards/admin-dashboard";
              sessionStorage.setItem("admin", role);
            } else if (role === "Doctor") {
              const token = res.data.token;
              sessionStorage.token = token;
              const doctorID = res.data.data;
              const doctor = res.data.data;
              sessionStorage.setItem("doctorID", doctorID[0].id);
              sessionStorage.setItem("doctor", role);
              window.location.href = "/#/doctor/doctor-admin";
            } else if (role === "Patient") {
              const token = res.data.token;
              sessionStorage.token = token;
              const patientID = res.data.data;
              const patient = res.data.data;

              sessionStorage.setItem("patientID", patientID[0].id);
              sessionStorage.setItem("patient", JSON.stringify(patient[0]));
              sessionStorage.setItem("patient", role);
              window.location.href = "/#/patient/patient-admin";
            } else if (role === "Consultant") {
              const token = res.data.token;
              sessionStorage.token = token;
              const consultantID = res.data.data;
              const consultant = res.data.data;

              sessionStorage.setItem("consultantID", consultantID[0].id);
              sessionStorage.setItem(
                "consultant",
                JSON.stringify(consultant[0])
              );
            }
            // closeProgress();
            // window.location = url;
          } else if (res.data.result === "failed") {
            this.toastId = toast(res.data.error, {
              transition: Bounce,
              closeButton: true,
              autoClose: 3000,
              position: "bottom-center",
              type: "error",
            });
            return;
          }
        });

      //  const token = res.data.token;
      //  console.log("Response", res);
      //  sessionStorage.token = token;
      //  console.log("toktnn", token);
      //  const doctorID = res.data.data;
      //  const doctor = res.data.data;
      //  sessionStorage.setItem("doctorID", doctorID[0].id);
    }
  }

  handleLoginChange = (data, event) => {
    // this.setState({ [data]: event.target.value, edit: true});
    this.setState({ [data]: event.target.value });
  };

  render() {
    let settings = {
      dots: true,
      infinite: true,
      speed: 500,
      arrows: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
      initialSlide: 0,
      autoplay: true,
      adaptiveHeight: true,
    };

    const generateotpfunction = () => {
      // if(role == "Admin"){

      // }
      console.log("clcik");

      if (this.state.emailID == "") {
        this.toastId = toast("Please Select Email Before Regenerate OTP", {
          transition: Bounce,
          closeButton: true,
          autoClose: 5000,
          position: "bottom-center",
          type: "warning",
        });
      } else {
        axios
          .get(
            `${apiBaseUrl}/composer/client/generateOTP?email=${
              this.state.emailID
            }`
          )
          .then((res) => {
            console.log(res);
            if (res.status == 200) {
              this.setState({ getotpnumber: res.data.otp });
              this.toastId = toast(
                "An OTP has been sent to the registerd email ID. Please use the OTP for access. OTP is valid only for 5 minutes.",
                {
                  transition: Bounce,
                  closeButton: true,
                  autoClose: 5000,
                  position: "bottom-center",
                  type: "success",
                }
              );
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };
    const { emailID, Otp, role } = this.state;
    console.log("data", emailID, Otp);
    return (
      <Fragment>
        <div className="h-100">
          <Row className="h-100 no-gutters">
            <Col lg="4" className="d-none d-lg-block">
              <div className="slider-light">
                <Slider {...settings}>
                  <div className="h-100 d-flex justify-content-center align-items-center bg-plum-plate">
                    <div
                      className="slide-img-bg"
                      style={{
                        backgroundImage: "url(" + bg1 + ")",
                      }}
                    />
                    <div className="slider-content">
                      <h3>Perfect Balance</h3>
                      <p>
                        ArchitectUI is like a dream. Some think it's too good to
                        be true! Extensive collection of unified React Boostrap
                        Components and Elements.
                      </p>
                    </div>
                  </div>
                  <div className="h-100 d-flex justify-content-center align-items-center bg-premium-dark">
                    <div
                      className="slide-img-bg"
                      style={{
                        backgroundImage: "url(" + bg3 + ")",
                      }}
                    />
                    <div className="slider-content">
                      <h3>Scalable, Modular, Consistent</h3>
                      <p>
                        Easily exclude the components you don't require.
                        Lightweight, consistent Bootstrap based styles across
                        all elements and components
                      </p>
                    </div>
                  </div>
                  <div className="h-100 d-flex justify-content-center align-items-center bg-sunny-morning">
                    <div
                      className="slide-img-bg opacity-6"
                      style={{
                        backgroundImage: "url(" + bg2 + ")",
                      }}
                    />
                    <div className="slider-content">
                      <h3>Complex, but lightweight</h3>
                      <p>
                        We've included a lot of components that cover almost all
                        use cases for any type of application.
                      </p>
                    </div>
                  </div>
                </Slider>
              </div>
            </Col>
            <Col
              lg="8"
              md="12"
              className="h-100 d-flex bg-white justify-content-center align-items-center"
            >
              <Col lg="9" md="10" sm="12" className="mx-auto app-login-box">
                <div>
                  <img src={LogoImg} width="15%" />
                </div>
                <h4 className="mb-0">
                  <div>Welcome back,</div>
                  <span>Please sign in to your account.</span>
                </h4>
                <h6 className="mt-3">
                  No account?{" "}
                  <a href=" " className="text-primary">
                    Sign up now
                  </a>
                </h6>
                <Row className="divider" />
                <div>
                  <Form>
                    <Row form>
                      <Col md={12} sm={12} xs={12}>
                        <FormGroup>
                          <Label for="exampleEmail">Select your Role</Label>
                          <Input
                            className="mb-2"
                            type="select"
                            value={role}
                            onChange={(e) => this.handleLoginChange("role", e)}
                          >
                            <option>choose role</option>
                            <option value="Admin">Admin</option>
                            <option value="Doctor">Doctor</option>
                            <option value="Patient">Patient</option>
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                    {/* <Row className="divider" /> */}
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="exampleEmail">Email</Label>
                          <Input
                            type="email"
                            name="email"
                            placeholder="Email here..."
                            value={emailID}
                            onChange={(e) =>
                              this.handleLoginChange("emailID", e)
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="examplePassword">OTP</Label>
                          <Input
                            type="password"
                            name="otp"
                            placeholder="OTP here..."
                            value={Otp}
                            onChange={(e) => this.handleLoginChange("Otp", e)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <FormGroup check>
                      <Input type="checkbox" name="check" id="exampleCheck" />
                      <Label for="exampleCheck" check>
                        Keep me logged in
                      </Label>
                    </FormGroup>
                    <Row className="divider" />
                    <div className="d-flex align-items-center">
                      <div className="ml-auto">
                        <a
                          className="btn-lg btn btn-link"
                          style={{ cursor: "pointer", color: "#545cd8" }}
                          onClick={() => {
                            generateotpfunction();
                          }}
                        >
                          Regenerate OTP
                        </a>{" "}
                        <Button
                          color="primary"
                          size="lg"
                          onClick={this.LoginDoctor.bind(this)}
                        >
                          Login to Dashboard
                        </Button>
                      </div>
                    </div>
                  </Form>
                </div>
              </Col>
            </Col>
          </Row>
        </div>
      </Fragment>
    );
  }
}
