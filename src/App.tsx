import { useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import { FilePondFile } from "filepond";
import { Box, Typography } from "@mui/material";

import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

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

  return (
    <div className="App">
      <Box sx={{ width: 500 }}>
        <FilePond
          files={files}
          onupdatefiles={onUpdateFiles}
          allowMultiple={true}
        />
      </Box>
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
    </div>
  );
}

export default App;
