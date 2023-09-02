import React from "react";
import { Button, Box, Typography } from "@mui/material";

const CourseList = ({ courses, handleFollowClick }) => {
  return (
    <div>
      {courses.map((course) => (
        <Box key={course.id} sx={{ p: 2, border: "1px solid #ccc", mb: 2 }}>
          <Typography variant="h6">{course.title}</Typography>
          <Typography variant="body1">Available Seats: {course.availability}</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleFollowClick(course.id)}
          >
            Follow
          </Button>
        </Box>
      ))}
    </div>
  );
};

export default CourseList;