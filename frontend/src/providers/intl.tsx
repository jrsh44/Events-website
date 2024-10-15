import { createIntl, RawIntlProvider } from "react-intl";
import { pl } from "../translations/pl";
import { ReactNode } from "react";

export const locale = "pl-PL";

// eslint-disable-next-line react-refresh/only-export-components
export let t: (trKey: string, trKeyValues?: Record<string, string>) => string;

export const IntlProvider = (props: { children: ReactNode }) => {
  const intl = createIntl({ locale, messages: pl });

  t = (trKey, trKeyValues) => intl.formatMessage({ id: trKey }, trKeyValues);

  return <RawIntlProvider value={intl}>{props.children}</RawIntlProvider>;
};
