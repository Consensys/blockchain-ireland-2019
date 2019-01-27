import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import { SERVER_ENDPOINT } from "./../../../util/Constant";
import axios from "axios";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

const styles = theme => ({
});

class CreateOperator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      operatorName: '',
      errorMessages: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      errorMessages: []
    });

    this.setState({
      operatorName: event.target.value,
    });
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      errorMessages: []
    });
    const name = this.state.operatorName;
    if (name.trim() === '') {
      this.addMessage(
        'cui-circle-x',
        'error',
        'Operator Name can not be empty.'
      );

      return;
    }
    const opt = {
      name: name
    }
    axios.post(`${SERVER_ENDPOINT}/operator`, opt)
    .then(({ data })=> {
      this.setState({
        open: false
      }, () => {
        this.props.handleSuccessCreation();
      });
    })
  };

  addMessage(icon, type, text) {
    const errorMessage = {
      icon,
      type,
      text
    };
    this.setState(prevState => ({
      errorMessages: [...prevState.errorMessages, errorMessage]
    }));
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Button variant="contained" color="primary" onClick={this.handleOpen}>
          Register Operator
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          fullWidth={true}
          maxWidth = {'sm'}
        >
          <DialogTitle id="form-dialog-title">Register New Operator</DialogTitle>
          <DialogContent>
          {this.state.errorMessages.map((message, index) => {
            return (
              <Typography color={message.type} key={index}>
                 {message.text}
              </Typography>
            );
            })}

          <TextField
              required
              id="operatorName"
              name="operatorName"
              label="Operator Name"
              fullWidth
              autoComplete="operatorName"
              onChange={this.handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button variant="contained" size="medium" color="primary" className={classes.button} onClick={this.handleSubmit}>
                Submit
              </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

CreateOperator.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSuccessCreation: PropTypes.func
};

// We need an intermediary variable for handling the recursive nesting.
const CreateOperatorWrapped = withStyles(styles)(CreateOperator);

export default CreateOperatorWrapped;