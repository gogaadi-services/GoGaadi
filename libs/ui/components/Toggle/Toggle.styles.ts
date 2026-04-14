import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
  },

  formControl: {
    margin: 0,

    '& .MuiFormControlLabel-label': {
      fontSize: '0.95rem',

      [theme.breakpoints.down('sm')]: {
        fontSize: '0.875rem',
      },
    },
  },

  helperText: {
    fontSize: '0.75rem',
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing(7),
    marginTop: theme.spacing(0.5),
  },
}));