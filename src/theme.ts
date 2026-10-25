export const colors = {
  cream: '#FFF9EF',
  paper: '#FFFDF8',
  paperDeep: '#FDF1E2',
  ink: '#2C1C15',
  inkSoft: '#5E493D',
  muted: '#7B6558',
  brown: '#A76545',
  brownDeep: '#7C472F',
  caramel: '#D99A6E',
  coral: '#D95441',
  coralDeep: '#B93F30',
  coralSoft: '#F9C8BC',
  blush: '#F7B6AB',
  pinkWash: '#FBE5DE',
  butter: '#F6D992',
  butterSoft: '#FCF0D0',
  sage: '#839A74',
  white: '#FFFFFF',
  // New accent colours for the two-party flow
  lavender: '#C3B1E1',
  lavenderSoft: '#E8E0F2',
  mint: '#A8D5BA',
  mintSoft: '#E6F0E8',
  sky: '#B7D6E8',
  skySoft: '#E8F0F6',
} as const;

export const fonts = {
  display: 'Fraunces_700Bold',
  displaySoft: 'Fraunces_600SemiBold',
  displayItalic: 'Fraunces_600SemiBold_Italic',
  body: 'Manrope_500Medium',
  bodyRegular: 'Manrope_400Regular',
  bodySemiBold: 'Manrope_600SemiBold',
  bodyBold: 'Manrope_700Bold',
  bodyBlack: 'Manrope_800ExtraBold',
} as const;

export const shadow = {
  card: {
    shadowColor: '#6F3B27',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 7,
  },
  button: {
    shadowColor: '#8E3628',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.2,
    shadowRadius: 14,
    elevation: 6,
  },
} as const;

export const screenPadding = 24;
