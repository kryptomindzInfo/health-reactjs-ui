import React, {Fragment} from 'react';

import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Popover,
  Nav,
  NavLink,
  Col,
  Row,
  NavItem,
  UncontrolledButtonDropdown,
  Button,
  CardBody,
  Card,
  CardHeader,
  CardFooter,
  ModalBody,
  ModalHeader,
  Modal,
  ModalFooter,
  Input,
  Label,
  InputGroup,
  InputGroupAddon,
} from "reactstrap";
import InputMask from "react-input-mask";
import PerfectScrollbar from "react-perfect-scrollbar";
import {Tooltip } from "reactstrap";
import bg2 from "../../../assets/utils/images/dropdown-header/abstract2.jpg";
import bg3 from "../../../assets/utils/images/dropdown-header/abstract3.jpg";
import ScanImg from "../../../assets/utils/images/originals/scan.gif";

import BioImg from "../../../assets/utils/images/originals/fingerprint2.gif";

import {
  faAngleDown,
  faQrcode,
  faSearch,
  faPuzzlePiece,
  faAmbulance,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class MegaMenu extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      useradmin: "",
      dropdownOpen: false,
      popoverOpen: false,
      viewfessymodal: false,
      viewemergencymodal: false,
      viewbiometricmodal: false,
      activeSearch: false,
      tooltipOpen: false,
      tooltipOpen1: false,
    };

    this.ViewFessytoggle = this.ViewFessytoggle.bind(this);
    this.ViewEmergencytoggle = this.ViewEmergencytoggle.bind(this);
    this.ViewBiotoggle = this.ViewBiotoggle.bind(this);
    this.toggle2 = this.toggle2.bind(this);
    this.toggle1 = this.toggle1.bind(this);
  }

  componentDidMount() {
    const asDoctor = sessionStorage.getItem("doctor");
    this.setState({ useradmin: asDoctor });
  }

  toggle1() {
    this.setState({
      tooltipOpen1: !this.state.tooltipOpen1,
    });
  }
  toggle2() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen,
    });
  }
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
      popoverOpen: !this.state.popoverOpen,
    });
  }

  ViewFessytoggle() {
    this.setState({
      viewfessymodal: !this.state.viewfessymodal,
    });
  }
  ViewEmergencytoggle() {
    this.setState({
      viewemergencymodal: !this.state.viewemergencymodal,
    });
  }
  ViewBiotoggle() {
    this.setState({
      viewbiometricmodal: !this.state.viewbiometricmodal,
    });
  }

  render() {
    const { useradmin } = this.state;
    return (
      <Fragment>
        &nbsp;
        {useradmin === "Doctor" ? (
          <Nav className="header-megamenu">
            <NavItem>
              <NavLink
                href="javascript:void(0);"
                onClick={this.toggle}
                id="PopoverMegaMenu"
              >
                <FontAwesomeIcon icon={faQrcode} />
                {/* &nbsp;    Search */}
                <FontAwesomeIcon
                  className="ml-2 opacity-5"
                  icon={faAngleDown}
                />
              </NavLink>
            </NavItem>
            <Popover
              className="rm-max-width"
              placement="bottom-start"
              fade={false}
              trigger="legacy"
              isOpen={this.state.popoverOpen}
              target="PopoverMegaMenu"
              toggle={this.toggle}
            >
              <Row className="no-gutters">
                <Col sm="12" md="12" xs="12">
                  <br />
                  <Card className="main-card mb-3">
                    <CardHeader>
                      Scan QR Code
                      {/* <div className="btn-actions-pane-right text-capitalize">
                          dd
                        </div> */}
                    </CardHeader>
                    <CardBody style={{ textAlign: "center" }}>
                      <img src={ScanImg} />
                    </CardBody>
                    <CardFooter className="btn-actions-pane-right text-capitalize">
                      <Button
                        color="alternate"
                        onClick={() =>
                          (window.location.href = "/#/doctor/patients")
                        }
                      >
                        <FontAwesomeIcon icon={faSearch} />
                        &nbsp; Search
                      </Button>
                    </CardFooter>
                  </Card>
                </Col>
              </Row>
            </Popover>
            {/* <UncontrolledButtonDropdown nav inNavbar>
            <DropdownToggle nav>
              <div className="badge badge-pill badge-danger ml-0 mr-2">4</div>
              Settings
              <FontAwesomeIcon className="ml-2 opacity-5" icon={faAngleDown} />
            </DropdownToggle>
            <DropdownMenu className="rm-pointers">
              <div className="dropdown-menu-header">
                <div className="dropdown-menu-header-inner bg-secondary">
                  <div
                    className="menu-header-image opacity-5"
                    style={{
                      backgroundImage: "url(" + bg2 + ")",
                    }}
                  />
                  <div className="menu-header-content">
                    <h5 className="menu-header-title">Overview</h5>
                    <h6 className="menu-header-subtitle">
                      Dropdown menus for everyone
                    </h6>
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
                  <DropdownItem header>Key Figures</DropdownItem>
                  <DropdownItem>Service Calendar</DropdownItem>
                  <DropdownItem>Knowledge Base</DropdownItem>
                  <DropdownItem>Accounts</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Products</DropdownItem>
                  <DropdownItem>Rollup Queries</DropdownItem>
                </PerfectScrollbar>
              </div>
              <Nav vertical>
                <NavItem className="nav-item-divider" />
                <NavItem className="nav-item-btn">
                  <Button
                    size="sm"
                    className="btn-wide btn-shadow"
                    color="danger"
                  >
                    Cancel
                  </Button>
                </NavItem>
              </Nav>
            </DropdownMenu>
          </UncontrolledButtonDropdown> */}
            {/* <Button color="white" onClick={this.ViewFessytoggle.bind(this)}>
              {" "}
              <FontAwesomeIcon
                icon={faPuzzlePiece}
                style={{ color: "#30b1ff" }}
              />
            </Button>{" "} */}
            <Button
              className="mr-2 mb-2"
              id={"TooltipLight-" + 1}
              color="white"
              onClick={this.ViewFessytoggle.bind(this)}
            >
              <FontAwesomeIcon
                icon={faPuzzlePiece}
                style={{ color: "#30b1ff" }}
              />
            </Button>
            <Tooltip
              className="tooltip-light"
              placement="top"
              isOpen={this.state.tooltipOpen}
              target={"TooltipLight-" + 1}
              toggle={this.toggle2}
            >
              Fussy Search
            </Tooltip>
            &nbsp;
            {/* <Button
              color="white"
              onClick={this.ViewEmergencytoggle.bind(this)}
            >
              {" "}
              <FontAwesomeIcon
                icon={faAmbulance}
                style={{ color: "#dc3545" }}
              />
            </Button>{" "} */}
            <Button
              className="mr-2 mb-2"
              id={"TooltipLight-" + 2}
              color="white"
              onClick={this.ViewEmergencytoggle.bind(this)}
            >
              <FontAwesomeIcon
                icon={faAmbulance}
                style={{ color: "#dc3545" }}
              />
            </Button>
            <Tooltip
              className="tooltip-light"
              placement="top"
              isOpen={this.state.tooltipOpen1}
              target={"TooltipLight-" + 2}
              toggle={this.toggle1}
            >
              Emergency Search
            </Tooltip>
            <div>
              {/*****Fessy */}

              <Modal
                size="lg"
                isOpen={this.state.viewfessymodal}
                toggle={this.ViewFessytoggle.bind(this)}
                className={this.props.className}
              >
                <ModalHeader toggle={this.ViewFessytoggle.bind(this)}>
                  Fussy Search
                </ModalHeader>
                <ModalBody>
                  <Row>
                    <Col sm="6" md="6" xs="12">
                      <Label for="">
                        <span className="text-danger">*</span>
                        Mobile Number:
                      </Label>
                      <Input type="number" />
                    </Col>
                    <br />
                    <Col sm="6" md="6" xs="12">
                      <Label for="">
                        <span className="text-danger">*</span>
                        Email:
                      </Label>
                      <Input type="email" />
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col sm="6" md="6" xs="12">
                      <Label for="">
                        <span className="text-danger">*</span>
                        Patient's Name:
                      </Label>
                      <Input type="text" />
                    </Col>
                    <br />
                    <Col sm="6" md="6" xs="12">
                      <Label for="exampleEmail">
                        <span className="text-danger">*</span> Year of Birth
                      </Label>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <div className="input-group-text">
                            <FontAwesomeIcon icon={faCalendarAlt} />
                          </div>
                        </InputGroupAddon>
                        <InputMask
                          className="form-control"
                          defaultValue={
                            new Date().getDate() +
                            "/" +
                            (new Date().getMonth() + 1) +
                            "/" +
                            new Date().getFullYear()
                          }
                        />
                      </InputGroup>
                    </Col>
                  </Row>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="alternate"
                    onClick={() =>
                      (window.location.href = "/#/doctor/patients")
                    }
                  >
                    {" "}
                    <FontAwesomeIcon icon={faSearch} /> &nbsp;Search
                  </Button>
                </ModalFooter>
              </Modal>

              {/*****Emergency */}

              <Modal
                size="lg"
                isOpen={this.state.viewemergencymodal}
                toggle={this.ViewEmergencytoggle.bind(this)}
                className={this.props.className}
              >
                <ModalHeader toggle={this.ViewEmergencytoggle.bind(this)}>
                  Emergency Search
                </ModalHeader>

                <ModalBody>
                  <Row>
                    <Col sm="6" md="6" xs="12">
                      <Label for="">
                        <span className="text-danger">*</span>
                        Mobile Number:
                      </Label>
                      <Input type="number" />
                    </Col>
                    <br />
                    <Col sm="6" md="6" xs="12">
                      <Label for="">
                        <span className="text-danger">*</span>
                        Patient Name:
                      </Label>
                      <Input type="text" />
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col sm="6" md="6" xs="12">
                      <Label for="">
                        <span className="text-danger">*</span>
                        Select any Identity of Patient
                      </Label>
                      <Input
                        className="mb-2"
                        type="select"
                        // onChange={this.handleHRAType.bind(this)}
                        // value={HRAType}
                      >
                        <option value="">Choose Documents </option>
                        <option value=" Driving Licience">
                          Driving Licience
                        </option>
                        <option value="Aadhar Card">Aadhar Card</option>
                        <option value="Voter ID">Voter ID</option>
                        <option value="Other">Other</option>
                      </Input>
                      <Input type="number" placeholder="id number" />
                    </Col>
                    <br />
                    <Col sm="6" md="6" xs="12">
                      <Label for="exampleEmail">
                        <span className="text-danger">*</span> Biometric
                        Scan{" "}
                      </Label>
                      <br />
                      <Button
                        color="danger"
                        style={{ width: "50%" }}
                        onClick={this.ViewBiotoggle.bind(this)}
                      >
                        <i className="lnr-frame-expand" />
                        &nbsp;Scan
                      </Button>
                    </Col>
                  </Row>
                </ModalBody>
              </Modal>
              {/****BIO-Scan */}

              <Modal
                size="lg"
                isOpen={this.state.viewbiometricmodal}
                toggle={this.ViewBiotoggle.bind(this)}
                className={this.props.className}
              >
                <ModalHeader toggle={this.ViewBiotoggle.bind(this)}>
                  Biometric Scan
                </ModalHeader>

                <ModalBody style={{ textAlign: "center" }}>
                  <img src={BioImg} />
                </ModalBody>
              </Modal>
            </div>
          </Nav>
        ) : null}
      </Fragment>
    );
  }
}

export default MegaMenu;
