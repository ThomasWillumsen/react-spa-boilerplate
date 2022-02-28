// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      white: string;
      black: string;
    };

    sizes: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
      xxxl: string;
    };
  }
}