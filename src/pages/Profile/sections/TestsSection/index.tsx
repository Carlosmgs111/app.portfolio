import { GenerateImage } from "./GenerateImages";
import { MyDropzone } from "./UploadImage";
import { Telport } from "./Telport";
import { Slider } from "../../../../components/Slider";
import {
  ReactSVG,
  JestSVG,
  StyledComponentsSVG,
  NextjsSVG,
  ReactRouterSVG,
  WebpackSVG,
  AxiosSVG,
  LogoSVG,
} from "./../../../../icons";

export function TestsSection() {
  const firstSlides = [
    <LogoSVG></LogoSVG>,
    <JestSVG></JestSVG>,
    <ReactSVG></ReactSVG>,
    <StyledComponentsSVG></StyledComponentsSVG>,
    <NextjsSVG></NextjsSVG>,
    <ReactRouterSVG></ReactRouterSVG>,
    <WebpackSVG></WebpackSVG>,
    <AxiosSVG></AxiosSVG>,
  ];
  return (
    <div
      style={{
        padding: "2rem",
        display: "flex",
        width: "100%",
        alignSelf: "center",
        minHeight: "30rem",
        flexDirection: "column",
        alignItems: "center",
        gap: "4rem",
        // justifyContent: "center",
      }}
    >
      <h1 style={{ width: "100%", textAlign: "center" }}>Seccion de pruebas</h1>
      <Slider>{firstSlides}</Slider>
      <LogoSVG></LogoSVG>
      <GenerateImage></GenerateImage>
      <MyDropzone />
      <Telport />
    </div>
  );
}
