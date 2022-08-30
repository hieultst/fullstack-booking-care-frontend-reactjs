import React, { Component } from "react";
import { connect } from "react-redux";
import "./OutstandingDoctor.scss";

import Slider from "react-slick";

class OutstandingDoctor extends Component {
    render() {
        return (
            <div className="section outstanding-doctor">
                <div className="section-container">
                    <div className="section-header">
                        <h2>Bác sĩ nổi bật tuần qua</h2>
                        <div className="section-more">
                            <a>Xem thêm</a>
                        </div>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            <div className="section-item">
                                <div className="section-item-content">
                                    <div className="outstanding-doctor-img"></div>
                                    <div className="item-text">
                                        <h3>Học vị, tên</h3>
                                        <h4>Khoa</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="section-item">
                                <div className="section-item-content">
                                    <div className="outstanding-doctor-img"></div>
                                    <div className="item-text">
                                        <h3>Học vị, tên</h3>
                                        <h4>Khoa</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="section-item">
                                <div className="section-item-content">
                                    <div className="outstanding-doctor-img"></div>
                                    <div className="item-text">
                                        <h3>Học vị, tên</h3>
                                        <h4>Khoa</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="section-item">
                                <div className="section-item-content">
                                    <div className="outstanding-doctor-img"></div>
                                    <div className="item-text">
                                        <h3>Học vị, tên</h3>
                                        <h4>Khoa</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="section-item">
                                <div className="section-item-content">
                                    <div className="outstanding-doctor-img"></div>
                                    <div className="item-text">
                                        <h3>Học vị, tên</h3>
                                        <h4>Khoa</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="section-item">
                                <div className="section-item-content">
                                    <div className="outstanding-doctor-img"></div>
                                    <div className="item-text">
                                        <h3>Học vị, tên</h3>
                                        <h4>Khoa</h4>
                                    </div>
                                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor);
