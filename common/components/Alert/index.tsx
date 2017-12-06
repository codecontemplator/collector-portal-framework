import * as React from 'react';
import glamorous from 'glamorous';
import { colors, borderRadius } from '../../../theme';
import { CSSProperties } from 'react';
import { keyframes } from 'glamor';

const largeIcons = {
    error: require('./icons/warning-filled.svg'),
    warning: require('./icons/warning.svg'),
    info: require('./icons/info.svg'),
    success: require('./icons/success.svg'),
};

const smallIcons = {
    error: require('./icons/warning-red.svg'),
    warning: require('./icons/warning.svg'),
    info: require('./icons/info-black.svg'),
    success: require('./icons/success-black.svg'),
};

type Size = 'small' | 'large';
type Type = 'error' | 'warning' | 'info' | 'success';

export const AlertContainer = glamorous.div<ErrorContainerProps>(
    {
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left center',
        borderRadius: borderRadius.small,
        display: 'inline-block',
        textAlign: 'left',
        boxSizing: 'border-box',
        width: '100%',
        maxWidth: 500,
    },
    ({ type, alertSize, fadeIn }) => ({
        ...getStyle(type, alertSize),
        ...getAnimation(fadeIn),
    } as {})
);

const getStyle = (type: Type, alertSize: Size): CSSProperties => {
    const backgroundColors = {
        error: colors.red,
        warning: colors.yellow,
        info: colors.blue,
        success: colors.green,
    };

    const textColors = {
        error: colors.white,
        warning: colors.black,
        info: colors.white,
        success: colors.white,
    };

    switch (alertSize) {
        case 'small':
            return {
                backgroundPositionX: 0,
                backgroundImage: `url(${smallIcons[type]})`,
                backgroundColor: 'transparent',
                color: 'inherit',
                fontWeight: 400,
                backgroundSize: '16px 16px',
                padding: 0,
                paddingLeft: 24,
                marginBottom: 0,
            };
        case 'large':
        default:
            return {
                backgroundPositionX: 12,
                backgroundImage: `url(${largeIcons[type]})`,
                backgroundColor: backgroundColors[type],
                color: textColors[type],
                fontWeight: 500,
                backgroundSize: '24px 24px',
                padding: 10,
                paddingLeft: 48,
                marginBottom: '1.25em',
            };
    }
};

const getAnimation = (fadeIn?: boolean): CSSProperties => {
    const fadeInFrames = keyframes({
        '0%': { opacity: 0 },
        '10%': { opacity: 1 },
        '90%': { opacity: 1 },
        '100%': { opacity: 0 },
    });

    return fadeIn ? { animation: `${fadeInFrames} 3000ms forwards ease-in-out` } : {};
};

interface Props {
    message?: string;
    type: Type;
    alertSize?: Size;
    fadeIn?: boolean;
}

interface ErrorContainerProps {
    alertSize: Size;
    type: Type;
    fadeIn?: boolean;
}

export const Alert: React.StatelessComponent<Props> = ({ message = 'Ett fel uppstod', alertSize = 'large', type, fadeIn }) => (
    <AlertContainer role="alert" alertSize={alertSize} type={type} fadeIn={fadeIn}>
        {message}
    </AlertContainer>
);

Alert.displayName = 'Collector.Alert';
