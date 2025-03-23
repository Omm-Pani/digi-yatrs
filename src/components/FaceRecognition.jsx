import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

function App() {
  const videoRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [gallery, setGallery] = useState([]);
  const [userName, setUserName] = useState("");
  const [trainedModel, setTrainedModel] = useState(null);
  const [recognitionResults, setRecognitionResults] = useState([]);
  const captureIntervalRef = useRef(null);

  // Load models and start video feed
  useEffect(() => {
    const loadModelsAndStartVideo = async () => {
      try {
        await Promise.all([
          faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
          faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
          faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
          faceapi.nets.ageGenderNet.loadFromUri("/models"),
        ]);

        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error loading models or starting video:", error);
      }
    };

    loadModelsAndStartVideo();
  }, []);

  // Start capturing images
  const startCapture = () => {
    setCapturing(true);
    captureIntervalRef.current = setInterval(captureImage, 1000); // Capture every second
  };

  // Stop capturing images
  const stopCapture = () => {
    setCapturing(false);
    clearInterval(captureIntervalRef.current); // Clear the interval
  };

  const captureImage = () => {
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageUrl = canvas.toDataURL("image/png");
    const newImage = {
      id: Date.now(),
      url: imageUrl,
      name: userName || "Unknown",
    };

    setGallery((prevGallery) => [...prevGallery, newImage]);
  };

  // Train the model using images in the gallery
  const trainModel = async () => {
    if (gallery.length === 0) {
      alert("No images in the gallery to train the model.");
      return;
    }

    try {
      const labeledDescriptors = await Promise.all(
        gallery.map(async (image) => {
          const img = await faceapi.fetchImage(image.url);
          const detections = await faceapi
            .detectSingleFace(img)
            .withFaceLandmarks()
            .withFaceDescriptor();

          if (!detections) {
            throw new Error(`No face detected in image: ${image.name}`);
          }

          return new faceapi.LabeledFaceDescriptors(image.name, [
            detections.descriptor,
          ]);
        })
      );

      const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.6);
      setTrainedModel(faceMatcher);
      alert("Model trained successfully!");
    } catch (error) {
      console.error("Error training model:", error);
      alert("Error training model. Please check the console for details.");
    }
  };

  // Recognize faces in the video feed
  const recognizeFaces = async () => {
    if (!trainedModel) {
      alert("Model not trained yet. Please train the model first.");
      return;
    }

    const video = videoRef.current;
    const detections = await faceapi
      .detectAllFaces(video)
      .withFaceLandmarks()
      .withFaceDescriptors();

    const results = detections.map((d) => {
      const bestMatch = trainedModel.findBestMatch(d.descriptor);
      return {
        name: bestMatch.label,
        distance: bestMatch.distance,
      };
    });

    console.log("Recognition results:", results);
    setRecognitionResults(results);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Face Detection Capture</h1>
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-6xl">
        {/* Video Feed and Controls */}
        <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label
              htmlFor="user-name"
              className="block text-sm font-medium text-gray-700"
            >
              Enter your name:
            </label>
            <input
              id="user-name"
              type="text"
              placeholder="Your name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <video
            ref={videoRef}
            id="video-feed"
            autoPlay
            className="w-full max-w-[720px] h-[560px] bg-black rounded-lg"
          ></video>
          <div className="mt-4 flex gap-4">
            <button
              onClick={startCapture}
              disabled={capturing}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
            >
              Start Capture
            </button>
            <button
              onClick={stopCapture}
              disabled={!capturing}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:bg-red-300"
            >
              Stop Capture
            </button>
            <button
              onClick={trainModel}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Train Model
            </button>
            <button
              onClick={recognizeFaces}
              className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
            >
              Recognize Faces
            </button>
          </div>
        </div>

        {/* Gallery */}
        <div className="flex flex-col bg-white p-6 rounded-lg shadow-md w-full max-w-[300px]">
          <h2 className="text-xl font-semibold mb-4">Gallery</h2>
          <div className="flex flex-wrap gap-4">
            {gallery.map((image) => (
              <div key={image.id} className="flex flex-col items-center">
                <img
                  src={image.url}
                  alt="Captured"
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <p className="text-sm mt-1">{image.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recognition Results */}
        <div className="flex flex-col bg-white p-6 rounded-lg shadow-md w-full max-w-[300px]">
          <h2 className="text-xl font-semibold mb-4">Recognition Results</h2>
          <div className="flex flex-col gap-2">
            {recognitionResults.map((result, index) => (
              <div key={index} className="text-sm">
                <p>Name: {result.name}</p>
                <p>Distance: {result.distance.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
