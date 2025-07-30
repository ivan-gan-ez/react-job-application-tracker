import { useState } from "react";
import * as React from "react";
import dayjs from "dayjs";
import { Link as RouterLink, useNavigate } from "react-router";
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

function AddNewPage() {
  const jobsInLocalStorage = localStorage.getItem("jobs");
  const [jobs, setJobs] = useState(
    jobsInLocalStorage ? JSON.parse(jobsInLocalStorage) : []
  );

  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");

  const currentDate = new Date();
  const [date, setDate] = useState(dayjs());

  const navigate = useNavigate();

  const handleAddNew = () => {
    // 6. check for error - make sure all the fields are fill up
    if (company === "" || position === "" || salary === "" || date === "") {
      toast("Please fill in the all the fields");
    } else {
      // 7. add the new note data into the notes state
      const newJob = [
        ...jobs,
        {
          id: nanoid(),
          name: company,
          position: position,
          salary: salary,
          date: date,
          status: "Applied",
        },
      ];
      // // 8. update the notes in local storage
      setJobs(newJob);
      localStorage.setItem("jobs", JSON.stringify(newJob));
      // 9. show success message
      toast("Job application successfully added.");
      // 10. redirect back to home page
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
        Add Application
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
            mt: "20px",
          }}
        >
          <Button color="primary" variant="contained" onClick={handleAddNew}>
            Add
          </Button>
          <Button component={RouterLink} to="/" variant="outlined">
            Cancel
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default AddNewPage;
