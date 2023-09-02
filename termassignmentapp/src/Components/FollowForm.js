import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import axios from 'axios';
import AWS from 'aws-sdk';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const saveSubscriber = async (openCourseId, email) => {

  AWS.config.update({
    region: 'us-east-1'
  });
  

  try {
    const secretsManager = new AWS.SecretsManager();
    const secretName = 'addSubscriberApi';
    const secretValue = await secretsManager.getSecretValue({ SecretId: secretName }).promise();
    const apiEndpoint = JSON.parse(secretValue.SecretString).api_key;

    const payload = {
      courseId: openCourseId,
      email: email
    }
    const response = await axios.post(apiEndpoint, payload);
    console.log("response",response);
    toast(`Please check your email: ${email}`);
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

const FollowForm = ({ open, openCourseId, handleClose }) => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleOkClick = async () => {
    saveSubscriber(openCourseId, email);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Follow Course</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Email"
          value={email}
          onChange={handleEmailChange}
          variant="outlined"
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleOkClick} variant="contained" color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FollowForm;
