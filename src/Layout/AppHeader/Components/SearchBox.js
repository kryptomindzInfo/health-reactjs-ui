import React, { Fragment } from "react";
import { toast, Bounce } from "react-toastify";
import cx from "classnames";
import {
  faStar,
  faCalendarAlt,
  faAngleLeft,
  faAngleDown,
  faSearch,
  faAngleRight,
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faTags,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Col,
  Row,
  Button,
  Card,
  Nav,
  NavLink,
  NavItem,
  DropdownMenu,
  DropdownItem,
  CustomInput,
  InputGroup,
  InputGroupAddon,
  Input,
  Table,
  UncontrolledButtonDropdown,
  DropdownToggle,
} from "reactstrap";

class SearchBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSearch: false,
      doctoradmin: "",
      searchPatient: "",
    };
  }

  componentDidMount() {
    const asDoctor = sessionStorage.getItem("doctor");
    this.setState({ doctoradmin: asDoctor });
  }

  handleSearchChange = (data, event) => {
    this.setState({ [data]: event.target.value });
  };

  OkSearch(){
    const  {searchPatient}=this.state;
    if(searchPatient===""){
      this.toastId = toast("Failed! Please enter Patient name", {
        transition: Bounce,
        closeButton: true,
        autoClose: 3000,
        position: "bottom-center",
        type: "error",
      });
      return;
    }else{
      window.location.href = "/#/doctor/patients";
    }
  }

  render() {
    const { doctoradmin, searchPatient } = this.state;
    console.log("this.state.activeSearch", this.state.activeSearch);

    return (
      <Fragment>
        {doctoradmin === "Doctor" ? (
          <div className="pane-right">
            <InputGroup>
              <Input
                placeholder="search Patient..."
                style={{ borderRadius: "20px" }}
                value={searchPatient}
                onChange={(e) =>
                  this.handleSearchChange("searchPatient", e)
                }
              />
              &nbsp;&nbsp;
              <InputGroupAddon addonType="prepend">
                <div
                  className="input-group-text"
                  style={{ cursor: "pointer" }}
                  style={{ borderRadius: "20px" }}
                  onClick={this.OkSearch.bind(this)}
                >
                  <FontAwesomeIcon icon={faSearch} />
                </div>
              </InputGroupAddon>
            </InputGroup>
          </div>
        ) : null}
      </Fragment>
    );
  }
}

export default SearchBox;
