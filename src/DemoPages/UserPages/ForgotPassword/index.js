import React, {Fragment, Component} from "react";

import Slider from "react-slick";

import bg1 from '../../../assets/utils/images/originals/city.jpg';
import bg2 from '../../../assets/utils/images/originals/citydark.jpg';
import bg3 from '../../../assets/utils/images/originals/citynights.jpg';

import {Col, Row, Button, Form, FormGroup, Label, Input} from 'reactstrap';

export default class ForgotPassword extends Component {
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
            adaptiveHeight: true

        };
        return (

            <Fragment>
                <div className="h-100">
                    <Row className="h-100 no-gutters">
                        <Col lg="4" className="d-none d-lg-block">
                            <div className="slider-light">
                                <Slider  {...settings}>
                                    <div
                                        className="h-100 d-flex justify-content-center align-items-center bg-plum-plate">
                                        <div className="slide-img-bg"
                                             style={{
                                                 backgroundImage: 'url(' + bg1 + ')'
                                             }}/>
                                        
                                    </div>
                                    <div
                                        className="h-100 d-flex justify-content-center align-items-center bg-premium-dark">
                                        <div className="slide-img-bg"
                                             style={{
                                                 backgroundImage: 'url(' + bg3 + ')'
                                             }}/>
                                        
                                    </div>
                                    <div
                                        className="h-100 d-flex justify-content-center align-items-center bg-sunny-morning">
                                        <div className="slide-img-bg opacity-6"
                                             style={{
                                                 backgroundImage: 'url(' + bg2 + ')'
                                             }}/>
                                        
                                    </div>
                                </Slider>
                            </div>
                        </Col>
                        <Col lg="8" md="12" className="h-100 d-flex bg-white justify-content-center align-items-center">
                            <Col lg="6" md="8" sm="12" className="mx-auto app-login-box">
                                <div className="app-logo"/>
                                <h4>
                                    <div>Forgot your Password?</div>
                                    <span>Use the form below to recover it.</span>
                                </h4>
                                <div>
                                    <Form>
                                        <Row form>
                                            <Col md={12}>
                                                <FormGroup>
                                                    <Label for="exampleEmail">Email</Label>
                                                    <Input type="email" name="email" id="exampleEmail"
                                                           placeholder="Email here..."/>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <div className="mt-4 d-flex align-items-center">
                                            <h6 className="mb-0">
                                                <a href=" " className="text-primary">Sign in existing account</a>
                                            </h6>
                                            <div className="ml-auto">
                                                <Button color="primary" size="lg">Recover Password</Button>
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
