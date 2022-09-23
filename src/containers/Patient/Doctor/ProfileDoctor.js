import { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import NumberFormat from "react-number-format";

import "./ProfileDoctor.scss";
import { LANGUAGES } from "../../../utils";
import { getProfileDoctorById } from "../../../services/userService";
import _ from "lodash";
import moment from "moment/moment";

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
        if (this.props.language !== prevProps.language) {
        }
        if (this.props.doctorId !== prevProps.doctorId) {
            // this.getInforDoctor(this.props.doctorId);
        }
    }

    renderTimeBooking = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let time =
                language === LANGUAGES.VI
                    ? dataTime.timeTypeData.valueVi
                    : dataTime.timeTypeData.valueEn;
            let date =
                language === LANGUAGES.VI
                    ? moment
                          .unix(+dataTime.date / 1000)
                          .format("dddd - DD/MM/YYYY")
                    : moment
                          .unix(+dataTime.date / 1000)
                          .locale("en")
                          .format("dddd - MM/DD/YYYY");
            return (
                <>
                    <div>
                        {time} - {this.capitalizeFirstLetter(date)}
                    </div>
                    <div>
                        <FormattedMessage
                            id={"patient.booking-modal.price-booking"}
                        />
                    </div>
                </>
            );
        }
        return <></>;
    };

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    render() {
        let { language, isShowDescriptionDoctor, dataTime } = this.props;
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
                            {isShowDescriptionDoctor === true ? (
                                <>
                                    {dataProfile &&
                                        dataProfile.Markdown &&
                                        dataProfile.Markdown.description && (
                                            <span>
                                                {
                                                    dataProfile.Markdown
                                                        .description
                                                }
                                            </span>
                                        )}
                                </>
                            ) : (
                                <>{this.renderTimeBooking(dataTime)}</>
                            )}
                        </div>
                    </div>
                </div>
                <div className="price">
                    <FormattedMessage id={"patient.booking-modal.price"} />
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
