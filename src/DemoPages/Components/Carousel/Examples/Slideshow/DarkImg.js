import React, {Fragment, Component} from "react";
import Slider from "react-slick";

import bg1 from '../../../../../assets/utils/images/originals/city.jpg';
import bg2 from '../../../../../assets/utils/images/originals/citydark.jpg';
import bg3 from '../../../../../assets/utils/images/originals/citynights.jpg';

export default class DarkImg extends Component {
    render() {
        const settings = {
            className: "center",
            infinite: true,
            slidesToShow: 1,
            speed: 500,
            dots: true,
        };
        return (
            <Fragment>
                <div className="slider-light">
                    <Slider  {...settings}>
                        <div
                            className="p-5 bg-plum-plate">
                            <div className="slide-img-bg"
                                 style={{
                                     backgroundImage: 'url(' + bg1 + ')'
                                 }}/>
                            
                        </div>
                        <div
                            className="p-5 bg-premium-dark">
                            <div className="slide-img-bg"
                                 style={{
                                     backgroundImage: 'url(' + bg3 + ')'
                                 }}/>
                            
                        </div>
                        <div
                            className="p-5 bg-sunny-morning">
                            <div className="slide-img-bg opacity-6"
                                 style={{
                                     backgroundImage: 'url(' + bg2 + ')'
                                 }}/>
                            
                        </div>
                    </Slider>
                </div>
            </Fragment>
        );
    }
}