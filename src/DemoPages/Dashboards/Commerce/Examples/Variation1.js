import {color} from 'd3-color';
import {interpolateRgb} from 'd3-interpolate';
import React, {Fragment, Component} from 'react';
import LiquidFillGauge from 'react-liquid-gauge';
import {
    Row, Col,
    Button,
    Nav,
    NavItem,
    Card, CardBody, CardTitle,
    NavLink,
    Container,
    Table,
    CardHeader,
    CardFooter,
    ButtonGroup,
    Popover, PopoverBody,
    ListGroupItem,
    ListGroup,
} from 'reactstrap';

import bg1 from '../../../../assets/utils/images/dropdown-header/abstract1.jpg';
import bg2 from '../../../../assets/utils/images/dropdown-header/abstract2.jpg';
import bg3 from '../../../../assets/utils/images/dropdown-header/abstract3.jpg';

import classnames from 'classnames';

import avatar1 from '../../../../assets/utils/images/avatars/1.jpg';
import avatar2 from '../../../../assets/utils/images/avatars/2.jpg';
import avatar3 from '../../../../assets/utils/images/avatars/3.jpg';
import avatar4 from '../../../../assets/utils/images/avatars/4.jpg';

import IncomeReport from './Components/IncomeReport';

import {
    faAngleUp,
    faArrowLeft,
    faArrowRight,

} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {
    Sparklines,
    SparklinesBars,
    SparklinesLine,
} from 'react-sparklines';

function boxMullerRandom() {
    let phase = false,
        x1, x2, w, z;

    return (function () {

        if (phase = !phase) {
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

export default class CommerceDashboard1 extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.togglePop1 = this.togglePop1.bind(this);
        this.togglePop2 = this.togglePop2.bind(this);
        this.togglePop3 = this.togglePop3.bind(this);
        this.togglePop4 = this.togglePop4.bind(this);

        this.state = {
            activeTab: '1',
            popoverOpen1: false,
            popoverOpen2: false,
            popoverOpen3: false,
            popoverOpen4: false,
            value: 45,
            value2: 72
        }
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    togglePop1() {
        this.setState({
            popoverOpen1: !this.state.popoverOpen1
        });
    }

    togglePop2() {
        this.setState({
            popoverOpen2: !this.state.popoverOpen2
        });
    }

    togglePop3() {
        this.setState({
            popoverOpen3: !this.state.popoverOpen3
        });
    }

    togglePop4() {
        this.setState({
            popoverOpen4: !this.state.popoverOpen4
        });
    }

    startColor = '#6495ed'; // cornflowerblue
    endColor = '#dc143c'; // crimson

    render() {
        const radius = 107;
        const interpolate = interpolateRgb(this.startColor, this.endColor);
        const fillColor = interpolate(this.state.value / 100);
        const gradientStops = [
            {
                key: '0%',
                stopColor: color(fillColor).darker(0.5).toString(),
                stopOpacity: 1,
                offset: '0%'
            },
            {
                key: '50%',
                stopColor: fillColor,
                stopOpacity: 0.75,
                offset: '50%'
            },
            {
                key: '100%',
                stopColor: color(fillColor).brighter(0.5).toString(),
                stopOpacity: 0.5,
                offset: '100%'
            }
        ];

        return (
          <Fragment>
            <Container fluid>
              <Row>
                <Col lg="12" xl="6">
                  <Card className="main-card mb-3">
                    <CardBody>
                      <CardTitle>Income Report</CardTitle>
                      <IncomeReport />
                    </CardBody>
                  </Card>
                </Col>

              </Row>
           
              
              {
              
              
              
              
              /* 
              
              
              
              <div className="text-center mb-3">
                <h5 className="menu-header-title text-capitalize mb-3 fsize-3">
                  Top Sellers Cards
                </h5>
                <ButtonGroup size="lg" className="mb-3">
                  <Button
                    color="primary"
                    className={
                      "btn-shadow " +
                      classnames({
                        active: this.state.activeTab === "1",
                      })
                    }
                  >
                    Hour
                  </Button>
                  <Button
                    color="primary"
                    className={
                      "btn-shadow " +
                      classnames({
                        active: this.state.activeTab === "2",
                      })
                    }
                  >
                    Day
                  </Button>
                  <Button
                    color="primary"
                    className={
                      "btn-shadow " +
                      classnames({
                        active: this.state.activeTab === "3",
                      })
                    }
                  >
                    Week
                  </Button>
                  <Button
                    color="primary"
                    className={
                      "btn-shadow " +
                      classnames({
                        active: this.state.activeTab === "4",
                      })
                    }
                  >
                    Month
                  </Button>
                </ButtonGroup>
              </div> */}

              
            </Container>
          </Fragment>
        );
    }
}
