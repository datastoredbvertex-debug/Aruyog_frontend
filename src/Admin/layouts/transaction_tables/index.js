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
      const response = await Api.getAlltransactionList(page, rowsPerPage);
      if (response && response.Transactions) {
        setUserData(response.Transactions);
        setCurrentPage(response.current_page);
        setTotalRows(response.total_rows);
      } else {
        console.error("Invalid API response format:", response);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(currentPage, rowsPerPage);
  }, [currentPage]);

  const navigate = useNavigate();

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    fetchData(value);
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const columns = [
    { Header: "Student Name", accessor: "student_name" },
    { Header: "Teacher Name", accessor: "teacher_name" },
    { Header: "Total Paid Amount", accessor: "amount" },
    { Header: "Payment_Id", accessor: "Payment_Id" },
    { Header: "Payment Status", accessor: "payment_status" },
    { Header: "createdAt", accessor: "createdAt" },
    { Header: "UpdatedAt", accessor: "UpdatedAt" },
  ];

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
                  Transactions List
                </MDTypography>
              </MDBox>

              <MDBox pt={3}>
                <MDBox pt={3}>
                  {userData.length > 0 ? (
                    <DataTable
                      table={{
                        columns: columns,
                        rows: userData.map((payment) => ({
                          student_name: payment.user_id.full_name,
                          teacher_name: payment.teacher_id.full_name,
                          amount: payment.amount,
                          Payment_Id: payment.payment_id,
                          payment_status: payment.payment_status,

                          createdAt: formatDate(payment.createdAt),
                          UpdatedAt: formatDate(payment.updatedAt),
                        })),
                      }}
                      isSorted={false}
                      entriesPerPage={false}
                      showTotalEntries={false}
                      noEndBorder
                    />
                  ) : (
                    <MDTypography variant="body1" align="center" color="textSecondary" pt={3}>
                      Data not available
                    </MDTypography>
                  )}
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
