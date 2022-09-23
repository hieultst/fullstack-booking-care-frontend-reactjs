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
            selectedPrice: "",
            selectedPayment: "",
            selectedProvince: "",
            nameClinic: "",
            addressClinic: "",
            note: "",
        };
    }

    builDataInputSelect = (data, type) => {
        let result = [];
        let { language } = this.props;
        if (data && data.length > 0) {
            if (type === "USERS") {
                data.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.lastName} ${item.firstName}`;
                    let labelEn = `${item.firstName} ${item.lastName}`;
                    object.label =
                        language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.id;
                    result.push(object);
                });
            }
            if (type === "PRICE") {
                data.map((item, index) => {
                    let object = {};
                    let labelVi = `${new Intl.NumberFormat().format(
                        item.valueVi
                    )} VNĐ`;
                    let labelEn = `${item.valueEn} USD`;
                    object.label =
                        language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object);
                });
            }
            if (type === "PAYMENT" || type === "PROVINCE") {
                data.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi}`;
                    let labelEn = `${item.valueEn}`;
                    object.label =
                        language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object);
                });
            }
        }
        return result;
    };

    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.getAllRequiredDoctorInfor();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listDoctor !== this.props.listDoctor) {
            let dataSelect = this.builDataInputSelect(
                this.props.listDoctor,
                "USERS"
            );
            this.setState({
                listDoctor: dataSelect,
            });
        }
        if (prevProps.language !== this.props.language) {
            let { resPrice, resPayment, resProvince } =
                this.props.allRequiredDoctorInfor;
            let dataSelect = this.builDataInputSelect(
                this.props.listDoctor,
                "USERS"
            );
            let dataSelectPrice = this.builDataInputSelect(resPrice, "PRICE");
            let dataSelectPayment = this.builDataInputSelect(
                resPayment,
                "PAYMENT"
            );
            let dataSelectProvince = this.builDataInputSelect(
                resProvince,
                "PROVINCE"
            );
            this.setState({
                listDoctor: dataSelect,
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
            });
        }
        if (
            prevProps.allRequiredDoctorInfor !==
            this.props.allRequiredDoctorInfor
        ) {
            let { resPrice, resPayment, resProvince } =
                this.props.allRequiredDoctorInfor;
            let dataSelectPrice = this.builDataInputSelect(resPrice, "PRICE");
            let dataSelectPayment = this.builDataInputSelect(
                resPayment,
                "PAYMENT"
            );
            let dataSelectProvince = this.builDataInputSelect(
                resProvince,
                "PROVINCE"
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

            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
        });
    };

    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor });
        let { listPayment, listPrice, listProvince } = this.state;
        let res = await getDetailInforDoctorService(selectedDoctor.value);
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;

            let addressClinic = "",
                nameClinic = "",
                note = "",
                paymentId = "",
                priceId = "",
                provinceId = "",
                selectedPayment = "",
                selectedPrice = "",
                selectedProvince = "";

            if (res.data.Doctor_infor) {
                addressClinic = res.data.Doctor_infor.addressClinic;
                nameClinic = res.data.Doctor_infor.nameClinic;
                note = res.data.Doctor_infor.note;
                paymentId = res.data.Doctor_infor.paymentId;
                priceId = res.data.Doctor_infor.priceId;
                provinceId = res.data.Doctor_infor.provinceId;

                selectedPayment = listPayment.find((item) => {
                    return item && item.value === paymentId;
                });
                selectedPrice = listPrice.find((item) => {
                    return item && item.value === priceId;
                });
                selectedProvince = listProvince.find((item) => {
                    return item && item.value === provinceId;
                });
            }
            this.setState({
                contentMarkdown: markdown.contentMarkdown,
                contentHTML: markdown.contentHTML,
                description: markdown.description,
                hasOldData: true,
                addressClinic: addressClinic,
                nameClinic: nameClinic,
                note: note,
                selectedPayment: selectedPayment,
                selectedPrice: selectedPrice,
                selectedProvince: selectedProvince,
            });
        } else {
            this.setState({
                contentMarkdown: "",
                contentHTML: "",
                description: "",
                hasOldData: false,
                addressClinic: "",
                nameClinic: "",
                note: "",
            });
        }
    };

    handleChangeSelectDoctorInfor = async (selectedDoctor, name) => {
        let stateName = name.name;
        let stateCopy = { ...this.state };
        stateCopy[stateName] = selectedDoctor;
        this.setState({
            ...stateCopy,
        });
    };

    handleOnChangeText = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy,
        });
    };

    render() {
        let { hasOldData } = this.state;
        return (
            <div className="manage-doctor-container">
                <div className="title">
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
                            placeholder={
                                <FormattedMessage
                                    id={"admin.manage-doctor.select-doctor"}
                                />
                            }
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
                            onChange={(event) =>
                                this.handleOnChangeText(event, "description")
                            }
                            value={this.state.description}
                        ></textarea>
                    </div>
                </div>
                <div className="more-infor-extra row">
                    <div className="col-4 form-group">
                        <label>
                            <FormattedMessage
                                id={"admin.manage-doctor.price"}
                            />
                        </label>
                        <Select
                            value={this.state.selectedPrice}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listPrice}
                            placeholder={
                                <FormattedMessage
                                    id={"admin.manage-doctor.price"}
                                />
                            }
                            name={"selectedPrice"}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label>
                            <FormattedMessage
                                id={"admin.manage-doctor.payment"}
                            />
                        </label>
                        <Select
                            value={this.state.selectedPayment}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listPayment}
                            placeholder={
                                <FormattedMessage
                                    id={"admin.manage-doctor.payment"}
                                />
                            }
                            name={"selectedPayment"}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label>
                            <FormattedMessage
                                id={"admin.manage-doctor.province"}
                            />
                        </label>
                        <Select
                            value={this.state.selectedProvince}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listProvince}
                            placeholder={
                                <FormattedMessage
                                    id={"admin.manage-doctor.province"}
                                />
                            }
                            name={"selectedProvince"}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label>
                            <FormattedMessage
                                id={"admin.manage-doctor.name-clinic"}
                            />
                        </label>
                        <input
                            className="form-control"
                            onChange={(event) =>
                                this.handleOnChangeText(event, "nameClinic")
                            }
                            value={this.state.nameClinic}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label>
                            <FormattedMessage
                                id={"admin.manage-doctor.address-clinic"}
                            />
                        </label>
                        <input
                            className="form-control"
                            onChange={(event) =>
                                this.handleOnChangeText(event, "addressClinic")
                            }
                            value={this.state.addressClinic}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label>
                            <FormattedMessage id={"admin.manage-doctor.note"} />
                        </label>
                        <input
                            className="form-control"
                            onChange={(event) =>
                                this.handleOnChangeText(event, "note")
                            }
                            value={this.state.note}
                        />
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
