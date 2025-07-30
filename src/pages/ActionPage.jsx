import { useState } from "react";
import { nanoid } from "nanoid";
import { toast } from "sonner";
import {
  Container,
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  InputLabel,
} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Edit, Delete } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

function ActionPage() {
  const actionsInLocalStorage = localStorage.getItem("actions");
  const [actions, setActions] = useState(
    actionsInLocalStorage ? JSON.parse(actionsInLocalStorage) : []
  );

  const [newAction, setNewAction] = useState("");

  // handleAdd to add actions
  // 6. check for error - make sure all the fields are fill up
  const handleAddNew = () => {
    // 6. check for error - make sure all the fields are fill up
    if (newAction === "") {
      toast("Please fill in the all the fields");
    } else {
      // 7. add the new note data into the notes state
      const newActions = [
        ...actions,
        {
          id: nanoid(),
          label: newAction,
          isCompleted: false,
        },
      ];
      // // 8. update the notes in local storage
      setActions(newActions);
      localStorage.setItem("actions", JSON.stringify(newActions));
      // 9. show success message
      toast("Action successfully added.");
      // 10. redirect back to home page
      setNewAction("");
      navigate("/action");
    }
  };

  // handleUpdate to change action name
  const handleUpdate = (action) => {
    const newLabel = prompt("Please enter the new task", action.label);
    // 5b. update the categories with the update category label
    if (newLabel) {
      const updatedActions = [...actions];
      setActions(
        updatedActions.map((act) => {
          if (act.id === action.id) {
            act.label = newLabel;
          }
          return act;
        })
      );
      // show notification of success message
      toast("Action successfully updated.");
      // 5c. update the local storage with the updated categories
      localStorage.setItem("actions", JSON.stringify(updatedActions));
    }
  };

  // handleCompletion to change completion
  const handleCompletion = (action) => {
    // 5b. update the categories with the update category label
    const updatedActions = [...actions];
    setActions(
      updatedActions.map((act) => {
        if (act.id === action.id) {
          if (act.isCompleted === true) {
            act.isCompleted = false;
          } else {
            act.isCompleted = true;
          }
        }
        return act;
      })
    );
    // show notification of success message
    toast("Action successfully updated.");
    // 5c. update the local storage with the updated categories
    localStorage.setItem("actions", JSON.stringify(updatedActions));
  };

  // handleDelete to remove action
  const handleDelete = (action) => {
    // 8. use a confirmation alert to confirm delete
    const confirmDelete = confirm(
      "Are you sure you want to delete this action?"
    );
    if (confirmDelete) {
      // 9. use filter and remove the note from it
      const newActions = actions.filter((item) => item.id !== action.id);
      // 10. update the notes state with updatedNotes
      setActions(newActions);
      // 11. update the local storage with the updatedNotes
      localStorage.setItem("actions", JSON.stringify(newActions));
      // 12. show success notification
      toast("Action successfully deleted.");
    }
  };

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4">Actions</Typography>
      <Paper
        elevation={1}
        sx={{
          p: "20px",
          mt: "20px",
        }}
      >
        <InputLabel>Add New Task</InputLabel>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
            mt: "15px",
          }}
        >
          <TextField
            fullWidth
            label="Action..."
            variant="outlined"
            value={newAction}
            onChange={(event) => setNewAction(event.target.value)}
          />
          <Button color="primary" variant="contained" onClick={handleAddNew}>
            Add
          </Button>
        </Box>
      </Paper>
      <Paper
        elevation={1}
        sx={{
          p: "20px",
          mt: "20px",
        }}
      >
        <InputLabel>Existing Actions</InputLabel>
        <List sx={{ width: "100%" }}>
          {actions.map((action) => (
            <ListItem
              disableGutters
              divider
              key={action.id}
              secondaryAction={
                <Box sx={{ display: "flex", gap: "10px" }}>
                  <IconButton
                    color="yellow"
                    onClick={() => handleUpdate(action)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(action)}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              }
            >
              <IconButton onClick={() => handleCompletion(action)}>
                {action.isCompleted === true ? (
                  <CheckBoxIcon color="green"></CheckBoxIcon>
                ) : (
                  <CheckBoxOutlineBlankIcon color="grey"></CheckBoxOutlineBlankIcon>
                )}
              </IconButton>
              <ListItemText
                primary={`${action.label}`}
                sx={
                  action.isCompleted === true
                    ? { textDecoration: "line-through" }
                    : {}
                }
              ></ListItemText>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}

export default ActionPage;
