import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const DetailedOverview = () => {
  const { city } = useParams();
  const [data, setData] = useState({});
  const [expandedMall, setExpandedMall] = useState(null);
  const [expandedMachine, setExpandedMachine] = useState(null);

  const mallsByCity = {
    Mumbai: [
      "Phoenix Market City",
      "R City Mall",
      "High Street Phoenix",
      "Infiniti Mall",
      "Korum Mall",
      "Inorbit Mall",
      "Oberoi Mall",
    ],
    Agra: ["TDI Mall", "Ashok Cosmos Mall", "Sarv SRK Mall"],
    Ahmedabad: ["Alpha One Mall", "Ahmedabad Central", "Himalaya Mall"],
    Bareilly: ["Phoenix United Mall", "Amrapali Mall"],
    Bengaluru: [
      "Orion Mall",
      "Phoenix Marketcity",
      "UB City",
      "Mantri Square",
      "Garuda Mall",
      "Royal Meenakshi Mall",
      "Gopalan Arcade Mall",
    ],
    Chennai: [
      "Express Avenue",
      "Phoenix Marketcity",
      "Ampa Skywalk Mall",
      "Chennai Citi Centre",
    ],
    Indore: [
      "Treasure Island Mall",
      "Malhar Mega Mall",
      "Phoenix Citadel",
      "C21 - Malhar Mall",
    ],
    Kolkata: ["South City Mall", "Quest Mall", "Mani Square Mall"],
    Lucknow: ["Phoenix United", "Sahara Ganj", "Fun Republic Mall"],
    Pune: ["Phoenix Marketcity", "Amanora Mall", "Seasons Mall"],
  };

  const toggleMall = (mall) => {
    setExpandedMall(expandedMall === mall ? null : mall);
  };

  const toggleMachine = (machine) => {
    setExpandedMachine(expandedMachine === machine ? null : machine);
  };

  useEffect(() => {
    const fetchAllMachinesByCity = async () => {
      try {
        const response = await fetch(
          `https://unimall-server.onrender.com/getAllMachinesByCity/${city}`
        );

        const result = await response.json();

        if (result.success) {
          setData(result.classifiedData);
        }
      } catch (error) {
        console.log(
          "status: " + error.status + " || " + "Error: " + error.message
        );
        alert("status: " + error.status + " || " + "Error: " + error.message);
      }
    };

    fetchAllMachinesByCity();
  }, [city]);

  return (
    <>
      <div className="flex flex-1">
        <div className="flex flex-1 flex-col gap-2 md:gap-3 py-10 px-5 min-[810px]:px-8 lg:p-10 overflow-scroll custom-scrollbar max-w-screen-xl">
          <h2 className="h2-bold text-left w-full">City - {city}</h2>

          <div className="post-card">
            <div className="p-4 sm:p-6 lg:p-8 text-white">
              <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

              {Object.keys(data).map((mall) => (
                <div key={mall} className="mb-4">
                  <div
                    className="bg-gray-800 p-4 rounded-md shadow-md cursor-pointer"
                    onClick={() => toggleMall(mall)}
                  >
                    <h3 className="text-xl font-semibold text-white">{mall}</h3>
                  </div>
                  {expandedMall === mall &&
                    data[mall].map((machine, index) => (
                      <div
                        key={machine._id}
                        className="ml-4 mt-2 bg-gray-700 p-4 rounded-md shadow-md"
                      >
                        <div
                          className="cursor-pointer"
                          onClick={() => toggleMachine(machine._id)}
                        >
                          <h4 className="text-lg font-medium text-gray-300">
                            {machine.machineName} (User:{" "}
                            {machine.AU_name
                              ? machine.AU_name
                              : "Not Assigned Yet"}
                            , Username:{" "}
                            {machine.AU_username
                              ? machine.AU_username
                              : "Not Assigned Yet"}
                            )
                          </h4>
                        </div>
                        {expandedMachine === machine._id && (
                          <>
                            <div className="bg-red-500 text-white p-4 rounded-md">
                              <div className="bg-orange-600 p-3 rounded-xl">
                                <h2 className="text-lg font-semibold">
                                  Low Condenser Refrigerant Level
                                </h2>
                                <p className="mt-1">
                                  The chiller has operated for an extended
                                  period of time during the reporting period
                                  with a lower than normal condenser refrigerant
                                  level.
                                </p>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <div>
                                  <h3 className="font-medium">
                                    Possible Causes
                                  </h3>
                                  <ul className="list-disc list-inside mt-2">
                                    <li>Insufficient charge.</li>
                                    <li>Low load operation.</li>
                                    <li>
                                      Refrigerant level control system in manual
                                      override.
                                    </li>
                                    <li>
                                      Refrigerant level control system
                                      mechanical malfunction.
                                    </li>
                                  </ul>
                                </div>
                                <div>
                                  <h3 className="font-medium">
                                    Possible Impacts
                                  </h3>
                                  <ul className="list-disc list-inside mt-2">
                                    <li>
                                      Increased chiller energy consumption.
                                    </li>
                                    <li>Reduced chiller cooling capacity.</li>
                                    <li>
                                      Chiller inability to meet chilled water
                                      set point.
                                    </li>
                                    <li>Nuisance shutdowns.</li>
                                    <li>Tube Leak.</li>
                                  </ul>
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                              <div className="bg-gray-800 p-4 rounded-md shadow-md">
                                <h3 className="font-medium text-gray-400">
                                  Reporting Period Hours
                                </h3>
                                <p className="text-2xl font-semibold text-white">
                                  168 hrs
                                </p>
                              </div>
                              <div className="bg-gray-800 p-4 rounded-md shadow-md">
                                <h3 className="font-medium text-gray-400">
                                  Runtime Hours
                                </h3>
                                <p className="text-2xl font-semibold text-white">
                                  139 hrs
                                </p>
                              </div>
                              <div className="bg-gray-800 p-4 rounded-md shadow-md">
                                <h3 className="font-medium text-gray-400">
                                  Utilization
                                </h3>
                                <p className="text-2xl font-semibold text-white">
                                  82.75%
                                </p>
                              </div>
                              <div className="bg-gray-800 p-4 rounded-md shadow-md">
                                <h3 className="font-medium text-gray-400">
                                  Total Lifespan
                                </h3>
                                <p className="text-2xl font-semibold text-white">
                                  42,243 hrs / 74%
                                </p>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
                              <div className="bg-gray-800 p-4 rounded-md shadow-md">
                                <h3 className="font-medium text-gray-400">
                                  Fault History
                                </h3>
                                <div className="relative">
                                  <select className="absolute top-0 right-0 mt-1 mr-2 p-1 border rounded-md bg-gray-700 text-white">
                                    <option>Previous 7 Days</option>
                                    <option>Previous 30 Days</option>
                                    <option>Previous 90 Days</option>
                                  </select>
                                </div>
                                <div className="mt-6">
                                  {/* Replace this div with your actual chart component */}
                                  <div className="w-full h-40 bg-gray-700 rounded-md flex items-center justify-center">
                                    Fault History Chart
                                  </div>
                                </div>
                              </div>
                              <div className="bg-gray-800 p-4 rounded-md shadow-md">
                                <h3 className="font-medium text-gray-400">
                                  CPI Calls History
                                </h3>
                                <div className="relative">
                                  <select className="absolute top-0 right-0 mt-1 mr-2 p-1 border rounded-md bg-gray-700 text-white">
                                    <option>Previous 7 Days</option>
                                    <option>Previous 30 Days</option>
                                    <option>Previous 90 Days</option>
                                  </select>
                                </div>
                                <div className="mt-6">
                                  {/* Replace this div with your actual chart component */}
                                  <div className="w-full h-40 bg-gray-700 rounded-md flex items-center justify-center">
                                    CPI Calls History Chart
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailedOverview;
