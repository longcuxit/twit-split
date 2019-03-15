export function ErrorHandle(name, message) {
  const err = Error(message);
  err.name = name;
  return err;
}