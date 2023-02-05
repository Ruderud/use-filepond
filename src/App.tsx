import { useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import { FilePondFile } from "filepond";
import { Box, Button, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";

import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import axios from "axios";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const postFile = async (files: File[]) => {
  const formData = new FormData();

  for (const imageFile of files) {
    formData.append("image[]", imageFile, imageFile.name);
  }

  const response = await axios.post("/fileApi", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  console.log("response", response);
};

function App() {
  const [files, setFiles] = useState<File[]>([]);

  const onUpdateFiles = (filePondFiles: FilePondFile[]) => {
    const files = filePondFiles.map(
      (filePondFile) => filePondFile.file as File
    );
    setFiles(files);
  };
  const directDeleteFile = (deleteFileName: string) => () => {
    setFiles((cur) => {
      return cur.filter((curFile) => curFile.name !== deleteFileName);
    });
  };

  const clearAllFiles = () => setFiles([]);

  return (
    <div className="App">
      <Box sx={{ width: 500 }}>
        <FilePond
          files={files}
          onupdatefiles={onUpdateFiles}
          allowMultiple={true}
        />
      </Box>
      <Button onClick={clearAllFiles}>파일 초기화</Button>
      <Box>
        <Typography>업로드된 파일들</Typography>
        <ul>
          {files.map((file) => (
            <li>
              {file.name}{" "}
              <button onClick={directDeleteFile(file.name)}>삭제</button>
            </li>
          ))}
        </ul>
      </Box>
      <Button
        onClick={() => {
          postFile(files);
        }}
      >
        파일 보내기
      </Button>
    </div>
  );
}

export default App;
