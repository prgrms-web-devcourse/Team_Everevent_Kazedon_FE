import { Input } from '@components/atoms';
import { marginBottom } from '@utils/computed';
import React from 'react';

type Error = {
  [key: string]: any;
  password: boolean;
  passwordCheck: boolean;
};

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: boolean | Error;
}

const PasswordForm: React.FC<Props> = ({ onChange, error }) => {
  return (
    <>
      <Input
        sizeType="small"
        placeholder="비밀번호"
        type="password"
        name="password"
        onChange={onChange}
        error={typeof error === 'boolean' ? error : error.password}
        css={marginBottom(8)}
      />
      <Input
        sizeType="small"
        placeholder="비밀번호 확인"
        type="password"
        name="passwordCheck"
        onChange={onChange}
        error={typeof error === 'boolean' ? error : error.passwordCheck}
        css={marginBottom(8)}
      />
    </>
  );
};

export default PasswordForm;
