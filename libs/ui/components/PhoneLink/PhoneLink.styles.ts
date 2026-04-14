import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme) => ({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: theme.spacing(0.5),
    textDecoration: 'none',
    color: theme.palette.primary.main,

    '&:hover': {
      textDecoration: 'underline',
    },
  },

  icon: {
    fontSize: '1.25rem',
  },
}));