import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";

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
import { FaEye } from "react-icons/fa";

// Material Dashboard 2 React example components
import DashboardLayout from "Admin/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "Admin/examples/Navbars/DashboardNavbar";
import Footer from "Admin/examples/Footer";
import DataTable from "Admin/examples/Tables/DataTable";
import MDAvatar from "Admin/components/MDAvatar";
import { Api } from "Api/Api";
import Bankdetails_Model from "../model/bankdetails_model";
import Pagination from "@mui/material/Pagination";
import Alert from "@mui/material/Alert";

// Data

function Tables() {
  const [userData, setUserData] = useState([]);
  const [userUpdatetatus, setUpdateDataStatus] = useState([]);
  const [projectupdateId, setProjectUpdateId] = useState([]);
  const [error, setErrors] = useState("");
  const [updatestatusDialogOpen, setUpdatestatusDialogOpen] = useState(false);
  const [successSB, setSuccessSB] = useState(false);

  const [descriptionsModelShow, setDescriptionsModelShow] = useState(false);
  const [DescriptionsData, setDescriptionsData] = useState({});

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);

  // State variables for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async (page = 1) => {
    try {
      const response = await Api.getAllUsers(page);
      if (response && response.Users && Array.isArray(response.Users)) {
        const datas = response.Users;
        const modifiedData = datas.map((user) => {
          const defaultMobile = user.mobile || "";
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
            pic: user.pic,
            first_name: user.first_name,
            last_name: user.last_name,
            full_name: user.full_name,
            email: user.email,
            mobile: defaultMobile,
            datetime: formattedUpdatedAt,
            about_me: user.about_me,
            dob: user.dob,
            interest: user.interest,
            deleted_at: user.deleted_at,
          };
        });
        setUserData(modifiedData);
        setCurrentPage(response.currentPage);
        setTotalPages(response.totalPages);
      } else {
        console.error("Invalid API response format:", response);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

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
    fetchData();
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

  const UserAdminStatusUpdate = async (userId) => {
    try {
      const response = await Api.UserAdminStatus(userId);
      if (response) {
        setSuccessSB(true);
        setErrors("User Status Update Successfuly");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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
      setSuccessSB(true);
      setErrors("Mobile number must be exactly 10 digits.");
      return;
    }
    try {
      const response = await Api.UpdateMobileAdmin(userId, mobile);
      setSuccessSB(true);
      setErrors(response.message);

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

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const renderSuccessSB = (
    <MDSnackbar
      color="error"
      icon="check"
      title={error}
      content={error}
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
                  Students List
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

                            { Header: "E-Mail", accessor: "E_Mail", align: "left" },
                            { Header: "Mobile", accessor: "Mobile", align: "left" },

                            { Header: "Last_Login", accessor: "created", align: "center" },
                            { Header: "Active", accessor: "action", align: "center" },
                          ],
                          rows: userData.map((user) => ({
                            author: (
                              <MDBox
                                display="flex"
                                alignItems="center"
                                lineHeight={1}
                                // onClick={() => handleProfileRedirect(user._id)}
                                className="admin_user_list_name"
                              >
                                <MDAvatar
                                  src={user.pic}
                                  name={user.full_name}
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
                                >
                                  {`${user.full_name}`}
                                </MDTypography>
                              </MDBox>
                            ),

                            E_Mail: user.email,
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
                            // Record: (
                            //   <MDTypography
                            //     component="a"
                            //     variant="caption"
                            //     color="text"
                            //     fontWeight="medium"
                            //     sx={{ fontSize: "18px", cursor: "pointer" }}
                            //   >
                            //     <Link to={`/user-transaction-list/${user._id}`}>
                            //       <FaEye />
                            //     </Link>
                            //   </MDTypography>
                            // ),
                            // Details: (
                            //   <MDTypography
                            //     component="a"
                            //     variant="caption"
                            //     fontWeight="medium"
                            //     sx={{ fontSize: "18px", cursor: "pointer", color: "red" }}
                            //     onClick={() => {
                            //       descriptionShow(user._id);
                            //     }}
                            //   >
                            //     <FaEye />
                            //   </MDTypography>
                            // ),
                            action: (
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
                                        defaultChecked={user.deleted_at == null}
                                        onChange={(event) => UserAdminStatusUpdate(user._id)}
                                        inputProps={{ "aria-label": "controlled" }}
                                      />
                                    }
                                  />
                                </FormGroup>
                              </MDTypography>
                            ),
                          })),
                        }}
                        isSorted={false}
                        entriesPerPage={false}
                        showTotalEntries={false}
                        noEndBorder
                      />
                      <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                        showFirstButton
                        showLastButton
                        sx={{ mt: 3, mb: 3 }}
                      />
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

export default Tables;
