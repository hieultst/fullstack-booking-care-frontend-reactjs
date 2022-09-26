import { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { toast } from "react-toastify";

import "./ManageClinic.scss";
import { CommonUtils } from "../../../utils";
import { createNewClinic } from "../../../services/userService";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            imageBase64: "",
            address: "",
            descriptionHTML: "",
            descriptionMarkdown: "",
        };
    }

    componentDidMount() {}

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
    }

    handleOnChangeInput = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy,
        });
    };

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionMarkdown: text,
            descriptionHTML: html,
        });
    };

    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imageBase64: base64,
            });
        }
    };

    handleSaveNewClinic = async () => {
        // let res = await createNewClinic(this.state);
        // if (res && res.errCode === 0) {
        //     toast.success("Add new clinic succeed !");
        //     this.setState({
        //         name: "",
        //         imageBase64: "",
        // address: "",
        //         descriptionHTML: "",
        //         descriptionMarkdown: "",
        //     });
        // } else {
        //     toast.error("Something wrong ... !");
        //     console.log(">> ERROR: ", res);
        // }
    };

    render() {
        let { language } = this.props;

        return (
            <div className="manage-clinic-container">
                <div className="title">Quản lý phòng khám</div>
                <div className="btn-add-new-clinic">
                    <button className="btn btn-primary mb-3">Add new</button>
                </div>
                <div className="add-new-clinic row">
                    <div className="col-6 from-group">
                        <label>Tên phòng khám</label>
                        <input
                            className="form-control"
                            type="text"
                            value={this.state.name}
                            onChange={(event) =>
                                this.handleOnChangeInput(event, "name")
                            }
                        ></input>
                    </div>
                    <div className="col-6 from-group">
                        <label>Ảnh phòng khám</label>
                        <input
                            className="form-control-file"
                            type="file"
                            onChange={(event) =>
                                this.handleOnChangeImage(event)
                            }
                        ></input>
                    </div>
                    <div className="col-6 form-gourp">
                        <label>Địa chỉ phòng khám</label>
                        <input
                            className="form-control"
                            type="text"
                            value={this.state.address}
                            onChange={(event) =>
                                this.handleOnChangeInput(event, "address")
                            }
                        ></input>
                    </div>
                    <div className="col-12 my-3">
                        <MdEditor
                            style={{ height: "500px" }}
                            renderHTML={(text) => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkdown}
                        />
                    </div>
                    <div className="col-12 mb-5">
                        <button
                            className="btn btn-primary"
                            onClick={() => this.handleSaveNewClinic()}
                        >
                            Save
                        </button>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
