import React, { Component, Fragment } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";

import "./ManageDoctor.scss";
import * as actions from "../../../store/actions";
import { CRUD_ACTIONS, LANGUAGES } from "../../../utils";
import { getDetailInforDoctorService } from "../../../services/userService";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // Save to markdown table
            contentMarkdown: "",
            contentHTML: "",
            selectedDoctor: "",
            description: "",
            listDoctor: [],
            hasOldData: false,

            // Save to doctor_infor table
            listPrice: [],
            listPayment: [],
            listProvince: [],
            selectPrice: "",
            selectPayment: "",
            selectProvince: "",
            nameClinic: "",
            addressClinic: "",
            note: "",
        };
    }

    builDataInputSelect = (data, type) => {
        let result = [];
        let { language } = this.props;
        if (data && data.length > 0) {
            data.map((item, index) => {
                let object = {};
                let labelVi =
                    type === "USERS"
                        ? `${item.lastName} ${item.firstName}`
                        : item.valueVi;
                let labelEn =
                    type === "USERS"
                        ? `${item.firstName} ${item.lastName}`
                        : item.valueEn;
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object);
            });
        }
        return result;
    };

    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.getAllRequiredDoctorInfor();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (
            prevProps.listDoctor !== this.props.listDoctor ||
            prevProps.language !== this.props.language
        ) {
            let dataSelect = this.builDataInputSelect(
                this.props.listDoctor,
                "USERS"
            );
            this.setState({
                listDoctor: dataSelect,
            });
        }
        if (
            prevProps.allRequiredDoctorInfor !==
            this.props.allRequiredDoctorInfor
        ) {
            let { resPrice, resPayment, resProvince } =
                this.props.allRequiredDoctorInfor;
            let dataSelectPrice = this.builDataInputSelect(resPrice);
            let dataSelectPayment = this.builDataInputSelect(resPayment);
            let dataSelectProvince = this.builDataInputSelect(resProvince);

            console.log(
                "Data: ",
                dataSelectPrice,
                dataSelectPayment,
                dataSelectProvince
            );
            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
            });
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        });
    };

    handleSaveContentMarkdown = () => {
        let { hasOldData } = this.state;
        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            action:
                hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
        });
    };

    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor });
        let res = await getDetailInforDoctorService(selectedDoctor.value);
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;
            this.setState({
                contentMarkdown: markdown.contentMarkdown,
                contentHTML: markdown.contentHTML,
                description: markdown.description,
                hasOldData: true,
            });
        } else {
            this.setState({
                contentMarkdown: "",
                contentHTML: "",
                description: "",
                hasOldData: false,
            });
        }
    };

    handleOnChangeDesc = (event) => {
        this.setState({
            description: event.target.value,
        });
    };

    render() {
        let { hasOldData } = this.state;
        return (
            <div className="manage-doctor-container">
                <div className="manage-doctor-title">
                    <FormattedMessage id={"admin.manage-doctor.title"} />
                </div>
                <div className="more-info">
                    <div className="content-left form-group">
                        <label>
                            <FormattedMessage
                                id={"admin.manage-doctor.select-doctor"}
                            />
                        </label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctor}
                            placeholder={"Chọn bác sĩ"}
                        />
                    </div>
                    <div className="content-right form-group">
                        <label>
                            <FormattedMessage
                                id={"admin.manage-doctor.intro"}
                            />
                        </label>
                        <textarea
                            className="form-control"
                            onChange={(event) => this.handleOnChangeDesc(event)}
                            value={this.state.description}
                        ></textarea>
                    </div>
                </div>
                <div className="more-infor-extra row">
                    <div className="col-4 form-group">
                        <label>Chọn giá</label>
                        <Select
                            // value={this.state.selectedDoctor}
                            // onChange={this.handleChangeSelect}
                            options={this.state.listPrice}
                            placeholder={"Chọn giá"}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label>Chọn phương thức thanh toán</label>
                        <Select
                            // value={this.state.selectedDoctor}
                            // onChange={this.handleChangeSelect}
                            options={this.state.listPayment}
                            placeholder={"Chọn phương thức thanh toán"}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label>Chọn tỉnh thành</label>
                        <Select
                            // value={this.state.selectedDoctor}
                            // onChange={this.handleChangeSelect}
                            options={this.state.listProvince}
                            placeholder={"Chọn tỉnh thành"}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label>Tên phòng khám</label>
                        <input className="form-control" />
                    </div>
                    <div className="col-4 form-group">
                        <label>Địa chỉ phòng khám</label>
                        <input className="form-control" />
                    </div>
                    <div className="col-4 form-group">
                        <label>Note</label>
                        <input className="form-control" />
                    </div>
                </div>
                <div className="manage-doctor-editor">
                    <MdEditor
                        style={{ height: "500px" }}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>
                <div className="my-5 mx-5">
                    <button
                        className={
                            hasOldData === true
                                ? "btn btn-primary"
                                : "btn btn-warning"
                        }
                        onClick={() => this.handleSaveContentMarkdown()}
                    >
                        {hasOldData === true ? (
                            <span>
                                <FormattedMessage
                                    id={"admin.manage-doctor.save"}
                                />
                            </span>
                        ) : (
                            <span>
                                <FormattedMessage
                                    id={"admin.manage-doctor.add"}
                                />
                            </span>
                        )}
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        listDoctor: state.admin.allDoctors,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        getAllRequiredDoctorInfor: () =>
            dispatch(actions.getRequiredDoctorInfor()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
