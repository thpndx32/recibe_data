import React, { useState, useEffect } from 'react';

const FileExistenceChecker = () => {
  const [fileExists, setFileExists] = useState(null);

  useEffect(() => {
    const filePath = './img/mapamundo.jpg'; // Replace with the actual path to your file

    const img = new Image();
    img.src = filePath;

    img.onload = () => {
      setFileExists(true);
    };

    img.onerror = () => {
      setFileExists(false);
    };
  }, []);

  return (
    <div>
      {fileExists === true && <p>The file exists.</p>}
      {fileExists === false && <p>The file does not exist.</p>}
      {fileExists === null && <p>Checking file existence...</p>}
    </div>
  );
};

export default FileExistenceChecker;