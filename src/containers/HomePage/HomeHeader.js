import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import khamChuyenKhoa from "../../assets/khamchuyenkhoa.png";
import khamNhaKhoa from "../../assets/khamnhakhoa.png";
import khamTongQuat from "../../assets/khamtongquat.png";
import khamTuXa from "../../assets/khamtuxa.png";
import sucKhoeTinhThan from "../../assets/suckhoetinhthan.png";
import xetNghiemYHoc from "../../assets/xetnghiemyhoc.png";
import logo from "../../assets/logo.svg";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils";

import { changeLanguageApp } from "../../store/actions";

class HomeHeader extends Component {
    ChangeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
        // fire redux event: actions
    };

    render() {
        let language = this.props.language;
        return (
            <React.Fragment>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            <i className="fas fa-bars"></i>
                            <div className="header-logo">
                                <img src={logo} />
                            </div>
                        </div>
                        <div className="center-content">
                            <div className="child-content">
                                <b>
                                    <FormattedMessage id="home-header.speciality" />
                                </b>
                                <div className="subs-title">
                                    <FormattedMessage id="home-header.search-doctor" />
                                </div>
                            </div>
                            <div className="child-content">
                                <b>
                                    <FormattedMessage id="home-header.health-facility" />
                                </b>
                                <div className="subs-title">
                                    <FormattedMessage id="home-header.select-room" />
                                </div>
                            </div>
                            <div className="child-content">
                                <b>
                                    <FormattedMessage id="home-header.doctor" />
                                </b>
                                <div className="subs-title">
                                    <FormattedMessage id="home-header.select-doctor" />
                                </div>
                            </div>
                            <div className="child-content">
                                <b>
                                    <FormattedMessage id="home-header.medical-package" />
                                </b>
                                <div className="subs-title">
                                    <FormattedMessage id="home-header.general-examination" />
                                </div>
                            </div>
                        </div>
                        <div className="right-content">
                            <div className="support">
                                <i className="fas fa-question-circle"></i>
                                <FormattedMessage id="home-header.support" />
                            </div>
                            <div
                                className={
                                    language === LANGUAGES.VI
                                        ? "language active"
                                        : "language"
                                }
                            >
                                <span
                                    onClick={() => {
                                        this.ChangeLanguage(LANGUAGES.VI);
                                    }}
                                >
                                    VN
                                </span>
                            </div>
                            <div
                                className={
                                    language === LANGUAGES.EN
                                        ? "language active"
                                        : "language"
                                }
                            >
                                <span
                                    onClick={() => {
                                        this.ChangeLanguage(LANGUAGES.EN);
                                    }}
                                >
                                    EN
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                {this.props.isShowBanner === true && (
                    <div className="home-header-banner">
                        <div className="content-up">
                            <div className="title-top">
                                <FormattedMessage id="banner.medical-background" />
                            </div>
                            <div className="title-bottom">
                                <FormattedMessage id="banner.comprehensive-health" />
                            </div>
                            <div className="search">
                                <i className="fas fa-search"></i>
                                <input
                                    type="text"
                                    className="search-input"
                                    placeholder="Tìm chuyên khoa khám bệnh"
                                />
                            </div>
                        </div>
                        <div className="content-down">
                            <div className="options">
                                <div className="option-child">
                                    <div className="option-icon">
                                        <div className="option-img">
                                            <img
                                                src={khamChuyenKhoa}
                                                alt="Khám chuyên khoa"
                                            />
                                        </div>
                                    </div>
                                    <div className="option-text">
                                        <FormattedMessage id="banner.specialist-examination" />
                                    </div>
                                </div>
                                <div className="option-child">
                                    <div className="option-icon">
                                        <div className="option-img">
                                            <img
                                                src={khamTuXa}
                                                alt="Khám từ xa"
                                            />
                                        </div>
                                    </div>
                                    <div className="option-text">
                                        <FormattedMessage id="banner.remote-examination" />
                                    </div>
                                </div>
                                <div className="option-child">
                                    <div className="option-icon">
                                        <div className="option-img">
                                            <img
                                                src={khamTongQuat}
                                                alt="Khám tổng quát"
                                            />
                                        </div>
                                    </div>
                                    <div className="option-text">
                                        <FormattedMessage id="banner.remote-examination" />
                                    </div>
                                </div>
                                <div className="option-child">
                                    <div className="option-icon">
                                        <div className="option-img">
                                            <img
                                                src={xetNghiemYHoc}
                                                alt="Xét nghiệm y học"
                                            />
                                        </div>
                                    </div>
                                    <div className="option-text">
                                        <FormattedMessage id="banner.medical-test" />
                                    </div>
                                </div>
                                <div className="option-child">
                                    <div className="option-icon">
                                        <div className="option-img">
                                            <img
                                                src={sucKhoeTinhThan}
                                                alt="Sức khỏe tinh thần"
                                            />
                                        </div>
                                    </div>
                                    <div className="option-text">
                                        <FormattedMessage id="banner.mental-health" />
                                    </div>
                                </div>
                                <div className="option-child">
                                    <div className="option-icon">
                                        <div className="option-img">
                                            <img
                                                src={khamNhaKhoa}
                                                alt="Khám nha khoa"
                                            />
                                        </div>
                                    </div>
                                    <div className="option-text">
                                        <FormattedMessage id="banner.dental-examination" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeLanguageAppRedux: (language) =>
            dispatch(changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
