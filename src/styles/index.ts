export default {
  colors: {
    point: 'rgba(117, 189, 224, 1)',
    warning: 'rgba(147, 28, 40, 1)',
    confirm: 'rgba(57, 219, 178, 1)',
    background: 'rgba(255, 255, 255, 1)',
    red: '#f85b56',

    title: 'rgba(0, 0, 0, 1)',
    primary: 'rgba(41, 41, 41, 1)',
    secondary: 'rgba(69, 69, 69, 1)',
    placeholder: 'rgba(186, 186, 186, 1)',
    yellow: 'rgba(255, 221, 43, 1)',
  },

  fontSize: {
    micro: `0.6875rem`,
    small: `0.875rem`,
    medium: `1.125rem`,
    large: `1.5rem`,
  },

  fontStyle: {
    micro: () => `
      font-size: 0.6875rem;
      line-height: 120%;
    `,
    small: () => `
      font-size: 0.875rem;
      line-height: 120%;
    `,
    medium: () => `
      font-size: 1.125rem;
      line-height: 120%;
    `,
    large: () => `
      font-size: 1.5rem;
      line-height: 120%;
    `,
  },

  media: {
    screenMobile: '(max-width: 1200px)',
    screenDesktop: '(min-width: 1200px)',
    mobile: '(max-width: 480px)',
    sm: '(max-width: 767px)',
    md: '(min-width : 768px) and (max-width : 1200px)',
    lg: '(min-width: 1201px)',
  },

  cardBackgroundColors: {
    yellow: '#F8D498',
    orange: '#F8BC9B',
    pink: '#F2A9BB',
    yellowGreen: '#95EBB9',
    mint: '#7FE5DA',
  },
};
