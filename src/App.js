import React, { useState } from 'react';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFileUploaded, setIsFileUploaded] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedFile) {
      console.log('File submitted:', selectedFile);

      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        // Upload the Excel file to the backend API
        const uploadResponse = await fetch('http://localhost:8099/api/upload/excel', {
          method: 'POST',
          body: formData,
        });

        if (!uploadResponse.ok) {
          const responseText = await uploadResponse.text();
          console.error('Upload response error:', responseText);
          throw new Error('File upload failed');
        }

        setIsFileUploaded(true);
        console.log('File uploaded successfully');
        alert('Uploaded the Excel Sheet Successfully!');

      } catch (error) {
        console.error('Error uploading file:', error);
        alert('Error uploading the file. Please try again.');
      }
    } else {
      alert('Please select a file before uploading.');
    }
  };

  const handleEmailNotification = async () => {
    if (!isFileUploaded) {
      alert('Please upload a file first.');
      return;
    }

    try {
      // Trigger email notification API call
      const emailResponse = await fetch('http://localhost:8099/api/upload/MailTheCustomer', {
        method: 'POST'
      });

      if (!emailResponse.ok) {
        const errorText = await emailResponse.text();
        console.error('Email notification response error:', errorText);
        throw new Error('Email notification failed');
      }

      console.log('Email notifications sent successfully');
      alert('Email notifications sent successfully.');

    } catch (error) {
      console.error('Error sending email notifications:', error);
      alert('Error sending email notifications. Please try again.');
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div>
        <h2 style={{ textAlign: 'center', fontSize: '24px' }}>Monthly Return Filing Reminder</h2>
        <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
          <p style={{ marginTop: '10px', fontSize: '16px' }}>
            By clicking here, you will be able to upload the Excel Sheet.
          </p>
          <div style={{ marginTop: '10px', fontSize: '16px' }}>
            <input 
              type="file" 
              accept=".xlsx, .xls" // Accept only Excel files
              onChange={handleFileChange} 
              style={{ fontSize: '16px' }} 
            />
          </div>
          <button type="submit" style={{ fontSize: '16px', display: 'block', margin: '0 auto', marginTop: '10px' }}>
            Upload Excel Sheets
          </button>
        </form>

        <button 
          onClick={handleEmailNotification} 
          style={{ fontSize: '16px', display: 'block', margin: '0 auto', marginTop: '30px' }}
        >
          Notify Customers via Email
        </button>
      </div>
    </div>
  );
}

export default App;
