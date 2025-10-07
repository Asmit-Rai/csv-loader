import { useEffect, useState } from "react";
import "../css/CsvView.css";

const CsvView = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    const fetchCSV = async () => {
      const response = await fetch("https://csv-loader-backend-jrqw-26vctln57-asmit-rais-projects.vercel.app/get-csv-data");
      const csvParseData = await response.json();
      setData(csvParseData.csvData);
    };
    fetchCSV();
  }, []);

const lines = data ? data.trim().split("\n").filter(Boolean) : [];
const headers = lines.length > 0 ? lines[0].split(",") : [];
const rows = lines.length > 1 ? lines.slice(1).map(line => line.split(",")) : [];


  return (
    <div className="csv-container">
      <div className="csv-card">

        {data ? (
          <table className="csv-table">
            <thead>
              <tr>
                {headers.map((h, i) => (
                  <th key={i}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Loading CSV...</p>
        )}
      </div>
    </div>
  );
};

export default CsvView;
