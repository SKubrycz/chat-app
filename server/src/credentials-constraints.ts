export const MIN_LOGIN_LENGTH = 3;
export const MIN_PASSWORD_LENGTH = 8;
export const PASSWORD_REGEX = new RegExp(`^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\\W)(?!.* ).{${MIN_PASSWORD_LENGTH},}$`)