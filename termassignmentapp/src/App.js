import './App.css';import React, { useEffect, useState } from "react";
import CourseList from "./Components/CourseList"
import FollowForm from "./Components/FollowForm";
import axios from 'axios';
import AWS from 'aws-sdk';


const getMeList = async () => {
  AWS.config.update({
    region: 'us-east-1',
    accessKeyId: 'ASIASFOTTX4M2Y7XVCE7',
    secretAccessKey: 'rkivYiR9VGMrHrj4dmO24O/yMFaj6Md9Vt8jGLYf',
    sessionToken: 'FwoGZXIvYXdzEFcaDEDFTEh2t9KdGq2xdiK5AXYSCgvQrdx/+1kmVof+XOA4uAi/Ptj00Bg0e06+AhanlK2Bg2DnoeIOd+0A3ZArVf96FYXnl3GD/fo4DPZo9VBJvssMjwpq2Tp2yPFecSLEuJ+bg4syBhZLssMnhSrvR3sxFnLuIrEQVgrKc8fnAX89tn1lFCE+5RULrcgut9r5GswKFxgjodQtrXDp/XlK/fZjI0yI6PrqY5lLTZ57Bruubj6QqdomXtp/4fTG/XcPSYviQX3DzbavKNP/paYGMi314DxJIBGCrqUI7oGHjJU9S8DqM9+bCitKXKRWUPeAeFZGe4aVMUW1Z/F+OPw='
  });
  
  console.log(process.env.REACT_APP_ACCESS);

  try {
    const secretsManager = new AWS.SecretsManager();
    const secretName = 'fetchCourseApi';
    const secretValue = await secretsManager.getSecretValue({ SecretId: secretName }).promise();
    const apiEndpoint = JSON.parse(secretValue.SecretString).api_key;

    const payload = {
      "tableName": "CourseList"
    };
    console.log(apiEndpoint);
    const response = await axios.post(apiEndpoint, payload);
    console.log("response", response);
    return response.data.body;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

function App() {
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  useEffect(()=>{
    const fetchCourses = async () => {
      const list = await getMeList();
      console.log(list);
      if(list){
        setCourses(list);
      }
    }

    fetchCourses();
  }, []);


  const handleFollowClick = (id) => {
    setSelectedCourseId(id);
  };

  const handleClose = () => {
    setSelectedCourseId(null);
  };

  return (
    <div>
      <CourseList courses={courses} handleFollowClick={handleFollowClick} />
      {selectedCourseId !== null && (
        <FollowForm open={selectedCourseId !== null} openCourseId={selectedCourseId} handleClose={handleClose} />
      )}
    </div>
  );
}

export default App;
