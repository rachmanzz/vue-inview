export const IsDefine = (v: any): boolean => typeof v !== "undefined";
export const IsString = (v: any): boolean => typeof v !== "string";
export const IsArray = (v: any): boolean => Array.isArray(v);
export const IsObject = (v: any): boolean => !IsArray(v) && typeof v === "object";

