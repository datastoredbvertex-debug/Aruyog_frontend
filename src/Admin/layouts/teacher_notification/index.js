import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import React, { useEffect, useState } from "react";
import { Select, Pagination } from "@mui/material";

// Material Dashboard 2 React components
import MDBox from "Admin/components/MDBox";
import MDTypography from "Admin/components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "Admin/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "Admin/examples/Navbars/DashboardNavbar";
import Footer from "Admin/examples/Footer";
import DataTable from "Admin/examples/Tables/DataTable";
import { Api } from "Api/Api";
import DescriptionModel from "../model/description_model";

// Data

function TeacherNotification() {
  const [userData, setUserData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [descriptionsModelShow, setDescriptionsModelShow] = useState(false);
  const [DescriptionsData, setDescriptionsData] = useState("");
  const [DescriptionsType, setDescriptionsType] = useState("Title");

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    fetchData(value);
  };

  const fetchData = async (page) => {
    try {
      const response = await Api.getTeacherNotificationsByAdmin(page, rowsPerPage);
      if (response && response.notifications) {
        const modifiedData = response.notifications.map((notification) => ({
          _id: notification._id || null,
          teacher_id: notification.teacher_id || null,
          user_id: notification.user_id || null,
          title: notification.title || null,
          read: notification.read || null,
          created_at: new Date(notification.created_at).toLocaleString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
          body: notification.body || null,
          amount: notification.amount || null,
        }));
        setUserData(modifiedData);
        setCurrentPage(response.currentPage);
        setTotalRows(response.totalNotifications);
      } else {
        console.error("Invalid API response format:", response);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, rowsPerPage]);

  const handleClose = () => {
    setDescriptionsModelShow(false);
  };

  const descriptionShow = (description) => {
    setDescriptionsModelShow(true);
    setDescriptionsData(description);
  };

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
                  Teachers Notifications List
                </MDTypography>
              </MDBox>
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
                          { Header: "Body", accessor: "body", align: "left" },
                          { Header: "Read", accessor: "read", align: "center" },
                          { Header: "Title", accessor: "title", align: "center" },
                          { Header: "Created", accessor: "created", align: "center" },
                        ],
                        rows: userData.map((notification) => ({
                          body: notification.body ? notification.body : "null",
                          read: notification.read ? "true" : "false",
                          title: (
                            <MDTypography
                              component="a"
                              variant="caption"
                              color="text"
                              fontWeight="medium"
                              sx={{ cursor: "pointer" }}
                              onClick={() => {
                                descriptionShow(notification.title);
                              }}
                            >
                              {notification.title.length > 15
                                ? `${notification.title.slice(0, 15)}... Read more`
                                : notification.title}
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
                              {notification.created_at}
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
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
      {descriptionsModelShow && (
        <DescriptionModel
          descriptionsModelShow={descriptionsModelShow}
          handleClose={handleClose}
          DescriptionsData={DescriptionsData}
          DescriptionsType={DescriptionsType}
        />
      )}
    </DashboardLayout>
  );
}

export default TeacherNotification;
