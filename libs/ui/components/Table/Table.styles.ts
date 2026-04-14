import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme) => ({
  root: {
    width: '100%',
    overflow: 'auto',
  },

  container: {
    maxHeight: 440,
  },

  table: {
    minWidth: 650,
  },

  header: {
    backgroundColor: theme.palette.grey[100],

    '& th': {
      fontWeight: 700,
      fontSize: '0.875rem',
      color: theme.palette.text.primary,
    },
  },

  row: {
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      cursor: 'pointer',
    },

    '& td': {
      fontSize: '0.875rem',
    },
  },

  cell: {
    padding: theme.spacing(2),

    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
      fontSize: '0.8rem',
    },
  },

  loading: {
    padding: theme.spacing(4),
    textAlign: 'center',
  },

  empty: {
    padding: theme.spacing(4),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));