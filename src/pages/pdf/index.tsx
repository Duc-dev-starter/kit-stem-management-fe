import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PdfViewer = () => {
    const [pdfUrl, setPdfUrl] = useState(null);

    useEffect(() => {
        fetchPdf();
    }, []);

    const fetchPdf = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8080/api/lab/download/67014ef707550aa84300ee4a', {
                responseType: 'blob',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const contentType = response.headers['content-type'];
            if (contentType !== 'application/pdf') {
                console.error("Expected PDF but received:", contentType);
                throw new Error("Failed to load PDF. Server returned non-PDF content.");
            }
            console.log("Response Blob:", response.data);

            const pdfBlobUrl = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
            console.log("PDF Blob URL:", pdfBlobUrl);
            setPdfUrl(pdfBlobUrl);
        } catch (error) {
            console.error("Error fetching PDF:", error);
        }
    };

    return (
        <div>
            {pdfUrl ? (
                <>
                    <a href={pdfUrl} download="downloaded-file.pdf">Download PDF</a>
                    <iframe
                        src={pdfUrl}
                        width="100%"
                        height="600px"
                        title="PDF Viewer"
                    />
                </>
            ) : (
                <p>Loading PDF...</p>
            )}
        </div>
    );
};

export default PdfViewer;
