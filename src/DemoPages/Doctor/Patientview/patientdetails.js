import React, { Component, Fragment } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import TextareaAutosize from "react-textarea-autosize";
import PageTitle from "../../../Layout/AppMain/PageTitle";
import axios from "axios";
import CountUp from "react-countup";
import { toast, Bounce } from "react-toastify";
import ipfs from "../ipfs";
import CKEditor from "react-ckeditor-component";
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
  faBirthdayCake,
  faPlusCircle,
  faCalendarAlt,
  faSearch,
  faEye,
  faFilePrescription,
  faAdjust,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Tabs, { TabPane } from "rc-tabs";
import TabContent from "rc-tabs/lib/SwipeableTabContent";
import ScrollableInkTabBar from "rc-tabs/lib/ScrollableInkTabBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MediImg from "../../../assets/utils/images/medical/healthcare-and-medical.png";
import InsImg from "../../../assets/utils/images/medical/health-insurance.png";
import PresImg from "../../../assets/utils/images/medical/rx.png";
import CapImg from "../../../assets/utils/images/medical/capsule.png";
import BloodImg from "../../../assets/utils/images/medical/blood.png";
import UriImg from "../../../assets/utils/images/medical/urine2.png";
import Card_mg from "../../../assets/utils/images/medical/cardiac.png";
import DaibImg from "../../../assets/utils/images/medical/diabetes.png";
import BlodPreImg from "../../../assets/utils/images/medical/bloodpre2.png";
import XryImg from "../../../assets/utils/images/medical/xray.png";
import KidnyImg from "../../../assets/utils/images/medical/kidney.png";
import LungImg from "../../../assets/utils/images/medical/lungs.png";
import StomImg from "../../../assets/utils/images/medical/stomach.png";
import LiverImg from "../../../assets/utils/images/medical/liver.png";
import GenImg from "../../../assets/utils/images/medical/general.png";
import LabImg from "../../../assets/utils/images/medical/labreport.png";
import AdmImg from "../../../assets/utils/images/medical/admission.png";
import PdfImg from "../../../assets/utils/images/originals/pdf-files.png";
import ImImg from "../../../assets/utils/images/originals/image-file.png";
import Circle from "react-circle";
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
  Popover,
  PopoverBody,
  Progress,
  Card,
  CardBody,
  CardFooter,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  InputGroup,
  InputGroupAddon,
  Label,
  FormGroup,
  CustomInput,
  Collapse,
  UncontrolledButtonDropdown,
  DropdownToggle,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  FormText,
} from "reactstrap";
import Loader from "react-loaders";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Line } from "react-chartjs-2";
import InputMask from "react-input-mask";
// import Loader from "react-loaders";
import { Multiselect } from "react-widgets";
import Blockloader from "../../Components/Blockchain/blockloader";
const Constants = require("../../../config/seturl.js");
var apiBaseUrl = Constants.getAPiUrl();
console.log(apiBaseUrl);
let colors = ["metol", "paracetamol", "Covix"];
export default class PatientDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      BloodReports: [],
      UrineReports: [],
      collapse: false,
      custom: [true, false],
      recordmodal: false,
      viewpresmodal: false,
      insurancetablemodel: false,
      loading: false,
      medicineName: "",
      people: colors,
      PatientInfo: [],
      PatientExtra: [],
      durgsDescription: "",
      drugRefill: "",
      voidDate: "",
      doctFistName: "",
      doctLastName: "",
      doctID: "",
      PatientID: "",
      PrescriptionList: [],
      UdpateDrugs: "",
      UdpatePresData: "",
      UdpateRefill: "",
      UdpateVoidAfter: "",
      HRAType: "",
      Patientuniqueid: "",
      reportmodel: false,
      addhrmodal: false,
      addbpmodal: false,
      addbmimodal: false,
      addbgmodal: false,
      viewhrmodal: false,
      viewbpmodal: false,
      viewbmimodal: false,
      viewbgmodal: false,
      AnalysisType: "",
      xrayreport: false,
      testreport: false,
      ipfsHash: "",
      buffer: null,
      reporttype: "",
      refdoctor: "",
      uploadmodal: false,
      blockload: false,
      reportdate:
        new Date().getDate() +
        "/" +
        (new Date().getMonth() + 1) +
        "/" +
        new Date().getFullYear(),
      reportname: "",

      xreporttype: "",
      xreportmessage: "",
      xreportcode: "",
      xreportdate:
        new Date().getDate() +
        "/" +
        (new Date().getMonth() + 1) +
        "/" +
        new Date().getFullYear(),
      xreportdoctor: "",
    };
    this.Recordtoggle = this.Recordtoggle.bind(this);
    this.XRaytoggle = this.XRaytoggle.bind(this);
    this.TestReporttoggle = this.TestReporttoggle.bind(this);
    this.InsuranceTabletoggle = this.InsuranceTabletoggle.bind(this);
    this.toggleCustom = this.toggleCustom.bind(this);
    this.MyReporttoggle = this.MyReporttoggle.bind(this);
    // this.ViewPrestoggle = this.ViewPrestoggle.bind(this);
    this.AddHRtoggle = this.AddHRtoggle.bind(this);
    this.AddBPtoggle = this.AddBPtoggle.bind(this);
    this.AddBMItoggle = this.AddBMItoggle.bind(this);
    this.AddBGtoggle = this.AddBGtoggle.bind(this);
    /*Analysis******/
    this.AnalysisHRtoggle = this.AnalysisHRtoggle.bind(this);
    this.AnalysisBPtoggle = this.AnalysisBPtoggle.bind(this);
    this.AnalysisBMItoggle = this.AnalysisBMItoggle.bind(this);
    this.AnalysisBGtoggle = this.AnalysisBGtoggle.bind(this);
  }

  /******Upload Report */

  captureFile = (e) => {
    console.log("captureFile");
    const file = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      this.setState({
        buffer: Buffer(reader.result),
      });
      console.log("buffer", this.state.buffer);
    };
  };

  handleReportUploadChange = (data, event) => {
    this.setState({ [data]: event.target.value });
  };

  async UploadReportFile() {
    // e.preventDefault();
    this.setState({ uploadmodal: true, testreport: false });
    const {
      PatientExtra,
      PatientInfo,
      buffer,
      reportdate,
      reporttype,
      refdoctor,
      PatFirstName,
      PatLastName,
      PatMainID,
      reportname,
    } = this.state;
    const file = await ipfs.add(buffer);

    axios
      .post(
        `${apiBaseUrl}/composer/client/addReport`,
        {
          refDoctor: refdoctor,
          codeID: "AK-400",
          reportType: reporttype,
          reportName: reportname,
          patientName: PatientInfo.first_name + " " + PatientInfo.last_name,
          patientID: PatientExtra.id,
          reportData: file.path,
          submitType: "UPLOAD",
          date: reportdate,
        },
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.token,
          },
        }
      )
      .then((res) => {
        console.log("adddoctor", res);
        this.toastId = toast("Report Uploaded ...!", {
          transition: Bounce,
          closeButton: true,
          autoClose: 3000,
          position: "bottom-center",
          type: "success",
        });
        //  this.getDoctors();
        // this.setState({ loading: false });
        this.setState({
          testreport: false,
        });
        axios
          .get(
            `${apiBaseUrl}/composer/client/getReportById?patient_id=${
              this.state.Patientuniqueid
            }`,

            {
              headers: {
                Authorization: "Bearer " + sessionStorage.token,
              },
            }
          )
          .then((res) => {
            this.setState({ uploadmodal: false });
            console.log("MedicalDocumnets", res.data.report_list);

            //  this.getDoctors();
            // if (res.data.result == 'success')

            this.setState({
              MedicalDocumnets: res.data.report_list,
            });

            console.log(res.data.report_list.length);

            if (res.data.report_list.length > 0) {
              const blood = res.data.report_list.filter(
                (el) => el.reportType === "BLOOD TEST"
              );
              console.log(blood);
              this.setState({ BloodReports: blood.reverse() });

              const urine = res.data.report_list.filter(
                (el) => el.reportType === "URINE TEST"
              );
              console.log("urine", urine);
              this.setState({ UrineReports: urine });
              this.setState({ reportmodel: true });
            }
          });
      })
      .catch((res) => {
        this.toastId = toast("Failed !", {
          transition: Bounce,
          closeButton: true,
          autoClose: 3000,
          position: "bottom-center",
          type: "error",
        });
      });
    console.log("ipfshash", file.path, reportdate, reporttype, refdoctor);
    this.setState({
      ipfsHash: file,
    });

    // console.log(this.state.patientID)
  }
  /*****X-RAY Report */

  handleXRayUploadChange = (data, event) => {
    this.setState({ [data]: event.target.value });
  };
  async UploadXRayReport() {
    // e.preventDefault();
    const {
      PatientExtra,
      PatientInfo,
      xreporttype,
      xreportmessage,
      xreportcode,
      xreportdate,
      xreportdoctor,
      PatFirstName,
      PatLastName,
      PatMainID,
    } = this.state;

    axios
      .post(
        `${apiBaseUrl}/composer/client/addReport`,
        {
          refDoctor: xreportdoctor,
          codeID: xreportcode,
          reportType: xreporttype,
          reportName: "Medical",
          patientName: PatientInfo.first_name + " " + PatientInfo.last_name,
          patientID: PatientExtra.id,
          reportData: xreportmessage,
          submitType: "ADD",
          date: xreportdate,
        },
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.token,
          },
        }
      )
      .then((res) => {
        console.log("adddoctor", res);
        this.toastId = toast("Report Added ...!", {
          transition: Bounce,
          closeButton: true,
          autoClose: 3000,
          position: "bottom-center",
          type: "success",
        });
        //  this.getDoctors();
        // this.setState({ loading: false });
        this.setState({
          xrayreport: false,
        });
      })
      .catch((res) => {
        this.toastId = toast("Failed !", {
          transition: Bounce,
          closeButton: true,
          autoClose: 3000,
          position: "bottom-center",
          type: "error",
        });
      });
  }

  ViewReports(hash) {
    console.log("hash", hash);
    window.open(`https://ipfs.healthcare.demo.latticelabs.io/ipfs/${hash}`);
  }

  /*****add values */
  AddHRtoggle() {
    this.setState({
      addhrmodal: !this.state.addhrmodal,
    });
  }

  AddBPtoggle() {
    this.setState({
      addbpmodal: !this.state.addbpmodal,
    });
  }
  AddBMItoggle() {
    this.setState({
      addbmimodal: !this.state.addbmimodal,
    });
  }
  AddBGtoggle() {
    this.setState({
      addbgmodal: !this.state.addbgmodal,
    });
  }
  /****end add values */

  AnalysisHRtoggle() {
    this.setState({
      viewhrmodal: !this.state.viewhrmodal,
    });
  }

  AnalysisBPtoggle() {
    this.setState({
      viewbpmodal: !this.state.viewbpmodal,
    });
  }
  AnalysisBMItoggle() {
    this.setState({
      viewbmimodal: !this.state.viewbmimodal,
    });
  }
  AnalysisBGtoggle() {
    this.setState({
      viewbgmodal: !this.state.viewbgmodal,
    });
  }

  /*****view Values */

  handleAnalysisType = (e) => {
    this.setState({
      AnalysisType: e.target.value,
    });
    console.log(e.target.value);
  };

  MyReporttoggle() {
    this.setState({
      reportmodel: !this.state.reportmodel,
    });
  }
  toggleCustom(tab) {
    const prevState = this.state.custom;
    const state = prevState.map((x, index) => (tab === index ? !x : false));

    this.setState({
      custom: state,
    });
  }

  handleCreate(name) {
    let { people, medicineName } = this.state;

    let newOption = {
      name,
      id: people.length + 1,
    };

    this.setState({
      medicineName: [...medicineName, newOption], // select new option
      people: [...people, newOption], // add new option to our dataset
    });
  }

  componentDidMount() {
    // getfunction()
    const Doctorid = sessionStorage.getItem("doctorID");
    console.log("Doctorid", Doctorid);
    axios
      .get(
        `${apiBaseUrl}/composer/client/getDoctorInfo?doctor_id=${Doctorid}`,

        {
          headers: {
            Authorization: "Bearer " + sessionStorage.token,
          },
        }
      )
      .then((res) => {
        console.log("Doctor", res.data.doctor_list.contact_details.first_name);
        this.setState({
          doctFistName: res.data.doctor_list.contact_details.first_name,
          doctLastName: res.data.doctor_list.contact_details.last_name,
          doctID: Doctorid,
        });
      });

    const pp = this.props.location.pathname.split("/doctor/patient-view/");
    //  const data = { patient_id: pp[1] };
    console.log("id", pp[1]);
    this.setState({ Patientuniqueid: pp[1] });

    this.setState({ PatientID: pp[1] });
    axios
      .get(
        `${apiBaseUrl}/composer/client/getPatientInfo?patient_id=${pp[1]}`,

        {
          headers: {
            Authorization: "Bearer " + sessionStorage.token,
          },
        }
      )
      .then((res) => {
        console.log("pppppp", res);

        this.setState({
          PatientInfo: res.data.patient_list.contact_details,
        });
        this.setState({
          PatientExtra: res.data.patient_list,
        });
      });
    axios
      .get(
        `${apiBaseUrl}/composer/client/getPrescriptionById?patient_id=${pp[1]}`,

        {
          headers: {
            Authorization: "Bearer " + sessionStorage.token,
          },
        }
      )
      .then((res) => {
        console.log("Prescriptions", res);
        this.setState({
          PrescriptionList: res.data.prescription_list,
        });
      });

    axios
      .get(
        `${apiBaseUrl}/composer/client/getReportById?patient_id=${pp[1]}`,

        {
          headers: {
            Authorization: "Bearer " + sessionStorage.token,
          },
        }
      )
      .then((res) => {
        console.log("MedicalDocumnets", res.data.report_list);

        //  this.getDoctors();
        // if (res.data.result == 'success')

        this.setState({
          MedicalDocumnets: res.data.report_list,
        });

        if (res.data.report_list.length > 0) {
          const blood = res.data.report_list.filter(
            (el) => el.reportType === "BLOOD TEST"
          );
          console.log(blood);
          this.setState({ BloodReports: blood.reverse() });

          const urine = res.data.report_list.filter(
            (el) => el.reportType === "URINE TEST"
          );
          console.log("urine", urine);
          this.setState({ UrineReports: urine });
        }
      });
  }

  // getPrescriptionById=()=> {
  //   const { PatientExtra, PatientInfo, PatientID } = this.state;
  //   console.log("PatientID", PatientID, PatientExtra);

  // }
  handlePrescriptionChange = (data, event) => {
    // this.setState({ [data]: event.target.value, edit: true});
    this.setState({ [data]: event.target.value });
    console.log(data, event.target.value);
  };

  onChange(evt) {
    this.setState({
      durgsDescription: evt.target.content,
    });
    // console.log("durgsDescription",evt.target.content);
  }
  Recordtoggle() {
    this.setState({
      recordmodal: !this.state.recordmodal,
    });
  }

  XRaytoggle() {
    this.setState({
      xrayreport: true,
    });
  }
  TestReporttoggle() {
    this.setState({
      testreport: true,
    });
  }

  UploadReport() {
    this.setState({
      testreport: false,
    });
  }
  UploadXRay() {
    this.setState({
      xrayreport: false,
    });
  }
  CommanClose() {
    this.setState({
      xrayreport: false,
      testreport: false,
    });
  }

  InsuranceTabletoggle() {
    this.setState({
      insurancetablemodel: !this.state.insurancetablemodel,
    });
  }
  ViewPrestoggle(id) {
    this.setState({
      viewpresmodal: true,
    });
    console.log("id", id);
    const PresData = this.state.PrescriptionList.filter(
      (newRow) => newRow.id == id
    );
    this.setState({
      UdpateDrugs: PresData[0].drugs,
      UdpatePresData: PresData[0].prescriptionData,
      UdpateRefill: PresData[0].refillCount,
      UdpateVoidAfter: PresData[0].voidAfter,
    });
    //  console.log("PresData", PresData);
  }
  ViewPrestoggleEnd() {
    this.setState({
      viewpresmodal: false,
    });
  }

  AddPrescription() {
    this.setState({ loading: true, recordmodal: false });
    let {
      medicineName,
      durgsDescription,
      drugRefill,
      voidDate,
      doctFistName,
      doctLastName,
      doctID,
      PatientInfo,
      PatientExtra,
    } = this.state;

    // console.log(
    //   "Prescription Added!",
    //   medicineName,
    //   durgsDescription,
    //   drugRefill,
    //   voidDate
    // );
    this.setState({ blockload: true });

    axios
      .post(
        `${apiBaseUrl}/composer/client/addPrescription`,
        {
          doctorName: doctFistName + " " + doctLastName,
          doctorID: doctID,
          patientName: PatientInfo.first_name + " " + PatientInfo.last_name,
          patientID: PatientExtra.id,
          drugs: medicineName,
          prescriptionData: durgsDescription,
          refillCount: drugRefill,
          voidAfter: voidDate,
        },
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.token,
          },
        }
      )
      .then((res) => {
        this.setState({ blockload: false });
        this.toastId = toast("Prescription added Successfully!", {
          transition: Bounce,
          closeButton: true,
          autoClose: 3000,
          position: "bottom-center",
          type: "success",
        });
        this.setState({ loading: false });

        axios
          .get(
            `${apiBaseUrl}/composer/client/getPrescriptionById?patient_id=${
              PatientExtra.id
            }`,

            {
              headers: {
                Authorization: "Bearer " + sessionStorage.token,
              },
            }
          )
          .then((res) => {
            console.log("Prescriptions", res);
            this.setState({
              PrescriptionList: res.data.prescription_list,
            });
          });
        // this.setState({ PatientsData: res.data.patient_list });
      });
  }

  handleHRAType = (e) => {
    this.setState({ HRAType: e.target.value });
    console.log(e.target.value);
  };

  render() {
    // const getfunction = () => {
    //   console.log("click")
    // }
    const {
      medicineName,
      people,
      PatientInfo,
      PatientExtra,
      drugRefill,
      voidDate,
      durgsDescription,
      doctFistName,
      doctLastName,
      doctID,
      PrescriptionList,
      loading,
      AnalysisType,
      HRAType,
      reportdate,
      refdoctor,
      reporttype,
      ipfsHash,
      reportname,
      xreporttype,
      xreportmessage,
      xreportcode,
      xreportdate,
      xreportdoctor,
      BloodReports,
      UrineReports,
    } = this.state;

    console.log("PatientInfo", PrescriptionList, BloodReports, UrineReports);

    /****Graphs data */

    const hrdata1 = {
      labels: ["Mon", "Tues", "Wed", "Thur", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Heart Rate Record",
          fill: false,
          lineTension: 0.1,
          backgroundColor: ["#3f51b554"],
          borderColor: ["#3f51b554"],
          borderCapStyle: "round",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: [
            "#f7b924",
            "#30b1ff",
            "#f7b924",
            "#30b1ff",
            "#f7b924",
            "#30b1ff",
            "f7b924",
          ],
          pointBackgroundColor: "#ffffff",
          pointBorderWidth: 5,
          pointHoverRadius: 10,
          pointHoverBackgroundColor: [
            "#f7b924",
            "#30b1ff",
            "#f7b924",
            "#30b1ff",
            "#f7b924",
            "#30b1ff",
            "f7b924",
          ],
          pointHoverBorderColor: [
            "#f7b924",
            "#30b1ff",
            "#f7b924",
            "#30b1ff",
            "#f7b924",
            "#30b1ff",
            "f7b924",
          ],
          pointHoverBorderWidth: 5,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [65, 60, 63, 100, 133, 80, 140],
        },
      ],
    };
    const hrdata2 = {
      labels: ["JAN", "FEB", "MARCH", "APRL", "JUNE", "JULY", "AUG"],
      datasets: [
        {
          label: "Heart Rate Record",
          fill: false,
          lineTension: 0.1,
          backgroundColor: ["#3f51b554"],
          borderColor: ["#3f51b554"],
          borderCapStyle: "round",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: [
            "#f7b924",
            "#30b1ff",
            "#f7b924",
            "#30b1ff",
            "#f7b924",
            "#30b1ff",
            "f7b924",
          ],
          pointBackgroundColor: "#ffffff",
          pointBorderWidth: 5,
          pointHoverRadius: 10,
          pointHoverBackgroundColor: [
            "#f7b924",
            "#30b1ff",
            "#f7b924",
            "#30b1ff",
            "#f7b924",
            "#30b1ff",
            "f7b924",
          ],
          pointHoverBorderColor: [
            "#f7b924",
            "#30b1ff",
            "#f7b924",
            "#30b1ff",
            "#f7b924",
            "#30b1ff",
            "f7b924",
          ],
          pointHoverBorderWidth: 5,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [90, 100, 75, 120, 133, 85, 106],
        },
      ],
    };

    const hrdata3 = {
      labels: ["2019", "2020", "2021", "2022"],
      datasets: [
        {
          label: "Heart Rate Record",
          fill: false,
          lineTension: 0.1,
          backgroundColor: ["#3f51b554"],
          borderColor: ["#3f51b554"],
          borderCapStyle: "round",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: ["#f7b924", "#30b1ff", "#f7b924", "#30b1ff"],
          pointBackgroundColor: "#ffffff",
          pointBorderWidth: 5,
          pointHoverRadius: 10,
          pointHoverBackgroundColor: [
            "#f7b924",
            "#30b1ff",
            "#f7b924",
            "#30b1ff",
          ],
          pointHoverBorderColor: ["#f7b924", "#30b1ff", "#f7b924", "#30b1ff"],
          pointHoverBorderWidth: 5,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [90, 100, 133, 85],
        },
      ],
    };

    const bpdata1 = {
      labels: ["Mon", "Tues", "Wed", "Thur", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: " Daistolic Pressure",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "#3f51b554",
          borderColor: "#3f51b554",
          borderCapStyle: "round",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: [
            "#f7b924",
            "#30b1ff",
            "#f7b924",
            "#30b1ff",
            "#f7b924",
            "#30b1ff",
            "f7b924",
          ],
          pointBackgroundColor: "#ffffff",
          pointBorderWidth: 5,
          pointHoverRadius: 10,
          pointHoverBackgroundColor: [
            "#f7b924",
            "#30b1ff",
            "#f7b924",
            "#30b1ff",
            "#f7b924",
            "#30b1ff",
            "f7b924",
          ],
          pointHoverBorderColor: [
            "#f7b924",
            "#30b1ff",
            "#f7b924",
            "#30b1ff",
            "#f7b924",
            "#30b1ff",
            "f7b924",
          ],
          pointHoverBorderWidth: 5,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [80, 85, 100, 95, 60, 75, 110],
        },

        {
          label: " Systolic Pressure",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "#e83e8c91",
          borderColor: "#e83e8c91",
          borderCapStyle: "round",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: [
            "#f7b924",
            "#30b1ff",
            "#f7b924",
            "#30b1ff",
            "#f7b924",
            "#30b1ff",
            "f7b924",
          ],
          pointBackgroundColor: "#ffffff",
          pointBorderWidth: 5,
          pointHoverRadius: 10,
          pointHoverBackgroundColor: [
            "#f7b924",
            "#30b1ff",
            "#f7b924",
            "#30b1ff",
            "#f7b924",
            "#30b1ff",
            "f7b924",
          ],
          pointHoverBorderColor: [
            "#f7b924",
            "#30b1ff",
            "#f7b924",
            "#30b1ff",
            "#f7b924",
            "#30b1ff",
            "f7b924",
          ],
          pointHoverBorderWidth: 5,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [120, 125, 160, 140, 120, 120, 170],
        },
      ],
    };
    const bpdata2 = {
      labels: ["JAN", "FEB", "MARCH", "APRL", "JUNE", "JULY", "AUG"],
      datasets: [
        {
          label: " Daistolic Pressure",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "#3f51b554",
          borderColor: "#3f51b554",
          borderCapStyle: "round",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: [
            "#f7b924",
            "#30b1ff",
            "#f7b924",
            "#30b1ff",
            "#f7b924",
            "#30b1ff",
            "f7b924",
          ],
          pointBackgroundColor: "#ffffff",
          pointBorderWidth: 5,
          pointHoverRadius: 10,
          pointHoverBackgroundColor: [
            "#f7b924",
            "#30b1ff",
            "#f7b924",
            "#30b1ff",
            "#f7b924",
            "#30b1ff",
            "f7b924",
          ],
          pointHoverBorderColor: [
            "#f7b924",
            "#30b1ff",
            "#f7b924",
            "#30b1ff",
            "#f7b924",
            "#30b1ff",
            "f7b924",
          ],
          pointHoverBorderWidth: 5,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [80, 85, 100, 95, 60, 75, 110],
        },

        {
          label: " Systolic Pressure",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "#e83e8c91",
          borderColor: "#e83e8c91",
          borderCapStyle: "round",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: [
            "#f7b924",
            "#30b1ff",
            "#f7b924",
            "#30b1ff",
            "#f7b924",
            "#30b1ff",
            "f7b924",
          ],
          pointBackgroundColor: "#ffffff",
          pointBorderWidth: 5,
          pointHoverRadius: 10,
          pointHoverBackgroundColor: [
            "#f7b924",
            "#30b1ff",
            "#f7b924",
            "#30b1ff",
            "#f7b924",
            "#30b1ff",
            "f7b924",
          ],
          pointHoverBorderColor: [
            "#f7b924",
            "#30b1ff",
            "#f7b924",
            "#30b1ff",
            "#f7b924",
            "#30b1ff",
            "f7b924",
          ],
          pointHoverBorderWidth: 5,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [120, 125, 155, 110, 120, 110, 102],
        },
      ],
    };
    const bpdata3 = {
      labels: ["2019", "2020", "2021", "2022"],
      datasets: [
        {
          label: " Daistolic Pressure",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "#3f51b554",
          borderColor: "#3f51b554",
          borderCapStyle: "round",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: ["#f7b924", "#30b1ff", "#f7b924", "#30b1ff"],
          pointBackgroundColor: "#ffffff",
          pointBorderWidth: 5,
          pointHoverRadius: 10,
          pointHoverBackgroundColor: [
            "#f7b924",
            "#30b1ff",
            "#f7b924",
            "#30b1ff",
          ],
          pointHoverBorderColor: ["#f7b924", "#30b1ff", "#f7b924", "#30b1ff"],
          pointHoverBorderWidth: 5,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [80, 130, 75, 110],
        },

        {
          label: " Systolic Pressure",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "#e83e8c91",
          borderColor: "#e83e8c91",
          borderCapStyle: "round",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: [
            "#f7b924",
            "#30b1ff",
            "#f7b924",
            "#30b1ff",
            "#f7b924",
            "#30b1ff",
            "f7b924",
          ],
          pointBackgroundColor: "#ffffff",
          pointBorderWidth: 5,
          pointHoverRadius: 10,
          pointHoverBackgroundColor: [
            "#f7b924",
            "#30b1ff",
            "#f7b924",
            "#30b1ff",
            "#f7b924",
            "#30b1ff",
            "f7b924",
          ],
          pointHoverBorderColor: [
            "#f7b924",
            "#30b1ff",
            "#f7b924",
            "#30b1ff",
            "#f7b924",
            "#30b1ff",
            "f7b924",
          ],
          pointHoverBorderWidth: 5,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [120, 140, 155, 102],
        },
      ],
    };

    {
      /******** */
    }

    const bgdata1 = {
      labels: ["Mon", "Tues", "Wed", "Thur", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: " Blood Glucose Record(in mg/dL)",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "#3f51b554",
          borderColor: "#3f51b554",
          borderCapStyle: "round",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: [
            "#f7b924",
            "#30b1ff",
            "#f7b924",
            "#30b1ff",
            "#f7b924",
            "#30b1ff",
            "f7b924",
          ],
          pointBackgroundColor: "#ffffff",
          pointBorderWidth: 5,
          pointHoverRadius: 10,
          pointHoverBackgroundColor: [
            "#f7b924",
            "#30b1ff",
            "#f7b924",
            "#30b1ff",
            "#f7b924",
            "#30b1ff",
            "f7b924",
          ],
          pointHoverBorderColor: [
            "#f7b924",
            "#30b1ff",
            "#f7b924",
            "#30b1ff",
            "#f7b924",
            "#30b1ff",
            "f7b924",
          ],
          pointHoverBorderWidth: 5,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [50.45, 90.66, 64.86, 110.27, 55.22, 66.09, 104.5],
        },
      ],
    };
    const bgdata2 = {
      labels: ["JAN", "FEB", "MARCH", "APRL", "JUNE", "JULY", "AUG"],
      datasets: [
        {
          label: " Blood Glucose Record(in mg/dL)",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "#3f51b554",
          borderColor: "#3f51b554",
          borderCapStyle: "round",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: [
            "#f7b924",
            "#30b1ff",
            "#f7b924",
            "#30b1ff",
            "#f7b924",
            "#30b1ff",
            "f7b924",
          ],
          pointBackgroundColor: "#ffffff",
          pointBorderWidth: 5,
          pointHoverRadius: 10,
          pointHoverBackgroundColor: [
            "#f7b924",
            "#30b1ff",
            "#f7b924",
            "#30b1ff",
            "#f7b924",
            "#30b1ff",
            "f7b924",
          ],
          pointHoverBorderColor: [
            "#f7b924",
            "#30b1ff",
            "#f7b924",
            "#30b1ff",
            "#f7b924",
            "#30b1ff",
            "f7b924",
          ],
          pointHoverBorderWidth: 5,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [50.45, 60.66, 80.86, 70.27, 90.08, 55.09, 104.5],
        },
      ],
    };

    const bgdata3 = {
      labels: ["2019", "2020", "2021", "2022"],
      datasets: [
        {
          label: " Blood Glucose Record(in mg/dL)",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "#3f51b554",
          borderColor: "#3f51b554",
          borderCapStyle: "round",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: ["#f7b924", "#30b1ff", "#f7b924", "#30b1ff"],
          pointBackgroundColor: "#ffffff",
          pointBorderWidth: 5,
          pointHoverRadius: 10,
          pointHoverBackgroundColor: [
            "#f7b924",
            "#30b1ff",
            "#f7b924",
            "#30b1ff",
          ],
          pointHoverBorderColor: ["#f7b924", "#30b1ff", "#f7b924", "#30b1ff"],
          pointHoverBorderWidth: 5,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [80.86, 90.08, 55.09, 104.5],
        },
      ],
    };

    {
      /******** */
    }

    const bmidata1 = {
      labels: ["Mon", "Tues", "Wed", "Thur", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: " BMI",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "#3f51b554",
          borderColor: "#3f51b554",
          borderCapStyle: "round",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: [
            "#f7b924",
            "#30b1ff",
            "#f7b924",
            "#30b1ff",
            "#f7b924",
            "#30b1ff",
            "f7b924",
          ],
          pointBackgroundColor: "#ffffff",
          pointBorderWidth: 5,
          pointHoverRadius: 10,
          pointHoverBackgroundColor: [
            "#f7b924",
            "#30b1ff",
            "#f7b924",
            "#30b1ff",
            "#f7b924",
            "#30b1ff",
            "f7b924",
          ],
          pointHoverBorderColor: [
            "#f7b924",
            "#30b1ff",
            "#f7b924",
            "#30b1ff",
            "#f7b924",
            "#30b1ff",
            "f7b924",
          ],
          pointHoverBorderWidth: 5,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [27.5, 33.5, 44.3, 15.27, 5.22, 25.09, 30.5],
        },
      ],
    };

    const bmidata2 = {
      labels: ["JAN", "FEB", "MARCH", "APRL", "JUNE", "JULY", "AUG"],
      datasets: [
        {
          label: " BMI",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "#3f51b554",
          borderColor: "#3f51b554",
          borderCapStyle: "round",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: [
            "#f7b924",
            "#30b1ff",
            "#f7b924",
            "#30b1ff",
            "#f7b924",
            "#30b1ff",
            "f7b924",
          ],
          pointBackgroundColor: "#ffffff",
          pointBorderWidth: 5,
          pointHoverRadius: 10,
          pointHoverBackgroundColor: [
            "#f7b924",
            "#30b1ff",
            "#f7b924",
            "#30b1ff",
            "#f7b924",
            "#30b1ff",
            "f7b924",
          ],
          pointHoverBorderColor: [
            "#f7b924",
            "#30b1ff",
            "#f7b924",
            "#30b1ff",
            "#f7b924",
            "#30b1ff",
            "f7b924",
          ],
          pointHoverBorderWidth: 5,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [25.09, 30.5, 15.27, 5.22, 27.5, 33.5, 44.3],
        },
      ],
    };
    const bmidata3 = {
      labels: ["2019", "2020", "2021", "2022"],
      datasets: [
        {
          label: " BMI",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "#3f51b554",
          borderColor: "#3f51b554",
          borderCapStyle: "round",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: [
            "#f7b924",
            "#30b1ff",
            "#f7b924",
            "#30b1ff",
            "#f7b924",
            "#30b1ff",
            "f7b924",
          ],
          pointBackgroundColor: "#ffffff",
          pointBorderWidth: 5,
          pointHoverRadius: 10,
          pointHoverBackgroundColor: [
            "#f7b924",
            "#30b1ff",
            "#f7b924",
            "#30b1ff",
            "#f7b924",
            "#30b1ff",
            "f7b924",
          ],
          pointHoverBorderColor: [
            "#f7b924",
            "#30b1ff",
            "#f7b924",
            "#30b1ff",
            "#f7b924",
            "#30b1ff",
            "f7b924",
          ],
          pointHoverBorderWidth: 5,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [27.5, 33.5, 5.22, 30.5],
        },
      ],
    };

    /******Graphs data End */
    console.log(BloodReports);

    // const addfuctiontoggle = () => {
    //   console.log("click")
    // }

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
              {/* <PageTitle
            heading="Patient Dashboard"
            subheading="This is an example dashboard created using build-in elements and components."
            icon="pe-7s-car icon-gradient bg-mean-fruit"
          /> */}
              <Modal
                isOpen={this.state.uploadmodal}
                // toggle={this.MyReporttoggle}
                className={this.props.className}
                size="lg"
              >
                <ModalHeader>Uploading...</ModalHeader>
                <ModalBody>
                  {/* <div className="font-icon-wrapper float-left mr-3 mb-3"> */}
                  <center>
                    <div
                      className="loader-wrapper d-flex justify-content-center align-items-center"
                      style={{ marginLeft: "40%" }}
                    >
                      <Loader type="ball-grid-pulse" />
                    </div>
                  </center>
                  {/* <p>Uploading</p> */}
                  {/* </div> */}
                </ModalBody>
              </Modal>

              <Row>
                <Col sm="12" md="7">
                  <Row>
                    <Col sm="12" md="6">
                      <Card
                        className="main-card mb-3 card-radius"
                        style={{ height: "" }}
                      >
                        <div className="card no-shadow rm-border bg-transparent widget-chart text-left">
                          <div className="widget-chart-actions">
                            <div>
                              <p
                                style={{
                                  cursor: "pointer",
                                  color: "#3ac47d",
                                  fontSize: "22px",
                                }}
                                onClick={this.AddHRtoggle}
                              >
                                <FontAwesomeIcon icon={faPlusCircle} />
                              </p>
                              &nbsp;
                              <p
                                style={{
                                  cursor: "pointer",
                                  color: "#3ac47d",
                                  fontSize: "22px",
                                }}
                                onClick={this.AnalysisHRtoggle}
                              >
                                <FontAwesomeIcon icon={faEye} />
                              </p>
                            </div>
                            {/* <div>view</div> */}
                          </div>
                          <div className="icon-wrapper rounded">
                            <div className="icon-wrapper-bg opacity-10 bg-danger" />
                            <i
                              className="lnr-heart-pulse"
                              style={{
                                color: "#FFFFFF",
                              }}
                            />
                          </div>
                          <div className="widget-chart-content">
                            <div className="widget-subheading">Heart Rate</div>
                            <div className="widget-numbers fsize-3">
                              165 <span className="fsize-1">BPM</span>
                            </div>
                            <div className="widget-description opacity-8 text-focus">
                              <div>
                                <span>Status: Normal</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                      {/***Add Value */}
                      <Modal
                        size="md"
                        isOpen={this.state.addhrmodal}
                        toggle={this.AddHRtoggle}
                        className={this.props.className}
                      >
                        <ModalHeader toggle={this.AddHRtoggle}>
                          Add Current Heart Rate
                        </ModalHeader>

                        <ModalBody>
                          <Row>
                            <Col ms="6" md="6" xs="12">
                              <Label for="exampleEmail">
                                <span className="text-danger">*</span> Current
                                Heart Value
                              </Label>
                              <Input type="text" />
                            </Col>
                            <Col ms="6" md="6" xs="12">
                              <Label for="exampleEmail">
                                <span className="text-danger" /> Date
                              </Label>
                              <InputGroup className="mb-3">
                                <InputGroupAddon addonType="prepend">
                                  <div className="input-group-text">
                                    <FontAwesomeIcon icon={faCalendarAlt} />
                                  </div>
                                </InputGroupAddon>
                                <InputMask
                                  disabled={true}
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
                            onClick={() => {
                              // addfuctiontoggle()
                              // this.AddHRtoggle
                            }}
                            // this.AddHRtoggle
                          >
                            Save
                          </Button>
                        </ModalFooter>
                      </Modal>

                      {/***View Value */}
                      <Modal
                        size="lg"
                        isOpen={this.state.viewhrmodal}
                        toggle={this.AnalysisHRtoggle}
                        className={this.props.className}
                      >
                        <ModalHeader toggle={this.AnalysisHRtoggle}>
                          Analysis Overview of Heart Rate
                        </ModalHeader>

                        <ModalBody>
                          <Row>
                            <Col xs="12" sm="6" md="6">
                              <Col sm="12" md="12" xs="12">
                                <FormGroup>
                                  <Label for="exampleEmail">
                                    <span className="text-danger">*</span>
                                    Choose to see Analysis
                                  </Label>
                                  <Input
                                    className="mb-2"
                                    type="select"
                                    onChange={this.handleAnalysisType.bind(
                                      this
                                    )}
                                    value={this.state.AnalysisType}
                                  >
                                    <option value="">Choose Type </option>
                                    <option value="Weekly Analysis">
                                      Weekly Analysis
                                    </option>
                                    <option value="Monthly Analysis">
                                      Monthly Analysis
                                    </option>
                                    <option value="Yearly Analysis">
                                      Yearly Analysis
                                    </option>
                                  </Input>
                                </FormGroup>
                              </Col>
                              <br />
                              <Col xs="12" md="12" sm="12">
                                <Card>
                                  <div
                                    className="fsize-1"
                                    style={{
                                      padding: "5%",
                                      fontWeight: "600",
                                    }}
                                  >
                                    Recorded by Doctor:&nbsp;
                                    <span>
                                      <Button
                                        color="warning"
                                        style={{
                                          color: "white",
                                        }}
                                        onClick={this.HRListtoggle}
                                      >
                                        60 BPM | 01/09/2022
                                      </Button>
                                    </span>
                                    <Modal
                                      size="md"
                                      isOpen={this.state.hrleastmodal}
                                      toggle={this.HRListtoggle}
                                      className={this.props.className}
                                    >
                                      <ModalHeader toggle={this.HRListtoggle}>
                                        Recorded by Doctor
                                      </ModalHeader>
                                      <ModalBody>
                                        <div className="scroll-area-sm">
                                          <PerfectScrollbar>
                                            <Table
                                              responsive
                                              hover
                                              striped
                                              borderless
                                              className="align-middle mb-0"
                                            >
                                              <thead>
                                                <tr>
                                                  <th>Heart Rate</th>
                                                  <th>Record Date</th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                <tr>
                                                  <td>59 bpm</td>
                                                  <td>20/08/2022</td>
                                                </tr>
                                                <tr>
                                                  <td>59 bpm</td>
                                                  <td>20/08/2022</td>
                                                </tr>
                                              </tbody>
                                            </Table>
                                          </PerfectScrollbar>
                                        </div>
                                      </ModalBody>
                                    </Modal>
                                  </div>
                                </Card>
                              </Col>
                              <br />
                              <Col xs="12" md="12" sm="12">
                                <Card>
                                  <div
                                    className="fsize-1"
                                    style={{
                                      padding: "5%",
                                      fontWeight: "600",
                                    }}
                                  >
                                    Recorded by Patient:&nbsp;
                                    <span>
                                      {" "}
                                      <Button
                                        onClick={this.PatHRListtoggle}
                                        color="info"
                                      >
                                        58 BPM | 02/08/2022
                                      </Button>
                                    </span>
                                    <Modal
                                      size="md"
                                      isOpen={this.state.Pathrleastmodal}
                                      toggle={this.PatHRListtoggle}
                                      className={this.props.className}
                                    >
                                      <ModalHeader
                                        toggle={this.PatHRListtoggle}
                                      >
                                        Recorded by Patient
                                      </ModalHeader>
                                      <ModalBody>
                                        <div className="scroll-area-sm">
                                          <PerfectScrollbar>
                                            <Table
                                              responsive
                                              hover
                                              striped
                                              borderless
                                              className="align-middle mb-0"
                                            >
                                              <thead>
                                                <tr>
                                                  <th>Heart Rate</th>
                                                  <th>Record Date</th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                <tr>
                                                  <td>60 bpm</td>
                                                  <td>20/08/2022</td>
                                                </tr>
                                                <tr>
                                                  <td>65 bpm</td>
                                                  <td>30/09/2022</td>
                                                </tr>
                                              </tbody>
                                            </Table>
                                          </PerfectScrollbar>
                                        </div>
                                      </ModalBody>
                                    </Modal>
                                  </div>
                                </Card>
                              </Col>
                            </Col>
                            <Col xs="12" sm="6" md="6">
                              <Row>
                                <Col sm="12" md="12" xs="12">
                                  <div>
                                    <Line
                                      data={
                                        AnalysisType === "Weekly Analysis"
                                          ? hrdata1
                                          : AnalysisType === "Monthly Analysis"
                                          ? hrdata2
                                          : AnalysisType === "Yearly Analysis"
                                          ? hrdata3
                                          : hrdata1
                                      }
                                    />
                                  </div>
                                </Col>
                              </Row>
                              <hr />
                              <Row>
                                <Col ms="6" md="6" xs="12">
                                  <div>
                                    <p
                                      style={{
                                        fontWeight: "600",
                                      }}
                                    >
                                      Average Heart Rate:
                                    </p>
                                    <span>92 BPM</span>
                                  </div>
                                </Col>
                                <Col ms="6" md="6" xs="12">
                                  <div>
                                    <p
                                      style={{
                                        fontWeight: "600",
                                      }}
                                    >
                                      Last Recorded:
                                    </p>
                                    <span>02/08/2022</span>
                                  </div>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </ModalBody>
                      </Modal>
                    </Col>
                    <Col sm="12" md="6">
                      <Card
                        className="main-card mb-3 card-radius"
                        style={{ height: "" }}
                      >
                        <div className="card no-shadow rm-border bg-transparent widget-chart text-left">
                          <div className="widget-chart-actions">
                            <div>
                              <p
                                style={{
                                  cursor: "pointer",
                                  color: "#3ac47d",
                                  fontSize: "22px",
                                }}
                                onClick={this.AddBPtoggle}
                              >
                                <FontAwesomeIcon icon={faPlusCircle} />
                              </p>
                              &nbsp;
                              <p
                                style={{
                                  cursor: "pointer",
                                  color: "#3ac47d",
                                  fontSize: "22px",
                                }}
                                onClick={this.AnalysisBPtoggle}
                              >
                                <FontAwesomeIcon icon={faEye} />
                              </p>
                            </div>
                            {/* <div>view</div> */}
                          </div>
                          <div className="icon-wrapper rounded">
                            <div className="icon-wrapper-bg opacity-10 bg-danger" />
                            <i
                              className="lnr-heart"
                              style={{
                                color: "#FFFFFF",
                              }}
                            />
                          </div>
                          <div className="widget-chart-content">
                            <div className="widget-subheading">
                              Blood Pressure
                            </div>
                            <div className="widget-numbers fsize-3">
                              120/80
                              <span className="fsize-1" />
                            </div>
                            <div className="widget-description opacity-8 text-focus">
                              <div>
                                <span>Status: Normal</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>

                      {/***Add Value */}
                      <Modal
                        size="md"
                        isOpen={this.state.addbpmodal}
                        toggle={this.AddBPtoggle}
                        className={this.props.className}
                      >
                        <ModalHeader toggle={this.AddBPtoggle}>
                          Add Current Blood Pressure values
                        </ModalHeader>

                        <ModalBody>
                          <Col ms="12" md="12" xs="12">
                            <Label for="exampleEmail">
                              <span className="text-danger">*</span>
                              Systolic pressure(mm Hg)
                            </Label>
                            <Input type="text" />
                          </Col>
                          <br />
                          <Col ms="12" md="12" xs="12">
                            <Label for="exampleEmail">
                              <span className="text-danger">*</span>
                              Distolic pressure(mm Hg)
                            </Label>
                            <Input type="text" />
                          </Col>
                          <br />
                          <Col ms="12" md="12" xs="12">
                            <Label for="exampleEmail">
                              <span className="text-danger" /> Date
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
                        </ModalBody>
                        <ModalFooter>
                          <Button color="alternate">Save</Button>
                        </ModalFooter>
                      </Modal>

                      {/***View Value */}
                      <Modal
                        size="lg"
                        isOpen={this.state.viewbpmodal}
                        toggle={this.AnalysisBPtoggle}
                        className={this.props.className}
                      >
                        <ModalHeader toggle={this.AnalysisBPtoggle}>
                          Analysis Overview of Blood Pressure
                        </ModalHeader>

                        <ModalBody>
                          <Row>
                            <Col xs="12" sm="6" md="6">
                              <Col sm="12" md="12" xs="12">
                                <FormGroup>
                                  <Label for="exampleEmail">
                                    <span className="text-danger">*</span>
                                    Choose to see Analysis
                                  </Label>
                                  <Input
                                    className="mb-2"
                                    type="select"
                                    // onChange={this.handleAnalysisType.bind(this)}
                                    // value={this.state.AnalysisType}
                                    onChange={this.handleHRAType.bind(this)}
                                    value={HRAType}
                                  >
                                    <option value="">Choose Type </option>
                                    <option value="Weekly Analysis">
                                      Weekly Analysis
                                    </option>
                                    <option value="Monthly Analysis">
                                      Monthly Analysis
                                    </option>
                                    <option value="Yearly Analysis">
                                      Yearly Analysis
                                    </option>
                                  </Input>
                                </FormGroup>
                              </Col>
                              <br />
                              <Col xs="12" md="12" sm="12">
                                <Card>
                                  <div
                                    className="fsize-1"
                                    style={{
                                      padding: "5%",
                                      fontWeight: "600",
                                    }}
                                  >
                                    Recorded by Doctor:&nbsp;
                                    <span>
                                      <Button
                                        color="warning"
                                        style={{
                                          color: "white",
                                        }}
                                      >
                                        60 BPM | 01/09/2022
                                      </Button>
                                    </span>
                                  </div>
                                </Card>
                              </Col>
                              <br />
                              <Col xs="12" md="12" sm="12">
                                <Card>
                                  <div
                                    className="fsize-1"
                                    style={{
                                      padding: "5%",
                                      fontWeight: "600",
                                    }}
                                  >
                                    Recorded by Patient:&nbsp;
                                    <span>
                                      {" "}
                                      <Button color="info">
                                        58 BPM | 02/08/2022
                                      </Button>
                                    </span>
                                  </div>
                                </Card>
                              </Col>
                            </Col>
                            <Col xs="12" sm="6" md="6">
                              <Row>
                                <Col sm="12" md="12" xs="12">
                                  <div>
                                    <Line
                                      data={
                                        HRAType === "Weekly Analysis"
                                          ? bpdata1
                                          : HRAType === "Monthly Analysis"
                                          ? bpdata2
                                          : HRAType === "Yearly Analysis"
                                          ? bpdata3
                                          : bpdata1
                                      }
                                    />
                                  </div>
                                </Col>
                              </Row>
                              <hr />
                              <Row>
                                <Col ms="6" md="6" xs="12">
                                  <div>
                                    <p
                                      style={{
                                        fontWeight: "600",
                                      }}
                                    >
                                      Average Rate:
                                    </p>
                                    <span>60 BPM</span>
                                  </div>
                                </Col>
                                <Col ms="6" md="6" xs="12">
                                  <div>
                                    <p
                                      style={{
                                        fontWeight: "600",
                                      }}
                                    >
                                      Last Recorded:
                                    </p>
                                    <span>02/08/2022</span>
                                  </div>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </ModalBody>
                      </Modal>
                    </Col>
                    <Col sm="12" md="6">
                      <Card
                        className="main-card mb-3 card-radius"
                        style={{ height: "" }}
                      >
                        <div className="card no-shadow rm-border bg-transparent widget-chart text-left">
                          <div className="widget-chart-actions">
                            <div>
                              <p
                                style={{
                                  cursor: "pointer",
                                  color: "#3ac47d",
                                  fontSize: "22px",
                                }}
                                onClick={this.AddBMItoggle}
                              >
                                <FontAwesomeIcon icon={faPlusCircle} />
                              </p>
                              &nbsp;
                              <p
                                style={{
                                  cursor: "pointer",
                                  color: "#3ac47d",
                                  fontSize: "22px",
                                }}
                                onClick={this.AnalysisBMItoggle}
                              >
                                <FontAwesomeIcon icon={faEye} />
                              </p>
                            </div>
                            {/* <div>view</div> */}
                          </div>
                          <div className="icon-wrapper rounded">
                            <div className="icon-wrapper-bg opacity-10 bg-danger" />
                            <i
                              className="lnr-chart-bars"
                              style={{
                                color: "#FFFFFF",
                              }}
                            />
                          </div>
                          <div className="widget-chart-content">
                            <div className="widget-subheading">BMI</div>
                            <div className="widget-numbers fsize-3">
                              5'11/140 Lb <span className="fsize-1" />
                            </div>
                            <div className="widget-description opacity-8 text-focus">
                              <div>
                                <span>Status: Under Weight</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                      {/***Add Value */}
                      {/***Add Value */}
                      <Modal
                        size="md"
                        isOpen={this.state.addbmimodal}
                        toggle={this.AddBMItoggle}
                        className={this.props.className}
                      >
                        <ModalHeader toggle={this.AddBMItoggle}>
                          BMI Calculate
                        </ModalHeader>

                        <ModalBody>
                          <Col ms="12" md="12" xs="12">
                            <Label for="exampleEmail">
                              <span className="text-danger">*</span>
                              Weight(in Lb)
                            </Label>
                            <Input type="number" />
                          </Col>
                          <br />

                          <Col ms="12" md="12" xs="12">
                            <Label for="exampleEmail">
                              <span className="text-danger">*</span>
                              Height
                            </Label>

                            <Row>
                              <Col sm="6" md="6" xs="12">
                                <InputGroup className="mb-3">
                                  <InputGroupAddon addonType="prepend">
                                    <div className="input-group-text">ft</div>
                                  </InputGroupAddon>
                                  <Input
                                    value=""
                                    placeholder=""
                                    type="number"
                                  />
                                </InputGroup>
                              </Col>
                              <Col sm="6" md="6" xs="12">
                                <InputGroup className="mb-3">
                                  <InputGroupAddon addonType="prepend">
                                    <div className="input-group-text">in</div>
                                  </InputGroupAddon>
                                  <Input
                                    value=""
                                    placeholder=""
                                    type="number"
                                  />
                                </InputGroup>
                              </Col>
                            </Row>
                          </Col>

                          <br />
                          <Col ms="12" md="12" xs="12">
                            <Label for="exampleEmail">
                              <span className="text-danger" /> Date
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
                        </ModalBody>
                        <ModalFooter>
                          <Button color="alternate">Save</Button>
                        </ModalFooter>
                      </Modal>

                      {/***View Value */}
                      <Modal
                        size="lg"
                        isOpen={this.state.viewbmimodal}
                        toggle={this.AnalysisBMItoggle}
                        className={this.props.className}
                      >
                        <ModalHeader toggle={this.AnalysisBMItoggle}>
                          Analysis Overview of BMI
                        </ModalHeader>

                        <ModalBody>
                          <Row>
                            <Col xs="12" sm="6" md="6">
                              <Col sm="12" md="12" xs="12">
                                <FormGroup>
                                  <Label for="exampleEmail">
                                    <span className="text-danger">*</span>
                                    Choose to see Analysis
                                  </Label>
                                  <Input
                                    className="mb-2"
                                    type="select"
                                    onChange={this.handleHRAType.bind(this)}
                                    value={HRAType}
                                    // onChange={this.handleAnalysisType.bind(
                                    //   this
                                    // )}
                                    // value={this.state.AnalysisType}
                                  >
                                    <option value="">Choose Type </option>
                                    <option value="Weekly Analysis">
                                      Weekly Analysis
                                    </option>
                                    <option value="Monthly Analysis">
                                      Monthly Analysis
                                    </option>
                                    <option value="Yearly Analysis">
                                      Yearly Analysis
                                    </option>
                                  </Input>
                                </FormGroup>
                              </Col>
                              <br />
                              <Col xs="12" md="12" sm="12">
                                <Card>
                                  <div
                                    className="fsize-1"
                                    style={{
                                      padding: "5%",
                                      fontWeight: "600",
                                    }}
                                  >
                                    Recorded by Doctor:&nbsp;
                                    <span>
                                      <Button
                                        color="warning"
                                        style={{
                                          color: "white",
                                        }}
                                      >
                                        60 BPM | 01/09/2022
                                      </Button>
                                    </span>
                                  </div>
                                </Card>
                              </Col>
                              <br />
                              <Col xs="12" md="12" sm="12">
                                <Card>
                                  <div
                                    className="fsize-1"
                                    style={{
                                      padding: "5%",
                                      fontWeight: "600",
                                    }}
                                  >
                                    Recorded by Patient:&nbsp;
                                    <span>
                                      {" "}
                                      <Button color="info">
                                        58 BPM | 02/08/2022
                                      </Button>
                                    </span>
                                  </div>
                                </Card>
                              </Col>
                            </Col>
                            <Col xs="12" sm="6" md="6">
                              <Row>
                                <Col sm="12" md="12" xs="12">
                                  <div>
                                    <Line
                                      data={
                                        HRAType === "Weekly Analysis"
                                          ? bmidata1
                                          : HRAType === "Monthly Analysis"
                                          ? bmidata2
                                          : HRAType === "Yearly Analysis"
                                          ? bmidata3
                                          : bmidata1
                                      }
                                    />
                                  </div>
                                </Col>
                              </Row>
                              <hr />
                              <Row>
                                <Col ms="6" md="6" xs="12">
                                  <div>
                                    <p
                                      style={{
                                        fontWeight: "600",
                                      }}
                                    >
                                      Average Rate:
                                    </p>
                                    <span>60 BPM</span>
                                  </div>
                                </Col>
                                <Col ms="6" md="6" xs="12">
                                  <div>
                                    <p
                                      style={{
                                        fontWeight: "600",
                                      }}
                                    >
                                      Last Recorded:
                                    </p>
                                    <span>02/08/2022</span>
                                  </div>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </ModalBody>
                      </Modal>
                    </Col>
                    <Col sm="12" md="6">
                      <Card
                        className="main-card mb-3 card-radius"
                        style={{ height: "" }}
                      >
                        <div className="card no-shadow rm-border bg-transparent widget-chart text-left">
                          <div className="widget-chart-actions">
                            <div>
                              <p
                                style={{
                                  cursor: "pointer",
                                  color: "#3ac47d",
                                  fontSize: "22px",
                                }}
                                onClick={this.AddBGtoggle}
                              >
                                <FontAwesomeIcon icon={faPlusCircle} />
                              </p>
                              &nbsp;
                              <p
                                style={{
                                  cursor: "pointer",
                                  color: "#3ac47d",
                                  fontSize: "22px",
                                }}
                                onClick={this.AnalysisBGtoggle}
                              >
                                <FontAwesomeIcon icon={faEye} />
                              </p>
                            </div>
                            {/* <div>view</div> */}
                          </div>
                          <div className="icon-wrapper rounded">
                            <div className="icon-wrapper-bg opacity-10 bg-danger" />
                            <i
                              className="lnr-drop"
                              style={{
                                color: "#FFFFFF",
                              }}
                            />
                          </div>
                          <div className="widget-chart-content">
                            <div className="widget-subheading">
                              Blood Glucose
                            </div>
                            <div className="widget-numbers fsize-3">
                              100
                              <span className="fsize-1"> mg/dl</span>
                            </div>
                            <div className="widget-description opacity-8 text-focus">
                              <div>
                                <span>Status: Normal</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                      {/***Add Value */}
                      {/***Add Value */}
                      <Modal
                        size="md"
                        isOpen={this.state.addbgmodal}
                        toggle={this.AddBGtoggle}
                        className={this.props.className}
                      >
                        <ModalHeader toggle={this.AddBGtoggle}>
                          Calculate Blood Glucose
                        </ModalHeader>

                        <ModalBody>
                          {/* <Col ms="12" md="12" xs="12">
                    <Label for="exampleEmail">
                      <span className="text-danger">*</span>
                      Blood sugar level in mmol/l
                    </Label>
                    <Input type="text" />
                  </Col>
                  <br />
                  <div className="fsize-2 text-center">OR</div> */}
                          <Col ms="12" md="12" xs="12">
                            <Label for="exampleEmail">
                              <span className="text-danger">*</span>
                              Blood sugar level in mg/dl
                            </Label>
                            <Input type="text" />
                          </Col>
                          <br />
                          <Col ms="12" md="12" xs="12">
                            <Label for="exampleEmail">
                              <span className="text-danger" /> Date
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
                        </ModalBody>
                        <ModalFooter>
                          <Button color="alternate">Save</Button>
                        </ModalFooter>
                      </Modal>

                      {/***View Value */}
                      <Modal
                        size="lg"
                        isOpen={this.state.viewbgmodal}
                        toggle={this.AnalysisBGtoggle}
                        className={this.props.className}
                      >
                        <ModalHeader toggle={this.AnalysisBGtoggle}>
                          Analysis Overview of Blood Glucose
                        </ModalHeader>

                        <ModalBody>
                          <Row>
                            <Col xs="12" sm="6" md="6">
                              <Col sm="12" md="12" xs="12">
                                <FormGroup>
                                  <Label for="exampleEmail">
                                    <span className="text-danger">*</span>
                                    Choose to see Analysis
                                  </Label>
                                  <Input
                                    className="mb-2"
                                    type="select"
                                    onChange={this.handleHRAType.bind(this)}
                                    value={HRAType}
                                    // onChange={this.handleAnalysisType.bind(this)}
                                    // value={this.state.AnalysisType}
                                  >
                                    <option value="">Choose Type </option>
                                    <option value="Weekly Analysis">
                                      Weekly Analysis
                                    </option>
                                    <option value="Monthly Analysis">
                                      Monthly Analysis
                                    </option>
                                    <option value="Yearly Analysis">
                                      Yearly Analysis
                                    </option>
                                  </Input>
                                </FormGroup>
                              </Col>
                              <br />
                              <Col xs="12" md="12" sm="12">
                                <Card>
                                  <div
                                    className="fsize-1"
                                    style={{
                                      padding: "5%",
                                      fontWeight: "600",
                                    }}
                                  >
                                    Recorded by Doctor:&nbsp;
                                    <span>
                                      <Button
                                        color="warning"
                                        style={{
                                          color: "white",
                                        }}
                                      >
                                        60 BPM | 01/09/2022
                                      </Button>
                                    </span>
                                  </div>
                                </Card>
                              </Col>
                              <br />
                              <Col xs="12" md="12" sm="12">
                                <Card>
                                  <div
                                    className="fsize-1"
                                    style={{
                                      padding: "5%",
                                      fontWeight: "600",
                                    }}
                                  >
                                    Recorded by Patient:&nbsp;
                                    <span>
                                      {" "}
                                      <Button color="info">
                                        58 BPM | 02/08/2022
                                      </Button>
                                    </span>
                                  </div>
                                </Card>
                              </Col>
                            </Col>
                            <Col xs="12" sm="6" md="6">
                              <Row>
                                <Col sm="12" md="12" xs="12">
                                  <div>
                                    <Line
                                      data={
                                        HRAType === "Weekly Analysis"
                                          ? bgdata1
                                          : HRAType === "Monthly Analysis"
                                          ? bgdata2
                                          : HRAType === "Yearly Analysis"
                                          ? bgdata3
                                          : bgdata1
                                      }
                                    />
                                  </div>
                                </Col>
                              </Row>
                              <hr />
                              <Row>
                                <Col ms="6" md="6" xs="12">
                                  <div>
                                    <p
                                      style={{
                                        fontWeight: "600",
                                      }}
                                    >
                                      Average Rate:
                                    </p>
                                    <span>60 BPM</span>
                                  </div>
                                </Col>
                                <Col ms="6" md="6" xs="12">
                                  <div>
                                    <p
                                      style={{
                                        fontWeight: "600",
                                      }}
                                    >
                                      Last Recorded:
                                    </p>
                                    <span>02/08/2022</span>
                                  </div>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </ModalBody>
                      </Modal>
                    </Col>
                  </Row>
                </Col>
                <Col sm="5" md="5">
                  <Card className="mb-3">
                    <CardBody>
                      <Col md="12" sm="12" xs="12">
                        <div>
                          <div className="text-focus fsize-2">
                            Patient Details
                          </div>
                        </div>
                        <hr />
                        <Row>
                          <Col sm="7" md="7" xs="12">
                            <div>
                              <div className="fsize-1">
                                <p className="text-focus">
                                  Patient Name:&nbsp;
                                  <span
                                    style={{
                                      fontWeight: "300",
                                    }}
                                  >
                                    {PatientInfo.first_name}{" "}
                                    {PatientInfo.last_name}
                                  </span>
                                </p>
                                <p className="text-focus">
                                  Patient Email:{" "}
                                  <span
                                    style={{
                                      fontWeight: "300",
                                    }}
                                  >
                                    {PatientInfo.email}
                                  </span>
                                </p>
                                <p className="text-focus">
                                  Patient Gender:{" "}
                                  <span
                                    style={{
                                      fontWeight: "300",
                                    }}
                                  >
                                    {PatientExtra.gender}
                                  </span>
                                </p>
                                {/* <p className="text-focus">
                          Mobile No:{" "}
                          <span
                            style={{
                              fontWeight: "300",
                            }}
                          >
                            9033998812
                          </span>
                        </p> */}
                                <p className="text-focus">
                                  Address:{" "}
                                  <span
                                    style={{
                                      fontWeight: "300",
                                    }}
                                  >
                                    {PatientInfo.address},{PatientInfo.city},
                                    {PatientInfo.state}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </Col>
                          <Col md="5" sm="5" xs="12">
                            <Card
                              className="main-card mb-3 card-radius"
                              style={{}}
                            >
                              <div className="card no-shadow rm-border bg-transparent widget-chart text-left">
                                <div className="widget-chart-actions">
                                  <p
                                    style={{
                                      cursor: "pointer",
                                      color: "#3ac47d",
                                      fontSize: "22px",
                                    }}
                                  >
                                    <FontAwesomeIcon icon={faEye} />
                                  </p>
                                </div>

                                <div className="icon-wrapper rounded">
                                  <div className="icon-wrapper-bg opacity-10 " />
                                  <div className="ml-auto">
                                    <Circle
                                      animate={true} // Boolean: Animated/Static progress
                                      animationDuration="10s" // String: Length of animation
                                      responsive={false} // Boolean: Make SVG adapt to parent size
                                      size="46" // String: Defines the size of the circle.
                                      lineWidth="30" // String: Defines the thickness of the circle's stroke.
                                      progress="80" // String: Update to change the progress and percentage.
                                      progressColor="var(--success)" // String: Color of "progress" portion of circle.
                                      bgColor="#ecedf0" // String: Color of "empty" portion of circle.
                                      textColor="#6b778c" // String: Color of percentage text color.
                                      textStyle={{
                                        fontSize: "6rem", // CSSProperties: Custom styling for percentage.
                                      }}
                                      percentSpacing={5} // Number: Adjust spacing of "%" symbol and number.
                                      roundedStroke={true} // Boolean: Rounded/Flat line ends
                                      showPercentage={true} // Boolean: Show/hide percentage.
                                      showPercentageSymbol={false} // Boolean: Show/hide only the "%" symbol.
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="">
                                &nbsp;Overall status: Normal
                              </div>
                            </Card>
                          </Col>
                        </Row>
                      </Col>
                    </CardBody>
                  </Card>
                </Col>
              </Row>

              <Row>
                <Col sm="12" md="12" xs="12">
                  <Card className="mb-3">
                    <CardHeader className="card-header-tab">
                      <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
                        Prescription
                      </div>

                      <div className="btn-actions-pane-right text-capitalize">
                        {/****X-Ray Report */}
                        <Modal
                          size="lg"
                          isOpen={this.state.xrayreport}
                          toggle={this.XRaytoggle}
                          className={this.props.className}
                        >
                          <ModalHeader>X-Ray Report</ModalHeader>
                          <ModalBody>
                            <Row>
                              <Col sm="6" md="6" xs="12">
                                <Label for="exampleEmail">
                                  <span className="text-danger">*</span> Select
                                  Report Type
                                </Label>
                                <FormGroup>
                                  <Input
                                    className="mb-2"
                                    type="select"
                                    value={xreporttype}
                                    onChange={(e) =>
                                      this.handleXRayUploadChange(
                                        "xreporttype",
                                        e
                                      )
                                    }
                                  >
                                    <option>Report Type</option>
                                    <option value="BLOOD TEST">
                                      BLOOD TEST
                                    </option>
                                    <option value="URINE TEST">
                                      URINE TEST
                                    </option>
                                    <option value="CARDIAC TEST">
                                      CARDIAC TEST
                                    </option>
                                    <option value="X-RAY">X-RAY</option>
                                    <option value="DIABETES">DIABETES</option>
                                    <option value="KIDNEY">KIDNEY</option>
                                    <option value="LUNGS">LUNGS</option>
                                    <option value="BLOOD PRESSURE">
                                      BLOOD PRESSURE
                                    </option>
                                    <option value="STOMACH">STOMACH</option>
                                    <option value="LIVER">LIVER</option>
                                    <option value="GENREAL">GENREAL</option>
                                    <option value="LAB REPORT">
                                      LAB REPORT
                                    </option>
                                    <option value="ADMISSION">ADMISSION</option>
                                  </Input>
                                </FormGroup>
                              </Col>
                              <Col sm="6" md="6" xs="12">
                                <Label for="exampleEmail">
                                  <span className="text-danger">*</span> Date
                                </Label>
                                <InputGroup className="mb-3">
                                  <InputGroupAddon addonType="prepend">
                                    <div className="input-group-text">
                                      <FontAwesomeIcon icon={faCalendarAlt} />
                                    </div>
                                  </InputGroupAddon>
                                  <InputMask
                                    className="form-control"
                                    mask="99-99-9999"
                                    defaultValue="27-10-2018"
                                    value={xreportdate}
                                    onChange={(e) =>
                                      this.handleXRayUploadChange(
                                        "xreportdate",
                                        e
                                      )
                                    }
                                  />
                                </InputGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col sm="6" md="6" xs="12">
                                <Label for="exampleEmail">
                                  <span className="text-danger">*</span> Ref
                                  Doctor
                                </Label>
                                <FormGroup>
                                  <Input
                                    className="mb-2"
                                    type="text"
                                    value={xreportdoctor}
                                    onChange={(e) =>
                                      this.handleXRayUploadChange(
                                        "xreportdoctor",
                                        e
                                      )
                                    }
                                  />
                                </FormGroup>
                              </Col>
                              <Col sm="6" md="6" xs="12">
                                <Label for="exampleEmail">
                                  <span className="text-danger">*</span> Code ID
                                </Label>
                                <InputGroup className="mb-3">
                                  <InputGroupAddon addonType="prepend">
                                    <div className="input-group-text">
                                      <FontAwesomeIcon icon={faAdjust} />
                                    </div>
                                  </InputGroupAddon>
                                  <InputMask
                                    className="form-control"
                                    type="text"
                                    value={xreportcode}
                                    onChange={(e) =>
                                      this.handleXRayUploadChange(
                                        "xreportcode",
                                        e
                                      )
                                    }
                                  />
                                </InputGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col sm="12" md="12" xs="12">
                                <Label for="exampleEmail">
                                  <span className="text-danger">*</span>{" "}
                                  Description
                                </Label>

                                <TextareaAutosize
                                  className="form-control"
                                  minRows={5}
                                  maxRows={5}
                                  value={xreportmessage}
                                  onChange={(e) =>
                                    this.handleXRayUploadChange(
                                      "xreportmessage",
                                      e
                                    )
                                  }
                                />
                              </Col>
                            </Row>
                          </ModalBody>
                          <ModalFooter>
                            <Button onClick={this.CommanClose.bind(this)}>
                              Close
                            </Button>
                            <Button
                              color="primary"
                              onClick={this.UploadXRayReport.bind(this)}
                            >
                              Save
                            </Button>
                          </ModalFooter>
                        </Modal>
                        {/**** Test Report */}
                        <Modal
                          size="lg"
                          isOpen={this.state.testreport}
                          S
                          toggle={this.TestReporttoggle}
                          className={this.props.className}
                        >
                          <ModalHeader>Upload Scan Report</ModalHeader>
                          <ModalBody>
                            <Row>
                              <Col sm="6" md="6" xs="12">
                                <Label for="exampleEmail">
                                  <span className="text-danger">*</span> Select
                                  Report Type
                                </Label>
                                <FormGroup>
                                  <Input
                                    className="mb-2"
                                    type="select"
                                    onChange={(e) =>
                                      this.handleReportUploadChange(
                                        "reporttype",
                                        e
                                      )
                                    }
                                    value={reporttype}
                                  >
                                    <option>Report Type</option>
                                    <option value="BLOOD TEST">
                                      BLOOD TEST
                                    </option>
                                    <option value="URINE TEST">
                                      URINE TEST
                                    </option>
                                    <option value="CARDIAC TEST">
                                      CARDIAC TEST
                                    </option>
                                    <option value="X-RAY">X-RAY</option>
                                    <option value="DIABETES">DIABETES</option>
                                    <option value="KIDNEY">KIDNEY</option>
                                    <option value="LUNGS">LUNGS</option>
                                    <option value="BLOOD PRESSURE">
                                      BLOOD PRESSURE
                                    </option>
                                    <option value="STOMACH">STOMACH</option>
                                    <option value="LIVER">LIVER</option>
                                    <option value="GENREAL">GENREAL</option>
                                    <option value="LAB REPORT">
                                      LAB REPORT
                                    </option>
                                    <option value="ADMISSION">ADMISSION</option>
                                  </Input>
                                </FormGroup>
                              </Col>
                              <Col sm="6" md="6" xs="12">
                                <Label for="exampleEmail">
                                  <span className="text-danger">*</span> Date
                                </Label>
                                <InputGroup className="mb-3">
                                  <InputGroupAddon addonType="prepend">
                                    <div className="input-group-text">
                                      <FontAwesomeIcon icon={faCalendarAlt} />
                                    </div>
                                  </InputGroupAddon>
                                  <InputMask
                                    className="form-control"
                                    mask="99-99-9999"
                                    defaultValue={
                                      new Date().getDate() +
                                      "/" +
                                      (new Date().getMonth() + 1) +
                                      "/" +
                                      new Date().getFullYear()
                                    }
                                    onChange={(e) =>
                                      this.handleReportUploadChange(
                                        "reportdate",
                                        e
                                      )
                                    }
                                    value={reportdate}
                                  />
                                </InputGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col sm="6" md="6" xs="12">
                                <Label for="exampleEmail">
                                  <span className="text-danger">*</span> Report
                                  Name
                                </Label>
                                <FormGroup>
                                  <Input
                                    className="mb-2"
                                    type="text"
                                    onChange={(e) =>
                                      this.handleReportUploadChange(
                                        "reportname",
                                        e
                                      )
                                    }
                                    value={reportname}
                                  />
                                </FormGroup>
                              </Col>
                              <Col sm="6" md="6" xs="12">
                                <Label for="exampleEmail">
                                  <span className="text-danger">*</span> Doctor
                                  Ref
                                </Label>
                                <InputGroup className="mb-3">
                                  <InputGroupAddon addonType="prepend">
                                    <div className="input-group-text">
                                      <FontAwesomeIcon icon={faUser} />
                                    </div>
                                  </InputGroupAddon>
                                  <InputMask
                                    className="form-control"
                                    type="text"
                                    onChange={(e) =>
                                      this.handleReportUploadChange(
                                        "refdoctor",
                                        e
                                      )
                                    }
                                    value={refdoctor}
                                  />
                                </InputGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col sm="12" md="12" xs="12">
                                <Label for="exampleEmail">
                                  <span className="text-danger">*</span> Upload
                                  Report
                                </Label>
                                <input
                                  type="file"
                                  onChange={this.captureFile}
                                />
                              </Col>
                            </Row>
                          </ModalBody>
                          <ModalFooter>
                            <Button onClick={this.CommanClose.bind(this)}>
                              Close
                            </Button>
                            <Button
                              color="primary"
                              onClick={this.UploadReportFile.bind(this)}
                            >
                              Save
                            </Button>
                          </ModalFooter>
                        </Modal>
                        &nbsp;
                        <Button color="alternate" onClick={this.Recordtoggle}>
                          <FontAwesomeIcon icon={faPlusCircle} />
                          &nbsp; Add Prescripttion
                        </Button>
                        <Modal
                          size="lg"
                          isOpen={this.state.recordmodal}
                          toggle={this.Recordtoggle}
                          className={this.props.className}
                        >
                          <ModalHeader toggle={this.Recordtoggle}>
                            <div
                              className=""
                              style={{
                                display: "inline-flex",
                              }}
                            >
                              Add Prescription for {PatientInfo.first_name}{" "}
                              {PatientInfo.last_name}{" "}
                              {loading ? (
                                <Loader type="ball-clip-rotate" />
                              ) : null}
                            </div>
                          </ModalHeader>
                          <ModalBody>
                            <Col sm="12" md="12" xs="12">
                              <Label for="exampleEmail">
                                <span className="text-danger">*</span>{" "}
                                Medicine's Name
                              </Label>
                              <Input
                                type="text"
                                value={medicineName}
                                onChange={(e) =>
                                  this.handlePrescriptionChange(
                                    "medicineName",
                                    e
                                  )
                                }
                              />
                              <div
                                style={{
                                  fontSize: "12px",
                                  color: "red",
                                }}
                              >
                                Seprate Multiple drurgs by "," like:
                                paracetamol,covix
                              </div>

                              {/* <Multiselect
                                               data={people}
                                               value={
                                                 medicineName
                                               }
                                               allowCreate="onFilter"
                                               onCreate={(
                                                 name
                                               ) =>
                                                 this.handleCreate(
                                                   name
                                                 )
                                               }
                                               onChange={(
                                                 medicineName
                                               ) =>
                                                 this.setState({
                                                   medicineName,
                                                 })
                                               }
                                               textField="name"
                                             /> */}
                            </Col>
                            <br />
                            <Col sm="12" md="12" xs="12">
                              <Label for="exampleEmail">
                                <span className="text-danger">*</span>{" "}
                                Description
                              </Label>
                              {/* <CKEditor
                                // content={durgsDescription}
                                // events={{
                                //   blur: this.onBlur,
                                //   afterPaste: this.afterPaste,
                                //   change: this.onChange,
                                // }}
                                value={durgsDescription}
                                onChange={(e) =>
                                  this.handlePrescriptionChange(
                                    "durgsDescription",
                                    e
                                  )
                                }
                              /> */}
                              <TextareaAutosize
                                className="form-control"
                                minRows={3}
                                maxRows={10}
                                defaultValue="Description here....."
                                value={durgsDescription}
                                onChange={(e) =>
                                  this.handlePrescriptionChange(
                                    "durgsDescription",
                                    e
                                  )
                                }
                              />
                            </Col>
                            <br />
                            <Row>
                              {/* <Col sm="6" md="6" xs="12">
                                <Label for="exampleEmail">
                                  <span className="text-danger">*</span>{" "}
                                  Dose
                                </Label>
                                <Input type="text" />
                              </Col> */}
                              <Col sm="6" md="6" xs="12">
                                <Label for="exampleEmail">
                                  <span className="text-danger">*</span> Void
                                  After
                                </Label>
                                <InputGroup className="mb-3">
                                  <InputGroupAddon addonType="prepend">
                                    <div className="input-group-text">
                                      <FontAwesomeIcon icon={faCalendarAlt} />
                                    </div>
                                  </InputGroupAddon>
                                  <InputMask
                                    className="form-control"
                                    mask="99-99-9999"
                                    defaultValue="27-10-2018"
                                    value={voidDate}
                                    onChange={(e) =>
                                      this.handlePrescriptionChange(
                                        "voidDate",
                                        e
                                      )
                                    }
                                  />
                                </InputGroup>
                              </Col>
                              <Col sm="6" md="6" xs="12">
                                <Label for="exampleEmail">
                                  <span className="text-danger">*</span> Refill
                                </Label>
                                <FormGroup>
                                  <Input
                                    className="mb-2"
                                    type="select"
                                    value={drugRefill}
                                    onChange={(e) =>
                                      this.handlePrescriptionChange(
                                        "drugRefill",
                                        e
                                      )
                                    }
                                  >
                                    <option>select Refill</option>
                                    <option value="One Time">One Time</option>
                                    <option value="Two Time">Two Time</option>
                                    <option value="Three Time">
                                      Three Time
                                    </option>
                                    <option value="Four Time">Four Time</option>
                                    <option value="Five Time">Five Time</option>
                                    <option value="Six Time">Six Time</option>
                                  </Input>
                                </FormGroup>
                              </Col>
                            </Row>
                            <br />
                          </ModalBody>
                          <ModalFooter>
                            <Button color="link" onClick={this.Recordtoggle}>
                              Cancel
                            </Button>
                            <Button
                              color="primary"
                              onClick={this.AddPrescription.bind(this)}
                            >
                              Save
                            </Button>{" "}
                          </ModalFooter>
                        </Modal>
                      </div>
                    </CardHeader>
                    <CardBody className="pt-0">
                      <br />
                      <Card className="main-card mb-3">
                        <CardBody>
                          <CardHeader>
                            List of Prescription
                            <div className="btn-actions-pane-right text-capitalize">
                              <UncontrolledButtonDropdown>
                                <DropdownToggle
                                  caret
                                  className="mb-2 mr-2"
                                  color="primary"
                                >
                                  <FontAwesomeIcon icon={faCalendarAlt} />{" "}
                                  filter
                                </DropdownToggle>
                                <DropdownMenu>
                                  <Nav vertical>
                                    <Col sm="12" md="12" xs="12">
                                      <Label for="exampleEmail">
                                        <span className="text-danger">*</span>{" "}
                                        From:
                                      </Label>
                                      <InputGroup className="mb-3">
                                        <InputGroupAddon addonType="prepend">
                                          <div className="input-group-text">
                                            <FontAwesomeIcon
                                              icon={faCalendarAlt}
                                            />
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
                                    <Col sm="12" md="12" xs="12">
                                      <Label for="exampleEmail">
                                        <span className="text-danger">*</span>{" "}
                                        To
                                      </Label>
                                      <InputGroup className="mb-3">
                                        <InputGroupAddon addonType="prepend">
                                          <div className="input-group-text">
                                            <FontAwesomeIcon
                                              icon={faCalendarAlt}
                                            />
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
                                    <NavItem className="nav-item-divider" />
                                    <NavItem className="nav-item-btn text-right">
                                      <Button
                                        size="sm"
                                        className="btn-pill"
                                        color="success"
                                      >
                                        Apply
                                      </Button>
                                    </NavItem>
                                  </Nav>
                                </DropdownMenu>
                              </UncontrolledButtonDropdown>
                              <UncontrolledButtonDropdown>
                                <DropdownToggle
                                  caret
                                  className="mb-2 mr-2"
                                  color="danger"
                                >
                                  <FontAwesomeIcon icon={faUserCircle} />
                                  &nbsp; filter
                                </DropdownToggle>
                                <DropdownMenu>
                                  <Nav vertical>
                                    <Col sm="12" md="12" xs="12">
                                      <Label for="exampleEmail">
                                        <span className="text-danger">*</span>{" "}
                                        Doctor Name
                                      </Label>
                                      <InputGroup className="mb-3">
                                        <InputGroupAddon addonType="prepend">
                                          <div className="input-group-text">
                                            <FontAwesomeIcon
                                              icon={faUserCircle}
                                            />
                                          </div>
                                        </InputGroupAddon>
                                        <Input type="text" />
                                      </InputGroup>
                                    </Col>

                                    <NavItem className="nav-item-divider" />
                                    <NavItem className="nav-item-btn text-right">
                                      <Button
                                        size="sm"
                                        className="btn-pill"
                                        color="success"
                                      >
                                        Apply
                                      </Button>
                                    </NavItem>
                                  </Nav>
                                </DropdownMenu>
                              </UncontrolledButtonDropdown>
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

                                {/* <th className="">Void After Date</th> */}
                                <th className="">Prescription Date</th>
                                <th className="">Doctor</th>
                                <th className="">View</th>
                              </tr>
                            </thead>
                            <tbody>
                              {PrescriptionList.length > 0 ? (
                                PrescriptionList.map((pre, i) => (
                                  <tr>
                                    <td>
                                      <div className="widget-content p-0">
                                        <div className="widget-content-wrapper">
                                          <div className="widget-content-left mr-3">
                                            <div className="widget-content-left">
                                              <img
                                                width={40}
                                                className="rounded-circle"
                                                src={PresImg}
                                                alt=""
                                              />
                                            </div>
                                          </div>
                                          <div className="widget-content-left flex2">
                                            <small className="opacity-8 fsize-1">
                                              <FontAwesomeIcon
                                                icon={faCalendarAlt}
                                                className="mr-1"
                                              />
                                              {pre.voidAfter}
                                            </small>
                                          </div>
                                        </div>
                                      </div>
                                    </td>

                                    <td>
                                      <span>{pre.doctorName}</span>
                                    </td>
                                    <td>
                                      <Button
                                        color="info"
                                        onClick={this.ViewPrestoggle.bind(
                                          this,
                                          pre.id
                                        )}
                                      >
                                        <i className="lnr-eye" />
                                      </Button>
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td>No Prescription avilable....</td>
                                </tr>
                              )}
                            </tbody>
                          </Table>
                        </CardBody>
                      </Card>
                      <Modal
                        size="lg"
                        isOpen={this.state.viewpresmodal}
                        toggle={this.ViewPrestoggleEnd.bind(this)}
                        className={this.props.className}
                      >
                        <ModalHeader toggle={this.ViewPrestoggleEnd.bind(this)}>
                          Prescriptions of {PatientInfo.first_name}{" "}
                          {PatientInfo.last_name}
                        </ModalHeader>
                        <ModalBody>
                          <br />
                          <Col sm="12" md="12" xs="12">
                            <Label for="exampleEmail">
                              <span className="text-danger">*</span> Description
                            </Label>
                            {/* <CKEditor
                                // content={durgsDescription}
                                // events={{
                                //   blur: this.onBlur,
                                //   afterPaste: this.afterPaste,
                                //   change: this.onChange,
                                // }}
                                value={durgsDescription}
                                onChange={(e) =>
                                  this.handlePrescriptionChange(
                                    "durgsDescription",
                                    e
                                  )
                                }
                              /> */}
                            <TextareaAutosize
                              className="form-control"
                              minRows={3}
                              maxRows={10}
                              defaultValue="Description here....."
                              value={this.state.UdpatePresData}
                              // onChange={(e) =>
                              //   this.handlePrescriptionChange(
                              //     "durgsDescription",
                              //     e
                              //   )
                              // }
                            />
                          </Col>

                          <br />
                          <Col sm="12" md="12" xs="12">
                            <Label for="exampleEmail">
                              <span className="text-danger">*</span> Medicine's
                              Name
                            </Label>
                            <Input
                              type="text"
                              value={this.state.UdpateDrugs}
                              // onChange={(e) =>
                              //   this.handlePrescriptionChange(
                              //     "medicineName",
                              //     e
                              //   )
                              // }
                            />
                            {/* <div style={{ fontSize: "12px", color: "red" }}>
                              Seprate Multiple drurgs by "," like:
                              paracetamol,covix
                            </div> */}

                            {/* <Multiselect
                                data={people}
                                value={medicineName}
                                allowCreate="onFilter"
                                onCreate={(name) => this.handleCreate(name)}
                                onChange={(medicineName) =>
                                  this.setState({
                                    medicineName,
                                  })
                                }
                                textField="name"
                              /> */}
                          </Col>
                          <br />
                          <Row>
                            {/* <Col sm="6" md="6" xs="12">
                                <Label for="exampleEmail">
                                  <span className="text-danger">*</span>{" "}
                                  Dose
                                </Label>
                                <Input type="text" />
                              </Col> */}
                            <Col sm="6" md="6" xs="12">
                              <Label for="exampleEmail">
                                <span className="text-danger">*</span> Void
                                After
                              </Label>
                              <InputGroup className="mb-3">
                                <InputGroupAddon addonType="prepend">
                                  <div className="input-group-text">
                                    <FontAwesomeIcon icon={faCalendarAlt} />
                                  </div>
                                </InputGroupAddon>
                                <InputMask
                                  className="form-control"
                                  mask="99-99-9999"
                                  defaultValue="27-10-2018"
                                  value={this.state.UdpateVoidAfter}
                                  // onChange={(e) =>
                                  //   this.handlePrescriptionChange("voidDate", e)
                                  // }
                                />
                              </InputGroup>
                            </Col>
                            <Col sm="6" md="6" xs="12">
                              <Label for="exampleEmail">
                                <span className="text-danger">*</span> Refill
                              </Label>
                              <FormGroup>
                                <Input value={this.state.UdpateRefill} />
                              </FormGroup>
                            </Col>
                          </Row>
                        </ModalBody>
                        <ModalFooter>
                          {/* <Button color="link" onClick={this.Recordtoggle}>
                            Cancel
                          </Button>
                          <Button
                            color="primary"
                            onClick={this.AddPrescription.bind(this)}
                          >
                            Save
                          </Button>{" "} */}
                        </ModalFooter>
                      </Modal>
                    </CardBody>
                  </Card>
                </Col>
              </Row>

              <Row>
                <Col sm="12" md="12" xs="12">
                  <Card
                    className="mb-3"
                    style={{
                      backgroundColor: "#9e9e9e0f",
                    }}
                  >
                    <CardHeader className="card-header-tab">
                      <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
                        Diagnosis Records
                      </div>

                      <div className="btn-actions-pane-right text-capitalize">
                        {/********** */}
                        <UncontrolledButtonDropdown>
                          <DropdownToggle
                            caret
                            className="mb-0 mr-2"
                            color="success"
                          >
                            <FontAwesomeIcon icon={faFilePrescription} /> Add
                            Test Reports
                          </DropdownToggle>
                          <DropdownMenu>
                            <Nav vertical>
                              <NavItem
                                onClick={this.XRaytoggle}
                                style={{
                                  cursor: "pointer",
                                  padding: "2%",
                                }}
                              >
                                Add X-Ray Report
                              </NavItem>

                              <NavItem
                                onClick={this.TestReporttoggle}
                                style={{
                                  cursor: "pointer",
                                  padding: "2%",
                                }}
                              >
                                Upload Report
                              </NavItem>
                            </Nav>
                          </DropdownMenu>
                        </UncontrolledButtonDropdown>{" "}
                        {/******** */}
                      </div>
                    </CardHeader>
                    <CardBody className="pt-0">
                      <Modal
                        isOpen={this.state.reportmodel}
                        toggle={this.MyReporttoggle}
                        className={this.props.className}
                        size="lg"
                      >
                        <ModalHeader toggle={this.MyReporttoggle}>
                          My Blood Test Report
                        </ModalHeader>
                        <ModalBody>
                          <Col sm="12" md="12" xs="12">
                            <Card className="main-card mb-3">
                              <CardHeader>Description</CardHeader>
                              <CardBody>
                                <p className="mb-0">
                                  Lorem Ipsum has been the industry's standard
                                  dummy text ever since the 1500s, when an
                                  unknown printer took a galley of type and
                                  scrambled.
                                </p>
                              </CardBody>
                            </Card>
                          </Col>
                          <Row>
                            <Col md="12">
                              <Card className="main-card mb-3">
                                <CardHeader>
                                  Your Reports
                                  <InputGroup
                                    style={{
                                      paddingLeft: "5%",
                                      width: "60%",
                                    }}
                                  >
                                    <InputGroupAddon addonType="prepend">
                                      <div className="input-group-text">
                                        <FontAwesomeIcon icon={faSearch} />
                                      </div>
                                    </InputGroupAddon>
                                    <Input placeholder="Search..." />
                                  </InputGroup>
                                  <div className="btn-actions-pane-right">
                                    {/* <ButtonGroup size="sm">
                                            <Button
                                              className="btn-wide"
                                              color="success"
                                            >
                                              <i
                                                className="pe-7s-filter btn-icon-wrapper"
                                                style={{
                                                  color: "white",
                                                }}
                                              >
                                                {" "}
                                              </i>{" "}
                                              filter
                                            </Button>
                                          </ButtonGroup> */}

                                    <UncontrolledButtonDropdown>
                                      <DropdownToggle
                                        caret
                                        className="mb-2 mr-2"
                                        color="primary"
                                      >
                                        <i
                                          className="pe-7s-filter btn-icon-wrapper"
                                          style={{
                                            color: "white",
                                          }}
                                        >
                                          {" "}
                                        </i>{" "}
                                        filter
                                      </DropdownToggle>
                                      <DropdownMenu>
                                        <Nav vertical>
                                          <Col sm="12" md="12" xs="12">
                                            <Label for="exampleEmail">
                                              <span className="text-danger">
                                                *
                                              </span>{" "}
                                              From:
                                            </Label>
                                            <InputGroup className="mb-3">
                                              <InputGroupAddon addonType="prepend">
                                                <div className="input-group-text">
                                                  <FontAwesomeIcon
                                                    icon={faCalendarAlt}
                                                  />
                                                </div>
                                              </InputGroupAddon>
                                              <InputMask
                                                className="form-control"
                                                mask="99-99-9999"
                                                defaultValue="27-10-2018"
                                              />
                                            </InputGroup>
                                          </Col>
                                          <Col sm="12" md="12" xs="12">
                                            <Label for="exampleEmail">
                                              <span className="text-danger">
                                                *
                                              </span>{" "}
                                              To
                                            </Label>
                                            <InputGroup className="mb-3">
                                              <InputGroupAddon addonType="prepend">
                                                <div className="input-group-text">
                                                  <FontAwesomeIcon
                                                    icon={faCalendarAlt}
                                                  />
                                                </div>
                                              </InputGroupAddon>
                                              <InputMask
                                                className="form-control"
                                                mask="99-99-9999"
                                                defaultValue="27-10-2018"
                                              />
                                            </InputGroup>
                                          </Col>
                                          <NavItem className="nav-item-divider" />
                                          <NavItem className="nav-item-btn text-right">
                                            <Button
                                              size="sm"
                                              className="btn-pill"
                                              color="success"
                                            >
                                              Apply
                                            </Button>
                                          </NavItem>
                                        </Nav>
                                      </DropdownMenu>
                                    </UncontrolledButtonDropdown>
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

                                      <th className="">Report</th>
                                      <th className="">Report Name</th>
                                      <th className="">Reference Doctor</th>
                                      <th className="">Upload Date</th>

                                      <th className="">Action</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {/* <tr> */}
                                    {/* <td>
                                    <div className="widget-content p-0">
                                      <div className="widget-content-wrapper">
                                        <div className="widget-content-left mr-3">
                                          <div className="widget-content-left">
                                            <img
                                              width={40}
                                              className="rounded"
                                              src={PdfImg}
                                              alt=""
                                            />
                                          </div>
                                        </div>
                                        <div className="widget-content-left flex2">
                                          <div className="widget-heading">
                                            Document 1
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="">
                                    <small className="opacity-8 fsize-1">
                                      <FontAwesomeIcon
                                        icon={faCalendarAlt}
                                        className="mr-1"
                                      />
                                      11/02/2022
                                    </small>
                                  </td>
                                  <td className="">
                                    <small className="opacity-8 fsize-1">
                                      <FontAwesomeIcon
                                        icon={faCalendarAlt}
                                        className="mr-1"
                                      />
                                      11/02/2022
                                    </small>
                                  </td>
                                  <td className="">
                                    <Button
                                      outline
                                      size="sm"
                                      color="alternate"
                                    >
                                      <i className="lnr-eye " />
                                    </Button>
                                    &nbsp;
                                    <Button outline size="sm" color="info">
                                      <i className="lnr-text-align-left " />
                                    </Button>
                                  </td> */}
                                    {BloodReports.length && (
                                      <>
                                        {BloodReports.map((value, index) => {
                                          return (
                                            <tr key={value.id}>
                                              <td>
                                                <div className="widget-content p-0">
                                                  <div className="widget-content-wrapper">
                                                    <div className="widget-content-left mr-3">
                                                      <div className="widget-content-left">
                                                        <img
                                                          width={40}
                                                          className="rounded"
                                                          src={ImImg}
                                                          alt=""
                                                        />
                                                      </div>
                                                    </div>
                                                    <div className="widget-content-left flex2">
                                                      <div className="widget-heading">
                                                        {value.reportType}{" "}
                                                        {index + 1}
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </td>
                                              <td className="">
                                                <small className="opacity-8 fsize-1">
                                                  {/* <FontAwesomeIcon
                                                icon={faCalendarAlt}
                                                className="mr-1"
                                              /> */}
                                                  {value.reportName}
                                                </small>
                                              </td>
                                              <td className="">
                                                <small className="opacity-8 fsize-1">
                                                  {/* <FontAwesomeIcon
                                                icon={faCalendarAlt}
                                                className="mr-1"
                                              /> */}
                                                  {value.refDoctor}
                                                </small>
                                              </td>
                                              <td className="">
                                                <small className="opacity-8 fsize-1">
                                                  <FontAwesomeIcon
                                                    icon={faCalendarAlt}
                                                    className="mr-1"
                                                  />
                                                  {value.date}
                                                </small>
                                              </td>
                                              <td className="">
                                                <Button
                                                  outline
                                                  size="sm"
                                                  color="alternate"
                                                  onClick={this.ViewReports.bind(
                                                    this,
                                                    value.reportData
                                                  )}
                                                >
                                                  <i className="lnr-eye " />
                                                </Button>
                                                &nbsp;
                                                <Button
                                                  outline
                                                  size="sm"
                                                  color="info"
                                                >
                                                  <i className="lnr-text-align-left " />
                                                </Button>
                                              </td>
                                            </tr>
                                          );
                                        })}
                                      </>
                                    )}
                                    {/* </tr> */}

                                    {/* <tr>
                                  <td>
                                    <div className="widget-content p-0">
                                      <div className="widget-content-wrapper">
                                        <div className="widget-content-left mr-3">
                                          <div className="widget-content-left">
                                            <img
                                              width={40}
                                              className="rounded"
                                              src={ImImg}
                                              alt=""
                                            />
                                          </div>
                                        </div>
                                        <div className="widget-content-left flex2">
                                          <div className="widget-heading">
                                            Document 2
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="">
                                    <small className="opacity-8 fsize-1">
                                      <FontAwesomeIcon
                                        icon={faCalendarAlt}
                                        className="mr-1"
                                      />
                                      11/02/2022
                                    </small>
                                  </td>
                                  <td className="">
                                    <small className="opacity-8 fsize-1">
                                      <FontAwesomeIcon
                                        icon={faCalendarAlt}
                                        className="mr-1"
                                      />
                                      11/02/2022
                                    </small>
                                  </td>
                                  <td className="">
                                    <Button
                                      outline
                                      size="sm"
                                      color="alternate"
                                    >
                                      <i className="lnr-eye " />
                                    </Button>
                                    &nbsp;
                                    <Button outline size="sm" color="info">
                                      <i className="lnr-text-align-left " />
                                    </Button>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div className="widget-content p-0">
                                      <div className="widget-content-wrapper">
                                        <div className="widget-content-left mr-3">
                                          <div className="widget-content-left">
                                            <img
                                              width={40}
                                              className="rounded"
                                              src={PdfImg}
                                              alt=""
                                            />
                                          </div>
                                        </div>
                                        <div className="widget-content-left flex2">
                                          <div className="widget-heading">
                                            Document 3
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="">
                                    <small className="opacity-8 fsize-1">
                                      <FontAwesomeIcon
                                        icon={faCalendarAlt}
                                        className="mr-1"
                                      />
                                      11/02/2022
                                    </small>
                                  </td>
                                  <td className="">
                                    <small className="opacity-8 fsize-1">
                                      <FontAwesomeIcon
                                        icon={faCalendarAlt}
                                        className="mr-1"
                                      />
                                      11/02/2022
                                    </small>{" "}
                                  </td>
                                  <td className="">
                                    <Button
                                      outline
                                      size="sm"
                                      color="alternate"
                                    >
                                      <i className="lnr-eye " />
                                    </Button>
                                    &nbsp;
                                    <Button outline size="sm" color="info">
                                      <i className="lnr-text-align-left " />
                                    </Button>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div className="widget-content p-0">
                                      <div className="widget-content-wrapper">
                                        <div className="widget-content-left mr-3">
                                          <div className="widget-content-left">
                                            <img
                                              width={40}
                                              className="rounded"
                                              src={ImImg}
                                              alt=""
                                            />
                                          </div>
                                        </div>
                                        <div className="widget-content-left flex2">
                                          <div className="widget-heading">
                                            Document 4
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="">
                                    <small className="opacity-8 fsize-1">
                                      <FontAwesomeIcon
                                        icon={faCalendarAlt}
                                        className="mr-1"
                                      />
                                      11/02/2022
                                    </small>
                                  </td>
                                  <td className="">
                                    <small className="opacity-8 fsize-1">
                                      <FontAwesomeIcon
                                        icon={faCalendarAlt}
                                        className="mr-1"
                                      />
                                      11/02/2022
                                    </small>
                                  </td>
                                  <td className="">
                                    <Button
                                      outline
                                      size="sm"
                                      color="alternate"
                                    >
                                      <i className="lnr-eye " />
                                    </Button>
                                    &nbsp;
                                    <Button outline size="sm" color="info">
                                      <i className="lnr-text-align-left " />
                                    </Button>
                                  </td>
                                </tr> */}
                                  </tbody>
                                </Table>
                                <CardFooter className="" />
                              </Card>
                            </Col>
                          </Row>
                        </ModalBody>
                      </Modal>

                      <br />
                      <Row>
                        <Col sm="12" md="12" xs="12">
                          <div id="exampleAccordion" data-children=".item">
                            <div className="item">
                              <Collapse
                                isOpen={this.state.custom[0]}
                                data-parent="#exampleAccordion"
                                id="exampleAccordion1"
                              >
                                <Row>
                                  <Col md="12" sm="12" xs="12">
                                    <Row>
                                      <Col md="2" sm="2" xs="12">
                                        <div
                                          className="card mb-3 widget-chart"
                                          style={{
                                            height: "140px",
                                            cursor: "pointer",
                                          }}
                                          onClick={this.MyReporttoggle}
                                        >
                                          <div className="btn-actions-pane-right text-capitalize">
                                            <i className="lnr-cross-circle" />
                                          </div>
                                          <div
                                            className="widget-content-left"
                                            style={{
                                              marginTop: "5%",
                                            }}
                                          >
                                            <img
                                              width={50}
                                              className=""
                                              src={BloodImg}
                                              alt=""
                                              style={{
                                                marginBottom: "5%",
                                              }}
                                            />
                                          </div>
                                          <div className="">
                                            <p>BLOOD TEST</p>
                                          </div>
                                        </div>
                                      </Col>{" "}
                                      <Col md="2" sm="2" xs="12">
                                        <div
                                          className="card mb-3 widget-chart"
                                          style={{
                                            height: "140px",
                                          }}
                                        >
                                          <div className="btn-actions-pane-right text-capitalize">
                                            <i className="lnr-cross-circle" />
                                          </div>
                                          <div
                                            className="widget-content-left"
                                            style={{
                                              marginTop: "5%",
                                            }}
                                          >
                                            <img
                                              width={50}
                                              className=""
                                              src={UriImg}
                                              alt=""
                                              style={{
                                                marginBottom: "5%",
                                              }}
                                            />
                                          </div>
                                          <div className="">
                                            <p>URINE TEST</p>
                                          </div>
                                        </div>
                                      </Col>
                                      <Col md="2" sm="2" xs="12">
                                        <div
                                          className="card mb-3 widget-chart"
                                          style={{
                                            height: "140px",
                                          }}
                                        >
                                          <div className="btn-actions-pane-right text-capitalize">
                                            <i className="lnr-cross-circle" />
                                          </div>
                                          <div
                                            className="widget-content-left"
                                            style={{
                                              marginTop: "5%",
                                            }}
                                          >
                                            <img
                                              width={50}
                                              className=""
                                              src={Card_mg}
                                              alt=""
                                              style={{
                                                marginBottom: "5%",
                                              }}
                                            />
                                          </div>
                                          <div className="">
                                            <p>CARDIAC TEST</p>
                                          </div>
                                        </div>
                                      </Col>
                                      <Col md="2" sm="2" xs="12">
                                        <div
                                          className="card mb-3 widget-chart"
                                          style={{
                                            height: "140px",
                                          }}
                                        >
                                          <div className="btn-actions-pane-right text-capitalize">
                                            <i className="lnr-cross-circle" />
                                          </div>
                                          <div
                                            className="widget-content-left"
                                            style={{
                                              marginTop: "5%",
                                            }}
                                          >
                                            <img
                                              width={50}
                                              className=""
                                              src={XryImg}
                                              alt=""
                                              style={{
                                                marginBottom: "5%",
                                              }}
                                            />
                                          </div>
                                          <div className="">
                                            <p>X-RAY</p>
                                          </div>
                                        </div>
                                      </Col>
                                      <Col md="2" sm="2" xs="12">
                                        <div
                                          className="card mb-3 widget-chart"
                                          style={{
                                            height: "140px",
                                          }}
                                        >
                                          <div className="btn-actions-pane-right text-capitalize">
                                            <i className="lnr-cross-circle" />
                                          </div>
                                          <div
                                            className="widget-content-left"
                                            style={{
                                              marginTop: "5%",
                                            }}
                                          >
                                            <img
                                              width={50}
                                              className=""
                                              src={DaibImg}
                                              alt=""
                                              style={{
                                                marginBottom: "5%",
                                              }}
                                            />
                                          </div>
                                          <div className="">
                                            <p>DIABETES TEST</p>
                                          </div>
                                        </div>
                                      </Col>
                                      <Col md="2" sm="2" xs="12">
                                        <div
                                          className="card mb-3 widget-chart"
                                          style={{
                                            height: "140px",
                                          }}
                                        >
                                          <div className="btn-actions-pane-right text-capitalize">
                                            <i className="lnr-cross-circle" />
                                          </div>
                                          <div
                                            className="widget-content-left"
                                            style={{
                                              marginTop: "5%",
                                            }}
                                          >
                                            <img
                                              width={50}
                                              className=""
                                              src={KidnyImg}
                                              alt=""
                                              style={{
                                                marginBottom: "5%",
                                              }}
                                            />
                                          </div>
                                          <div className="">
                                            <p>KIDNEY TEST</p>
                                          </div>
                                        </div>
                                      </Col>
                                      <Col md="2" sm="2" xs="12">
                                        <div
                                          className="card mb-3 widget-chart"
                                          style={{
                                            height: "140px",
                                          }}
                                        >
                                          <div className="btn-actions-pane-right text-capitalize">
                                            <i className="lnr-cross-circle" />
                                          </div>
                                          <div
                                            className="widget-content-left"
                                            style={{
                                              marginTop: "5%",
                                            }}
                                          >
                                            <img
                                              width={50}
                                              className=""
                                              src={LungImg}
                                              alt=""
                                              style={{
                                                marginBottom: "5%",
                                              }}
                                            />
                                          </div>
                                          <div className="">
                                            <p>LUNGS</p>
                                          </div>
                                        </div>
                                      </Col>
                                      <Col md="2" sm="2" xs="12">
                                        <div
                                          className="card mb-3 widget-chart"
                                          style={{
                                            height: "140px",
                                          }}
                                        >
                                          <div className="btn-actions-pane-right text-capitalize">
                                            <i className="lnr-cross-circle" />
                                          </div>
                                          <div
                                            className="widget-content-left"
                                            style={{
                                              marginTop: "5%",
                                            }}
                                          >
                                            <img
                                              width={50}
                                              className=""
                                              src={BlodPreImg}
                                              alt=""
                                              style={{
                                                marginBottom: "5%",
                                              }}
                                            />
                                          </div>
                                          <div className="">
                                            <p>BLOOD PRESSURE</p>
                                          </div>
                                        </div>
                                      </Col>
                                      <Col md="2" sm="2" xs="12">
                                        <div
                                          className="card mb-3 widget-chart"
                                          style={{
                                            height: "140px",
                                          }}
                                        >
                                          <div className="btn-actions-pane-right text-capitalize">
                                            <i className="lnr-cross-circle" />
                                          </div>
                                          <div
                                            className="widget-content-left"
                                            style={{
                                              marginTop: "5%",
                                            }}
                                          >
                                            <img
                                              width={50}
                                              className=""
                                              src={StomImg}
                                              alt=""
                                              style={{
                                                marginBottom: "5%",
                                              }}
                                            />
                                          </div>
                                          <div className="">
                                            <p>STOMACH</p>
                                          </div>
                                        </div>
                                      </Col>
                                      <Col md="2" sm="2" xs="12">
                                        <div
                                          className="card mb-3 widget-chart"
                                          style={{
                                            height: "140px",
                                          }}
                                        >
                                          <div className="btn-actions-pane-right text-capitalize">
                                            <i className="lnr-cross-circle" />
                                          </div>
                                          <div
                                            className="widget-content-left"
                                            style={{
                                              marginTop: "5%",
                                            }}
                                          >
                                            <img
                                              width={50}
                                              className=""
                                              src={LiverImg}
                                              alt=""
                                              style={{
                                                marginBottom: "5%",
                                              }}
                                            />
                                          </div>
                                          <div className="">
                                            <p>LIVER</p>
                                          </div>
                                        </div>
                                      </Col>
                                      <Col md="2" sm="2" xs="12">
                                        <div
                                          className="card mb-3 widget-chart"
                                          style={{
                                            height: "140px",
                                          }}
                                        >
                                          <div className="btn-actions-pane-right text-capitalize">
                                            <i className="lnr-cross-circle" />
                                          </div>
                                          <div
                                            className="widget-content-left"
                                            style={{
                                              marginTop: "5%",
                                            }}
                                          >
                                            <img
                                              width={50}
                                              className=""
                                              src={GenImg}
                                              alt=""
                                              style={{
                                                marginBottom: "5%",
                                              }}
                                            />
                                          </div>
                                          <div className="">
                                            <p>GENREAL</p>
                                          </div>
                                        </div>
                                      </Col>
                                      <Col md="2" sm="2" xs="12">
                                        <div
                                          className="card mb-3 widget-chart"
                                          style={{
                                            height: "140px",
                                          }}
                                        >
                                          <div className="btn-actions-pane-right text-capitalize">
                                            <i className="lnr-cross-circle" />
                                          </div>
                                          <div
                                            className="widget-content-left"
                                            style={{
                                              marginTop: "5%",
                                            }}
                                          >
                                            <img
                                              width={50}
                                              className=""
                                              src={LabImg}
                                              alt=""
                                              style={{
                                                marginBottom: "5%",
                                              }}
                                            />
                                          </div>
                                          <div className="">
                                            <p>LAB REPORT</p>
                                          </div>
                                        </div>
                                      </Col>
                                      <Col md="2" sm="2" xs="12">
                                        <div
                                          className="card mb-3 widget-chart"
                                          style={{
                                            height: "140px",
                                          }}
                                        >
                                          <div className="btn-actions-pane-right text-capitalize">
                                            <i className="lnr-cross-circle" />
                                          </div>
                                          <div
                                            className="widget-content-left"
                                            style={{
                                              marginTop: "5%",
                                            }}
                                          >
                                            <img
                                              width={50}
                                              className=""
                                              src={AdmImg}
                                              alt=""
                                              style={{
                                                marginBottom: "5%",
                                              }}
                                            />
                                          </div>
                                          <div className="">
                                            <p>ADDMISSION</p>
                                          </div>
                                        </div>
                                      </Col>
                                    </Row>
                                  </Col>
                                </Row>
                              </Collapse>
                            </div>
                            <div className="item">
                              <Collapse
                                isOpen={this.state.custom[1]}
                                data-parent="#exampleAccordion"
                                id="exampleAccordion2"
                              >
                                <Row>
                                  <Col md="12" sm="12" xs="12">
                                    <Card className="main-card mb-3">
                                      <CardBody>
                                        <CardHeader>My Insurances</CardHeader>
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

                                              <th className="">Title</th>
                                              <th className="">Description</th>
                                              <th className="">Upload Date</th>
                                              <th className="">
                                                Experation Date
                                              </th>
                                              <th className="">View Doc</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            <tr>
                                              <td>
                                                <div className="widget-content p-0">
                                                  <div className="widget-content-wrapper">
                                                    <div className="widget-content-left mr-3">
                                                      <div className="widget-content-left">
                                                        <img
                                                          width={40}
                                                          className="rounded"
                                                          src={InsImg}
                                                          alt=""
                                                        />
                                                      </div>
                                                    </div>
                                                    <div className="widget-content-left flex2">
                                                      <div className="widget-heading">
                                                        <span>Title 1</span>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </td>
                                              <td>
                                                <p>
                                                  it's a description about this
                                                  insurance doc.
                                                </p>
                                              </td>
                                              <td>
                                                <small className="opacity-8 fsize-1">
                                                  <FontAwesomeIcon
                                                    icon={faCalendarAlt}
                                                    className="mr-1"
                                                  />
                                                  12/08/2022
                                                </small>
                                              </td>
                                              <td>
                                                <small className="opacity-8 fsize-1">
                                                  <FontAwesomeIcon
                                                    icon={faCalendarAlt}
                                                    className="mr-1"
                                                  />
                                                  5/06/2024
                                                </small>
                                              </td>
                                              <td>
                                                <Button
                                                  color="info"
                                                  // onClick={this.ViewInsurancetoggle.bind(
                                                  //   this
                                                  // )}
                                                >
                                                  <i className="lnr-eye" />
                                                </Button>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </Table>
                                      </CardBody>
                                    </Card>
                                  </Col>
                                </Row>
                              </Collapse>
                            </div>
                          </div>
                        </Col>
                      </Row>
                      <Row
                        style={{
                          marginTop: "2%",
                        }}
                      >
                        <Col md="6" sm="6" xs="12">
                          <div
                            className="card mb-3 widget-chart"
                            style={{
                              cursor: "pointer",
                            }}
                            onClick={() => this.toggleCustom(0)}
                            aria-expanded={this.state.custom[0]}
                            aria-controls="exampleAccordion1"
                          >
                            <div className="widget-chart-actions fsize-1">
                              25 files
                            </div>
                            <div
                              className="widget-content-left"
                              style={{
                                marginTop: "10%",
                              }}
                            >
                              <img
                                width={200}
                                className="rounded"
                                src={MediImg}
                                alt=""
                              />
                            </div>
                            <div
                              className="widget-numbers fsize-2"
                              style={{
                                textTransform: "uppercase",
                              }}
                            >
                              medical Documents
                            </div>
                          </div>
                        </Col>
                        <Col md="6" sm="6" xs="12">
                          <div
                            className="card mb-3 widget-chart"
                            style={{
                              cursor: "pointer",
                            }}
                            //  onClick={
                            //    this
                            //      .InsuranceTabletoggle
                            //  }
                            onClick={() => this.toggleCustom(1)}
                            aria-expanded={this.state.custom[1]}
                            aria-controls="exampleAccordion2"
                          >
                            <div className="widget-chart-actions fsize-1">
                              25 files
                            </div>
                            <div
                              className="widget-content-left"
                              style={{
                                marginTop: "10%",
                              }}
                            >
                              <img
                                width={200}
                                className="rounded"
                                src={InsImg}
                                alt=""
                              />
                            </div>
                            <div
                              className="widget-numbers fsize-2"
                              style={{
                                textTransform: "uppercase",
                              }}
                            >
                              Insurance Documents
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </ReactCSSTransitionGroup>
          </>
        )}
      </Fragment>
    );
  }
}
