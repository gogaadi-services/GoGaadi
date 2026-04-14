import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme) => ({
  menu: {
    '& .MuiPaper-root': {
      borderRadius: 8,
      marginTop: theme.spacing(1),
      boxShadow: `0 4px 12px ${theme.palette?.shadow?.dark || 'rgba(0,0,0,0.2)'
        }`,
    },
  },

  menuItem: {
    padding: theme.spacing(1.5, 2),
    fontSize: '0.875rem',

    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}));