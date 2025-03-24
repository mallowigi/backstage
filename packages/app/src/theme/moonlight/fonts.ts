import MulishFont from '../../assets/fonts/mulish.ttf';

export const mulishFont = {
  fontFamily: 'Mulish',
  fontStyle: 'normal',
  fontWeight: 400,
  src: `
    local('Mulish'),
    url(${MulishFont}) format('ttf'),
  `,
};
