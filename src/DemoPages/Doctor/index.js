import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';

// DASHBOARDS

import DoctorMain from "./Doctorpage/mainpage";
import PatientList from "./Patients/patientlist";
import PatientDetails from './Patientview/patientdetails'


// Layout

import AppHeader from '../../Layout/AppHeader/';
import AppSidebar from '../../Layout/AppSidebar/';
import AppFooter from '../../Layout/AppFooter/';

// Theme Options
import ThemeOptions from '../../Layout/ThemeOptions/';

const Doctordashboards = ({ match }) => (
  <Fragment>
    <ThemeOptions />
    <AppHeader />
    <div className="app-main">
      <AppSidebar />
      <div className="app-main__outer">
        <div className="app-main__inner">
          <Route path={`${match.url}/doctor-admin`} component={DoctorMain} />
          <Route path={`${match.url}/patients`} component={PatientList} />
          <Route path={`${match.url}/patient-view`} component={PatientDetails} />
        </div>
        <AppFooter />
      </div>
    </div>
  </Fragment>
);

export default Doctordashboards;