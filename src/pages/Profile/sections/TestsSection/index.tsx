import { GenerateImage } from "./GenerateImages";
import { MyDropzone } from "./UploadImage";
import { Telport } from "./Telport";
import { InfiniteCarousel } from "../../../../components/InfiniteCarousel";
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
  const { TrackSidebar, ContentWrapper }: any = useTrackSidebar();

  const firstSlides = [
    LogoSVG,
    JestSVG,
    ReactSVG,
    StyledComponentsSVG,
    NextjsSVG,
    ReactRouterSVG,
    WebpackSVG,
    AxiosSVG,
  ].map((Logo: any, index: any) => <Logo key={index} />);
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
      <InfiniteCarousel>{firstSlides}</InfiniteCarousel>
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
          <ContentWrapper>
            <LogoSVG id="logo" title="logo" />
            <JestSVG id="jest" title="jest" />
            <ReactSVG id="re Act" title="react" />
            <StyledComponentsSVG id="styled" title="styled" />
            <NextjsSVG id="next" title="next" />
            <AxiosSVG id="_axio s " title="axio s" />
          </ContentWrapper>
        </div>
      </div>
    </div>
  );
}
