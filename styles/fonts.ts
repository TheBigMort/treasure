import { AtRule } from "csstype";
type FontFace = AtRule.FontFace;

export const franklinGothicRegular: FontFace = {
  fontFamily: "Franklin Gothic",
  fontWeight: "400",
  fontStyle: "normal",
  fontDisplay: "swap",
  src: `url('/fonts/FranklinGothicRegular.ttf') format('ttf');`,
};

export const franklinGothicBold: FontFace = {
  fontFamily: "Franklin Gothic",
  fontWeight: "700",
  fontStyle: "normal",
  fontDisplay: "swap",
  src: `url('/fonts/FranklinGothicBold.ttf') format('ttf');`,
};

export const franklinGothicHeavy: FontFace = {
  fontFamily: "Franklin Gothic",
  fontWeight: "900",
  fontStyle: "normal",
  fontDisplay: "swap",
  src: `url('/fonts/Franklin_Gothic_Heavy_Regular.ttf') format('ttf');`,
};
export const full = {
  height: "auto",
  width: "auto"
}

// export const franklinGothicATFRegular: FontFace = {
//   fontFamily: "Franklin Gothic ATF",
//   // fontWeight: "400",
//   fontStyle: "normal",
//   fontDisplay: "swap",
//   src: `url('/fonts/FranklinGothicATFRegular.otf') format('otf');`,
// };
