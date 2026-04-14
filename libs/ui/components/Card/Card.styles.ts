import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme) => ({
  root: {
    borderRadius: '12px',
    boxShadow: `0 4px 12px ${theme.palette?.shadow?.light || 'rgba(0,0,0,0.1)'
      }`,
    overflow: 'hidden',
    transition: 'box-shadow 0.3s ease',

    '&:hover': {
      boxShadow: `0 6px 20px ${theme.palette?.shadow?.strong || 'rgba(0,0,0,0.3)'
        }`,
    },
  },

  header: {
    padding: theme.spacing(2, 3),
    borderBottom: `1px solid ${theme.palette.divider}`,
  },

  content: {
    padding: theme.spacing(3),

    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
    },
  },

  footer: {
    padding: theme.spacing(2, 3),
    borderTop: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.grey[100],
  },
}));