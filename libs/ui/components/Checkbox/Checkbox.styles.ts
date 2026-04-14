import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'flex-start',
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
    marginLeft: theme.spacing(4),
    marginTop: theme.spacing(0.5),
  },
}));