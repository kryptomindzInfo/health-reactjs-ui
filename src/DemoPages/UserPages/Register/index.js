import React, {Fragment, Component} from "react";

import Slider from "react-slick";

import bg3 from '../../../assets/utils/images/originals/citynights.jpg';

import {Col, Row, Button, Form, FormGroup, Label, Input} from 'reactstrap';

export default class Register extends Component {
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
                        <Col lg="7" md="12" className="h-100 d-md-flex d-sm-block bg-white justify-content-center align-items-center">
                            <Col lg="9" md="10" sm="12" className="mx-auto app-login-box">
                                <div className="app-logo"/>
                                <h4>
                                    <div>Welcome,</div>
                                    <span>It only takes a <span className="text-success">few seconds</span> to create your account</span>
                                </h4>
                                <div>
                                    <Form>
                                        <Row form>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="exampleEmail">
                                                        <span className="text-danger">*</span>
                                                        {' '}Email
                                                    </Label>
                                                    <Input type="email" name="email" id="exampleEmail"
                                                           placeholder="Email here..."/>
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="exampleName">Name</Label>
                                                    <Input type="text" name="text" id="exampleName"
                                                           placeholder="Name here..."/>
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="examplePassword">
                                                        <span className="text-danger">*</span>
                                                        {' '}Password
                                                    </Label>
                                                    <Input type="password" name="password" id="examplePassword"
                                                           placeholder="Password here..."/>
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="examplePasswordRep">
                                                        <span className="text-danger">*</span>
                                                        {' '}Repeat Password
                                                    </Label>
                                                    <Input type="password" name="passwordrep" id="examplePasswordRep"
                                                           placeholder="Repeat Password here..."/>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <FormGroup className="mt-3" check>
                                            <Input type="checkbox" name="check" id="exampleCheck"/>
                                            <Label for="exampleCheck" check>Accept our <a href=" ">Terms and Conditions</a>.</Label>
                                        </FormGroup>
                                        
                                    </Form>
                                </div>
                            </Col>
                        </Col>
                        <Col lg="5" className="d-lg-flex d-xs-none">
                            <div className="slider-light">
                                <Slider  {...settings}>
                                    <div
                                        className="h-100 d-flex justify-content-center align-items-center bg-premium-dark">
                                        <div className="slide-img-bg"
                                             style={{
                                                 backgroundImage: 'url(' + bg3 + ')'
                                             }}/>
                                       
                                    </div>
                                </Slider>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Fragment>
        );
    }
}
