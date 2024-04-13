import { GenerateImage } from "./GenerateImages";
import { MyDropzone } from "./UploadImage";
import { Telport } from "./Telport";
import { Slider } from "../../../../components/Slider";
import { useTrackSidebar } from "../../../../hooks/useTrackSidebar";
import { useNearScreen } from "../../../../hooks/useNearScreen";
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
import { useEffect } from "react";

export function TestsSection() {
  const [TrackSidebar, ElementWrapper]: any = useTrackSidebar();

  console.log({ TrackSidebar });

  useEffect(() => {
    // setElements(["logo", "jest", "react", "styled", "next", "axiosref"]);
  }, []);

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
            <LogoSVG id="logo" />
            <JestSVG id="jest" />
            <ReactSVG id="react" />
            <StyledComponentsSVG id="styled" />
            <NextjsSVG id="next" />
            <AxiosSVG id="axiosref" />
          </ElementWrapper>
        </div>
      </div>
    </div>
  );
}
