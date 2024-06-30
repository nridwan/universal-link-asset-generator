export interface FormField<T> {
  value: T;
  edited?: boolean;
  error?: string;
}

export function isFormFieldValid(
  field: FormField<any>,
  {
    mustEdited = true,
    checkError = true,
  }: { mustEdited?: boolean; checkError?: boolean } = {}
): boolean {
  return (!checkError || !field.error) && (!mustEdited || !!field.edited);
}

export function isFormFieldArrayValid(
  fields: FormField<any>[],
  {
    mustEdited = true,
    checkError = true,
  }: { mustEdited?: boolean; checkError?: boolean } = {}
): boolean {
  return fields.every((value) =>
    isFormFieldValid(value, { mustEdited, checkError })
  );
}
