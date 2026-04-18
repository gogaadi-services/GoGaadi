import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme) => ({
    header: {
        background: theme.palette.gradient.headerBlueDark,
        padding: theme.spacing(3, 3, 2.5),
        color: theme.palette.common.white,
        position: 'relative',
        flexShrink: 0,
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

    recordsChip: {
        backgroundColor: theme.palette.common.white15,
        color: theme.palette.common.white,
        fontWeight: 600,
        height: 20,
        fontSize: '0.7rem',
        border: `1px solid ${theme.palette.common.white25}`,
    },

    filteredChip: {
        backgroundColor: theme.palette.warning.accentAlpha25,
        color: theme.palette.warning.accent,
        fontWeight: 600,
        height: 20,
        fontSize: '0.7rem',
        border: `1px solid ${theme.palette.warning.accentAlpha40}`,
    },

    userCard: {
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing(2),
    },

    headerAvatar: {
        width: 56,
        height: 56,
        fontSize: '1.4rem',
        fontWeight: 700,
        backgroundColor: theme.palette.common.white25,
        color: theme.palette.common.white,
        border: `2px solid ${theme.palette.common.white50}`,
    },

    headerTitle: {
        color: theme.palette.common.white,
        lineHeight: 1.2,
    },

    headerEmail: {
        color: theme.palette.common.white75,
        marginTop: theme.spacing(0.25),
    },

    chipRowInline: {
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing(1),
        marginTop: theme.spacing(1),
        flexWrap: 'wrap',
    },

    roleChip: {
        backgroundColor: theme.palette.common.white20,
        color: theme.palette.common.white,
        fontWeight: 600,
        border: `1px solid ${theme.palette.common.white35}`,
    },

    metaCaption: {
        color: theme.palette.common.white50,
    },

    windowControls: {
        position: 'absolute',
        top: 10,
        right: 10,
        display: 'flex',
        gap: theme.spacing(0.5),
    },

    filterBtnActive: {
        color: theme.palette.warning.accent,
        '&:hover': {
            color: theme.palette.common.white,
            backgroundColor: theme.palette.common.white10,
        },
    },

    windowCtrlBtn: {
        color: theme.palette.common.white70,
        '&:hover': {
            color: theme.palette.common.white,
            backgroundColor: theme.palette.common.white10,
        },
    },

    filterToolbar: {
        padding: theme.spacing(1.75, 2.5),
        backgroundColor: theme.palette.grey[50],
        borderBottom: '1px solid',
        borderColor: theme.palette.divider,
        flexShrink: 0,
    },

    activeFiltersRow: {
        marginTop: theme.spacing(1.25),
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing(0.75),
        flexWrap: 'wrap',
    },

    dialogContent: {
        padding: 0,
        flex: 1,
        overflow: 'auto',
    },

    tableHeaderCell: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.common.white,
        fontWeight: 700,
        whiteSpace: 'nowrap',
        fontSize: '0.78rem',
        paddingTop: theme.spacing(1.25),
        paddingBottom: theme.spacing(1.25),
    },

    tableSortLabel: {
        color: `${theme.palette.common.white} !important`,
        '&:hover': { color: theme.palette.common.white },
        '& .MuiTableSortLabel-icon': {
            color: `${theme.palette.common.white} !important`,
        },
        '&.Mui-active': { color: theme.palette.common.white },
        '&.Mui-active .MuiTableSortLabel-icon': {
            color: `${theme.palette.common.white} !important`,
        },
    },

    tableRow: {
        '&:nth-of-type(even)': {
            backgroundColor: theme.palette.grey[50],
        },
        '&:hover': {
            backgroundColor: theme.palette.primary.blueAlpha04,
        },
    },

    cellDate: {
        whiteSpace: 'nowrap',
        fontSize: '0.78rem',
        color: theme.palette.text.secondary,
    },

    cellFieldName: {
        fontWeight: 600,
        fontSize: '0.82rem',
        whiteSpace: 'nowrap',
    },

    cellPrevValue: {
        maxWidth: 180,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        fontSize: '0.78rem',
        fontFamily: 'monospace',
        color: theme.palette.error.main,
    },

    cellNewValue: {
        maxWidth: 180,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        fontSize: '0.78rem',
        fontFamily: 'monospace',
        color: theme.palette.success.main,
    },

    cellChangedBy: {
        fontWeight: 500,
        fontSize: '0.82rem',
        whiteSpace: 'nowrap',
    },

    cellReasonNote: {
        maxWidth: 220,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        fontSize: '0.78rem',
        color: theme.palette.text.secondary,
    },

    searchIcon: {
        fontSize: '1rem',
        color: theme.palette.text.secondary,
    },

    emptyStateIcon: {
        fontSize: 52,
        color: theme.palette.text.disabled,
        marginBottom: theme.spacing(1.5),
    },

    footer: {
        padding: theme.spacing(1, 2),
        borderTop: '1px solid',
        borderColor: theme.palette.divider,
        display: 'flex',
        alignItems: 'center',
        backgroundColor: theme.palette.grey[50],
        flexShrink: 0,
        gap: theme.spacing(1),
    },

    pagination: {
        '& .MuiTablePagination-toolbar': {
            minHeight: 'unset',
            paddingTop: theme.spacing(0.25),
            paddingBottom: theme.spacing(0.25),
        },
        '& .MuiTablePagination-displayedRows': {
            fontSize: '0.78rem',
        },
        '& .MuiTablePagination-selectLabel': {
            fontSize: '0.78rem',
        },
    },
}));