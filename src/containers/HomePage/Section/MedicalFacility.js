import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import { withRouter } from "react-router";
import { FormattedMessage } from "react-intl";

import "./MedicalFacility.scss";
import * as actions from "../../../store/actions";
import { getAllClinic } from "../../../services/userService";

class MedicalFacility extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataClinics: [],
        };
    }

    async componentDidMount() {
        let res = await getAllClinic();
        if (res && res.errCode === 0) {
            this.setState({
                dataClinics: res.data ? res.data : [],
            });
        }
    }

    handleViewDetailClinic = (clinic) => {
        if (this.props.history) {
            this.props.history.push(`detail-clinic/${clinic.id}`);
        }
    };

    render() {
        let { dataClinics } = this.state;
        return (
            <div className="section medical-facility">
                <div className="section-container">
                    <div className="section-header">
                        <h2>
                            <FormattedMessage
                                id={"home-page.outstanding-clinic"}
                            />
                        </h2>
                        <div className="section-more">
                            <a>
                                <FormattedMessage id={"home-page.more-info"} />
                            </a>
                        </div>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            {dataClinics &&
                                dataClinics.length > 0 &&
                                dataClinics.map((item, index) => {
                                    return (
                                        <div
                                            className="section-item"
                                            key={index}
                                            onClick={() =>
                                                this.handleViewDetailClinic(
                                                    item
                                                )
                                            }
                                        >
                                            <div
                                                className="section-img medical-facility-img"
                                                style={{
                                                    backgroundImage: `url(${item.image})`,
                                                }}
                                            ></div>
                                            <h3>{item.name}</h3>
                                        </div>
                                    );
                                })}
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllSpecialty: () => dispatch(actions.fetchAllSpecialty()),
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(MedicalFacility)
);
