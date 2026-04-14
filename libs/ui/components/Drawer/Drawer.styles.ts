import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      '& .MuiDrawer-paper': {
        width: 0,
      },
    },

    [theme.breakpoints.up('sm')]: {
      '& .MuiDrawer-paper': {
        width: 250,
      },
    },
  },

  paper: {
    overflowX: 'hidden',
    borderRight: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
  },

  header: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing(1), // fixed (was plain number)
  },

  content: {
    padding: theme.spacing(1), // fixed (was plain number)
  },
}));