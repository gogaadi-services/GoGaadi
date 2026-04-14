import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((_theme) => ({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'opacity 0.3s ease',

    '&:hover': {
      opacity: 0.8,
    },
  },

  image: {
    maxWidth: '100%',
    height: 'auto',
    objectFit: 'contain',
  },

  rounded: {
    borderRadius: 8,
  },

  circular: {
    borderRadius: '50%',
  },
}));