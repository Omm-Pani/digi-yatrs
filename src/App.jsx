import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import Sidebar from "./components/sidebar";
import SearchFlight from "./components/searchFlight";
import PassengerDetails from "./components/passengerDetails";
import SelectSeat from "./components/selectSeat";
import BoardingPassPage from "./components/boardingPassPage";
import BoardingPass from "./components/boardingPassTemplate";
import SelfCheckIn from "./components/selfCheckIn";
import Conclusion from "./components/Conclusion";
import * as faceapi from "face-api.js";

const bgImage =
  "https://i0.wp.com/allpicts.in/wp-content/uploads/2016/03/Airplane-Images-with-Beautiful-Picture-of-Flight-in-Sunset.jpg?w=2280&ssl=1";

function App() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");

  const [open, setOpen] = useState(true);
  const [trainedModel, setTrainedModel] = useState(null);

  const [selectedMenuItem, setSelectedMenuItem] = useState("1");
  const [gallery1, setGallery1] = useState([]);
  const [gallery2, setGallery2] = useState([]);
  const [firstName1, setFirstName1] = useState("");
  const [firstName2, setFirstName2] = useState("");
  const [lastName1, setLastName1] = useState("");
  const [lastName2, setLastName2] = useState("");
  const [isDetailsSubmitted, setIsDetailsSubmitted] = useState(false);
  const [training, setTraining] = useState(false);

  const [selectedSeats, setSelectedSeats] = useState([]);

  const combinedGallery = useMemo(
    () => [...gallery1, ...gallery2],
    [gallery1, gallery2]
  );

  useEffect(() => {
    if (isDetailsSubmitted) {
      trainModel(combinedGallery);
    }
  }, [isDetailsSubmitted, combinedGallery]);

  const menuItems = [
    {
      id: "1",
      name: "Search Flight",
      component: (
        <SearchFlight
          setTo={setTo}
          setFrom={setFrom}
          setDate={setDate}
          from={from}
          to={to}
          date={date}
          setSelectedMenuItem={setSelectedMenuItem}
        />
      ),
    },
    {
      id: "2",
      name: "Passenger Details",
      component: (
        <PassengerDetails
          gallery1={gallery1}
          setGallery1={setGallery1}
          gallery2={gallery2}
          setGallery2={setGallery2}
          firstName1={firstName1}
          setFirstName1={setFirstName1}
          lastName1={lastName1}
          setLastName1={setLastName1}
          lastName2={lastName2}
          setLastName2={setLastName2}
          firstName2={firstName2}
          setFirstName2={setFirstName2}
          setIsDetailsSubmitted={setIsDetailsSubmitted}
          training={training}
          setTraining={setTraining}
          trainedModel={trainedModel}
          setSelectedMenuItem={setSelectedMenuItem}
        />
      ),
    },
    {
      id: "3",
      name: "Select Seat",
      component: (
        <SelectSeat
          setSelectedSeats={setSelectedSeats}
          selectedSeats={selectedSeats}
          setSelectedMenuItem={setSelectedMenuItem}
        />
      ),
    },
    {
      id: "4",
      name: "Boarding Pass",
      component: (
        <BoardingPassPage
          setSelectedMenuItem={setSelectedMenuItem}
          firstName1={firstName1}
          lastName1={lastName1}
          firstName2={firstName2}
          lastName2={lastName2}
          selectedSeats={selectedSeats}
          date={date}
          to={to.city}
          from={from.city}
        />
      ),
    },
    {
      id: "5",
      name: "Self Check-in",
      component: (
        <SelfCheckIn
          trainedModel={trainedModel}
          firstName1={firstName1}
          lastName1={lastName1}
          firstName2={firstName2}
          lastName2={lastName2}
          selectedSeats={selectedSeats}
          date={date}
          to={to.city}
          from={from.city}
        />
      ),
    },
    {
      id: "6",
      name: "Conclusion",
      component: <Conclusion />,
    },
  ];

  useEffect(() => {
    const loadModels = async () => {
      try {
        await Promise.all([
          faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
          faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
          faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
          faceapi.nets.ageGenderNet.loadFromUri("/models"),
        ]);
      } catch (error) {
        console.error("Error loading models: ", error);
      }
    };

    loadModels();
  }, []);

  // Train the model using images in the gallery
  const trainModel = async (combinedGallery) => {
    try {
      setTraining(true);

      if (combinedGallery.length === 0) {
        alert("No images in the galleries to train the model.");
        setTraining(false);
        return;
      }

      const labeledDescriptors = await Promise.all(
        combinedGallery.map(async (image) => {
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
      setTraining(false);
      setSelectedMenuItem("3");
    } catch (error) {
      console.error("Error training model:", error);
      alert("Error training model. Please check the console for details.");
    } finally {
      setTraining(false);
    }
  };

  return (
    <div>
      <div className="bg-[#f2f0f0] w-screen min-h-screen absolute">
        {/* <div className="absolute z-100">
          <BoardingPass />
        </div> */}
        <div className="flex">
          <Sidebar
            open={open}
            setOpen={setOpen}
            menuItems={menuItems}
            setSelectedMenuItem={setSelectedMenuItem}
            selectedMenuItem={selectedMenuItem}
          />
          <div
            className={`min-h-[calc(100vh-100px)] bg-[#f2f0f0] rounded-[8px] absolute transition-all duration-500 w-full pt-3 right-0 ${open ? "pl-[290px]" : "pl-[54px]"} pr-[10px]`}
          >
            <div className="rounded-[8px] overflow-hidden lg:mt-3:mb-3">
              <div
                className="min-h-screen bg-cover bg-transparent bg-no-repeat bg-fixed p-5 box-border"
                style={{
                  backgroundImage:
                    selectedMenuItem === "6" ? "" : `url(${bgImage})`,
                }}
              >
                {menuItems.map(
                  (item, index) =>
                    selectedMenuItem === item.id && (
                      <div key={index}>{item.component}</div>
                    )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
