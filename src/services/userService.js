import axios from "../axios";

const handleLoginApi = (userEmail, userPassword) => {
    return axios.post("/api/login", {
        email: userEmail,
        password: userPassword,
    });
};

const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-user?id=${inputId}`);
};

const createNewUserService = (data) => {
    return axios.post("/api/create-new-user", data);
};

const deleteUserService = (userId) => {
    return axios.delete("/api/delete-user", {
        data: { id: userId },
    });
};

const editUserService = (inputData) => {
    return axios.put("/api/edit-user", inputData);
};

const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`);
};

const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`);
};

const getAllDoctors = () => {
    return axios.get("/api/get-all-doctors");
};

const saveDetailDoctorService = (data) => {
    return axios.post("/api/save-infor-doctors", data);
};

const getDetailInforDoctorService = (id) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${id}`);
};

// const getMarkdownService = (id) => {
//     return axios.get(`/api/get-markdown-by-id?doctorId=${id}`);
// };

const saveBulkScheduleDoctorService = (data) => {
    return axios.post("/api/bulk-create-schedule", data);
};

const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(
        `/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`
    );
};

const getExtraDoctorInforById = (doctorId) => {
    return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`);
};

const getProfileDoctorById = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
};

const postPatientBookingAppointment = (data) => {
    return axios.post("/api/patient-book-appointment", data);
};

const postVerifyBookAppointment = (data) => {
    return axios.post("/api/verify-book-appointment", data);
};

// Specialty
// const createNewSpecialty = (data) => {
//     return axios.post("/api/create-new-specialty", data);
// };

const createNewSpecialtyServer = (data) => {
    return axios.post("/api/create-new-specialty", data);
};

const deleteSpecialtyService = (id) => {
    return axios.delete("/api/delete-specialty", {
        data: { id: id },
    });
};

// const getAllSpecialty = () => {
//     return axios.get("/api/get-all-specialty");
// };

const getAllSpecialtyServer = () => {
    return axios.get("/api/get-all-specialty");
};

const getDetailSpecialtyById = (data) => {
    return axios.get(
        `/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`
    );
};

const editSpecialtyService = (inputData) => {
    return axios.put("/api/edit-specialty", inputData);
};

// Clinic
const createNewClinic = (data) => {
    return axios.post("/api/create-new-clinic", data);
};

const getAllClinic = () => {
    return axios.get("/api/get-all-clinic");
};

const getDetailClinicById = (data) => {
    return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`);
};

const getAllPatentForDoctor = (data) => {
    return axios.get(
        `/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`
    );
};

const postSendRemedy = (data) => {
    return axios.post(`/api/send-remedy`, data);
};

export {
    handleLoginApi,
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllCodeService,
    getTopDoctorHomeService,
    getAllDoctors,
    saveDetailDoctorService,
    getDetailInforDoctorService,
    // getMarkdownService,
    saveBulkScheduleDoctorService,
    getScheduleDoctorByDate,
    getExtraDoctorInforById,
    getProfileDoctorById,
    postPatientBookingAppointment,
    postVerifyBookAppointment,
    // Specialty
    createNewSpecialtyServer,
    deleteSpecialtyService,
    editSpecialtyService,
    getAllSpecialtyServer,
    createNewSpecialty,
    getAllSpecialty,
    getDetailSpecialtyById,
    createNewClinic,
    getAllClinic,
    getDetailClinicById,
    getAllPatentForDoctor,
    postSendRemedy,
};
