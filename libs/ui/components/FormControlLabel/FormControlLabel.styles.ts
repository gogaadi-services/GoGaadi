import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme) => ({
  root: {
    margin: 0,

    '& .MuiFormControlLabel-label': {
      fontSize: '0.95rem',
    },
  },
}));