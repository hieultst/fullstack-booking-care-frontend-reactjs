import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";

import "./Specialty.scss";
import { getAllSpecialty } from "../../../services/userService";

class Specialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSpecialty: [],
        };
    }
    async componentDidMount() {
        let res = await getAllSpecialty();
        console.log("Check res: ", res);

        if (res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res.data ? res.data : [],
            });
        }
    }
    render() {
        let { dataSpecialty } = this.state;
        return (
            <div className="section specialty">
                <div className="section-container">
                    <div className="section-header">
                        <h2>
                            <FormattedMessage
                                id={"home-page.specialty-popular"}
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
                            {dataSpecialty &&
                                dataSpecialty.length > 0 &&
                                dataSpecialty.map((item, index) => {
                                    return (
                                        <div
                                            className="section-item"
                                            key={index}
                                        >
                                            <div
                                                className="section-img specialty-img"
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
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
