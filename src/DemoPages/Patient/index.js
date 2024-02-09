import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';

// DASHBOARDS

import PatientMain from "./PatientPage/patientmain";
import OtherMain from "./Other/othermain";


// Layout

import AppHeader from '../../Layout/AppHeader/';
import AppSidebar from '../../Layout/AppSidebar/';
import AppFooter from '../../Layout/AppFooter/';

// Theme Options
import ThemeOptions from '../../Layout/ThemeOptions/';

const Patientdashboards = ({ match }) => (
  <Fragment>
    <ThemeOptions />
    <AppHeader />
    <div className="app-main">
      <AppSidebar />
      <div className="app-main__outer">
        <div className="app-main__inner">
          <Route path={`${match.url}/patient-admin`} component={PatientMain} />
          <Route path={`${match.url}/other`} component={OtherMain} />
        </div>
        <AppFooter />
      </div>
    </div>
  </Fragment>
);

export default Patientdashboards;