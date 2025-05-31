export const emailValidation = (email: string): string | boolean => {
  const regex = /^[a-zA-Z0-9._s%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
  if (regex.test(email)) return true;
  return "Invalid email";
};
export const nameValidation = (name: string | undefined): string | boolean => {
  if (typeof name === "undefined" || name === "") return true;
  const regex = /^([a-zA-Zа-яА-ЯёЁ]+(?:-[a-zA-Zа-яА-ЯёЁ]+)?)$/u;
  if (name.length < 3) return "Name must have at least 3 characters";
  if (name.length > 14) return "Max name lenght 14 characters";
  if (regex.test(name)) return true;

  return "Invalid name";
};
export const ageValidation = (age: number): string | boolean => {
  if (age > 100 || age < 0) return "Invalid age";
  if (age < 18) return "Age must be more that 18";
  return true;
};
export const phoneValidation = (phone: string): string | boolean => {
  const regex = /^\+7\d{10}/;
  if (phone.length > 12) return "Invalid phone number";
  if (regex.test(phone)) return true;
  return "Invalid phone number";
};
export const balanceValidation = (
  balance: number | undefined
): string | boolean => {
  if (typeof balance === "undefined") return true;
  if (balance < 0 || balance > 999999999) return "Invalid balance";
  return true;
};
export const telegramValidation = (
  telegram: string | undefined
): string | boolean => {
  if (typeof telegram === "undefined" || telegram === "") return true;
  const regex = /^@[a-zA-Z0-9]+/;
  if (regex.test(telegram)) return true;
  return "Invalid telegram";
};
export const dateValidation = (date: string | undefined): string | boolean => {
  if (typeof date === "undefined") return true;
  const today = new Date();
  const dateSepareted = date.split("-");
  const year = Number(dateSepareted[0]);
  const month = Number(dateSepareted[1]);
  const day = Number(dateSepareted[2]);
  if (year > today.getFullYear()) {
    return "Invalid date";
  }

  if (year === today.getFullYear() && month > today.getMonth() + 1) {
    return "Invalid date";
  }

  if (
    year === today.getFullYear() &&
    month === today.getMonth() + 1 &&
    day > today.getDate() + 1
  ) {
    return "Invalid date";
  }

  return true;
};
