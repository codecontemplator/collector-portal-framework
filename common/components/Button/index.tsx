import * as React from 'react';
import glamorous, { CSSProperties } from 'glamorous';
import { colors, breakpoints } from '../../../theme';
import { lighten } from 'polished';

/**
 * The SVG was made with http://loading.io
 */
const whiteSpinner = require('./spinner-white.svg');
const purpleSpinner = require('./spinner-purple.svg');

const icons = {
    'bank-id': require('./icons/bank-id.svg'),
    plus: require('./icons/plus.svg'),
    cross: require('./icons/cross.svg'),
};

type ButtonType = 'primary' | 'secondary' | 'warn' | 'text';
type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonIcon = 'bank-id' | 'plus' | 'cross';

interface Props {
    type?: ButtonType;
    size?: ButtonSize;
    icon?: ButtonIcon;
    onClick?: () => void;
    disabled?: boolean;
    loading?: boolean;
}

interface IconProps {
    size?: ButtonSize;
    icon: ButtonIcon;
}

const ButtonElement: any = glamorous.button<Props>(
    {
        fontFamily: 'inherit',
        whiteSpace: 'nowrap',
        textDecoration: 'none',
        textAlign: 'center',
        overflow: 'hidden',
        border: 0,
        borderRadius: 50,
        transition: 'background-color 100ms',

        '&:disabled': {
            backgroundColor: colors.mediumGray,
            color: colors.lightGray,
        },

        '&:not(:disabled)': {
            cursor: 'pointer',
        },
    },
    ({ size, type, loading, icon }) => {
        const styles: CSSProperties = {
            ...getSizeStyles(size),
            ...getTypeStyles(type),
            ...getLoadingStyles(loading, type, size),
        };

        if (icon) {
            styles.display = 'flex';
            styles.alignItems = 'center';
            styles.justifyContent = 'center';
        }

        return styles;
    },
);

// tslint:disable-next-line:no-any Will not fix due to shortcoming in glamorous API
const Icon: any = glamorous.span<IconProps>(
    {
        display: 'inline-block',
        marginRight: '.5em',
        backgroundRepeat: 'no-repeat',
    },
    ({ icon, size }) => {
        return {
            backgroundImage: `url(${icons[icon]})`,
            backgroundSize: '100%',
            ...getIconSizeStyles(size),
        };
    },
);

const getTypeStyles = (type?: ButtonType): CSSProperties => {
    switch (type) {
        case 'warn':
            return {
                ...background(colors.red),
                color: colors.white,
            };
        case 'secondary':
            return {
                ...background(colors.offWhite),
                color: colors.black,
                border: `1px solid ${colors.offWhite}`,

                '&:hover:not(:disabled)': {
                    backgroundColor: lighten(0.02, colors.offWhite),
                },

                '&:active:not(:disabled)': {
                    backgroundColor: lighten(0.04, colors.offWhite),
                },
            };
        case 'text':
            return {
                backgroundColor: 'transparent',
                color: colors.purple,

                minWidth: 0,
                paddingLeft: 12,
                paddingRight: 12,

                '&:hover:not(:disabled)': {
                    color: lighten(0.1, colors.purple),
                    textDecoration: 'underline',
                },

                '&:active:not(:disabled)': {
                    color: lighten(0.2, colors.purple),
                },

                '&:disabled': {
                    backgroundColor: 'transparent',
                }
            };
        case 'primary':
        default:
            return {
                ...background(colors.purple),
                color: colors.white,
            };
    }
};

const getSizeStyles = (size?: ButtonSize): CSSProperties => {
    const medium: CSSProperties = {
        fontSize: 18,
        lineHeight: '24px',
        fontWeight: 500,
        minWidth: 160,
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 24,
        paddingRight: 24,
    };

    switch (size) {
        case 'small':
            return {
                fontSize: 16,
                lineHeight: '24px',
                fontWeight: 500,
                minWidth: 80,
                paddingTop: 4,
                paddingBottom: 4,
                paddingLeft: 12,
                paddingRight: 12,
            };
        case 'large':
            return {
                fontSize: 21,
                lineHeight: '32px',
                fontWeight: 500,
                minWidth: 200,
                paddingTop: 12,
                paddingBottom: 12,
                paddingLeft: 32,
                paddingRight: 32,

                [breakpoints.mobileAndLower]: medium,
            };
        case 'medium':
        default:
            return medium;
    }
};

const getLoadingStyles = (loading?: boolean, type?: ButtonType, size?: ButtonSize): CSSProperties => {
    let styles: CSSProperties = {};

    if (loading) {
        styles = {
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            pointerEvents: 'none',

            '> span': {
                visibility: 'hidden',
            },
        };

        switch (type) {
            case 'warn':
                styles.backgroundImage = `url(${whiteSpinner})`;
                break;
            case 'secondary':
                styles.backgroundImage = `url(${purpleSpinner})`;
                break;
            case 'text':
                styles.backgroundImage = `url(${purpleSpinner})`;
                break;
            case 'primary':
            default:
                styles.backgroundImage = `url(${whiteSpinner})`;
                break;
        }

        switch (size) {
            case 'small':
                styles.backgroundSize = 22;
                break;
            case 'large':
                styles.backgroundSize = 46;
                break;
            case 'medium':
            default:
                styles.backgroundSize = 36;
                break;
        }
    }

    return styles;
};

const getIconSizeStyles = (size?: ButtonSize): CSSProperties => {
    switch (size) {
        case 'small':
            return {
                height: 18,
                width: 18,
            };
        case 'large':
            return {
                height: 32,
                width: 32,
            };
        case 'medium':
        default:
            return {
                height: 24,
                width: 24,
            };
    }
};

const background = (backgroundColor: string): CSSProperties => ({
    backgroundColor,

    '&:hover:not(:disabled)': {
        backgroundColor: lighten(0.1, backgroundColor),
    },

    '&:active:not(:disabled)': {
        backgroundColor: lighten(0.2, backgroundColor),
    },
});

export const Button: React.StatelessComponent<Props> = ({ loading, children, icon, size, ...rest }) => {
    return (
        <ButtonElement aria-busy={loading} loading={loading} icon={icon} size={size} {...rest}>
            {icon && <Icon icon={icon} size={size} />}
            <span>{children}</span>
        </ButtonElement>
    );
};

Button.displayName = 'Collector.Button';
