import React, { Component, Fragment } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import CKEditor from "react-ckeditor-component";
import axios from "axios";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Line } from "react-chartjs-2";
import { toast, Bounce } from "react-toastify";
import TextareaAutosize from "react-textarea-autosize";
import PageTitle from "../../../Layout/AppMain/PageTitle";
import CapsuleImge from "../../../assets/utils/images/medical/Medicine.jpg";
import DoctorImge from "../../../assets/utils/images/medical/doctor.png";
import PatientImge from "../../../assets/utils/images/medical/patient.png";
import CountUp from "react-countup";
import avatar1 from "../../../assets/utils/images/avatars/1.jpg";
import MediImg from "../../../assets/utils/images/medical/healthcare-and-medical.png";
import InsImg from "../../../assets/utils/images/medical/health-insurance.png";
import PresImg from "../../../assets/utils/images/medical/rx.png";
import CretImg from "../../../assets/utils/images/medical/newfolder.png";
import RemImg from "../../../assets/utils/images/medical/remainder.png";
import NotImg from "../../../assets/utils/images/medical/notify.png";
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
import ipfs from "./ipfs";
import DatePicker from "react-datepicker";
import Circle from "react-circle";
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
  faEyeSlash,
  faEye,
  faPlusCircle,
  faSearch,
  faCalendarAlt,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ScrollableInkTabBar from "rc-tabs/lib/ScrollableInkTabBar";

import {
  CardImg,
  UncontrolledButtonDropdown,
  DropdownToggle,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Row,
  Col,
  Button,
  CardTitle,
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
  Fade,

} from "reactstrap";
import Loader from 'react-loaders'
import InputMask from "react-input-mask";
// import { hr } from "date-fns/locale";
const Constants = require('../../../config/seturl.js');
var apiBaseUrl = Constants.getAPiUrl();
console.log(apiBaseUrl)
export default class PatientMain extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      ipfsHash: "",
      buffer: null,
      reporttype: "",
      refdoctor: "",
      reportdate:
        new Date().getDate() +
        "/" +
        (new Date().getMonth() + 1) +
        "/" +
        new Date().getFullYear(),
      collapse: false,
      custom: [true, false],
      recordmodal: false,
      medicalmodel: false,
      reportmodel: false,
      anotherreportmodel: false,
      RecordType: "",
      ReportType: "",
      content: "",
      viewpre: false,
      PatFirstName: "",
      PatLastName: "",
      PatID: "",
      PatMainID: "",
      docEmail: "",
      PrescriptionList: [],
      UdpateDrugs: "",
      UdpatePresData: "",
      UdpateRefill: "",
      UdpateVoidAfter: "",
      viewpresmodal: false,
      viewinsurancemodal: false,
      analysismodal: false,
      addvaluemodal: false,
      addbloodpremdel: false,
      addbmimodel: false,
      addbloodglucosemodel: false,
      HRAType: "",
      hrleastmodal: false,
      Pathrleastmodal: false,
      viewbpmodel: false,
      viewbmimodel: false,
      viewbgmodel: false,
      MedicalDocumnets: [],
      urinereport: false,
      BloodReports: [],
      UrineReports: [],
      uploadmodal: false,
    };
    this.toggleCustom = this.toggleCustom.bind(this);
    this.Recordtoggle = this.Recordtoggle.bind(this);
    this.Analysistoggle = this.Analysistoggle.bind(this);
    this.BPAnalysistoggle = this.BPAnalysistoggle.bind(this);
    this.BMIAnalysistoggle = this.BMIAnalysistoggle.bind(this);
    this.BGAnalysistoggle = this.BGAnalysistoggle.bind(this);
    this.HRListtoggle = this.HRListtoggle.bind(this);
    this.PatHRListtoggle = this.PatHRListtoggle.bind(this);
    this.Addtoggle = this.Addtoggle.bind(this);
    this.AddBloodtoggle = this.AddBloodtoggle.bind(this);
    this.AddBMItoggle = this.AddBMItoggle.bind(this);
    this.AddBloodGlutoggle = this.AddBloodGlutoggle.bind(this);
    this.Medicaltoggle = this.Medicaltoggle.bind(this);
    this.MyReporttoggle = this.MyReporttoggle.bind(this);
    this.MyUrineReporttoggle = this.MyUrineReporttoggle.bind(this);
    this.setContent = this.setContent.bind(this);
    this.handleChange = this.handleChange.bind(this);
    //ipfs
    // this.captureFile = this.captureFile.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.getReports();
    const patientid = sessionStorage.getItem("patientID");
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
          PatID: res.data.patient_list.contact_details.email,
          PatFirstName: res.data.patient_list.contact_details.first_name,
          PatLastName: res.data.patient_list.contact_details.last_name,
          PatMainID: res.data.patient_list.id,
        });
      });

    axios
      .get(
        `${apiBaseUrl}/composer/client/getPrescriptionById?patient_id=${patientid}`,

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
        `${apiBaseUrl}/composer/client/getReportById?patient_id=${patientid}`,

        {
          headers: {
            Authorization: "Bearer " + sessionStorage.token,
          },
        }
      )
      .then((res) => {
        console.log("MedicalDocumnets", res.data.report_list);

        //  this.getDoctors();

        this.setState({
          MedicalDocumnets: res.data.report_list
        });

        if (res.data.report_list.length > 0) {
          const blood = res.data.report_list.filter((el) => el.reportType === "BLOOD TEST")
          this.setState({ BloodReports: blood.reverse() });

          const urine = res.data.report_list.filter((el) => el.reportType === "URINE TEST");
          console.log("urine", urine);
          this.setState({ UrineReports: urine });
          // this.setState({ reportmodel: true })
          // console.log(this.state.reportmodel)
        }

      });
  }

  //IPFS

  handleReportUploadChange = (data, event) => {
    this.setState({ [data]: event.target.value });
  };
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

  async UploadReportFile() {
    // e.preventDefault();
    this.setState({ recordmodal: false, uploadmodal: true })

    const {
      buffer,
      reportdate,
      reporttype,
      refdoctor,
      PatFirstName,
      PatLastName,
      PatMainID,
    } = this.state;
    const file = await ipfs.add(buffer);

    axios
      .post(
        `${apiBaseUrl}/composer/client/addReport`,
        {
          refDoctor: refdoctor,
          codeID: "AK-400",
          reportType: reporttype,
          reportName: "medical",
          patientName: PatFirstName + " " + PatLastName,
          patientID: PatMainID,
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
        axios
          .get(
            `${apiBaseUrl}/composer/client/getReportById?patient_id=${PatMainID}`,

            {
              headers: {
                Authorization: "Bearer " + sessionStorage.token,
              },
            }
          )
          .then((res) => {
            // this.setState({ anotherreportmodel: true })
            console.log("MedicalDocumnets", res.data.report_list);
            this.setState({ uploadmodal: false })


            //  this.getDoctors();
            // if (res.data.result == 'success')

            this.setState({
              MedicalDocumnets: res.data.report_list,
            });

            console.log(res.data.report_list.length)


            if (res.data.report_list.length > 0) {
              const blood = res.data.report_list.filter(
                (el) => el.reportType === "BLOOD TEST"
              );
              console.log(blood)
              this.setState({ BloodReports: blood.reverse() });


              const urine = res.data.report_list.filter(
                (el) => el.reportType === "URINE TEST"
              );
              console.log("urine", urine);

              this.setState({ UrineReports: urine });
              console.log('88888888888888888888888888888888888888888888888888888888888888888888888888')
              this.setState({ medicalmodel: true })
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
  }

  //***************** */
  toggleCustom(tab) {
    const prevState = this.state.custom;
    const state = prevState.map((x, index) => (tab === index ? !x : false));

    this.setState({
      custom: state,
    });
  }

  getReports = () => {
    const { PatMainID } = this.state;
    console.log("PatMainID", PatMainID);
  };
  handleShareChange = (data, event) => {
    // this.setState({ [data]: event.target.value, edit: true});
    this.setState({ [data]: event.target.value });
    console.log(data, event.target.value);
  };

  SharedContact() {
    let { docEmail, PatFirstName, PatLastName, PatID } = this.state;
    console.log(docEmail);
    axios
      .post(
        `${apiBaseUrl}/composer/client/shareRecords`,
        {
          email: docEmail,
          patient_email: PatID,
          patient_name: PatFirstName + " " + PatLastName,
        },
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.token,
          },
        }
      )
      .then((res) => {
        this.toastId = toast("Records have been shared to Participant...!", {
          transition: Bounce,
          closeButton: true,
          autoClose: 3000,
          position: "bottom-center",
          type: "success",
        });
        // this.setState({ loading: false });
      })
      .catch((res) => {
        this.toastId = toast(" shared Failed !", {
          transition: Bounce,
          closeButton: true,
          autoClose: 3000,
          position: "bottom-center",
          type: "error",
        });
      });
    this.setState({ docEmail: "" });
  }

  toggle() {
    this.setState({
      collapse: !this.state.collapse,
    });
  }
  handleChange(date) {
    this.setState({
      startDate: date,
    });
  }
  //------ Test for race condition ------ //
  setContent() {
    this.setState({
      content: "Hello World " + Math.random(),
    });
  }

  handleChange(date) {
    this.setState({
      startDate: date,
    });
  }
  openPrecr() {
    this.setState({
      viewpre: !this.state.viewpre,
    });
  }

  HRListtoggle() {
    this.setState({
      hrleastmodal: !this.state.hrleastmodal,
    });
  }
  PatHRListtoggle() {
    this.setState({
      Pathrleastmodal: !this.state.Pathrleastmodal,
    });
  }

  Addtoggle() {
    this.setState({
      addvaluemodal: !this.state.addvaluemodal,
    });
  }

  AddBloodtoggle() {
    this.setState({
      addbloodpremdel: !this.state.addbloodpremdel,
    });
  }
  AddBMItoggle() {
    this.setState({
      addbmimodel: !this.state.addbmimodel,
    });
  }

  AddBloodGlutoggle() {
    this.setState({
      addbloodglucosemodel: !this.state.addbloodglucosemodel,
    });
  }

  Analysistoggle() {
    this.setState({
      analysismodal: !this.state.analysismodal,
    });
  }
  BPAnalysistoggle() {
    this.setState({
      viewbpmodel: !this.state.viewbpmodel,
    });
  }
  BMIAnalysistoggle() {
    this.setState({
      viewbmimodel: !this.state.viewbmimodel,
    });
  }
  BGAnalysistoggle() {
    this.setState({
      viewbgmodel: !this.state.viewbgmodel,
    });
  }

  Recordtoggle() {
    this.setState({
      recordmodal: !this.state.recordmodal,
    });
  }
  Medicaltoggle() {
    this.setState({
      medicalmodel: !this.state.medicalmodel,
    });
  }

  Medicaltoggle() {
    this.setState({
      medicalmodel: !this.state.medicalmodel,
    });
  }
  MyReporttoggle() {
    this.setState({
      reportmodel: !this.state.reportmodel
    });
  }

  MyUrineReporttoggle() {
    this.setState({
      urinereport: !this.state.urinereport,
    });
  }
  handleRecordType = (e) => {
    this.setState({ RecordType: e.target.value });
    console.log("e.target.value", e.target.value);
  };
  handleReportType = (e) => {
    this.setState({ ReportType: e.target.value });
    console.log("e.target.value", e.target.value);
  };

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

  // Insurance View
  ViewInsurancetoggle() {
    this.setState({
      viewinsurancemodal: true,
    });

    //  console.log("PresData", PresData);
  }

  ViewInsurancetoggleEnd() {
    this.setState({
      viewinsurancemodal: false,
    });

    //  console.log("PresData", PresData);
  }



  ViewReports(hash) {

    console.log('hash', hash);
    window.open(`http://68.183.89.67:8080/ipfs/${hash}`);

  }
  ///HRT
  handleHRAType = (e) => {
    this.setState({ HRAType: e.target.value });
    console.log(e.target.value);
  };

  render() {
    const {
      RecordType,
      ReportType,
      viewpre,
      PatFirstName,
      PatLastName,
      docEmail,
      PatID,
      PrescriptionList,
      HRAType,
      reportdate,
      refdoctor,
      reporttype,
      ipfsHash,
      MedicalDocumnets,
      BloodReports,
      UrineReports,
    } = this.state;
    console.log("RecordType", RecordType);
    console.log("Records", MedicalDocumnets);
    console.log("BloodReports", BloodReports);
    console.log("buffer", ipfsHash);
    console.log("vi", viewpre, PatFirstName, PatLastName, PatID);
    console.log(this.state.anotherreportmodel)

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
      labels: ["2017", "2018", "2019", "2020"],
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
      labels: ["2017", "2018", "2019", "2020"],
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
      labels: ["2017", "2018", "2019", "2020"],
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
      labels: ["2017", "2018", "2019", "2020"],
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
    /******* */
    console.log(this.state.reportmodel)

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


          <Modal
            isOpen={this.state.uploadmodal}
            // toggle={this.MyReporttoggle}
            className={this.props.className}
            size="lg"
          >
            <ModalHeader >
              Uploading...
                    </ModalHeader>
            <ModalBody>

              {/* <div className="font-icon-wrapper float-left mr-3 mb-3"> */}
              <center><div
                className="loader-wrapper d-flex justify-content-center align-items-center" style={{ marginLeft: "40%" }}>
                <Loader type="ball-grid-pulse" />
              </div></center>
              {/* <p>Uploading</p> */}
              {/* </div> */}
            </ModalBody>
          </Modal>
          <Row>
            <Col md="3" sm="3" xs="12">
              <Card
                className="main-card mb-3 card-radius"
                style={{ height: "125px" }}
              >
                <div className="card no-shadow rm-border bg-transparent widget-chart text-left">
                  <div className="widget-chart-actions">
                    {/* <div>view</div> */}
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
                  <div className="widget-chart-content">
                    <div className="widget-subheading">
                      Health Status
                    </div>
                    <div className="widget-numbers fsize-3">
                      NORMAL <span className="fsize-1" />
                    </div>
                    <div className="widget-description opacity-8 text-focus">
                      <div>
                        <span>As of: 1 Jan 23</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>

            <Col sm="9" md="9" xs="12">
              <Card className="card-radius">
                <Row>
                  <Col
                    sm="5"
                    md="5"
                    xs="12"
                    style={{
                      paddingLeft: "10%",
                    }}
                  >
                    <button
                      className="mb-2 mr-2 btn-icon btn-icon-only btn btn-link btn-sm"
                      style={{
                        marginTop: "10%",
                      }}
                    >
                      <div
                        className=""
                        style={{
                          textAlign: "center",
                        }}
                      >
                        <div className="">
                          <img
                            width={50}
                            className="rounded"
                            src={RemImg}
                            alt=""
                          />
                        </div>
                        <div className="widget-numbers fsize-1">
                          Reminder
                        </div>
                      </div>
                      <span className="badge badge-pill badge-danger">
                        2
                      </span>
                    </button>

                    <button
                      className="mb-2 mr-2 btn-icon btn-icon-only btn btn-link btn-sm"
                      style={{
                        marginTop: "10%",
                      }}
                    >
                      <div
                        className=""
                        style={{
                          textAlign: "center",
                        }}
                      >
                        <div className="">
                          <img
                            width={50}
                            className="rounded"
                            src={NotImg}
                            alt=""
                          />
                        </div>
                        <div className="widget-numbers fsize-1">
                          Notifications
                        </div>
                      </div>
                      <span className="badge badge-pill badge-primary">
                        3
                      </span>
                    </button>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col md="3" sm="3" xs="12">
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
                        onClick={this.Addtoggle}
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
                        onClick={this.Analysistoggle}
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
                isOpen={this.state.addvaluemodal}
                toggle={this.Addtoggle}
                className={this.props.className}
              >
                <ModalHeader toggle={this.Addtoggle}>
                  Add Current Heart Rate
                </ModalHeader>

                <ModalBody>
                  <Row>
                    <Col ms="6" md="6" xs="12">
                      <Label for="exampleEmail">
                        <span className="text-danger">*</span> Current Heart
                        Value
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
                  <Button color="alternate" onClick={this.Addtoggle}

                  >Save</Button>
                </ModalFooter>
              </Modal>
              {/***View Value */}
              <Modal
                size="lg"
                isOpen={this.state.analysismodal}
                toggle={this.Analysistoggle}
                className={this.props.className}
              >
                <ModalHeader toggle={this.Analysistoggle}>
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
                                onClick={this.HRListtoggle}
                              >
                                60 BPM | 01/09/2020
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
                                          <td>20/08/2020</td>
                                        </tr>
                                        <tr>
                                          <td>59 bpm</td>
                                          <td>20/08/2020</td>
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
                                58 BPM | 02/08/2020
                              </Button>
                            </span>
                            <Modal
                              size="md"
                              isOpen={this.state.Pathrleastmodal}
                              toggle={this.PatHRListtoggle}
                              className={this.props.className}
                            >
                              <ModalHeader toggle={this.PatHRListtoggle}>
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
                                          <td>20/08/2020</td>
                                        </tr>
                                        <tr>
                                          <td>65 bpm</td>
                                          <td>30/09/2020</td>
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
                                HRAType === "Weekly Analysis"
                                  ? hrdata1
                                  : HRAType === "Monthly Analysis"
                                    ? hrdata2
                                    : HRAType === "Yearly Analysis"
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
                            <span>02/08/2020</span>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </ModalBody>
              </Modal>
            </Col>
            <Col md="3" sm="3" xs="12">
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
                        onClick={this.AddBloodtoggle}
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
                        onClick={this.BPAnalysistoggle}
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </p>
                    </div>
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
                    <div className="widget-subheading">Blood Presure</div>
                    <div className="widget-numbers fsize-3">
                      120/80 <span className="fsize-1" />
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
                isOpen={this.state.addbloodpremdel}
                toggle={this.AddBloodtoggle}
                className={this.props.className}
              >
                <ModalHeader toggle={this.AddBloodtoggle}>
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
                  <Button color="alternate" onClick={this.AddBloodtoggle}>Save</Button>
                </ModalFooter>
              </Modal>
              {/***View Value */}
              <Modal
                size="lg"
                isOpen={this.state.viewbpmodel}
                toggle={this.BPAnalysistoggle}
                className={this.props.className}
              >
                <ModalHeader toggle={this.BPAnalysistoggle}>
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
                                onClick={this.HRListtoggle}
                              >
                                120/60 mg/dl | 01/09/2020
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
                                          <td>20/08/2020</td>
                                        </tr>
                                        <tr>
                                          <td>59 bpm</td>
                                          <td>20/08/2020</td>
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
                                120/80 mg/dl | 02/08/2020
                              </Button>
                            </span>
                            <Modal
                              size="md"
                              isOpen={this.state.Pathrleastmodal}
                              toggle={this.PatHRListtoggle}
                              className={this.props.className}
                            >
                              <ModalHeader toggle={this.PatHRListtoggle}>
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
                                          <td>20/08/2020</td>
                                        </tr>
                                        <tr>
                                          <td>65 bpm</td>
                                          <td>30/09/2020</td>
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
                              height="220px"
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
                            <span>120/80 mg/dl</span>
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
                            <span>02/08/2020</span>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </ModalBody>
              </Modal>
            </Col>
            <Col md="3" sm="3" xs="12">
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
                        onClick={this.BMIAnalysistoggle}
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </p>
                    </div>
                  </div>
                  <div className="icon-wrapper rounded">
                    <div className="icon-wrapper-bg opacity-10 bg-danger" />
                    <i
                      className="lnr-chart-bars "
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
              <Modal
                size="md"
                isOpen={this.state.addbmimodel}
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
                          <Input placeholder="" type="number" />
                        </InputGroup>
                      </Col>
                      <Col sm="6" md="6" xs="12">
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <div className="input-group-text">in</div>
                          </InputGroupAddon>
                          <Input placeholder="" type="number" />
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
                  <Button color="alternate" onClick={this.AddBMItoggle}>Save</Button>
                </ModalFooter>
              </Modal>

              {/***View Value */}
              <Modal
                size="lg"
                isOpen={this.state.viewbmimodel}
                toggle={this.BMIAnalysistoggle}
                className={this.props.className}
              >
                <ModalHeader toggle={this.BMIAnalysistoggle}>
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
                                25.3 | 01/09/2020
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
                                          <td>20/08/2020</td>
                                        </tr>
                                        <tr>
                                          <td>59 bpm</td>
                                          <td>20/08/2020</td>
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
                                27.4 | 02/08/2020
                              </Button>
                            </span>
                            <Modal
                              size="md"
                              isOpen={this.state.Pathrleastmodal}
                              toggle={this.PatHRListtoggle}
                              className={this.props.className}
                            >
                              <ModalHeader toggle={this.PatHRListtoggle}>
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
                                          <td>20/08/2020</td>
                                        </tr>
                                        <tr>
                                          <td>65 bpm</td>
                                          <td>30/09/2020</td>
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
                              Average BMI:
                            </p>
                            <span>27.5</span>
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
                            <span>02/08/2020</span>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </ModalBody>
              </Modal>
            </Col>
            <Col md="3" sm="3" xs="12">
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
                        onClick={this.AddBloodGlutoggle}
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
                        onClick={this.BGAnalysistoggle}
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </p>
                    </div>
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
                    <div className="widget-subheading">Blood Glucose</div>
                    <div className="widget-numbers fsize-3">
                      100 <span className="fsize-1">mg/dl</span>
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
                isOpen={this.state.addbloodglucosemodel}
                toggle={this.AddBloodGlutoggle}
                className={this.props.className}
              >
                <ModalHeader toggle={this.AddBloodGlutoggle}>
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
                  <Button color="alternate" onClick={this.AddBloodGlutoggle}>Save</Button>
                </ModalFooter>
              </Modal>

              {/***View Value */}
              <Modal
                size="lg"
                isOpen={this.state.viewbgmodel}
                toggle={this.BGAnalysistoggle}
                className={this.props.className}
              >
                <ModalHeader toggle={this.BGAnalysistoggle}>
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
                                120.34 mg/dL | 01/09/2020
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
                                          <td>20/08/2020</td>
                                        </tr>
                                        <tr>
                                          <td>59 bpm</td>
                                          <td>20/08/2020</td>
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
                                90.97 mg/dL90.97 | 02/08/2020
                              </Button>
                            </span>
                            <Modal
                              size="md"
                              isOpen={this.state.Pathrleastmodal}
                              toggle={this.PatHRListtoggle}
                              className={this.props.className}
                            >
                              <ModalHeader toggle={this.PatHRListtoggle}>
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
                                          <td>20/08/2020</td>
                                        </tr>
                                        <tr>
                                          <td>65 bpm</td>
                                          <td>30/09/2020</td>
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
                            <span>100 mg/dL</span>
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
                            <span>02/08/2020</span>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </ModalBody>
              </Modal>
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
                    My Records
                  </div>

                  <div className="btn-actions-pane-right text-capitalize">
                    <Button color="alternate" onClick={this.Recordtoggle}>
                      <FontAwesomeIcon icon={faPlusCircle} />
                      &nbsp; Add New Record
                    </Button>
                    <Modal
                      size="lg"
                      isOpen={this.state.recordmodal}
                      toggle={this.Recordtoggle}
                      className={this.props.className}
                    >
                      <ModalHeader toggle={this.Recordtoggle}>
                        Add Your Records
                      </ModalHeader>

                      <ModalBody>
                        <Col xs="12" md="12" sm="12">
                          <FormGroup>
                            <Label for="exampleEmail">
                              <span className="text-danger">*</span> Choose
                              Record Type
                            </Label>
                            <Input
                              className="mb-2"
                              type="select"
                              onChange={this.handleRecordType.bind(this)}
                              value={RecordType}
                            >
                              <option value="">Choose record</option>
                              <option value="My Medical Documents">
                                My Medical Documents
                              </option>
                              <option value="My Insurances">
                                My Insurances
                              </option>
                              <option value="My Prescriptions">
                                My Prescriptions
                              </option>
                            </Input>
                          </FormGroup>
                        </Col>

                        {RecordType === "My Medical Documents" ? (
                          <div>
                            {/* <h4
                              style={{
                                textAlign: "center",
                              }}
                            >
                              Medical Record
                            </h4> */}
                            <Row>
                              <Col xs="12" md="6" sm="6">
                                <FormGroup>
                                  <Label for="exampleEmail">
                                    <span className="text-danger">*</span>{" "}
                                    Report Type
                                  </Label>
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
                                    <option value="">Choose report</option>
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
                                    <option value="DIABETES">
                                      DIABETES
                                    </option>
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
                                    <option value="ADMISSION">
                                      ADMISSION
                                    </option>
                                  </Input>
                                </FormGroup>
                              </Col>

                              <Col xs="12" md="6" sm="6">
                                <FormGroup>
                                  <Label for="exampleEmail">
                                    <span className="text-danger">*</span>{" "}
                                    Ref Doctor
                                  </Label>
                                  <Input
                                    className="mb-2"
                                    type="text"
                                    value={refdoctor}
                                    onChange={(e) =>
                                      this.handleReportUploadChange(
                                        "refdoctor",
                                        e
                                      )
                                    }
                                  />
                                </FormGroup>
                              </Col>
                            </Row>

                            {/* {ReportType === "CARDIAC TEST" ? (
                              <Col xs="12" md="12" sm="12">
                                <Label for="exampleEmail">
                                  <span className="text-danger">*</span>{" "}
                                  Your Current Heart Rate
                                </Label>
                                <Input type="text" />
                              </Col>
                            ) : ReportType === "BLOOD PRESSURE" ? (
                              <Col xs="12" md="12" sm="12">
                                <Label for="exampleEmail">
                                  <span className="text-danger">*</span>{" "}
                                  Your Current blood pressure
                                </Label>
                                <Input type="text" />
                              </Col>
                            ) : ReportType === "BLOOD TEST" ? (
                              <Col xs="12" md="12" sm="12">
                                <Label for="exampleEmail">
                                  <span className="text-danger">*</span>{" "}
                                  Your Current blood Glucose
                                </Label>
                                <Input type="text" />
                              </Col>
                            ) : ReportType === "LAB REPORT" ? (
                              <Col xs="12" md="12" sm="12">
                                <Label for="exampleEmail">
                                  <span className="text-danger">*</span>{" "}
                                  Your Current BMI
                                </Label>
                                <Input type="text" />
                              </Col>
                            ) : null} */}
                            <br />
                            {/* <Col sm="12" md="12" xs="12">
                              <Label for="exampleEmail">
                                <span className="text-danger">*</span>{" "}
                                Description
                              </Label>

                              <CKEditor
                                content={this.state.content}
                                events={{
                                  blur: this.onBlur,
                                  afterPaste: this.afterPaste,
                                  change: this.onChange,
                                }}
                              />
                            </Col> */}
                            <br />
                            <Row>
                              <Col sm="6" md="6" xs="12">
                                <Label for="exampleEmail">
                                  <span className="text-danger">*</span> Add
                                  Report
                                </Label>
                                <br />

                                {/* <Input
                                  type="file"
                                  onChange={(e)=>this.captureFile.bind(this,e)}
                                  name="file"
                                /> */}
                                <input
                                  type="file"
                                  onChange={this.captureFile}
                                />
                              </Col>
                              <Col sm="6" md="6" xs="12">
                                <Label for="exampleEmail">
                                  <span className="text-danger">*</span>{" "}
                                  Date
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
                          </div>
                        ) : RecordType === "My Insurances" ? (
                          <div>
                            <Col sm="12" md="12" xs="12">
                              <Label for="exampleEmail">
                                <span className="text-danger">*</span> Title
                              </Label>
                              <Input type="text" />
                            </Col>
                            <br />
                            <Col sm="12" md="12" xs="12">
                              <Label for="exampleEmail">
                                <span className="text-danger">*</span>{" "}
                                Description
                              </Label>
                              <CKEditor
                                content={this.state.content}
                                events={{
                                  blur: this.onBlur,
                                  afterPaste: this.afterPaste,
                                  change: this.onChange,
                                }}
                              />
                            </Col>
                            <br />
                            <Col sm="12" md="12" xs="12">
                              <Label for="exampleEmail">
                                <span className="text-danger">*</span> add
                                doc
                              </Label>
                              <Input type="file" />
                            </Col>
                            <br />
                            <Row>
                              <Col sm="6" md="6" xs="12">
                                <Label for="exampleEmail">
                                  <span className="text-danger">*</span>{" "}
                                  Upload Date
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
                              <Col sm="6" md="6" xs="12">
                                <Label for="exampleEmail">
                                  <span className="text-danger">*</span>{" "}
                                  Experation Date
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
                            </Row>
                          </div>
                        ) : RecordType === "My Prescriptions" ? (
                          <div>
                            <Col sm="12" md="12" xs="12">
                              <Label for="exampleEmail">
                                <span className="text-danger">*</span>{" "}
                                Prescription Name
                              </Label>
                              <Input
                                type="text"
                              // value={medicineName}
                              // onChange={(e) =>
                              //   this.handlePrescriptionChange(
                              //     "medicineName",
                              //     e
                              //   )
                              // }
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
                              // value={durgsDescription}
                              // onChange={(e) =>
                              //   this.handlePrescriptionChange(
                              //     "durgsDescription",
                              //     e
                              //   )
                              // }
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
                                  <span className="text-danger">*</span>{" "}
                                  Void After
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
                                  // value={voidDate}
                                  // onChange={(e) =>
                                  //   this.handlePrescriptionChange(
                                  //     "voidDate",
                                  //     e
                                  //   )
                                  // }
                                  />
                                </InputGroup>
                              </Col>
                              <Col sm="6" md="6" xs="12">
                                <Label for="exampleEmail">
                                  <span className="text-danger">*</span>{" "}
                                  Refill
                                </Label>
                                <FormGroup>
                                  <Input
                                    className="mb-2"
                                    type="select"
                                  // value={drugRefill}
                                  // onChange={(e) =>
                                  //   this.handlePrescriptionChange(
                                  //     "drugRefill",
                                  //     e
                                  //   )
                                  // }
                                  >
                                    <option>select Refill</option>
                                    <option value="One Time">
                                      One Time
                                    </option>
                                    <option value="Two Time">
                                      Two Time
                                    </option>
                                    <option value="Three Time">
                                      Three Time
                                    </option>
                                    <option value="Four Time">
                                      Four Time
                                    </option>
                                    <option value="Five Time">
                                      Five Time
                                    </option>
                                    <option value="Six Time">
                                      Six Time
                                    </option>
                                  </Input>
                                </FormGroup>
                              </Col>
                            </Row>
                          </div>
                        ) : null}
                      </ModalBody>
                      <ModalFooter>
                        <Button color="link" onClick={this.Recordtoggle}>
                          Cancel
                        </Button>
                        <Button
                          color="primary"
                          onClick={this.UploadReportFile.bind(this)}
                        >
                          Add
                        </Button>{" "}
                      </ModalFooter>
                    </Modal>
                  </div>
                </CardHeader>
                <CardBody className="pt-0">
                  <Row
                    style={{
                      marginTop: "2%",
                    }}
                  >
                    <Col md="3" sm="3" xs="12">
                      <div
                        className="card mb-3 widget-chart"
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={this.Medicaltoggle}
                      >
                        <div className="widget-chart-actions fsize-1">
                          25 files
                        </div>
                        <div
                          className="widget-content-left"
                          style={{
                            marginTop: "20%",
                          }}
                        >
                          <img
                            width={150}
                            className="rounded"
                            src={MediImg}
                            alt=""
                          />
                        </div>
                        <div
                          className="widget-numbers fsize-1"
                          style={{
                            textTransform: "uppercase",
                          }}
                        >
                          My medical Documents
                        </div>
                        <Modal
                          isOpen={this.state.medicalmodel}
                          toggle={this.Medicaltoggle}
                          className={this.props.className}
                          size="lg"
                        >
                          <ModalHeader toggle={this.Medicaltoggle}>
                            My Reports
                          </ModalHeader>
                          <ModalBody>
                            {/*****Blood Test Report */}
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
                                        Lorem Ipsum has been the industry's
                                        standard dummy text ever since the
                                        1500s, when an unknown printer took
                                        a galley of type and scrambled.
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
                                              <FontAwesomeIcon
                                                icon={faSearch}
                                              />
                                            </div>
                                          </InputGroupAddon>
                                          <Input placeholder="Search..." />
                                        </InputGroup>
                                        <div className="btn-actions-pane-right">
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
                                                <Col
                                                  sm="12"
                                                  md="12"
                                                  xs="12"
                                                >
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
                                                          icon={
                                                            faCalendarAlt
                                                          }
                                                        />
                                                      </div>
                                                    </InputGroupAddon>
                                                    <InputMask
                                                      className="form-control"
                                                      defaultValue={
                                                        new Date().getDate() +
                                                        "/" +
                                                        (new Date().getMonth() +
                                                          1) +
                                                        "/" +
                                                        new Date().getFullYear()
                                                      }
                                                    />
                                                  </InputGroup>
                                                </Col>
                                                <Col
                                                  sm="12"
                                                  md="12"
                                                  xs="12"
                                                >
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
                                                          icon={
                                                            faCalendarAlt
                                                          }
                                                        />
                                                      </div>
                                                    </InputGroupAddon>
                                                    <InputMask
                                                      className="form-control"
                                                      defaultValue={
                                                        new Date().getDate() +
                                                        "/" +
                                                        (new Date().getMonth() +
                                                          1) +
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
                                            <th className="">Document </th>
                                            <th className="">Ref Doctor1</th>

                                            <th className="">
                                              Report Name
                                            </th>
                                            <th className="">Actions</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {BloodReports.length > 0 ? (
                                            BloodReports.map((rep, i) => (
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
                                                          {rep.reportType}
                                                        </div>
                                                        <small className="opacity-8 fsize-1">
                                                          <FontAwesomeIcon
                                                            icon={
                                                              faCalendarAlt
                                                            }
                                                            className="mr-1"
                                                          />
                                                          {rep.date}
                                                        </small>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </td>
                                                <td className="">
                                                  {rep.refDoctor}
                                                </td>
                                                <td className="">
                                                  {rep.reportName}
                                                </td>
                                                <td className="">
                                                  <Button
                                                    outline
                                                    size="sm"
                                                    color="alternate"
                                                    onClick={this.ViewReports.bind(
                                                      this,
                                                      rep.reportData
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
                                            ))
                                          ) : (
                                              <tr>
                                                <td>
                                                  {" "}
                                                Reports not avilable...
                                              </td>
                                              </tr>
                                            )}
                                        </tbody>
                                      </Table>
                                      <CardFooter className="" />
                                    </Card>
                                  </Col>
                                </Row>
                              </ModalBody>
                            </Modal>
                            {/****Urine Test Report */}

                            <Modal
                              isOpen={this.state.urinereport}
                              toggle={this.MyUrineReporttoggle}
                              className={this.props.className}
                              size="lg"
                            >
                              <ModalHeader
                                toggle={this.MyUrineReporttoggle}
                              >
                                My Urine Test Report
                              </ModalHeader>
                              <ModalBody>
                                <Col sm="12" md="12" xs="12">
                                  <Card className="main-card mb-3">
                                    <CardHeader>Description</CardHeader>
                                    <CardBody>
                                      <p className="mb-0">
                                        Lorem Ipsum has been the industry's
                                        standard dummy text ever since the
                                        1500s, when an unknown printer took
                                        a galley of type and scrambled.
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
                                              <FontAwesomeIcon
                                                icon={faSearch}
                                              />
                                            </div>
                                          </InputGroupAddon>
                                          <Input placeholder="Search..." />
                                        </InputGroup>
                                        <div className="btn-actions-pane-right">
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
                                                <Col
                                                  sm="12"
                                                  md="12"
                                                  xs="12"
                                                >
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
                                                          icon={
                                                            faCalendarAlt
                                                          }
                                                        />
                                                      </div>
                                                    </InputGroupAddon>
                                                    <InputMask
                                                      className="form-control"
                                                      defaultValue={
                                                        new Date().getDate() +
                                                        "/" +
                                                        (new Date().getMonth() +
                                                          1) +
                                                        "/" +
                                                        new Date().getFullYear()
                                                      }
                                                    />
                                                  </InputGroup>
                                                </Col>
                                                <Col
                                                  sm="12"
                                                  md="12"
                                                  xs="12"
                                                >
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
                                                          icon={
                                                            faCalendarAlt
                                                          }
                                                        />
                                                      </div>
                                                    </InputGroupAddon>
                                                    <InputMask
                                                      className="form-control"
                                                      defaultValue={
                                                        new Date().getDate() +
                                                        "/" +
                                                        (new Date().getMonth() +
                                                          1) +
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
                                            <th className=""> </th>
                                            <th className="">Ref Doctor</th>

                                            <th className="">
                                              Report Name
                                            </th>
                                            <th className="">Actions</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {UrineReports.length > 0 ? (
                                            UrineReports.map((rep, i) => (
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
                                                          {rep.reportType}
                                                        </div>
                                                        <small className="opacity-8 fsize-1">
                                                          <FontAwesomeIcon
                                                            icon={
                                                              faCalendarAlt
                                                            }
                                                            className="mr-1"
                                                          />
                                                          {rep.date}
                                                        </small>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </td>
                                                <td className="">
                                                  {rep.refDoctor}
                                                </td>
                                                <td className="">
                                                  {rep.reportName}
                                                </td>
                                                <td className="">
                                                  <Button
                                                    outline
                                                    size="sm"
                                                    color="alternate"
                                                    onClick={this.ViewReports.bind(
                                                      this,
                                                      rep.reportData
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
                                            ))
                                          ) : (
                                              <tr>
                                                <td>
                                                  {" "}
                                                Reports not avilable...
                                              </td>
                                              </tr>
                                            )}
                                        </tbody>
                                      </Table>
                                      <CardFooter className="" />
                                    </Card>
                                  </Col>
                                </Row>
                              </ModalBody>
                            </Modal>
                            {/***Report Images */}

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
                                    cursor: "pointer",
                                  }}
                                  onClick={this.MyUrineReporttoggle}
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
                            {/******* */}

                            {/* <Table
                              responsive
                              hover
                              striped
                              borderless
                              className="align-middle mb-0"
                            >
                              <thead>
                                <tr>
                                 

                                  <th className="">Report Type</th>
                                  <th className="">Report Name</th>
                                  <th className="">Ref Doctor</th>
                                  <th className="">Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {MedicalDocumnets.length > 0 ? (
                                  MedicalDocumnets.map((med, i) => (
                                    <tr>
                                      <td>
                                        <div className="widget-content p-0">
                                          <div className="widget-content-wrapper">
                                            <div className="widget-content-left mr-3">
                                              <img
                                                width={42}
                                                className="rounded-circle"
                                                src={MediImg}
                                                alt=""
                                              />
                                            </div>
                                            <div className="widget-content-left">
                                              <div className="widget-heading">
                                                {med.reportType}
                                              </div>
                                              <div className="widget-subheading">
                                                <small className="opacity-8 fsize-1">
                                                  <FontAwesomeIcon
                                                    icon={faCalendarAlt}
                                                    className="mr-1"
                                                  />
                                                  {med.date}
                                                </small>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </td>

                                      <td>
                                        <span>{med.reportName}</span>
                                      </td>
                                      <td>
                                        <span>{med.refDoctor}</span>
                                      </td>
                                      <td>
                                        <Button color="alternate">
                                          <i className="lnr-download" />
                                        </Button>
                                        &nbsp;
                                        <Button color="info">
                                          <i className="lnr-eye" />
                                        </Button>
                                      </td>
                                    </tr>
                                  ))
                                ) : (
                                  <tr>
                                    <td> Reports not avilable...</td>
                                  </tr>
                                )}
                              </tbody>
                            </Table> */}
                          </ModalBody>
                          <ModalFooter>
                            {/* <Button
                              color="link"
                              onClick={this.Medicaltoggle}
                            >
                              Cancel
                            </Button> */}
                            <Button
                              color="primary"
                              onClick={this.Medicaltoggle}
                            >
                              Cancel
                            </Button>{" "}
                          </ModalFooter>
                        </Modal>
                      </div>
                    </Col>
                    <Col md="3" sm="3" xs="12">
                      <div
                        style={{
                          cursor: "pointer",
                        }}
                        className="card mb-3 widget-chart"
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
                            marginTop: "20%",
                          }}
                        >
                          <img
                            width={150}
                            className="rounded"
                            src={InsImg}
                            alt=""
                          />
                        </div>
                        <div
                          className="widget-numbers fsize-1"
                          style={{
                            textTransform: "uppercase",
                          }}
                        >
                          My Insurances
                        </div>
                      </div>
                    </Col>
                    <Col md="3" sm="3" xs="12">
                      <div
                        className="card mb-3 widget-chart"
                        style={{
                          cursor: "pointer",
                        }}
                        //  onClick={this.openPrecr.bind(
                        //    this
                        //  )}

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
                            marginTop: "20%",
                          }}
                        >
                          <img
                            width={150}
                            className="rounded"
                            src={PresImg}
                            alt=""
                          />
                        </div>
                        <div
                          className="widget-numbers fsize-1"
                          style={{
                            textTransform: "uppercase",
                          }}
                        >
                          My Prescriptions
                        </div>
                      </div>
                    </Col>
                    <Col md="3" sm="3" xs="12">
                      <div className="card mb-3 widget-chart">
                        {/* <div className="widget-chart-actions fsize-1">
                          25 files
                        </div> */}
                        <div
                          className="widget-content-left"
                          style={{
                            marginTop: "20%",
                            textTransform: "uppercase",
                            borderStyle: "dashed",
                          }}
                        >
                          <img
                            width={150}
                            className="rounded"
                            src={CretImg}
                            alt=""
                          />
                        </div>
                        <div
                          className="widget-numbers fsize-1"
                          style={{
                            textTransform: "uppercase",
                          }}
                        >
                          Create Folder
                        </div>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col xs="12" md="12" sm="12">
              <div id="exampleAccordion" data-children=".item">
                <div className="item">
                  <Collapse
                    isOpen={this.state.custom[0]}
                    data-parent="#exampleAccordion"
                    id="exampleAccordion1"
                  >
                    <Row>
                      <Col md="12" sm="12" xs="12">
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
                                          <span className="text-danger">
                                            *
                                          </span>{" "}
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
                                              {/* <div className="widget-subheading opacity-7">
                                               {" "}
                                                | Doctor:&nbsp;
                                               
                                              </div> */}
                                            </div>
                                          </div>
                                        </div>
                                      </td>
                                      {/* <td>
                                        <small className="opacity-8 fsize-1">
                                          <FontAwesomeIcon
                                            icon={faCalendarAlt}
                                            className="mr-1"
                                          />
                                          {pre.voidAfter}
                                        </small>
                                      </td> */}
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
                          <ModalHeader
                            toggle={this.ViewPrestoggleEnd.bind(this)}
                          >
                            My Prescriptions
                          </ModalHeader>
                          <ModalBody>
                            <Col sm="12" md="12" xs="12">
                              <Label for="exampleEmail">
                                <span className="text-danger">*</span>{" "}
                                Prescription Name
                              </Label>
                              <Input
                                type="text"
                                value={this.state.UdpateDrugs}
                              />
                            </Col>
                            <br />
                            <Col sm="12" md="12" xs="12">
                              <Label for="exampleEmail">
                                <span className="text-danger">*</span>{" "}
                                Description
                              </Label>

                              <TextareaAutosize
                                className="form-control"
                                minRows={3}
                                maxRows={10}
                                defaultValue="Description here....."
                                value={this.state.UdpatePresData}
                              />
                            </Col>
                            <br />
                            <Row>
                              <Col sm="6" md="6" xs="12">
                                <Label for="exampleEmail">
                                  <span className="text-danger">*</span>{" "}
                                  Void After
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
                                    value={this.state.UdpateVoidAfter}
                                  />
                                </InputGroup>
                              </Col>
                              <Col sm="6" md="6" xs="12">
                                <Label for="exampleEmail">
                                  <span className="text-danger">*</span>{" "}
                                  Refill
                                </Label>
                                <FormGroup>
                                  <Input value={this.state.UdpateRefill} />
                                </FormGroup>
                              </Col>
                            </Row>
                          </ModalBody>
                          <ModalFooter />
                        </Modal>
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
                                  <th className="">Experation Date</th>
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
                                      12/08/2020
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
                                      onClick={this.ViewInsurancetoggle.bind(
                                        this
                                      )}
                                    >
                                      <i className="lnr-eye" />
                                    </Button>
                                  </td>
                                </tr>
                              </tbody>
                            </Table>
                          </CardBody>
                        </Card>

                        <Modal
                          size="lg"
                          isOpen={this.state.viewinsurancemodal}
                          toggle={this.ViewInsurancetoggleEnd.bind(this)}
                          className={this.props.className}
                        >
                          <ModalHeader
                            toggle={this.ViewInsurancetoggleEnd.bind(this)}
                          >
                            Insurances Document
                          </ModalHeader>
                          <ModalBody />
                          <ModalFooter />
                        </Modal>
                      </Col>
                    </Row>
                  </Collapse>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md="12" sm="12" xs="12">
              <Card className="main-card mb-3">
                <CardBody>
                  <CardTitle>
                    <Button color="primary" onClick={this.toggle}>
                      Share to Contact
                    </Button>
                  </CardTitle>
                  <Collapse isOpen={this.state.collapse}>
                    <Row>
                      <Col sm="6" xs="12">
                        <Input
                          type="email"
                          placeholder="Doctor email..."
                          value={docEmail}
                          onChange={(e) =>
                            this.handleShareChange("docEmail", e)
                          }
                        />
                      </Col>
                      <Col sm="6" xs="12">
                        <Button
                          color="alternate"
                          onClick={this.SharedContact.bind(this)}
                        >
                          Submit to Share
                        </Button>
                      </Col>
                    </Row>
                  </Collapse>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </ReactCSSTransitionGroup>
      </Fragment>
    );
  }
}
