export const areaChecker = (area) => {
  const usernameFormat = /^[a-zA-Z\s-]+$/;
  if (usernameFormat.test(area)) {
    return true;
  } else {
    return false;
  }
};

export const cityOrCountryChecker = (inp) => {
  const usernameFormat = /^[a-zA-Z\s-]+$/;
  if (usernameFormat.test(inp)) {
    return true;
  } else {
    return false;
  }
};
export const phoneNumberChecker = (phoneNumber) => {
  const usernameFormat = /^0\d{10}$/;
  if (usernameFormat.test(phoneNumber)) {
    return true;
  } else {
    return false;
  }
};
export const emailChecker = (email) => {
  const usernameFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (usernameFormat.test(email)) {
    return true;
  } else {
    return false;
  }
};
export const passwordChecker = (password) => {
  const usernameFormat = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
  if (usernameFormat.test(password)) {
    return true;
  } else {
    return false;
  }
};
