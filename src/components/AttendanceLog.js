import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Typography, Box, Paper } from '@mui/material';
import { config } from './../googleApi';

const AttendanceLog = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const currentDate = new Date();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const year = currentDate.getFullYear();
        const sheetId = `attendance-${month}-${year}`;

        const response = await fetch(`${config.url}?SheetId=${sheetId}&Action=attendanceLog`);
        const result = await response.json();

        if (result.success) {
          const rows = result.data.slice(1).map((row, index) => ({
            id: index,
            name: row[0],
            phone: row[1],
            email: row[2],
            qualification: row[3],
            program: row[4],
            type: row[5],
            time: row[6],
          }));
          setAttendanceData(rows);
        } else {
          setError(result.message);
        }
      } catch (error) {
        setError('Error fetching data');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, []);

  const columns = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'phone', headerName: 'Phone', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'qualification', headerName: 'Qualification', flex: 1 },
    { field: 'program', headerName: 'Program', flex: 1 },
    { field: 'type', headerName: 'Type', flex: 1 },
    { field: 'time', headerName: 'Time', flex: 1 },
  ];

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Paper sx={{ p: 2, mb: 2, maxWidth: '1200px', mx: 'auto' }}>
        <Typography variant="h5" sx={{ textAlign: 'center' }}>
          Attendance Log
        </Typography>
      </Paper>
      {loading ? (
        <Typography variant="body2" sx={{ textAlign: 'center', mt: 2 }}>
          Loading...
        </Typography>
      ) : error ? (
        <Typography variant="body2" color="error" sx={{ textAlign: 'center', mt: 2 }}>
          {error}
        </Typography>
      ) : (
        <Box sx={{ height: '100%', width: '100%', maxWidth: '1200px', mx: 'auto' }}>
            <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={attendanceData}
            columns={columns}
            autoPageSize
            pageSizeOptions={[5,10,15,20]}
            rowsPerPageOptions={[5]}
            pagination
            disableSelectionOnClick
            autoHeight={true}
            
          />
          </div>
        </Box>
      )}
    </Box>
  );
};

export default AttendanceLog;
