import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Accordion01 from '../Accordion01';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles((theme) => ({
  formInput: {
    width: '100%',
    marginBottom: 12,
  },
  divider: { marginTop: 10, marginBottom: 10 },
  specialFocusedClass: { color: 'inherit !important' },
}));

const InputValidationRateLimit = (props) => {
  const classes = useStyles();
  const someActionChecked = props.rateLimitActions.some((e) => e.checked);
  return (
    <Accordion01 title="Rate Limit" active={someActionChecked}>
      <FormControl className={classes.formInput}>
        <FormLabel focused style={{ paddingBottom: 8, color: 'inherit' }}>
          Limit The Rate On
        </FormLabel>
        <FormGroup>
          {props.rateLimitActions.map((action) => (
            <FormControlLabel
              key={action.title}
              label={action.title}
              control={
                <Switch
                  checked={action.checked}
                  onChange={props.handleRateLimitActionsChange}
                  name={action.title}
                />
              }
            />
          ))}
        </FormGroup>
      </FormControl>
      <TextField
        variant="outlined"
        size="small"
        className={classes.formInput}
        label="Rate Limit In Seconds"
        onChange={(e) => props.setRateLimit(e.target.value)}
        value={props.rateLimit}
        helperText="Firestore limits writes to 1/s by default"
        disabled={!someActionChecked}
      />
      <TextField
        variant="outlined"
        size="small"
        className={classes.formInput}
        label="Create Date Selector"
        onChange={(e) => props.setCreatedDateSelector(e.target.value)}
        value={props.createdDateSelector}
        helperText="e.g. lastUpdate or timestamp"
        disabled={!someActionChecked}
      />
    </Accordion01>
  );
};

export default InputValidationRateLimit;
