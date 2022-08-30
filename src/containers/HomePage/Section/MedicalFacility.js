import React, { Component } from "react";
import { connect } from "react-redux";
import "./MedicalFacility.scss";

import Slider from "react-slick";

class MedicalFacility extends Component {
    render() {
        return (
            <div className="section medical-facility">
                <div className="section-container">
                    <div className="section-header">
                        <h2>Cơ sở y tế nổi bật</h2>
                        <div className="section-more">
                            <a>Xem thêm</a>
                        </div>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            <div className="section-item">
                                <div className="section-img medical-facility-img"></div>
                                <h3>Cơ xương khớp</h3>
                            </div>
                            <div className="section-item">
                                <div className="section-img medical-facility-img"></div>
                                <h3>Cơ xương khớp</h3>
                            </div>
                            <div className="section-item">
                                <div className="section-img medical-facility-img"></div>
                                <h3>Cơ xương khớp</h3>
                            </div>
                            <div className="section-item">
                                <div className="section-img medical-facility-img"></div>
                                <h3>Cơ xương khớp</h3>
                            </div>
                            <div className="section-item">
                                <div className="section-img medical-facility-img"></div>
                                <h3>Cơ xương khớp</h3>
                            </div>
                            <div className="section-item">
                                <div className="section-img medical-facility-img"></div>
                                <h3>Cơ xương khớp</h3>
                            </div>
                        </Slider>
                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
