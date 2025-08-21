import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
  Link,
  useParams,
} from "react-router-dom";
import { FormControl, InputLabel, Select, Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import NativeSelect from "@mui/material/NativeSelect";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import MDBox from "Admin/components/MDBox";
import MDInput from "Admin/components/MDInput";
import MDTypography from "Admin/components/MDTypography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import MDSnackbar from "Admin/components/MDSnackbar";
import { FaEye } from "react-icons/fa";
import DashboardLayout from "Admin/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "Admin/examples/Navbars/DashboardNavbar";
import Footer from "Admin/examples/Footer";
import DataTable from "Admin/examples/Tables/DataTable";
import MDPagination from "Admin/components/MDPagination";
import Icon from "@mui/material/Icon";
import MDAvatar from "Admin/components/MDAvatar";
import MDBadge from "Admin/components/MDBadge";
import { Api } from "Api/Api";
import Bankdetails_Model from "../model/bankdetails_model";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { Modal } from "@mui/material";
const base_url = process.env.REACT_APP_BASE_URL;
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function Teacher_Course_Details() {
  const navigate = useNavigate();
  const { teacher_id } = useParams();
  const [userData, setUserData] = useState([]);
  const [bankDetails, setBankDetails] = useState([]);
  const [teacherDetails, setTeacherDetails] = useState([]);
  const [adhaarImages, setAdhaarImages] = useState([]);
  const [userUpdatetatus, setUpdateDataStatus] = useState([]);
  const [projectupdateId, setProjectUpdateId] = useState([]);
  const [teacherData, setTeacherData] = useState([]);
  const [total_rows, setTotal_rows] = useState("");
  const [per_page, setPer_page] = useState("");
  const [current_page, setCurrentpage] = useState("");
  const [prev_page_url, setPrevpageurl] = useState("");
  const [searchText, setSearchText] = useState("");
  const [error, setErrors] = useState("");
  const [pagenumberStatusupdate, setPagenumberStatusupdate] = useState("");
  const [updatestatusDialogOpen, setUpdatestatusDialogOpen] = useState(false);
  const [successSB, setSuccessSB] = useState(false);
  const [descriptionsModelShow, setDescriptionsModelShow] = useState(false);
  const [DescriptionsData, setDescriptionsData] = useState({});
  const [Short, setShort] = React.useState("All");
  const [approvalStatus, setApprovalStatus] = useState("pending");
  const [selectedPaymentType, setSelectedPaymentType] = useState("Select Payment Type");
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [isAdhaarModalOpen, setIsAdhaarModalOpen] = useState(false); // Modal state
  const [rejectMessage, setRejectMessage] = useState("");
  const [defaultCheck, setDefaultCheck] = useState("");
  const [openUserId, setOpenUserId] = useState(null);

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);

  const fetchData = async () => {
    try {
      const response = await Api.getCoursesByTeacherId(teacher_id);

      if (response && response.Courses.data && Array.isArray(response.Courses.data)) {
        const datas = response.Courses.data;
        const modifiedData = datas.map((user) => {
          return {
            _id: user._id,
            profile_pic: user.teacher.profile_pic,
            full_name: user.teacher.full_name,
            email: user.teacher.email,
            mobile: user.teacher.mobile,
            education: user.teacher.education,
            experience: user.teacher.experience,
            expertise: user.teacher.expertise,
            about_me: user.teacher.about_me,
            datetime: user.teacher.datetime,
            category_name: user.category_name,
            subcategory_name: user.subcategory_name,
            startTime: user.startTime,
            endTime: user.endTime,
            type: user.type,
            createdAt: user.createdAt,
          };
        });
        setUserData(modifiedData);
      } else {
        console.error("Invalid API response format:", response);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchBankDetails = async (teacher_id) => {
    try {
      const response = await Api.getBankDetailsAdmin(teacher_id);
      if (response && response.bankDetails) {
        const bankinfo = response.bankDetails;

        // Extract required fields or manipulate data as needed
        const modifiedData = {
          _id: bankinfo._id,
          accountNumber: bankinfo.accountNumber,
          bankAddress: bankinfo.bankAddress,
          bankName: bankinfo.bankName,
          ifscCode: bankinfo.ifscCode,
          datetime: bankinfo.datetime,
        };

        setBankDetails([modifiedData]); // Assuming setBankDetails expects an array
      } else {
        console.error("Invalid API response format:", response);
      }
    } catch (error) {
      console.error("Error fetching teacher payment status:", error);
    }
  };

  const fetchTeacherDetails = async (teacher_id) => {
    try {
      const response = await Api.getTeacherProfileDataByTeacherId(teacher_id);

      if (response && response.user) {
        const teacherInfo = response.user;
        const teacherInfoArray = [teacherInfo];
        setTeacherData(teacherInfoArray);

        // Extract required fields or manipulate data as needed
        const modifiedData = {
          teacherInfo: teacherInfo.teacherDocuments,
        };
        const adhaarImage = {
          teacherAdhaarImages: teacherInfo.addharImages,
        };
        setApprovalStatus(teacherInfo.verifyStatus);
        setRejectMessage(teacherInfo.reject_msg);
        setTeacherDetails([modifiedData]); // Assuming setBankDetails expects an array
        setAdhaarImages([adhaarImage]);
        setDefaultCheck(teacherInfo.deleted_at);
      } else {
        console.error("Invalid API response format:", response);
      }
    } catch (error) {
      console.error("Error fetching teacher payment status:", error);
    }
  };

  const handleCloseLogoutDialog = () => {
    setUpdatestatusDialogOpen(false);
  };

  const handleUpdatestatus = () => {
    setUpdatestatusDialogOpen(false);
    Api.StatusUpdateProject(projectupdateId, userUpdatetatus)
      .then((response) => {
        if (response.errors) {
          setErrors(response.errors);
        }
        if (response.status == true) {
          openSuccessSB();
        } else {
          setErrors(response.errors);
        }
      })
      .catch((error) => {
        setErrors(error);
      });
    fetchData(pagenumberStatusupdate, searchText);
  };

  const handleClose = () => {
    setDescriptionsModelShow(false);
  };
  const descriptionShow = async (description) => {
    try {
      const _id = description;
      const response = await Api.getBankDetailsAdmin(_id);
      if (response) {
        setDescriptionsData(response.bankDetails);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setDescriptionsModelShow(true);
  };

  const totalPages = Math.ceil(total_rows / per_page);
  const maxPageNumbers = 5;
  const currentPage = current_page;
  const startPage = Math.max(1, currentPage - Math.floor(maxPageNumbers / 2));
  const endPage = Math.min(totalPages, startPage + maxPageNumbers - 1);

  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  useEffect(() => {
    fetchData();
    fetchBankDetails(teacher_id); // Initial fetch of bank details
    fetchTeacherDetails(teacher_id);
  }, []);

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="User Status Update"
      content={"User Status Update Successfully"}
      dateTime="0 Sec ago"
      open={successSB}
      onClose={closeSuccessSB}
      close={closeSuccessSB}
      bgWhite
    />
  );

  if (successSB) {
    setTimeout(() => {
      setSuccessSB(false);
      closeSuccessSB();
    }, 4000);
  }

  const handleProfileRedirect = (user_id) => {
    window.open(`/Website-user-profile-view/${user_id}`, "_blank");
  };

  const UserAdminStatusUpdate = async () => {
    try {
      const response = await Api.UserAdminStatus(teacher_id);
      console.log(response);
      if (response) {
        setSuccessSB(true);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleMobileChange = (event, userId) => {
    const newUserData = userData.map((user) => {
      if (user._id === userId) {
        return { ...user, mobile: event.target.value };
      }
      return user;
    });
    setUserData(newUserData);
  };

  const handleMobileUpdate = async (UserId, mobile) => {
    try {
      const response = await Api.UpdateMobileAdmin(UserId, mobile);
      alert(response.message);
      const updatedUserData = userData.map((user) => {
        if (user._id === UserId) {
          return { ...user, mobile: mobile };
        }
        return user;
      });
    } catch (error) {
      console.error("Error updating mobile number:", error);
    }
  };

  const handleVerifyClick = async () => {
    try {
      // Prepare the payload based on the selected approval status
      const payload = {
        teacher_id,
        approvalStatus,
        selectedPaymentType,
      };

      // Include the rejectMessage only if the status is "rejected"
      if (approvalStatus === "rejected") {
        payload.reject_msg = rejectMessage;
      }

      // Make the API call
      const response = await Api.updateTeacherStatus(payload);

      if (response) {
        setSuccessSB(true);
        navigate("/teacher-tables");
      }
    } catch (error) {
      console.error("Error updating teacher status:", error);
    }
  };

  // Function to open the modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Function to open the modal
  const handleOpenAdhaarModal = () => {
    setIsAdhaarModalOpen(true);
  };

  // Function to close the modal
  const handleCloseAdhaarModal = () => {
    setIsAdhaarModalOpen(false);
  };

  const charLimit = 70;
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Teacher Courses List
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <MDBox pt={3}>
                  {userData.length === 0 ? (
                    <p style={{ textAlign: "center", fontWeight: "500", paddingBottom: "10px" }}>
                      No Data Found
                    </p>
                  ) : (
                    <>
                      <Typography
                        style={{ textAlign: "center", marginBottom: "50px", fontWeight: "bold" }}
                      >
                        {userData[0].full_name} Courses
                      </Typography>
                      <DataTable
                        table={{
                          columns: [
                            { Header: "Category_Name", accessor: "Category_Name", align: "left" },
                            {
                              Header: "Subcategory_Name",
                              accessor: "Subcategory_Name",
                              align: "left",
                            },
                            { Header: "Type", accessor: "Type", align: "center" },
                            { Header: "StartTime", accessor: "StartTime", align: "center" },
                            { Header: "EndTime", accessor: "EndTime", align: "center" },

                            { Header: "CreatedAt", accessor: "CreatedAt", align: "center" },
                          ],
                          rows: userData.map((user) => ({
                            Category_Name: (
                              <MDTypography
                                component="a"
                                href="#"
                                variant="caption"
                                color="text"
                                fontWeight="medium"
                              >
                                {user.category_name}
                              </MDTypography>
                            ),
                            Subcategory_Name: (
                              <MDTypography
                                component="a"
                                variant="caption"
                                color="text"
                                fontWeight="medium"
                              >
                                {user.subcategory_name}
                              </MDTypography>
                            ),
                            Type: (
                              <MDTypography
                                component="a"
                                variant="caption"
                                color="text"
                                fontWeight="medium"
                              >
                                {user.type}
                              </MDTypography>
                            ),
                            StartTime: (
                              <MDTypography
                                component="a"
                                variant="caption"
                                color="text"
                                fontWeight="medium"
                              >
                                {user.startTime}
                              </MDTypography>
                            ),
                            EndTime: (
                              <MDTypography
                                component="a"
                                variant="caption"
                                color="text"
                                fontWeight="medium"
                              >
                                {user.endTime}
                              </MDTypography>
                            ),
                            CreatedAt: (
                              <MDTypography
                                component="a"
                                variant="caption"
                                color="text"
                                fontWeight="medium"
                              >
                                {user.createdAt}
                              </MDTypography>
                            ),
                          })),
                        }}
                        isSorted={false}
                        entriesPerPage={false}
                        showTotalEntries={false}
                        noEndBorder
                      />
                    </>
                  )}
                </MDBox>
              </MDBox>

              <MDBox pt={3}>
                <MDBox pt={3}>
                  {teacherData.length === 0 ? (
                    <p style={{ textAlign: "center", fontWeight: "500", paddingBottom: "10px" }}>
                      No Data Found
                    </p>
                  ) : (
                    <>
                      <Typography
                        style={{ textAlign: "center", marginBottom: "50px", fontWeight: "bold" }}
                      >
                        {teacherData[0].full_name} Details
                      </Typography>
                      <DataTable
                        table={{
                          columns: [
                            { Header: "Full_Name", accessor: "Full_Name", align: "left" },
                            {
                              Header: "Mobile",
                              accessor: "Mobile",
                              align: "left",
                            },
                            { Header: "Email", accessor: "Email", align: "center" },
                            { Header: "About", accessor: "About", align: "center" },
                            { Header: "Education", accessor: "Education", align: "center" },
                            { Header: "Experience", accessor: "Experience", align: "center" },
                            { Header: "Expertise", accessor: "Expertise", align: "center" },
                          ],
                          rows: teacherData.map((user) => ({
                            Full_Name: (
                              <MDTypography
                                component="a"
                                href="#"
                                variant="caption"
                                color="text"
                                fontWeight="medium"
                              >
                                {user.full_name}
                              </MDTypography>
                            ),
                            Mobile: (
                              <MDTypography
                                component="a"
                                variant="caption"
                                color="text"
                                fontWeight="medium"
                              >
                                {user.mobile}
                              </MDTypography>
                            ),
                            Email: (
                              <MDTypography
                                component="a"
                                variant="caption"
                                color="text"
                                fontWeight="medium"
                              >
                                {user.email}
                              </MDTypography>
                            ),
                            About: (
                              <div key={user._id}>
                                <MDTypography
                                  component="a"
                                  variant="caption"
                                  color="text"
                                  fontWeight="medium"
                                >
                                  {user.about_me.length > charLimit
                                    ? `${user.about_me.substring(0, charLimit)}... `
                                    : user.about_me}
                                  {user.about_me.length > charLimit && (
                                    <span
                                      style={{ color: "blue", cursor: "pointer" }}
                                      onClick={() => setOpenUserId(user.id)}
                                    >
                                      Read More
                                    </span>
                                  )}
                                </MDTypography>

                                {/* Modal for Full "About Me" */}
                                <Dialog
                                  open={openUserId === user.id}
                                  onClose={() => setOpenUserId(null)}
                                  fullWidth
                                  maxWidth="sm"
                                >
                                  <DialogTitle>About</DialogTitle>
                                  <DialogContent>
                                    <MDTypography variant="body1" color="text">
                                      {user.about_me}
                                    </MDTypography>
                                  </DialogContent>
                                  <DialogActions>
                                    <Button onClick={() => setOpenUserId(null)} color="primary">
                                      Close
                                    </Button>
                                  </DialogActions>
                                </Dialog>
                              </div>
                            ),
                            Education: (
                              <MDTypography
                                component="a"
                                variant="caption"
                                color="text"
                                fontWeight="medium"
                              >
                                {user.education}
                              </MDTypography>
                            ),
                            Experience: (
                              <MDTypography
                                component="a"
                                variant="caption"
                                color="text"
                                fontWeight="medium"
                              >
                                {user.experience}
                              </MDTypography>
                            ),
                            Expertise: (
                              <MDTypography
                                component="a"
                                variant="caption"
                                color="text"
                                fontWeight="medium"
                              >
                                {user.expertise}
                              </MDTypography>
                            ),
                          })),
                        }}
                        isSorted={false}
                        entriesPerPage={false}
                        showTotalEntries={false}
                        noEndBorder
                      />
                    </>
                  )}
                </MDBox>
              </MDBox>

              <MDBox pt={3}>
                <MDBox pt={3}>
                  {bankDetails.length === 0 ? (
                    <p style={{ textAlign: "center", fontWeight: "500", paddingBottom: "10px" }}>
                      No Data Found
                    </p>
                  ) : (
                    <>
                      <Typography
                        style={{ textAlign: "center", marginBottom: "50px", fontWeight: "bold" }}
                      >
                        Bank Details
                      </Typography>
                      <DataTable
                        table={{
                          columns: [
                            {
                              Header: "Account_Number",
                              accessor: "Account_Number",

                              align: "left",
                            },

                            { Header: "Bank_Address", accessor: "Bank_Address", align: "center" },
                            {
                              Header: "Bank_Name",
                              accessor: "Bank_Name",
                              align: "center",
                            },
                            { Header: "Ifsc_Code", accessor: "Ifsc_Code", align: "center" },
                            { Header: "CreatedAt", accessor: "CreatedAt", align: "center" },
                          ],
                          rows: bankDetails.map((bankinfo) => ({
                            Account_Number: (
                              <MDTypography
                                component="a"
                                href="#"
                                variant="caption"
                                color="text"
                                fontWeight="medium"
                              >
                                {bankinfo.accountNumber}
                              </MDTypography>
                            ),
                            Bank_Address: (
                              <MDTypography
                                component="a"
                                href="#"
                                variant="caption"
                                color="text"
                                fontWeight="medium"
                              >
                                {bankinfo.bankAddress}
                              </MDTypography>
                            ),
                            Bank_Name: (
                              <MDTypography
                                component="a"
                                variant="caption"
                                color="text"
                                fontWeight="medium"
                              >
                                {bankinfo.bankName}
                              </MDTypography>
                            ),
                            Ifsc_Code: (
                              <MDTypography
                                component="a"
                                variant="caption"
                                color="text"
                                fontWeight="medium"
                              >
                                {bankinfo.ifscCode}
                              </MDTypography>
                            ),
                            CreatedAt: (
                              <MDTypography
                                component="a"
                                variant="caption"
                                color="text"
                                fontWeight="medium"
                              >
                                {bankinfo.datetime}
                              </MDTypography>
                            ),
                          })),
                        }}
                        isSorted={false}
                        entriesPerPage={false}
                        showTotalEntries={false}
                        noEndBorder
                      />
                    </>
                  )}
                </MDBox>
              </MDBox>

              <MDBox pt={3}>
                <MDBox pt={3}>
                  {teacherDetails.length === 0 ? (
                    <p style={{ textAlign: "center", fontWeight: "500", paddingBottom: "10px" }}>
                      No Data Found
                    </p>
                  ) : (
                    <>
                      <Typography
                        style={{ textAlign: "center", marginBottom: "50px", fontWeight: "bold" }}
                      >
                        Teacher Document
                      </Typography>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          gap: "20px",
                          marginBottom: "30px",
                        }}
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleOpenModal} // Open modal on button click
                          style={{ textTransform: "capitalize", fontSize: "16px", color: "#fff" }}
                        >
                          View All Documents
                        </Button>

                        <Button
                          variant="contained"
                          color="success"
                          onClick={handleOpenAdhaarModal} // Open modal on button click
                          style={{ textTransform: "capitalize", fontSize: "16px" }}
                        >
                          View Aadhaar Images
                        </Button>
                      </div>
                      {/* Modal to show all Aadhaar images */}
                      <Modal
                        open={isAdhaarModalOpen}
                        onClose={handleCloseAdhaarModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <MDBox
                          sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            bgcolor: "background.paper",
                            border: "2px solid #000",
                            boxShadow: 24,
                            p: 4,
                            textAlign: "center",
                            width: "500px", // Ensuring the same width for both modals
                            height: "auto",
                            maxHeight: "90vh",
                            overflowY: "auto", // Prevents content overflow
                            borderRadius: "8px",
                          }}
                        >
                          <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                            sx={{ marginBottom: "20px" }}
                          >
                            All Teacher Aadhaar Images
                          </Typography>

                          {/* Swiper slider */}
                          <Swiper
                            navigation
                            pagination={{ clickable: true }}
                            modules={[Navigation, Pagination]}
                            style={{ width: "100%", maxWidth: "100%", height: "auto" }}
                          >
                            {adhaarImages[0].teacherAdhaarImages.map((document, index) => (
                              <SwiperSlide key={document._id}>
                                <img
                                  src={`${base_url}/${document.addharimage}`}
                                  alt={`Teacher Document ${index + 1}`}
                                  style={{
                                    width: "100%",
                                    height: "auto",
                                    borderRadius: "8px",
                                  }}
                                />
                              </SwiperSlide>
                            ))}
                          </Swiper>

                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleCloseAdhaarModal}
                            sx={{
                              marginTop: "20px",
                              textTransform: "capitalize",
                              fontSize: "14px",
                              color: "white",
                              display: "block",
                              marginLeft: "auto",
                              marginRight: "auto",
                            }}
                          >
                            <div style={{ color: "white" }}>Close</div>
                          </Button>
                        </MDBox>
                      </Modal>

                      {/* Modal to show all Teacher Documents */}
                      <Modal
                        open={isModalOpen}
                        onClose={handleCloseModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <MDBox
                          sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            bgcolor: "background.paper",
                            border: "2px solid #000",
                            boxShadow: 24,
                            p: 4,
                            textAlign: "center",
                            width: "500px", // Ensuring the same width as the Aadhaar modal
                            height: "auto",
                            maxHeight: "90vh",
                            overflowY: "auto", // Prevents content overflow
                            borderRadius: "8px",
                          }}
                        >
                          <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                            sx={{ marginBottom: "20px" }}
                          >
                            All Teacher Documents
                          </Typography>

                          {/* Swiper for displaying teacher images */}
                          <Swiper
                            navigation
                            pagination={{ clickable: true }}
                            modules={[Navigation, Pagination]}
                            style={{ width: "100%", maxWidth: "100%", height: "auto" }}
                          >
                            {teacherDetails[0].teacherInfo.map((document, index) => (
                              <SwiperSlide key={document._id}>
                                <div style={{ textAlign: "center" }}>
                                  <img
                                    src={`${base_url}/${document.image}`}
                                    alt={`Teacher Document ${index + 1}`}
                                    style={{
                                      width: "100%",
                                      height: "auto",
                                      borderRadius: "8px",
                                    }}
                                  />
                                </div>
                              </SwiperSlide>
                            ))}
                          </Swiper>

                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleCloseModal}
                            sx={{
                              marginTop: "20px",
                              textTransform: "capitalize",
                              fontSize: "14px",
                              color: "white",
                              display: "block",
                              marginLeft: "auto",
                              marginRight: "auto",
                            }}
                          >
                            <div style={{ color: "white" }}>Close</div>
                          </Button>
                        </MDBox>
                      </Modal>

                      <Typography
                        style={{
                          textAlign: "center",
                          marginBottom: "50px",
                          fontWeight: "bold",
                          fontSize: "18px",
                          color: "#333",
                        }}
                      >
                        {/* Flex container */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "20px",
                            flexWrap: "wrap", // Ensure responsiveness on smaller screens
                          }}
                        >
                          <select
                            value={approvalStatus}
                            onChange={(event) => setApprovalStatus(event.target.value)}
                            style={{
                              padding: "12px",
                              fontSize: "16px",
                              width: "100%",
                              maxWidth: "300px",
                              border: "1px solid #ccc",
                              borderRadius: "4px",
                              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                              outline: "none",
                              boxSizing: "border-box",
                            }}
                          >
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="not-approved">Not Approved</option>
                            <option value="rejected">Rejected</option>
                          </select>

                          {approvalStatus === "rejected" && (
                            <TextField
                              id="outlined-basic"
                              label="Rejected Message"
                              variant="outlined"
                              value={rejectMessage}
                              onChange={(event) => setRejectMessage(event.target.value)}
                              style={{ maxWidth: "300px", width: "100%" }}
                            />
                          )}

                          <Select
                            className="paymentSelect"
                            style={{
                              height: "50px",
                              width: "100%",
                              maxWidth: "300px",
                              border: "1px solid #ccc",
                              borderRadius: "4px",
                              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                            }}
                            value={selectedPaymentType}
                            onChange={(e) => setSelectedPaymentType(e.target.value)}
                          >
                            <MenuItem value="Select Payment Type">Select Payment Type</MenuItem>
                            <MenuItem value="master">Master</MenuItem>
                            <MenuItem value="advance">Advance</MenuItem>
                          </Select>

                          <MDTypography
                            component="a"
                            variant="caption"
                            color="text"
                            fontWeight="medium"
                          >
                            <FormGroup>
                              <FormControlLabel
                                control={
                                  <Switch
                                    defaultChecked={defaultCheck == null}
                                    onChange={(event) => UserAdminStatusUpdate()}
                                    inputProps={{ "aria-label": "controlled" }}
                                  />
                                }
                              />
                            </FormGroup>
                          </MDTypography>

                          <Button
                            variant="contained"
                            color="primary"
                            onClick={handleVerifyClick}
                            style={{
                              padding: "10px 20px",
                              fontSize: "16px",
                              borderRadius: "4px",
                              textTransform: "capitalize",
                              color: "#fff",
                            }}
                          >
                            Verify
                          </Button>
                        </div>
                      </Typography>
                    </>
                  )}
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      {renderSuccessSB}
      <Footer />
      {descriptionsModelShow && (
        <Bankdetails_Model
          descriptionsModelShow={descriptionsModelShow}
          handleClose={handleClose}
          DescriptionsData={DescriptionsData}
        />
      )}
      ;
      <Dialog
        open={updatestatusDialogOpen}
        onClose={handleCloseLogoutDialog}
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-description"
      >
        <DialogTitle id="logout-dialog-title">Update Status</DialogTitle>
        <DialogContent>
          <DialogContentText id="logout-dialog-description">
            Are you sure you want to Update Status?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLogoutDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdatestatus} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
}

export default Teacher_Course_Details;
