export const LOGIN = 'LOG_IN';
export const LOGOUT = 'LOG_OUT';
export const REGISTER = 'REGISTER';
export const USERCHECK = 'USER_CHECK';
export const MODIFYNICKNAME = 'MODIFY_NICKNAME';
export const MODIFY = 'MODIFY';
export const TOKEN = 'token';
export const HEADERTOKEN = 'x-auth-token';
export const USER_ADDRESS_KEY = 'user-address';
export const LOADING = 'LOADING';

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
  passwordConfirm: '비밀번호 확인 실패! 비밀번호를 확인해주세요.',
  profileEdit: {
    submit: '프로필 수정 실패! 변경내용을 확인해주세요.',
    passwordConfirm: '비밀번호 확인을 눌러주세요.',
    nickname: '닉네임 확인을 눌러주세요.',
  },
};
export const overlapMsg = {
  email: '이메일이 중복됩니다. 다시 작성해주세요.',
  nickname: '닉네임이 중복됩니다. 다시 작성해주세요.',
};
export const text = {
  default: '6자 이상 영어 대소문자, 숫자를 입력해주세요.',
};
