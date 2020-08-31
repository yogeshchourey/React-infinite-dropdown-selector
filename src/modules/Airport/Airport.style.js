const styles = theme => ({
    paperRoot: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        maxHeight: '3em'
    },
    tableResponsive: {
        overflow: 'auto',
        overflowY: 'hidden'
    },
    tableParent: {
        width: '100%'
    },
    table: {
        lineHeight: '50px',
        textAlign: 'center',
        width: 'auto'
    },
    verify: {
        lineHeight: '20px',
        whiteSpace: 'pre-wrap'
    },
    info: {
        color: theme.palette.grey['500'],
        textAlign: 'right',
        fontStyle: 'italic',
        fontSize: '14px'
    },
    scrollableTd: {
        overflowY: 'scroll',
        maxHeight: '6em',
        width: '100%',
        textAlign: 'justify',
        overflowX: 'hidden',
        overflowX: 'auto'
    },
    menu: {
        maxHeight: '6em'
    },
    typoGraphyInline: {
        display: 'inline'
    },
    selectText: {
        minWidth: '10em'
    },
    cardLayout: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2
    }
});

export default styles;
