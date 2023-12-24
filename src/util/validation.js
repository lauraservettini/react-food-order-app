export function isEmail(value) {
  return value.includes("@");
}

export function isNotEmpty(value) {
  return value.trim() !== "";
}
