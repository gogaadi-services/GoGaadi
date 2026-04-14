import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    // Mobile: bottom sheet behavior
    [theme.breakpoints.down('sm')]: {
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
  },

  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 12,
    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
    padding: 0,
    outline: 'none',
    maxHeight: '90vh',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',

    // Mobile: bottom sheet
    [theme.breakpoints.down('sm')]: {
      width: '100% !important' as any,
      maxWidth: '100% !important' as any,
      maxHeight: '92vh',
      borderRadius: '20px 20px 0 0',
      boxShadow: '0 -4px 32px rgba(0,0,0,0.18)',
    },
  },

  header: {
    padding: theme.spacing(3),
    borderBottom: '1px solid #e0e0e0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2, 2, 1.5),
    },
  },

  title: {
    margin: 0,
    fontSize: '1.25rem',
    fontWeight: 600,

    [theme.breakpoints.down('sm')]: {
      fontSize: '1.1rem',
    },
  },

  closeButton: {
    padding: theme.spacing(0.5),
    cursor: 'pointer',
    border: 'none',
    background: 'none',
    fontSize: '1.5rem',
    color: '#666',

    '&:hover': {
      color: '#000',
    },
  },

  content: {
    padding: theme.spacing(3),
    overflow: 'auto',
    flex: 1,

    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
    },
  },

  footer: {
    padding: theme.spacing(2, 3),
    borderTop: '1px solid #e0e0e0',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: theme.spacing(2),

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      gap: theme.spacing(1),
      padding: theme.spacing(1.5, 2),
    },
  },
}));