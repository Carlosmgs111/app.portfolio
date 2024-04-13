import { GenerateImage } from "./GenerateImages";
import { MyDropzone } from "./UploadImage";
import { Telport } from "./Telport";
import { Slider } from "../../../../components/Slider";
import { useTrackSidebar } from "../../../../hooks/useTrackSidebar";
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
  const [TrackSidebar, ElementWrapper]: any = useTrackSidebar();

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
        position: "relative",
        // justifyContent: "center",
      }}
    >
      <h1 style={{ width: "100%", textAlign: "center" }}>Seccion de pruebas</h1>
      <Slider>{firstSlides}</Slider>
      {/* <LogoSVG></LogoSVG> */}
      <GenerateImage></GenerateImage>
      <MyDropzone />
      <Telport />
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
        }}
      >
        <div
          style={{
            maxWidth: "20rem",
            maxHeight: "20rem",
            position: "sticky",
            top: "8rem",
            left: "0",
          }}
        >
          <TrackSidebar />
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6rem",
          }}
        >
          <ElementWrapper>
            <div id="logo">
              <LogoSVG />
            </div>
            <div id="jest">
              <JestSVG />
            </div>
            <div id="react">
              <ReactSVG />
            </div>
            <div id="styled">
              <StyledComponentsSVG />
            </div>
            <div id="next">
              <NextjsSVG />
            </div>
            <div id="axios ">
              <AxiosSVG />
            </div>
          </ElementWrapper>
        </div>
      </div>
    </div>
  );
}
