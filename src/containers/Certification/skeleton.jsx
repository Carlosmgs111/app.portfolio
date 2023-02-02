import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export const CertificationSkeleton = () => (
  <Stack spacing={1}>
    <Skeleton
      animation="wave"
      variant="rounded"
      sx={{
        backdropFilter: "brightness(80%) blur(0.8rem);",
        width: "45rem",
        height: "35rem",
        borderRadius: "0.8rem",
      }}
    />
  </Stack>
);
