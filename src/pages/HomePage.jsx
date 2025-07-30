import { useState } from "react";

import {
  Container,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Link as RouterLink } from "react-router";

import BasicTable from "../components/Table";

function HomePage() {
  const jobsInLocalStorage = localStorage.getItem("jobs");
  const [jobs, setJobs] = useState(
    jobsInLocalStorage ? JSON.parse(jobsInLocalStorage) : []
  );

  const [filter, setFilter] = useState("All");

  return (
    <>
      <Container sx={{ p: 3 }}>
        <Container sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h3">Dashboard</Typography>
          <FormControl sx={{ minWidth: "150px" }}>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filter}
              label="Status"
              onChange={(event) => setFilter(event.target.value)}
            >
              <MenuItem value={"All"}>All</MenuItem>
              <MenuItem value={"Applied"}>Applied</MenuItem>
              <MenuItem value={"Screening"}>Screening</MenuItem>
              <MenuItem value={"Interview"}>Interview</MenuItem>
              <MenuItem value={"Offering"}>Offering</MenuItem>
              <MenuItem value={"Rejected"}>Rejected</MenuItem>
            </Select>
          </FormControl>
        </Container>

        <Button
          variant="contained"
          color="secondary"
          fullWidth
          sx={{ my: 3, p: 1, fontSize: 16 }}
          component={RouterLink}
          to="/add"
        >
          Add Application
        </Button>

        <BasicTable list={jobs} setList={setJobs} filter={filter} />
      </Container>
    </>
  );
}

export default HomePage;
