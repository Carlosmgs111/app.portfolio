import { GenerateImage } from "./GenerateImages";
import { MyDropzone } from "./UploadImage";
import { Telport } from "./Telport";
import { Slider } from "../../../../components/Slider";
import {
  SVGContainer,
  ReactSVG,
  JestSVG,
  StyledComponentsSVG,
  NextjsSVG,
  ReactRouterSVG,
  WebpackSVG,
  AxiosSVG,
} from "./../../../../icons";

export function TestsSection() {
  const firstSlides = [
    <SVGContainer>
      <JestSVG></JestSVG>
    </SVGContainer>,
    <SVGContainer>
      <ReactSVG></ReactSVG>
    </SVGContainer>,
    <SVGContainer>
      <StyledComponentsSVG></StyledComponentsSVG>
    </SVGContainer>,
    <SVGContainer>
      <NextjsSVG></NextjsSVG>
    </SVGContainer>,
    <SVGContainer>
      <ReactRouterSVG></ReactRouterSVG>
    </SVGContainer>,
    <SVGContainer>
      <WebpackSVG></WebpackSVG>
    </SVGContainer>,
    <SVGContainer>
      <AxiosSVG></AxiosSVG>
    </SVGContainer>,
  ];
  return (
    <div
      style={{
        padding: "2rem",
        display: "flex",
        // width: "30%",
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
      <GenerateImage></GenerateImage>
      <MyDropzone />
      <Telport />
    </div>
  );
}
