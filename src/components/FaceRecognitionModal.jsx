import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

const FaceRecognitionModal = ({ onClose, faceMatcher }) => {
  const videoRef = useRef(null);
  const [recognitionResult, setRecognitionResult] = useState("");
  const detectionInterval = useRef(null);

  // Initialize video stream
  useEffect(() => {
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
        videoRef.current.srcObject = stream;
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };

    startVideo();

    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Start face detection
  useEffect(() => {
    const detectFace = async () => {
      if (!faceMatcher) return;

      try {
        const detection = await faceapi
          .detectSingleFace(videoRef.current)
          .withFaceLandmarks()
          .withFaceDescriptor();

        if (detection) {
          const bestMatch = faceMatcher.findBestMatch(detection.descriptor);
          const result = bestMatch.label;
          console.log("Recognized user:", result);
          setRecognitionResult(result);
        } else {
          console.log("Unknown user");
          setRecognitionResult("Unknown");
        }
      } catch (error) {
        console.error("Detection error:", error);
      }
    };

    detectionInterval.current = setInterval(detectFace, 1000);

    return () => clearInterval(detectionInterval.current);
  }, [faceMatcher]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full">
        <h2 className="text-xl font-bold mb-4">Face Recognition</h2>

        <div className="relative">
          <video
            ref={videoRef}
            autoPlay
            className="w-full h-64 bg-black rounded-lg"
          ></video>
          <div className="absolute bottom-2 left-2 text-white bg-black bg-opacity-50 p-2 rounded">
            Status: {recognitionResult || "Detecting..."}
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default FaceRecognitionModal;
