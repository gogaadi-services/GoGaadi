import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme) => ({
    root: {
        borderRadius: 8,
        textTransform: 'none',
        fontWeight: 600,
        padding: theme.spacing(1.5, 3),
        fontSize: '1rem',
        boxShadow: 'none',

        '&:hover': {
            boxShadow: `0 4px 12px ${theme.palette?.shadow?.dark || 'rgba(0,0,0,0.2)'
                }`,
        },

        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(1, 2),
            fontSize: '0.875rem',
        },
    },

    iconStart: {
        marginRight: theme.spacing(1),
    },

    iconEnd: {
        marginLeft: theme.spacing(1),
    },
}));