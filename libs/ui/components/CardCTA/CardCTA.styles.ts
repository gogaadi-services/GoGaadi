import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme) => ({
  root: {
    borderRadius: 12,
    overflow: 'hidden',
    boxShadow: `0 4px 12px ${theme.palette?.shadow?.medium || 'rgba(0,0,0,0.15)'
      }`,
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',

    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: `0 8px 24px ${theme.palette?.shadow?.dark || 'rgba(0,0,0,0.3)'
        }`,
    },
  },

  media: {
    height: 200,
  },

  content: {
    padding: theme.spacing(3),
  },

  title: {
    fontWeight: 700,
    fontSize: '1.25rem',
    marginBottom: theme.spacing(1),
  },

  description: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(2),
  },
}));