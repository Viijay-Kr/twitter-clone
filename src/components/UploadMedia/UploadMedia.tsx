/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// Note: `useUploadThing` is IMPORTED FROM YOUR CODEBASE using the `generateReactHelpers` function
import { useUploadThing } from "~/utils/uploadthing";
import { useDropzone } from "react-dropzone";

import type { FileWithPath } from "react-dropzone";
import { useCallback } from "react";
import { FiImage } from "react-icons/fi";

export function UploadMedia(props: {
  onUploadComplete: (url: string) => void;
}) {
  const { startUpload } = useUploadThing({
    endpoint: "imageUploader", // replace this with an actual endpoint name
    onClientUploadComplete: (file) => {
      if (file?.[0]) {
        props.onUploadComplete(file[0]?.fileUrl);
      }
    },
    onUploadError: (e) => {
      console.log(e);
      alert("error occurred while uploading");
    },
  });

  const onDrop = useCallback(
    async (acceptedFiles: FileWithPath[]) => {
      await startUpload(acceptedFiles);
    },
    [startUpload]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: undefined,
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <FiImage
        className="cursor-pointer"
        title="media"
        color="#1d9bf0"
        size={18}
      />
    </div>
  );
}
