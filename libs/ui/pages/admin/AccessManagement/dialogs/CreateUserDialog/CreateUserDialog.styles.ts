import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme) => ({
    dialogPaper: {
        borderRadius: (theme.shape.borderRadius as number) * 3,
        overflow: 'hidden',
        '& .MuiFormLabel-asterisk': {
            color: theme.palette.error.main,
        },
    },

    header: {
        background: theme.palette.gradient.headerBlueDark,
        padding: theme.spacing(3, 3, 2.5),
        color: theme.palette.common.white,
        position: 'relative',
    },

    badgeRow: {
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing(1),
        marginBottom: theme.spacing(2),
    },

    badgeIcon: {
        fontSize: 16,
        color: theme.palette.common.white70,
    },

    badgeLabel: {
        color: theme.palette.common.white70,
        letterSpacing: 1,
        textTransform: 'uppercase' as const,
    },

    draftChip: {
        backgroundColor: theme.palette.warning.accentAlpha20,
        color: theme.palette.warning.accent,
        fontWeight: 600,
        border: `1px solid ${theme.palette.warning.accentAlpha40}`,
        height: 20,
        fontSize: '0.7rem',

        '& .MuiChip-icon': {
            color: theme.palette.warning.accent,
            fontSize: 12,
        },
    },

    userCard: {
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing(2),
    },

    headerAvatar: {
        width: 56,
        height: 56,
        fontSize: '1.6rem',
        backgroundColor: theme.palette.common.white25,
        color: theme.palette.common.white,
        border: `2px solid ${theme.palette.common.white50}`,
    },

    headerTitle: {
        color: theme.palette.common.white,
        lineHeight: 1.2,
    },

    headerSubtitle: {
        color: theme.palette.common.white75,
        marginTop: theme.spacing(0.25),
    },

    closeBtn: {
        position: 'absolute',
        top: 12,
        right: 12,
        color: theme.palette.common.white70,

        '&:hover': {
            color: theme.palette.common.white,
            backgroundColor: theme.palette.common.white10,
        },
    },

    actions: {
        padding: theme.spacing(2, 3),
        gap: theme.spacing(1.5),

        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            alignItems: 'stretch',
            padding: theme.spacing(1.5, 2),

            '& .MuiButton-root': {
                width: '100%',
                margin: 0,
            },
        },
    },

    monoInput: {
        '& input': {
            fontFamily: 'monospace',
        },
    },
}));