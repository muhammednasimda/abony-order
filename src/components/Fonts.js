import { Global } from "@emotion/react";

const Fonts = () => (
  <Global
    styles={`
    @font-face {
      font-family: 'Open Sans';
      font-style: normal;
      font-weight: 700;
      font-display: swap;
      src: url(https://fonts.gstatic.com/s/opensans/v18/mem5YaGs126MiZpBA-UN7rgOX-hpOqc.woff2) format('woff2');
      unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
    }
    @font-face {
        font-family: "grotesk-regular";
        src: url("../assets/grotesk-regular.ttf"); /* IE9 Compat Modes */
      }
      @font-face {
        font-family: "grotesk-medium";
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url("../assets/grotesk-medium.ttf");

      }
      @font-face {
        font-family: "grotesk-bold";
        src: url("../assets/grotesk-bold.ttf");
      }
      `}
  />
);

export default Fonts;
