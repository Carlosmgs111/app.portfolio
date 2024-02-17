import { useState, useEffect, useCallback } from "react";
import { runRequest } from "../../../../services/runRequest";
import { headers } from "../../../../services/configs";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { SocketService } from "../../../../services";
import {
  DefineSchema,
  getHOCAndTrigger,
} from "../../../../components/DefineSchema";

export function GenerateImage() {
  // console.log({ SocketService });
  const [images, setImages]: any = useState(null);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [settings, setSettings]: any = useState(null);

  const skeletons = [];
  for (let i = 0; i < settings?.numeroDeResultados; i++) {
    skeletons.push(
      <Skeleton
        key={i}
        animation="wave"
        variant="rounded"
        sx={{
          backdropFilter: "brightness(80%) blur(0.8rem); ",
          width: `${settings?.ancho}px`,
          height: `${settings?.alto}px`,
          borderRadius: "0.8rem",
        }}
      />
    );
  }

  const requestHeaders = headers();

  function generatedImages(images: any) {
    setLoading(false);
    setImages(images);
    return "OK!";
  }

  // ? 1️⃣ Define the callback to be passed as high order callback
  const generateImageCallback = async (params: any) => {
    const { data, reset } = params;
    const {
      alto,
      ancho,
      numeroDeResultados,
      pasosDeInferencia,
      guiaDeEscala,
      semilla,
    } = data[0];
    setSettings({
      ...settings,
      ancho: Number(ancho),
      alto: Number(alto),
      numeroDeResultados: Number(numeroDeResultados),
    });
    setLoading(true);

    const messageResult = await SocketService.sendMessage(
      {
        imageService: {
          generateImages: [
            {
              prompt,
              options: {
                width: Number(ancho),
                height: Number(alto),
                num_outputs: Number(numeroDeResultados),
                num_inference_steps: Number(pasosDeInferencia),
                guidance_scale: Number(guiaDeEscala),
                seed: Boolean(semilla)
                  ? Number(semilla)
                  : Number(String(Math.random()).replace("0.", "")),
              },
            },
          ],
        },
      },
      //"generatedImages"
      { generatedImages: (images: any) => images }
    );
    /* const messageResult = await SocketService.receiveMessage({
      imageService: { generatedImages: (images) => images },
    }); */
    setLoading(false);
    if (Array.isArray(messageResult)) setImages(messageResult);
    console.log({ messageResult });
  };

  // ? 2️⃣ Function to obtain the provided callback as the high order callback to be passed to
  // ? DefineSchema component as argument 'hightOrderCallback' and its respective trigger
  const [highOrderCallback, onClickHandler]: any = getHOCAndTrigger(
    generateImageCallback
  );

  useEffect(() => {
    runRequest({
      setData: (data: any) => {
        console.log({ data });
        const { outputs, sizes, inferenceSteps, guidanceScale } = data;
        setSettings({
          numeroDeResultados: 1,
          "numeroDeResultados{": outputs,
          ancho: 512,
          "ancho{": sizes,
          alto: 512,
          "alto{": sizes,
          pasosDeInferencia: 50,
          "pasosDeInferencia<": [[inferenceSteps.min, inferenceSteps.max]],
          guiaDeEscala: 7,
          "guiaDeEscala<": [[guidanceScale.min, guidanceScale.max]],
          semilla: 0,
        });
      },
      setLoading,
    }).get(`images/availablesettings`, {
      ...requestHeaders,
    });
  }, []);
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
      <h2 style={{ width: "100%", textAlign: "center" }}>Generar Imagenes</h2>
      {loading && (
        <Stack
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            width: "calc(512px*2)",
          }}
        >
          {skeletons}
        </Stack>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          width: `calc(${settings?.ancho}px*2)`,
        }}
      >
        {images &&
          !loading &&
          images.map((image: any, i: number) => (
            <img
              key={i}
              style={{
                width: `${settings?.ancho}px`,
                height: `${settings?.alto}px`,
                borderRadius: "0.8rem",
              }}
              src={`data:image/png;base64,${image.encoded_image}`}
              alt="retrieved"
            />
          ))}
      </div>
      <textarea
        style={{ width: "100%", height: "fit-content", fontSize: "1.4rem" }}
        value={prompt}
        spellCheck="false"
        onChange={(e) => setPrompt(e.target.value)}
      />
      {settings && (
        <DefineSchema
          {...{
            title: "",
            baseSchema: settings,
            nonOptionals: [
              "numeroDeResultados{",
              "alto{",
              "ancho{",
              "pasosDeInferencia<",
              "guiaDeEscala<",
              "semilla",
            ],
            buttons: {},
            highOrderCallback,
          }}
        />
      )}
      <button
        style={{
          width: "fit-content",
          fontSize: "1.4rem",
        }}
        onClick={(e) => {
          onClickHandler();
        }}
      >
        Generate Image
      </button>
    </div>
  );
}
