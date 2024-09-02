export interface ValidationField {
  fieldName: string;
  type: "STRING" | "EMAIL";
  options?: {
    required?: boolean;
  };
}
