import "../css/Home.css";
import { useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import { useNavigate } from "react-router-dom";
registerPlugin(FilePondPluginFileValidateType);

const Home = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [csvData, setCsvData] = useState("");

  const onSubmit = () => {
    const reader = new FileReader();
    reader.onload = async (event) => {
      const csvText = event.target.result;
      setCsvData(csvText);
      try {
        const response = await fetch("https://csv-loader-backend-jrqw-26vctln57-asmit-rais-projects.vercel.app/csv-data", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ csvData: csvText }),
        });

        const result = await response.json();
        if (result.success) {
          navigate("/csv");
        } else {
          navigate("/");
        }
      } catch (err) {
        console.error("Error uploading CSV:", err);
      }
    };

    reader.onerror = (error) => {
      console.error("Error reading file:", error);
    };
    reader.readAsText(files[0].file);
  };

  return (
    <div className="home-container">
      <div className="home-card">
        <p className="title">CSV Loader</p>
        <FilePond
          files={files}
          allowMultiple={false}
          acceptedFileTypes={["text/csv"]}
          onupdatefiles={setFiles}
        />
        <button type="submit" className="homebtn" onClick={onSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Home;
