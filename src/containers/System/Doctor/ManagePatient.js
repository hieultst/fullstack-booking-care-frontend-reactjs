import { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import moment from "moment";

import "./ManagePatient.scss";
import DatePicker from "../../../components/Input/DatePicker";
import { getAllPatentForDoctor } from "../../../services/userService";

class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf("day").valueOf(),
            dataPatient: [],
        };
    }

    componentDidMount() {
        let { user } = this.props;
        let { currentDate } = this.state;

        let formattedDate = new Date(currentDate).getTime();
        this.getDataPatient(user, formattedDate);
    }

    getDataPatient = async (user, formattedDate) => {
        let res = await getAllPatentForDoctor({
            doctorId: user.id,
            date: formattedDate,
        });
        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data,
            });
        }
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
    }

    handleOnChangeDatePicker = (date) => {
        this.setState(
            {
                currentDate: date[0],
            },
            () => {
                let { user } = this.props;
                let { currentDate } = this.state;
                let formattedDate = new Date(currentDate).getTime();
                this.getDataPatient(user, formattedDate);
            }
        );
    };

    handleConfirm = () => {};

    handleRemedy = () => {};

    render() {
        let { language } = this.props;
        let { dataPatient } = this.state;
        return (
            <div className="manage-patient-container">
                <div className="title">Quản lý bệnh nhân khám bệnh</div>
                <div className="manage-patient-body row">
                    <div className="col-6 form-group">
                        <label>Chọn ngày khám</label>
                        <DatePicker
                            onChange={this.handleOnChangeDatePicker}
                            className="form-control"
                            value={this.state.currentDate}
                        />
                    </div>
                    <div className="col-12 table-manage-patient">
                        <table style={{ width: "100%" }}>
                            <tbody>
                                <tr>
                                    <th>STT</th>
                                    <th>Thời gian</th>
                                    <th>Họ và Tên</th>
                                    <th>Address</th>
                                    <th>Giới tính</th>
                                    <th>Actions</th>
                                </tr>
                                {dataPatient && dataPatient.length > 0 ? (
                                    dataPatient.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>
                                                    {
                                                        item.timeTypeDataPatient
                                                            .valueVi
                                                    }
                                                </td>
                                                <td>
                                                    {item.patientData.firstName}
                                                </td>
                                                <td>
                                                    {item.patientData.address}
                                                </td>
                                                <td>
                                                    {
                                                        item.patientData
                                                            .genderData.valueVi
                                                    }
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn btn-primary"
                                                        onClick={() =>
                                                            this.handleConfirm()
                                                        }
                                                    >
                                                        Xác nhận
                                                    </button>
                                                    <button
                                                        className="btn btn-primary"
                                                        onClick={() =>
                                                            this.handleRemedy()
                                                        }
                                                    >
                                                        Gửi hóa đơn
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>No data</tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        user: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
