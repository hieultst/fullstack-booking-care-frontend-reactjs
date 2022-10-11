import { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

import "./DetailSpecialty.scss";
import HomeHeader from "../../HomePage/HomeHeader";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import {
    getDetailSpecialtyById,
    getAllCodeService,
} from "../../../services/userService";
import _ from "lodash";
import { LANGUAGES } from "../../../utils";
import SystemFAQ from "../../../components/SystemFAQ/SystemFAQ";
import Footer from "../../HomePage/Footer";

class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailSpecialty: [],
            listProvince: [],
            isShowViewDetail: false,
        };
    }

    async componentDidMount() {
        if (
            this.props.match &&
            this.props.match.params &&
            this.props.match.params.id
        ) {
            let id = this.props.match.params.id;
            let res = await getDetailSpecialtyById({
                id: id,
                location: "ALL",
            });

            let resProvince = await getAllCodeService("PROVINCE");

            if (
                res &&
                res.errCode === 0 &&
                resProvince &&
                resProvince.errCode === 0
            ) {
                let data = res.data;
                let arrDoctorId = [];
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.doctorSpecialty;
                    if (arr && arr.length > 0) {
                        arr.map((item) => {
                            arrDoctorId.push(item.doctorId);
                        });
                    }
                }

                let dataProvince = resProvince.data;
                if (dataProvince && dataProvince.length > 0) {
                    dataProvince.unshift({
                        createdAt: null,
                        keyMap: "ALL",
                        type: "PROVINCE",
                        valueEn: "All",
                        valueVi: "Toàn quốc",
                    });
                }

                this.setState({
                    dataDetailSpecialty: res.data,
                    arrDoctorId: arrDoctorId,
                    listProvince: dataProvince ? dataProvince : [],
                });
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
    }

    handleOnChangeSelect = async (event) => {
        if (
            this.props.match &&
            this.props.match.params &&
            this.props.match.params.id
        ) {
            let id = this.props.match.params.id;
            let location = event.target.value;

            let res = await getDetailSpecialtyById({
                id: id,
                location: location,
            });

            if (res && res.errCode === 0) {
                let data = res.data;
                let arrDoctorId = [];
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.doctorSpecialty;
                    if (arr && arr.length > 0) {
                        arr.map((item) => {
                            arrDoctorId.push(item.doctorId);
                        });
                    }
                }

                this.setState({
                    dataDetailSpecialty: res.data,
                    arrDoctorId: arrDoctorId,
                });
            }
        }
    };

    handleShowViewDetail = () => {
        this.setState({
            isShowViewDetail: !this.state.isShowViewDetail,
        });
    };

    render() {
        let { language } = this.props;
        let {
            arrDoctorId,
            dataDetailSpecialty,
            listProvince,
            isShowViewDetail,
        } = this.state;
        return (
            <div className="detail-specialty-container">
                <HomeHeader />
                <div className="detail-specialty-content">
                    <div className="desc-specialty">
                        {dataDetailSpecialty &&
                            !_.isEmpty(dataDetailSpecialty) && (
                                <>
                                    <div className="desc-title">
                                        <h1>{dataDetailSpecialty.name}</h1>
                                    </div>
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: dataDetailSpecialty.descriptionHTML,
                                        }}
                                        className={
                                            isShowViewDetail === true
                                                ? "desc-content"
                                                : "desc-content desc-hide"
                                        }
                                    ></div>
                                    <div
                                        className="view-detail"
                                        onClick={() =>
                                            this.handleShowViewDetail()
                                        }
                                    >
                                        {isShowViewDetail === true ? (
                                            <span>
                                                <FormattedMessage
                                                    id={"manage-specialty.hide"}
                                                />
                                            </span>
                                        ) : (
                                            <span>
                                                <FormattedMessage
                                                    id={"manage-specialty.show"}
                                                />
                                            </span>
                                        )}
                                    </div>
                                </>
                            )}
                    </div>
                    <div className="search-sp-doctor">
                        <select
                            onChange={(event) =>
                                this.handleOnChangeSelect(event)
                            }
                            className="select-location"
                        >
                            {listProvince &&
                                listProvince.length > 0 &&
                                listProvince.map((item, index) => {
                                    return (
                                        <option key={index} value={item.keyMap}>
                                            {language === LANGUAGES.VI
                                                ? item.valueVi
                                                : item.valueEn}
                                        </option>
                                    );
                                })}
                        </select>
                    </div>
                    {arrDoctorId &&
                        arrDoctorId.length > 0 &&
                        arrDoctorId.map((item, index) => {
                            return (
                                <div className="each-doctor" key={index}>
                                    <div className="conten-left">
                                        <div className="profile-doctor">
                                            <ProfileDoctor
                                                doctorId={item}
                                                isShowDescriptionDoctor={true}
                                                isShowLinkDetail={true}
                                                isShowPrice={false}
                                            />
                                        </div>
                                    </div>
                                    <div className="conten-right">
                                        <div className="doctor-schedule">
                                            <DoctorSchedule
                                                doctorIdFromParent={item}
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>
                <SystemFAQ />
                <Footer />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
