import { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import NumberFormat from "react-number-format";

import "./ProfileDoctor.scss";
import { LANGUAGES } from "../../../utils";
import { getProfileDoctorById } from "../../../services/userService";

class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {},
        };
    }

    async componentDidMount() {
        let data = await this.getInforDoctor(this.props.doctorId);
        this.setState({
            dataProfile: data,
        });
    }

    getInforDoctor = async (id) => {
        let result = {};
        if (id) {
            let res = await getProfileDoctorById(id);
            if (res && res.errCode === 0) {
                result = res.data;
            }
        }
        return result;
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevState.language) {
        }
        if (this.props.doctorId !== prevState.doctorId) {
            // this.getInforDoctor(this.props.doctorId);
        }
    }

    render() {
        let { language } = this.props;
        let { dataProfile } = this.state;
        let nameVi = "",
            nameEn = "";
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`;
            nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`;
        }
        return (
            <div className="profile-doctor-container">
                <div className="intro-doctor">
                    <div
                        className="content-left"
                        style={{
                            backgroundImage: `url(${
                                dataProfile && dataProfile.image
                                    ? dataProfile.image
                                    : ""
                            })`,
                        }}
                    ></div>
                    <div className="content-right">
                        <div className="doctor-name">
                            <h1>
                                {language === LANGUAGES.VI ? nameVi : nameEn}
                            </h1>
                        </div>
                        <div className="doctor-intro">
                            {dataProfile &&
                                dataProfile.Markdown &&
                                dataProfile.Markdown.description && (
                                    <span>
                                        {dataProfile.Markdown.description}
                                    </span>
                                )}
                        </div>
                    </div>
                </div>
                <div className="price">
                    Giá khám:
                    {dataProfile &&
                        dataProfile.Doctor_infor &&
                        language === LANGUAGES.VI && (
                            <>
                                <NumberFormat
                                    value={
                                        dataProfile.Doctor_infor.priceData
                                            .valueVi
                                    }
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    suffix={""}
                                />
                                <sup>đ</sup>
                            </>
                        )}
                    {dataProfile &&
                        dataProfile.Doctor_infor &&
                        language === LANGUAGES.EN && (
                            <NumberFormat
                                value={
                                    dataProfile.Doctor_infor.priceData.valueEn
                                }
                                displayType={"text"}
                                thousandSeparator={true}
                                suffix={"$"}
                            />
                        )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
