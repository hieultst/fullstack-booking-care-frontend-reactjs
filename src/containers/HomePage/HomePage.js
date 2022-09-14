import React, { Component } from "react";
import { connect } from "react-redux";
import "slick-carousel/slick/slick.scss";
import "slick-carousel/slick/slick-theme.scss";

import HomeHeader from "./HomeHeader";
import Specialty from "./Section/Specialty";
import MedicalFacility from "./Section/MedicalFacility";
import OutstandingDoctor from "./Section/OutstandingDoctor";
import "./HomePage.scss";

const CustomNextButton = (props) => {
    const { onClick, icon, className } = props;
    return (
        <button className={className} onClick={onClick}>
            {icon}
        </button>
    );
};
const CustomPrevButton = (props) => {
    const { onClick, icon, className } = props;
    return (
        <button className={className} onClick={onClick}>
            {icon}
        </button>
    );
};

class HomePage extends Component {
    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,
            nextArrow: (
                <CustomNextButton
                    icon={<i className="fas fa-chevron-right"></i>}
                />
            ),
            prevArrow: (
                <CustomPrevButton
                    icon={<i className="fas fa-chevron-left"></i>}
                />
            ),
        };
        return (
            <div>
                <HomeHeader isShowBanner={true} />
                <Specialty settings={settings} />
                <MedicalFacility settings={settings} />
                <OutstandingDoctor settings={settings} />
                <div className="test-class"></div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
