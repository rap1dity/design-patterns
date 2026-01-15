export function hasOwnProperty<
  TObject extends object,
>(
  object: TObject,
  key: PropertyKey,
): key is keyof TObject {
  return Object.prototype.hasOwnProperty.call(object, key);
}
