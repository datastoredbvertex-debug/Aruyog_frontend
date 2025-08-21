import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Select, Pagination, Typography, Box } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";

// Material Dashboard 2 React components
import MDBox from "Admin/components/MDBox";
import MDTypography from "Admin/components/MDTypography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import MDSnackbar from "Admin/components/MDSnackbar";

import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";

// Material Dashboard 2 React example components
import DashboardLayout from "Admin/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "Admin/examples/Navbars/DashboardNavbar";
import Footer from "Admin/examples/Footer";
import DataTable from "Admin/examples/Tables/DataTable";
import MDAvatar from "Admin/components/MDAvatar";
import { Api } from "Api/Api";
import Bankdetails_Model from "../model/bankdetails_model";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Modal from "@mui/material/Modal";

// Data

function teacher_tables() {
  const [userData, setUserData] = useState([]);
  const [userUpdatetatus, setUpdateDataStatus] = useState([]);
  const [projectupdateId, setProjectUpdateId] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [error, setErrors] = useState("");
  const [updatestatusDialogOpen, setUpdatestatusDialogOpen] = useState(false);
  const [successSB, setSuccessSB] = useState(false);
  const [paymentOptions, setPaymentOptions] = useState([]);
  const [descriptionsModelShow, setDescriptionsModelShow] = useState(false);
  const [DescriptionsData, setDescriptionsData] = useState({});
  const [selectedValue, setSelectedValue] = useState("");
  const [userDetail, setUserDetail] = useState([]);
  const [open, setOpen] = React.useState(false);

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    fetchData(value);
  };

  const fetchData = async (page = 1) => {
    try {
      const response = await Api.getAllTeachers(page, rowsPerPage);

      if (response && response.Teachers) {
        const modifiedData = response.Teachers.map((user) => {
          const groupPaymentType = user.payment?.groupPayment?.type ?? null;
          const groupPaymentAmount = user.payment?.groupPayment?.amount ?? 0;
          const singlePaymentType = user.payment?.singlePayment?.type ?? null;
          const singlePaymentAmount = user.payment?.singlePayment?.amount ?? 0;
          const formattedUpdatedAt = new Date(user.updatedAt).toLocaleString("en-IN", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: true,
          });
          return {
            _id: user._id,
            pic: user.profile_pic,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            mobile: user.mobile,
            datetime: formattedUpdatedAt,
            about_me: user.about_me,
            dob: user.dob,
            interest: user.interest,
            groupPaymentType: groupPaymentType,
            groupPaymentAmount: groupPaymentAmount,
            singlePaymentType: singlePaymentType,
            singlePaymentAmount: singlePaymentAmount,
            verifyStatus: user.verifyStatus,
            deleted_at: user.deleted_at,
          };
        });
        setUserData(modifiedData);
        setCurrentPage(response.current_page);
        setTotalRows(response.total_rows);
      } else {
        console.error("Invalid API response format:", response);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchPayments = async () => {
    try {
      const response = await Api.getMasterAndAdvancePayments();
      console.log(response);
      if (response && response.payments && Array.isArray(response.payments)) {
        const datas = response.payments;
        const modifiedData = datas.map((pay) => {
          return {
            _id: pay._id,
            Payment: pay.Payment,
            Type: pay.Type,
          };
        });
        setPaymentOptions(modifiedData);
      } else {
        console.error("Invalid API response format:", response);
      }
      // setPaymentOptions(response.payments);
    } catch (error) {
      console.error("Error fetching payments:", error);
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
        // Handle the error appropriately
        setErrors(error);
      });
    fetchData(pagenumberStatusupdate, searchText);
  };

  const handleClose = () => {
    setDescriptionsModelShow(false);
  };

  const handleMobileChange = (event, userId) => {
    const newValue = event.target.value;

    // केवल नंबर वाले इनपुट को चेक करें और यह सुनिश्चित करें कि यह 10 अंकों से अधिक नहीं हो
    if (/^\d*$/.test(newValue) && newValue.length <= 10) {
      const newUserData = userData.map((user) => {
        if (user._id === userId) {
          return { ...user, mobile: newValue };
        }
        return user;
      });
      setUserData(newUserData);
    }
  };

  const handleMobileUpdate = async (userId, mobile) => {
    // मोबाइल नंबर को चेक करें कि यह 10 अंकों का है या नहीं
    if (mobile.length !== 10) {
      alert("Mobile number must be exactly 10 digits.");
      return;
    }

    try {
      const response = await Api.UpdateMobileAdmin(userId, mobile);
      alert(response.message);

      // सफल अपडेट के बाद स्टेट को अपडेट करें
      const updatedUserData = userData.map((user) => {
        if (user._id === userId) {
          return { ...user, mobile: mobile };
        }
        return user;
      });

      setUserData(updatedUserData);
    } catch (error) {
      console.error("Error updating mobile number:", error);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
    fetchPayments();
  }, [currentPage]);

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
    }, 4000); // 2000 milliseconds = 2 seconds
  }

  const UserAdminStatusUpdate = async (userId) => {
    try {
      const response = await Api.UserAdminStatus(userId);
      if (response) {
        setSuccessSB(true);
        fetchData(currentPage);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // const style = {
  //   position: "absolute",
  //   top: "50%",
  //   left: "50%",
  //   transform: "translate(-50%, -50%)",
  //   width: 400,
  //   bgcolor: "background.paper",
  //   border: "2px solid #000",
  //   boxShadow: 24,
  //   p: 4,
  // };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "white", // Set background to white
    color: "black", // Set text color to black
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: "8px", // Optional: rounded corners for better UI
  };
  const handleOpenModel = async (teacher_id) => {
    try {
      const response = await Api.getTeacherProfileDataByTeacherId(teacher_id);
      console.log(response);
      // Assuming the response contains user details in a structure that you expect
      setUserDetail(response.user);
      setOpen(true);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleCloseModel = () => setOpen(false);

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
                  Teachers List
                </MDTypography>
              </MDBox>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginRight: "auto",
                  }}
                ></div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginLeft: "auto",
                  }}
                ></div>
              </div>
              <MDBox pt={3}>
                <MDBox pt={3}>
                  {userData.length === 0 ? (
                    <p style={{ textAlign: "center", fontWeight: "500", paddingBottom: "10px" }}>
                      No Data Found
                    </p>
                  ) : (
                    <>
                      <DataTable
                        table={{
                          columns: [
                            {
                              Header: "Name",
                              accessor: "author",
                              width: "10%",
                              align: "left",
                            },
                            { Header: "VerifyStatus", accessor: "VerifyStatus", align: "left" },
                            { Header: "E-Mail", accessor: "E_Mail", align: "left" },
                            { Header: "Mobile", accessor: "Mobile", align: "left" },
                            { Header: "Last_login", accessor: "created", align: "center" },
                            {
                              Header: "PaymenGroupType",
                              accessor: "PaymenGroupType",
                              align: "center",
                            },

                            //     { Header: "Active", accessor: "action", align: "center" },
                            { Header: "Detail", accessor: "Detail", align: "center" },
                            //     { Header: "Update", accessor: "Update", align: "center" },
                          ],
                          rows: userData.map((user) => ({
                            author: (
                              <Link
                                to={`/teacher-course-details/${user._id}`}
                                style={{ textDecoration: "underline !important" }}
                              >
                                <MDBox
                                  display="flex"
                                  alignItems="center"
                                  lineHeight={1}
                                  // onClick={() => handleProfileRedirect(user._id)}
                                  sx={{ cursor: "pointer" }}
                                  className="admin_user_list_name"
                                  color="#1A73E8"
                                >
                                  <MDAvatar
                                    src={user.pic}
                                    name={user.first_name}
                                    size="sm"
                                    variant="rounded"
                                    sx={{ background: "gray" }}
                                  />

                                  <MDTypography
                                    display="block"
                                    variant="button"
                                    fontWeight="medium"
                                    ml={1}
                                    lineHeight={1}
                                    color="#1A73E8"
                                  >
                                    {`${user.first_name} ${user.last_name}`}
                                  </MDTypography>
                                </MDBox>
                              </Link>
                            ),
                            E_Mail: user.email,
                            VerifyStatus: user.verifyStatus,
                            // Mobile: (
                            //   <div>
                            //     <TextField
                            //       id={`mobile-${user._id}`}
                            //       label="Mobile Update"
                            //       type="number"
                            //       variant="outlined"
                            //       value={user.mobile}
                            //       onChange={(event) => handleMobileChange(event, user._id)}
                            //     />

                            //     <Button
                            //       sx={{ marginLeft: "5px", marginTop: "5px", color: "#fff" }}
                            //       size="small"
                            //       variant="contained"
                            //       onClick={() => handleMobileUpdate(user._id, user.mobile)}
                            //     >
                            //       Update
                            //     </Button>
                            //   </div>
                            // ),

                            Mobile: (
                              <MDTypography
                                component="a"
                                href="#"
                                variant="caption"
                                color="text"
                                fontWeight="medium"
                              >
                                {user.mobile}
                              </MDTypography>
                            ),
                            created: (
                              <MDTypography
                                component="a"
                                href="#"
                                variant="caption"
                                color="text"
                                fontWeight="medium"
                              >
                                {user.datetime}
                              </MDTypography>
                            ),

                            PaymenGroupType: (
                              <MDTypography
                                component="a"
                                href="#"
                                variant="caption"
                                color="text"
                                fontWeight="medium"
                              >
                                {user.groupPaymentType === "master_group"
                                  ? "Master"
                                  : user.groupPaymentType === "advance_group"
                                  ? "Advance"
                                  : "Unverified"}
                              </MDTypography>
                            ),
                            //     action: (
                            //       <MDTypography
                            //         component="a"
                            //         variant="caption"
                            //         color="text"
                            //         fontWeight="medium"
                            //       >
                            //         <FormGroup>
                            //           <FormControlLabel
                            //             control={
                            //               <Switch
                            //                 defaultChecked={user.deleted_at == null}
                            //                 onChange={(event) => UserAdminStatusUpdate(user._id)}
                            //                 inputProps={{ "aria-label": "controlled" }}
                            //               />
                            //             }
                            //           />
                            //         </FormGroup>
                            //       </MDTypography>
                            //     ),
                            Detail: (
                              <Button onClick={() => handleOpenModel(user._id)}>
                                <RemoveRedEyeIcon />
                              </Button>
                            ),
                          })),
                        }}
                        isSorted={false}
                        entriesPerPage={false}
                        showTotalEntries={false}
                        noEndBorder
                      />
                      <Pagination
                        count={Math.ceil(totalRows / rowsPerPage)}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginTop: "10px",
                          marginBottom: "10px",
                        }}
                      />
                    </>
                  )}
                </MDBox>
              </MDBox>
              <div>
                <Modal open={open} onClose={handleCloseModel}>
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: 400,
                      backgroundColor: "#fff", // White background
                      color: "#000", // Black text
                      borderRadius: "8px",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                      padding: "16px",
                    }}
                  >
                    <DialogTitle>Teacher Details</DialogTitle>
                    <DialogContent dividers style={{ maxHeight: "70vh", overflowY: "auto" }}>
                      {userDetail ? (
                        <div>
                          <p>
                            <strong>Name:</strong> {userDetail.first_name} {userDetail.last_name}
                          </p>
                          <p>
                            <strong>Email:</strong> {userDetail.email}
                          </p>
                          <p>
                            <strong>Mobile:</strong> {userDetail.mobile}
                          </p>
                          <p>
                            <strong>About:</strong> {userDetail.about_me}
                          </p>
                          <p>
                            <strong>Education:</strong> {userDetail.education}
                          </p>
                          <p>
                            <strong>Expertise:</strong> {userDetail.expertise}
                          </p>
                          <p>
                            <strong>Experience:</strong> {userDetail.experience}
                          </p>
                        </div>
                      ) : (
                        <p>Loading...</p>
                      )}
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCloseModel} color="primary">
                        Close
                      </Button>
                    </DialogActions>
                  </div>
                </Modal>
              </div>
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

export default teacher_tables;
