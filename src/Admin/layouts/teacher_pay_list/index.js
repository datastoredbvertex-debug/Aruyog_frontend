import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Grid, Card, Button, Pagination } from "@mui/material";
import MDBox from "Admin/components/MDBox";
import MDTypography from "Admin/components/MDTypography";
import DataTable from "Admin/examples/Tables/DataTable";
import DashboardLayout from "Admin/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "Admin/examples/Navbars/DashboardNavbar";
import Footer from "Admin/examples/Footer";
import { Api } from "Api/Api";

function Tables() {
  const [userData, setUserData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const fetchData = async (page, rowsPerPage) => {
    try {
      const response = await Api.getTeacherPaymentStatuses(page, rowsPerPage);
      console.log(response);
      if (response && response.Teachers) {
        setUserData(response.Teachers);
        setCurrentPage(response.page);
        setTotalRows(response.totalRecords);
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

  const navigate = useNavigate();

  const handlePaidClick = (teacherId) => {
    navigate(`/teacher-pay-status/${teacherId}`);
  };

  const columns = [
    { Header: "Teacher Name", accessor: "teacher_name" },
    { Header: "Total Paid Amount", accessor: "amount" },
    { Header: "Total Remaining Amount", accessor: "Remainingamount" },
    { Header: "Students Total Amount", accessor: "Totalamount" },
    { Header: "Teacher Missing Days", accessor: "MissingDays" },
    { Header: "Remark", accessor: "remark" },
    { Header: "UpdatedAt", accessor: "UpdatedAt" },
    {
      Header: "Pay",
      accessor: "Pay",
    },
  ];

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    fetchData(value);
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
                  Teacher Payment Status
                </MDTypography>
              </MDBox>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginLeft: "auto",
                }}
              ></div>

              <MDBox pt={3}>
                <MDBox pt={3}>
                  <DataTable
                    table={{
                      columns: columns,
                      rows: userData.map((payment) => ({
                        teacher_name: payment.full_name,
                        amount: payment.totalPaidAmount,
                        Remainingamount: payment.remaining_amount,
                        Totalamount: payment.totalAmount,
                        MissingDays: payment.missingDays,
                        remark: payment.remark,
                        UpdatedAt: payment.payment_datetime,
                        Pay: (
                          <Button
                            variant="contained"
                            style={{ color: "#fff" }}
                            onClick={() => handlePaidClick(payment.teacher_id)}
                          >
                            Pay
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
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

Tables.propTypes = {
  row: PropTypes.shape({
    original: PropTypes.shape({
      teacher_id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Tables;
