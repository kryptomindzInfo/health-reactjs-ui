import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import React, {Suspense, lazy, Fragment} from 'react';
import Loader from 'react-loaders'
import BlockChainLoader from '../../DemoPages/Components/Blockchain/blockloader'
import {
    ToastContainer,
} from 'react-toastify';

const UserPages = lazy(() => import('../../DemoPages/UserPages'));
const Applications = lazy(() => import('../../DemoPages/Applications'));
const Dashboards = lazy(() => import('../../DemoPages/Dashboards'));
const Doctordashboards = lazy(() => import("../../DemoPages/Doctor"));
const Patientdashboards = lazy(() => import("../../DemoPages/Patient"));

const Widgets = lazy(() => import('../../DemoPages/Widgets'));
const Elements = lazy(() => import('../../DemoPages/Elements'));
const Components = lazy(() => import('../../DemoPages/Components'));
const Charts = lazy(() => import('../../DemoPages/Charts'));
const Forms = lazy(() => import('../../DemoPages/Forms'));
const Tables = lazy(() => import('../../DemoPages/Tables'));

// const isAuthenticate = () => {
//   return getToken().token ? true : false;
// };

const AppMain = () => {

    return (
      <Fragment>
        {/* Components */}

        <Suspense
          fallback={
            <div className="loader-container">
              <div className="loader-container-inner">
                <div className="text-center">
                  ,<BlockChainLoader />
                </div>
                {/* <h6 className="mt-5">
                  Please wait while we load all the Components examples
                  <small>
                    Because this is a demonstration we load at once all the
                    Components examples. This wouldn't happen in a real live
                    app!
                  </small>
                </h6> */}
              </div>
            </div>
          }
        >
          <Route path="/components" component={Components} />
        </Suspense>

        {/* Forms */}

        <Suspense
          fallback={
            <div className="loader-container">
              <div className="loader-container-inner">
                <div className="text-center">
                  <BlockChainLoader />
                </div>
                {/* <h6 className="mt-5">
                  Please wait while we load all the Forms examples
                  <small>
                    Because this is a demonstration we load at once all the
                    Forms examples. This wouldn't happen in a real live app!
                  </small>
                </h6> */}
              </div>
            </div>
          }
        >
          <Route path="/forms" component={Forms} />
        </Suspense>

        {/* Charts */}

        <Suspense
          fallback={
            <div className="loader-container">
              <div className="loader-container-inner">
                <div className="text-center">
                  <BlockChainLoader />
                </div>
                {/* <h6 className="mt-3">
                  Please wait while we load all the Charts examples
                  <small>
                    Because this is a demonstration we load at once all the
                    Charts examples. This wouldn't happen in a real live
                    app!
                  </small>
                </h6> */}
              </div>
            </div>
          }
        >
          <Route path="/charts" component={Charts} />
        </Suspense>

        {/* Tables */}

        <Suspense
          fallback={
            <div className="loader-container">
              <div className="loader-container-inner">
                <div className="text-center">
                  <BlockChainLoader />
                </div>
                {/* <h6 className="mt-5">
                  Please wait while we load all the Tables examples
                  <small>
                    Because this is a demonstration we load at once all the
                    Tables examples. This wouldn't happen in a real live
                    app!
                  </small>
                </h6> */}
              </div>
            </div>
          }
        >
          <Route path="/tables" component={Tables} />
        </Suspense>

        {/* Elements */}

        <Suspense
          fallback={
            <div className="loader-container">
              <div className="loader-container-inner">
                <div className="text-center">
                  <BlockChainLoader />
                </div>
                {/* <h6 className="mt-3">
                  Please wait while we load all the Elements examples
                  <small>
                    Because this is a demonstration we load at once all the
                    Elements examples. This wouldn't happen in a real live
                    app!
                  </small>
                </h6> */}
              </div>
            </div>
          }
        >
          <Route path="/elements" component={Elements} />
        </Suspense>

        {/* Dashboard Widgets */}

        <Suspense
          fallback={
            <div className="loader-container">
              <div className="loader-container-inner">
                <div className="text-center">
                  <BlockChainLoader />
                </div>
                {/* <h6 className="mt-3">
                  Please wait while we load all the Dashboard Widgets
                  examples
                  <small>
                    Because this is a demonstration we load at once all the
                    Dashboard Widgets examples. This wouldn't happen in a
                    real live app!
                  </small>
                </h6> */}
              </div>
            </div>
          }
        >
          <Route path="/widgets" component={Widgets} />
        </Suspense>

        {/* Pages */}

        <Suspense
          fallback={
            <div className="loader-container">
              <div className="loader-container-inner">
                <div className="text-center">
                  <BlockChainLoader />
                </div>
                {/* <h6 className="mt-3">
                  Please wait while we load all the Pages examples
                  <small>
                    Because this is a demonstration we load at once all the
                    Pages examples. This wouldn't happen in a real live app!
                  </small>
                </h6> */}
              </div>
            </div>
          }
        >
          <Route path="/pages" component={UserPages} />
        </Suspense>

        {/* Applications */}

        <Suspense
          fallback={
            <div className="loader-container">
              <div className="loader-container-inner">
                <div className="text-center">
                  <BlockChainLoader />
                </div>
                {/* <h6 className="mt-3">
                  Please wait while we load all the Applications examples
                  <small>
                    Because this is a demonstration we load at once all the
                    Applications examples. This wouldn't happen in a real
                    live app!
                  </small>
                </h6> */}
              </div>
            </div>
          }
        >
          <Route path="/apps" component={Applications} />
        </Suspense>

        {/* Dashboards */}

        <Suspense
          fallback={
            <div className="loader-container">
              <div className="loader-container-inner">
                <div className="text-center">
                  <BlockChainLoader />
                </div>
                {/* <h6 className="mt-3">
                  Please wait while we load all the Dashboards examples
                  <small>
                    Because this is a demonstration, we load at once all the
                    Dashboards examples. This wouldn't happen in a real live
                    app!
                  </small>
                </h6> */}
              </div>
            </div>
          }
        >
          <Route path="/dashboards" component={Dashboards} />
        </Suspense>

        <Suspense
          fallback={
            <div className="loader-container">
              <div className="loader-container-inner">
                <div className="text-center">
                  <BlockChainLoader />
                </div>
                {/* <h6 className="mt-3">
                  Please wait while we load all the Dashboards examples
                  <small>
                    Because this is a demonstration, we load at once all the
                    Dashboards examples. This wouldn't happen in a real live
                    app!
                  </small>
                </h6> */}
              </div>
            </div>
          }
        >
          <Route path="/doctor" component={Doctordashboards} />
        </Suspense>

        <Suspense
          fallback={
            <div className="loader-container">
              <div className="loader-container-inner">
                <div className="text-center">
                  <BlockChainLoader />
                </div>
                {/* <h6 className="mt-3">
                  Please wait while we load all the Dashboards examples
                  <small>
                    Because this is a demonstration, we load at once all the
                    Dashboards examples. This wouldn't happen in a real live
                    app!
                  </small>
                </h6> */}
              </div>
            </div>
          }
        >
          <Route path="/patient" component={Patientdashboards} />
        </Suspense>

        <Route
          exact
          path="/"
          render={() => <Redirect to="/dashboards/admin-dashboard" />}
        />

        <Route
          exact
          path="/"
          render={() => <Redirect to="/dashboards/doctor-admin" />}
        />

        <Route
          exact
          path="/"
          render={() => <Redirect to="/pages/login" />}
        />
        <ToastContainer />
      </Fragment>
    );
};

export default AppMain;