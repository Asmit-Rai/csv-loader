import { useEffect, useState } from "react";
import "../css/CsvView.css";

const CsvView = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    const fetchCSV = async () => {
      try {
        const response = await fetch("https://csv-loader-backend-9uya.onrender.com/get-csv-data");
        const csvParseData = await response.json();
      
        if (csvParseData.csvData && typeof csvParseData.csvData === 'string') {
          setData(csvParseData.csvData);
        } else {
          console.error("Invalid CSV data received");
        }
      } catch (error) {
        console.error("Error fetching CSV:", error);
      }
    };
    fetchCSV();
  }, []);

  const lines = data && typeof data === 'string' ? data.trim().split("\n").filter(Boolean) : [];
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