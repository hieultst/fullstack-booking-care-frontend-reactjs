import { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

import "./ProfileDoctor.scss";

class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevState.language) {
        }
    }

    render() {
        let { language } = this.props;

        return <>Profile Doctor</>;
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
