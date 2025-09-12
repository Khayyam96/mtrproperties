// types/antd-country-phone-input.d.ts
import * as React from "react";
import type { InputProps } from "antd";

declare module "antd-country-phone-input" {
  export type CountryPhoneValue = {
    short?: string;           // ISO-2, məsələn "AE"
    code: string | number;    // dial code, məsələn "971"
    phone: string;            // istifadəçi nömrəsi (prefixsiz)
  };

  export interface CountryPhoneInputProps
    extends Omit<InputProps, "value" | "onChange"> {
    value?: CountryPhoneValue;
    onChange?: (value: CountryPhoneValue) => void;
    showSearch?: boolean;
    onlyCountries?: string[];
    preferredCountries?: string[];
    className?: string;
    style?: React.CSSProperties;
    disabled?: boolean;
    placeholder?: string;
  }

  const CountryPhoneInput: React.FC<CountryPhoneInputProps>;
  export default CountryPhoneInput;
}

declare module "antd-country-phone-input/dist/index.css";
