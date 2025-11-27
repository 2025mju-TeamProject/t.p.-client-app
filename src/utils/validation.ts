// 아이디: 영어 소문자 + 숫자 6~20자
export const validateId = (value: string) => {
  const regex = /^[a-z0-9]{6,20}$/;
  return regex.test(value);
};

// 비밀번호: 8~20자, 영어+숫자+특수문자 포함
export const validatePassword = (value: string) => {
  const regex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=?<>])[A-Za-z\d!@#$%^&*()_\-+=?<>]{8,20}$/;
  return regex.test(value);
};

// 비밀번호 확인
export const validateCheckPassword = (pw: string, check: string) => {
  return pw === check;
};

// 휴대폰 번호: 숫자 10~11자리
export const validatePhone = (value: string) => {
  const regex = /^[0-9]{10,11}$/;
  return regex.test(value);
};
