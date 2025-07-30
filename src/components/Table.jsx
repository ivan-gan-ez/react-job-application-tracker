import * as React from "react";
import { Link as RouterLink, useNavigate } from "react-router";
import { toast } from "sonner";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
} from "@mui/material";

import InfoIcon from "@mui/icons-material/Info";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function BasicTable(props) {
  const { list, setList, filter } = props;
  const rows = [...list];
  console.log(rows);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = (job) => {
    // 8. use a confirmation alert to confirm delete
    const confirmDelete = confirm("Are you sure?");
    if (confirmDelete) {
      // 9. use filter and remove the item from it
      const updatedList = list.filter((item) => item.id !== job.id);
      // 10. update the items state with updatedList
      setList(updatedList);
      // 11. update the local storage with the updatedList
      localStorage.setItem("jobs", JSON.stringify(updatedList));
      // 12. show success notification
      toast("Deletion successful.");
    }
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left" sx={{ fontWeight: 900, fontSize: 20 }}>
              Company
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: 900, fontSize: 20 }}>
              Position
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: 900, fontSize: 20 }}>
              Salary Range
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: 900, fontSize: 20 }}>
              Application Date
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: 900, fontSize: 20 }}>
              Status
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: 900, fontSize: 20 }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            .filter((row) => {
              if (filter === "All") {
                return true;
              } else if (row.status === filter) {
                return true;
              } else {
                return false;
              }
            })
            .map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="left">{row.position}</TableCell>
                <TableCell align="left">{row.salary}</TableCell>
                <TableCell align="left">
                  {new Date(row.date).toLocaleString()}
                </TableCell>

                <TableCell align="left">
                  <Chip
                    label={row.status}
                    color={
                      row.status === "Applied"
                        ? "primary"
                        : row.status === "Screening"
                        ? "azure"
                        : row.status === "Interview"
                        ? "yellow"
                        : row.status === "Offering"
                        ? "green"
                        : row.status === "Rejected"
                        ? "error"
                        : "white"
                    }
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton color="azure" onClick={handleOpen}>
                    <InfoIcon />
                  </IconButton>
                  <IconButton
                    component={RouterLink}
                    to={`/edit/${row.id}`}
                    sx={{ ml: 0.5 }}
                    color="yellow"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    sx={{ ml: 0.5 }}
                    color="error"
                    onClick={() => handleDelete(row)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Paper sx={{ p: 3, minWidth: "500px" }}>
                    <Typography
                      id="modal-modal-title"
                      variant="h3"
                      component="h2"
                      sx={{ textAlign: "center" }}
                    >
                      Application detail
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 4 }}>
                      <Typography sx={{ fontWeight: 600, display: "inline" }}>
                        Company Name:
                      </Typography>
                      {row.name}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      <Typography sx={{ fontWeight: 600, display: "inline" }}>
                        Position: {row.position}
                      </Typography>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 4 }}>
                      Interview Pipeline
                    </Typography>
                    <Timeline position="alternate">
                      <TimelineItem>
                        <TimelineSeparator>
                          <TimelineDot color="primary" />
                          <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>Applied</TimelineContent>
                      </TimelineItem>
                      <TimelineItem>
                        <TimelineSeparator>
                          <TimelineDot
                            color={row.status !== "Applied" ? "azure" : "grey"}
                          />
                          <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>Screening</TimelineContent>
                      </TimelineItem>
                      <TimelineItem>
                        <TimelineSeparator>
                          <TimelineDot
                            color={
                              row.status !== "Applied" &&
                              row.status !== "Screening"
                                ? "yellow"
                                : "grey"
                            }
                          />
                          <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>Interview</TimelineContent>
                      </TimelineItem>
                      <TimelineItem>
                        <TimelineSeparator>
                          <TimelineDot
                            color={
                              row.status === "Offering"
                                ? "green"
                                : row.status === "Rejected"
                                ? "error"
                                : "grey"
                            }
                          />
                        </TimelineSeparator>
                        <TimelineContent>
                          {row.status === "Offering"
                            ? "Offering"
                            : row.status === "Rejected"
                            ? "Rejected"
                            : "Result Pending"}
                        </TimelineContent>
                      </TimelineItem>
                    </Timeline>
                  </Paper>
                </Modal>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
