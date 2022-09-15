import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import moment from "moment";

import "./ManageSchedule.scss";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import DatePicker from "../../../components/Input/DatePicker";

class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDoctors: [],
            selectedDoctor: {},
            currentDate: new Date(),
            rangeTime: [],
        };
    }

    builDataInputSelect = (data) => {
        let result = [];
        let { language } = this.props;
        if (data && data.length > 0) {
            data.map((item, index) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object);
            });
        }
        return result;
    };

    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.fetchAllcodeScheduleTime();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (
            prevProps.allDoctors !== this.props.allDoctors
            //|| prevProps.language !== this.props.language
        ) {
            let dataSelect = this.builDataInputSelect(this.props.allDoctors);
            this.setState({
                allDoctors: dataSelect,
            });
        }
        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            this.setState({
                rangeTime: this.props.allScheduleTime,
            });
        }
    }

    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor });
    };

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0],
        });
    };

    render() {
        let { rangeTime } = this.state;
        let { language } = this.props;
        return (
            <React.Fragment>
                <div className="manage-schedule-container">
                    <div className="m-s-title">
                        <FormattedMessage id={"manage-schedule.title"} />
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-6">
                                <lable>
                                    <FormattedMessage
                                        id={"manage-schedule.choose-doctor"}
                                    />
                                </lable>
                                <Select
                                    value={this.state.selectedDoctor}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.allDoctors}
                                />
                            </div>
                            <div className="col-6">
                                <label>
                                    <FormattedMessage
                                        id={"manage-schedule.choose-date"}
                                    />
                                </label>
                                <DatePicker
                                    onChange={this.handleOnChangeDatePicker}
                                    className="form-control"
                                    value={this.state.currentDate}
                                    minDate={new Date()}
                                />
                            </div>
                            <div className="col-12 pick-hour-container">
                                {rangeTime &&
                                    rangeTime.length > 0 &&
                                    rangeTime.map((item, index) => {
                                        return (
                                            <button
                                                className="btn-schedule"
                                                key={index}
                                            >
                                                {language === LANGUAGES.VI
                                                    ? item.valueVi
                                                    : item.valueEn}
                                            </button>
                                        );
                                    })}
                            </div>
                            <div className="col-12">
                                <button className="btn btn-primary">
                                    <FormattedMessage
                                        id={"manage-schedule.save"}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allScheduleTime: state.admin.allScheduleTime,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        fetchAllcodeScheduleTime: () =>
            dispatch(actions.fetchAllcodeScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
