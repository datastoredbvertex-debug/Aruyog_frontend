import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";

// Material Dashboard 2 React components
import MDBox from "Admin/components/MDBox";
import MDTypography from "Admin/components/MDTypography";
import { Api } from "Api/Api";
import EditCourseDate from "../components/editcoursedate";

import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";

// Material Dashboard 2 React example components
import DashboardLayout from "Admin/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "Admin/examples/Navbars/DashboardNavbar";
import Footer from "Admin/examples/Footer";
import DataTable from "Admin/examples/Tables/DataTable";

function Tables() {
  const [userData, setUserData] = useState([]);
  const [courseId, setCourseId] = useState(1);
  const [courseStartDate, setCourseStartDate] = useState(0);
  const [showModel, setShowModel] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const base_url = process.env.REACT_APP_BASE_URL;
  const fetchData = async (page = 1) => {
    try {
      const response = await Api.getAllCourse({ page });
      console.log(page);
      if (response && Array.isArray(response.data)) {
        const { data, totalPages } = response;
        setUserData(data);
        setTotalPages(totalPages);
      } else {
        console.error("Invalid API response format:", response);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const editcategoryfun = (courseId, courseStartDate) => {
    setCourseStartDate(courseStartDate);
    setCourseId(courseId);
    setShowModel(true);
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const handlePageChange = (event, value) => {
    setUserData([]);
    setPage(value);
  };

  const CourseActiveStatusUpdate = async (userId) => {
    try {
      const response = await Api.CourseActiveStatus(userId);
      if (response) {
        setSuccessSB(true);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3} style={{ height: "auto" }}>
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
                  Course List
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{
                    columns: [
                      { Header: "Teacher_Name", accessor: "Teacher_Name", align: "center" },
                      { Header: "Category_Name", accessor: "Category_Name", align: "center" },
                      { Header: "Category_Image", accessor: "Category_Image", align: "center" },

                      { Header: "Type", accessor: "Type", align: "center" },
                      { Header: "Startdate", accessor: "Startdate", align: "center" },
                      { Header: "Enddate", accessor: "Enddate", align: "center" },
                      { Header: "Action", accessor: "action", align: "center" },
                      { Header: "Active", accessor: "status", align: "center" },
                    ],

                    rows: userData.map((user) => ({
                      Teacher_Name: (
                        <MDBox display="flex" alignItems="center" lineHeight={1}>
                          <MDBox ml={2} lineHeight={1}>
                            <MDTypography display="block" variant="button" fontWeight="medium">
                              {user.teacher.full_name}
                            </MDTypography>
                          </MDBox>
                        </MDBox>
                      ),
                      Category_Name: (
                        <MDTypography
                          component="a"
                          variant="caption"
                          color="text"
                          fontWeight="medium"
                        >
                          {user.category_name}
                        </MDTypography>
                      ),
                      Category_Image: (
                        <MDBox display="flex" alignItems="center" lineHeight={1}>
                          <MDBox ml={2} lineHeight={1}>
                            {user.category_image ? (
                              <img
                                src={`${base_url}/${user.category_image}`}
                                alt="Category Image"
                                style={{ maxWidth: "100px", maxHeight: "100px" }} // Adjust size as needed
                              />
                            ) : (
                              <img
                                src="https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg" // Replace with your default image path
                                alt="Default Category Image"
                                style={{ maxWidth: "100px", maxHeight: "100px" }} // Adjust size as needed
                              />
                            )}
                          </MDBox>
                        </MDBox>
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
                      Startdate: (
                        <MDTypography
                          component="a"
                          variant="caption"
                          color="text"
                          fontWeight="medium"
                        >
                          {user.startDate == "Invalid date" ? "null" : user.startDate}
                        </MDTypography>
                      ),
                      Enddate: (
                        <MDTypography
                          component="a"
                          variant="caption"
                          color="text"
                          fontWeight="medium"
                        >
                          {user.endDate == "Invalid date" ? "null" : user.endDate}
                        </MDTypography>
                      ),
                      action: (
                        <MDTypography
                          component="a"
                          variant="caption"
                          color="text"
                          fontWeight="medium"
                          sx={{ cursor: "pointer" }}
                          onClick={() => editcategoryfun(user._id, user.startDate)}
                        >
                          Edit
                        </MDTypography>
                      ),
                      status: (
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
                                  onChange={(event) => CourseActiveStatusUpdate(user._id)}
                                  inputProps={{ "aria-label": "controlled" }}
                                />
                              }
                            />
                          </FormGroup>
                        </MDTypography>
                      ),
                      editCategoryComponent: showModel && (
                        <EditCourseDate
                          onClose={() => setShowModel(false)}
                          courseId={courseId}
                          courseStartDate={courseStartDate}
                        />
                      ),
                    })),
                  }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={true}
                  noEndBorder
                />
                <MDBox display="flex" justifyContent="center" mt={3} mb={1}>
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                  />
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
      {showModel && (
        <EditCourseDate
          onClose={() => setShowModel(false)}
          courseId={courseId}
          courseStartDate={courseStartDate}
        />
      )}
    </DashboardLayout>
  );
}

export default Tables;
