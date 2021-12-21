export const LOGIN = 'LOG_IN';
export const LOGOUT = 'LOG_OUT';
export const REGISTER = 'REGISTER';
export const USERCHECK = 'USER_CHECK';
export const TOKEN = 'token';
export const TEXT = {
  EMAIL: 'email',
  PASSWORD: 'password',
  PASSWORDCHECK: 'passwordCheck',
  NICKNAME: 'nickname',
};
export const validation = {
  email: /^.+@.+\..+$/,
  password: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{6,100}$/,
  nickname: /^[가-힣ㄱ-ㅎa-zA-Z0-9._ -]{2,}$/,
};
export const errorMsg = {
  email: '이메일 형식을 확인해주세요.',
  password: '비밀번호 형식을 확인해주세요.',
  nickname: '닉네임 두글자 이상 써주세요.',
  passwordConfirm: '비밀번호가 일치하지 않습니다.',
};
export const failMsg = {
  login: '로그인 실패! 이메일과 비밀번호를 확인해주세요.',
  register: '회원가입 실패! 회원가입 정보들을 확인해주세요.',
};
export const overlapMsg = {
  email: '이메일이 중복됩니다. 다시 작성해주세요.',
  nickname: '닉네임이 중복됩니다. 다시 작성해주세요.',
};
export const text = {
  EMAIL: 'email',
  default: '6자 이상 영어 대소문자, 숫자를 입력해주세요.',
  fail: '이메일과 비밀번호를 확인해주세요.',
  email: 'email',
  emailReg: /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/, //eslint-disable-line
  emailInput: '이메일을 확인해주세요.',
  emailFormat: '이메일 형식을 확인해주세요.',
  overlap: {
    email: '이메일이 중복됩니다.',
    nickname: '닉네임이 중복됩니다.',
    check: '중복확인을 해주세요.',
  },
  password: 'password',
  passwordCheck: 'passwordCheck',
  passwordConfirm: '비밀번호가 틀립니다.',
  passwordInput: '비밀번호 형식을 확인해주세요.',
  passwordFail: '비밀번호를 확인해주세요.',
  passwordReg: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{6,100}$/,
  nickname: 'nickname',
  nicknameInput: '닉네임을 확인해주세요.',
  nicknameFail: '닉네임을 확인해주세요.',
  nicknameReg: /^[가-힣ㄱ-ㅎa-zA-Z0-9._ -]{2,}$/,
};
export const HEADERTOKEN = 'x-auth-token';
export const USER_ADDRESS_KEY = 'user-address';
