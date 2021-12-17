export const LOGIN = 'LOG_IN';
export const LOGOUT = 'LOG_OUT';
export const REGISTER = 'REGISTER';
export const TOKEN = 'token';
export const text = {
  default: '8자 이상 영어, 숫자, 기호를 입력해주세요.',
  fail: '이메일과 비밀번호를 확인해주세요.',
  email: 'email',
  emailReg: /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/, //eslint-disable-line
  emailInput: '이메일을 입력해주세요.',
  emailFormat: '이메일 형식을 확인해주세요.',
  overlap: {
    email: '이메일이 중복됩니다.',
    nickname: '닉네임이 중복됩니다.',
  },
  password: 'password',
  passwordCheck: 'passwordCheck',
  passwordInput: '비밀번호 형식을 확인해주세요.',
  passwordFail: '비밀번호를 확인해주세요.',
  passwordReg: /^[A-Za-z0-9]{6,12}$/,
  nickname: 'nickname',
  nicknameFail: '닉네임을 확인해주세요.',
  nicknameReg: /^[가-힣ㄱ-ㅎa-zA-Z0-9._ -]{2,}$/,
};
export const HEADERTOKEN = 'x-auth-token';
