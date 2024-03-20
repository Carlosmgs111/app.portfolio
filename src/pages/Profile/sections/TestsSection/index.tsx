import { GenerateImage } from "./GenerateImages";
import { MyDropzone } from "./UploadImage";
import { Telport } from "./Telport";
import { Slider } from "../../../../components/Slider";

export function TestsSection() {
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
      <Slider></Slider>
      <GenerateImage></GenerateImage>
      <MyDropzone />
      <Telport />
    </div>
  );
}
