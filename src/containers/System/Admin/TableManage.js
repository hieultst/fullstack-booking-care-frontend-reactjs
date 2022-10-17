import { Component } from "react";
import { connect } from "react-redux";

import "./TableManage.scss";
import { LANGUAGES } from "../../../utils";

class TableManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }

    async componentDidMount() {}

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.data !== this.props.data) {
            this.setState({
                data: this.props.data,
            });
        }
    }

    handleEditFromParent = (data) => {
        this.props.handleEditFromParent(data);
    };

    handleDelete = (data) => {
        this.props.handleDelete(data);
    };

    render() {
        let { titleVi, titleEn, language, data } = this.props;

        return (
            <>
                <table className="table-manage-container">
                    <tbody>
                        <tr>
                            {language === LANGUAGES.VI
                                ? titleVi.map((item, index) => {
                                      return <th key={index}>{item}</th>;
                                  })
                                : titleEn.map((item, index) => {
                                      return <th key={index}>{item}</th>;
                                  })}
                        </tr>
                        {data &&
                            data.length > 0 &&
                            data.map((item, index) => {
                                return (
                                    <tr
                                        key={index}
                                        onClick={() => {
                                            this.handleEditFromParent(item);
                                        }}
                                    >
                                        <td>{index + 1}</td>
                                        <td>{item.nameVi}</td>
                                        <td>{item.nameEn}</td>
                                        <td>
                                            <button
                                                className="btn btn-edit"
                                                onClick={() => {
                                                    this.handleEditFromParent(
                                                        item
                                                    );
                                                }}
                                            >
                                                <i className="fas fa-pencil-alt"></i>
                                            </button>
                                            <button
                                                className="btn btn-delete"
                                                onClick={() => {
                                                    this.handleDelete(item);
                                                }}
                                            >
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(TableManage);
