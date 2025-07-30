import { useState } from "react";
import * as React from "react";
import dayjs from "dayjs";
import { Link as RouterLink, useNavigate, useParams } from "react-router";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import { nanoid } from "nanoid";
import { toast } from "sonner";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function EditPage() {
  const jobsInLocalStorage = localStorage.getItem("jobs");
  const [jobs, setJobs] = useState(
    jobsInLocalStorage ? JSON.parse(jobsInLocalStorage) : []
  );

  const { id } = useParams();

  const selectedJob = jobs.find((job) => job.id === id);

  const [company, setCompany] = useState(selectedJob ? selectedJob.name : "");
  const [position, setPosition] = useState(
    selectedJob ? selectedJob.position : ""
  );
  const [salary, setSalary] = useState(selectedJob ? selectedJob.salary : "");
  const [status, setStatus] = useState(selectedJob ? selectedJob.status : "");

  const currentDate = new Date();
  const [date, setDate] = useState(
    selectedJob ? dayjs(new Date(selectedJob.date).valueOf()) : dayjs()
  );

  const navigate = useNavigate();

  const handleUpdate = () => {
    // 6. check for error - make sure all the fields are fill up
    if (company === "" || position === "" || salary === "" || date === "") {
      toast("Please fill in the all the fields");
    } else {
      const updatedJobs = [...jobs];
      setJobs(
        updatedJobs.map((job) => {
          if (job.id === selectedJob.id) {
            job.name = company;
            job.position = position;
            job.salary = salary;
            job.date = date;
            job.status = status;
          }
          return job;
        })
      );

      localStorage.setItem("jobs", JSON.stringify(updatedJobs));
      toast(`Application successfully updated.`);
      navigate("/");
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        py: "60px",
      }}
    >
      <Typography variant="h4" sx={{ mb: "20px" }}>
        Edit Application
      </Typography>
      <Paper
        elevation={3}
        sx={{
          p: "20px",
          mt: "20px",
        }}
      >
        <Grid container spacing={2}>
          <Grid size={4} sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6">Company Name:</Typography>
          </Grid>
          <Grid size={8}>
            <TextField
              fullWidth
              id="company_name"
              label="Company Name"
              variant="outlined"
              value={company}
              onChange={(event) => setCompany(event.target.value)}
              sx={{ mt: "10px" }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid size={4} sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6">Position:</Typography>
          </Grid>
          <Grid size={8}>
            <TextField
              fullWidth
              id="position"
              label="Position"
              variant="outlined"
              value={position}
              onChange={(event) => setPosition(event.target.value)}
              sx={{ mt: "10px" }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid size={4} sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6">Salary Range:</Typography>
          </Grid>
          <Grid size={8}>
            <FormControl fullWidth sx={{ mt: "10px" }}>
              <InputLabel id="salary_range">Salary Range</InputLabel>
              <Select
                labelId="salary_range"
                id="salary_range"
                label="Salary Range"
                value={salary}
                onChange={(event) => setSalary(event.target.value)}
                fullWidth
              >
                <MenuItem value={"1.5k - 2.5k"}>1.5k - 2.5k</MenuItem>
                <MenuItem value={"2.5k - 3.5k"}>2.5k - 3.5k</MenuItem>
                <MenuItem value={"3.5k - 4.5k"}>3.5k - 4.5k</MenuItem>
                <MenuItem value={">4.5k"}>&gt;4.5k</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid size={4} sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6">Application Date:</Typography>
          </Grid>
          <Grid size={8}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  value={date}
                  onChange={(newDate) =>
                    new Date(newDate).valueOf() === null
                      ? ""
                      : setDate(dayjs(new Date(newDate).valueOf()))
                  }
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid size={4} sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6">Status:</Typography>
          </Grid>
          <Grid size={8}>
            <FormControl fullWidth sx={{ mt: "10px" }}>
              <InputLabel id="status">Status</InputLabel>
              <Select
                labelId="status"
                id="status"
                label="Salary Range"
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                fullWidth
              >
                <MenuItem value={"Applied"}>Applied</MenuItem>
                <MenuItem value={"Screening"}>Screening</MenuItem>
                <MenuItem value={"Interview"}>Interview</MenuItem>
                <MenuItem value={"Offering"}>Offering</MenuItem>
                <MenuItem value={"Rejected"}>Rejected</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
            mt: "20px",
          }}
        >
          <Button color="primary" variant="contained" onClick={handleUpdate}>
            Update
          </Button>
          <Button component={RouterLink} to="/" variant="outlined">
            Cancel
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default EditPage;
