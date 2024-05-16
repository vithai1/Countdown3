import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(time, icon, description, weather) {
  return { time, icon, description, weather };
}

export default function WeatherTable(data) {
    const rows = [
        createData(data["time"], 
        <img style={{width: 50, height: 50}} src={'https://openweathermap.org/img/wn/' + data['weather']['icon'] + '@2x.png'}></img>,
        data['weather']['description'],
        Math.round(data["temp"] - 273.15))
    ];
   
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 50 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right">Weather</TableCell>
            <TableCell align="right">Degree</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.time}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{row.time}</TableCell>
              <TableCell align="right">{row.icon}</TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">{row.weather}°</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}