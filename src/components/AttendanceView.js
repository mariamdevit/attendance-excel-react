import React, { useState, useEffect } from 'react';
import { config } from './../googleApi';
import {
  TextField,
  Button,
  Autocomplete,
  Box,
  Typography
} from '@mui/material';

const attendanceTypes = ['In', 'Out'];

const AttendanceView = () => {
  const [message, setMessage] = useState('');
  const [programs, setPrograms] = useState([]); // State to hold the list of programs
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    // Fetch the programs from the API on component mount
    fetch(`${config.url}?Action=programsLookup&SheetId=programs`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Set the programs data in the state
          setPrograms(data.data.map(program => program.label));
        } else {
          console.error('Failed to fetch programs:', data.message);
        }
      })
      .catch((error) => {
        console.error('Error fetching programs:', error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false once the request is complete
      });
  }, []);

  function formatDateTime(date) {
    const pad = (n) => (n < 10 ? '0' + n : n);
    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1); // Months are 0-based
    const year = date.getFullYear();
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  function Submit(e) {
    e.preventDefault(); // Prevent form from submitting the traditional way
    const currentDate = new Date();
    const formEle = e.target; // Use the form element passed by the event
    const formData = new FormData(formEle);
  
    // Add the current date and time in the desired format to the form data
    formData.append('Time', formatDateTime(currentDate));
  
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
    const year = currentDate.getFullYear();
  
    formData.append('SheetId', `attendance-${month}-${year}`); // Example: attendance-08-2024
  
    fetch(config.url, {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json(); // Parse the response as JSON
      })
      .then((data) => {
        console.log('Response Data:', data); // Log the data to inspect the response
  
        if (data.success) {
          setMessage('Saved Successfully');
        } else {
          setMessage('Error saving data');
          console.error('Error response:', data);
        }
      })
      .catch((error) => {
        console.error('Error saving data:', error);
        setMessage('Error saving data');
      });
  }
  

  return (
    <Box component="form" className="form" onSubmit={(e) => Submit(e)} sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, mx: 'auto', mt: 4 }}>
      <TextField
        label="Your Name"
        name="Name"
        type="text"
        required
        inputProps={{ minLength: 7 }}
      />
      <TextField
        label="Your Phone"
        name="Phone"
        type="text"
        required
        inputProps={{ pattern: '^(052|050|054)[0-9]{7}$', title: 'Please enter a valid UAE phone number: 052XXXXXXX, 050XXXXXXX, or 054XXXXXXX' }}
      />
      <TextField
        label="Your Email"
        name="Email"
        type="email"
        required
      />
      <TextField
        label="Your Qualification"
        name="Qualification"
        type="text"
        required
      />
      <Autocomplete
        options={programs}
        loading={loading} // Show loading state in the Autocomplete
        renderInput={(params) => <TextField {...params} label="Your Program" name="Program" required />}
      />
      <Autocomplete
        options={attendanceTypes}
        renderInput={(params) => <TextField {...params} label="Attendance Type" name="Type" required />}
      />
      <Button variant="contained" type="submit">Submit</Button>
      <Typography variant="body2" color="textSecondary">{message}</Typography>
    </Box>
  );
};

export default AttendanceView;
