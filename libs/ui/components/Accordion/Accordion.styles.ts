import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme) => ({
  root: {
    borderRadius: 10,
    marginBottom: 10,
    boxShadow: `0 4px 12px ${theme.palette.shadow?.light || 'rgba(0,0,0,0.1)'}`,
    overflow: 'hidden',

    '&:before': {
      display: 'none',
    },
  },

  title: {
    fontWeight: 600,
    fontSize: '1rem',
  },

  details: {
    padding: 10,
  },
}));