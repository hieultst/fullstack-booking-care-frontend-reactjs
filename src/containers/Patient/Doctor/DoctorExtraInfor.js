import { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

import "./DoctorExtraInfor.scss";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";

class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: false,
        };
    }

    componentDidMount() {
        let { language } = this.props;

        this.setState({});
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
    }

    showHideDetailInfor = (status) => {
        this.setState({
            isShowDetailInfor: status,
        });
    };

    render() {
        let { language } = this.props;
        let { isShowDetailInfor } = this.state;
        return (
            <div className="doctor-extra-infor-container">
                <div className="content-up">
                    <div className="text-title">ĐỊA CHỈ KHÁM</div>
                    <div className="name-clinic">
                        Phòng khám Chuyên khoa Da Liễu
                    </div>
                    <div className="address-clinic">
                        207 Phố Huế - Hai Bà Trưng - Hà Nội
                    </div>
                </div>
                <div className="content-down">
                    {isShowDetailInfor === false ? (
                        <div>
                            <span className="text-price">GIÁ KHÁM:</span>{" "}
                            300.000<sup>đ</sup>.
                            <span
                                className="show-detail-btn"
                                onClick={() => this.showHideDetailInfor(true)}
                            >
                                Xem chi tiết
                            </span>
                        </div>
                    ) : (
                        <>
                            <div className="text-price">GIÁ KHÁM:</div>
                            <div className="detail-price">
                                <div className="detail-price-top">
                                    <div className="detail-price-head">
                                        <span>Giá khám</span>
                                        <span>
                                            300.000<sup>đ</sup>
                                        </span>
                                    </div>
                                    <p>
                                        Được ưu tiên khám trước khi đật khám qua
                                        BookingCare. Giá khám cho người nước
                                        ngoài là 30 USD
                                    </p>
                                </div>
                                <div className="detail-price-down">
                                    Người bệnh có thể thanh toán chi phí bằng
                                    hình thức tiền mặt và quẹt thẻ
                                </div>
                            </div>
                            <div className="hide-price-btn">
                                <span
                                    onClick={() =>
                                        this.showHideDetailInfor(false)
                                    }
                                >
                                    Ẩn bảng giá
                                </span>
                            </div>
                        </>
                    )}
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
