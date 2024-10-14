import "styled-components";
import { TTheme } from "./consts/theme";

declare module "styled-components" {
  export interface DefaultTheme extends TTheme {
    additionalProperty?: string;
  }
}
