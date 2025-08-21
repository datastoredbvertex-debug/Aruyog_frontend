import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MDSnackbar from "Admin/components/MDSnackbar";
import { FormControl, Select, MenuItem } from "@mui/material";
import { Api } from "Api/Api";
import { useNavigate, useParams } from "react-router-dom";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

function AddUserForm() {
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedPaymentType, setSelectedPaymentType] = useState("Select Payment Type");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [successSB, setSuccessSB] = useState(false);
  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const { teacher_id } = useParams();

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="Add Category"
      content="Add Sub Category Successfully"
      dateTime="0 Sec ago"
      open={successSB}
      onClose={closeSuccessSB}
      close={closeSuccessSB}
      bgWhite
    />
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields
    const newErrors = {};
    setErrors(newErrors); // Reset errors

    if (Object.keys(newErrors).length === 0) {
      const data = {
        userId: teacher_id,
        type: selectedPaymentType, // Send payment type
      };

      try {
        const update = await Api.updateUserPayment(data);
        if (update) {
          console.log("Payment updated successfully");
          openSuccessSB(); // Open success snackbar
          setTimeout(() => navigate("/teacher-tables"), 2000); // Redirect after 2 seconds
        }
      } catch (error) {
        console.error("Error updating payment:", error);
      }
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <FormControl fullWidth>
            <Select
              className="paymentSelect"
              style={{ height: "50px" }}
              value={selectedPaymentType}
              onChange={(e) => setSelectedPaymentType(e.target.value)}
            >
              <MenuItem value="Select Payment Type">Select Payment Type</MenuItem>
              <MenuItem value="master">master</MenuItem>
              <MenuItem value="advance">advance</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div style={{ textAlign: "center", color: "white" }}>
          <Button variant="contained" color="primary" type="submit">
            Update
          </Button>
        </div>
        {renderSuccessSB}
      </form>
    </div>
  );
}

export default AddUserForm;
