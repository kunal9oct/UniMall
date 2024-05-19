import Loader from "../../components/shared/Loader";
import { useEffect, useState } from "react";
import { cities } from "../../constants";

const Home = () => {
  const [countsByCity, setCountsByCity] = useState(null);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    setLoader(true);

    const fetchAllMachines = async () => {
      try {
        const response = await fetch(`http://localhost:5000/getAllMachines`);

        const result = await response.json();

        if (result.success) {
          setCountsByCity(result.countsByCity);
        }
      } catch (error) {
        setError(true);
        console.log(
          "status: " + error.status + " || " + "Error: " + error.message
        );
        alert("status: " + error.status + " || " + "Error: " + error.message);
      }
    };

    fetchAllMachines();

    setLoader(false);
  }, []);

  if (error) {
    return (
      <div className="flex flex-1">
        <div className="home-container">
          <p className="body-medium text-light-1">
            Retry! Something bad happened
          </p>
        </div>
      </div>
    );
  }

  const buttonCSS =
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2";

  return (
    <>
      <div className="flex flex-1">
        <div className="flex flex-1 py-10 px-5 md:px-8 min-[800px]:px-2 min-[900px]:px-8 lg:p-10 overflow-scroll custom-scrollbar">
          <div className="flex flex-col gap-2 md:gap-3">
            <h2 className="h3-bold md:h2-bold text-left w-full">DashBoard</h2>
            {loader ? (
              <Loader />
            ) : (
              <div className="max-w-screen-xl py-5">
                <div className="min-[300px]:grid max-[600px]:grid-cols-1 min-[600px]:grid-cols-2 min-[1150px]:grid-cols-3 gap-4 min-[800px]:gap-2 min-[900px]:gap-4">
                  {countsByCity?.map((cityCounts) => {
                    const cityDetails = cities.find(
                      (item) => item.city === cityCounts._id
                    );

                    const totalMachines =
                      cityCounts.countActive +
                      cityCounts.countIdle +
                      cityCounts.countAlert +
                      cityCounts.countNotWorking;

                    const activePercentage =
                      (cityCounts.countActive / totalMachines) * 100;
                    const idlePercentage =
                      (cityCounts.countIdle / totalMachines) * 100;
                    const alertPercentage =
                      (cityCounts.countAlert / totalMachines) * 100;
                    const notWorkingPercentage =
                      (cityCounts.countNotWorking / totalMachines) * 100;

                    const weights = {
                      active: 20,
                      idle: -2,
                      alert: -3,
                      notWorking: -5,
                    };

                    const weightedSum =
                      (weights.active * activePercentage +
                        weights.idle * idlePercentage +
                        weights.alert * alertPercentage +
                        weights.notWorking * notWorkingPercentage) /
                      10;

                    const thresholds = {
                      optimal: 50,
                      moderate: 0,
                      critical: -Infinity,
                    };

                    let condition;

                    const calculateCondition = () => {
                      if (weightedSum >= thresholds.optimal) {
                        return (condition = "Optimal Condition");
                      } else if (weightedSum >= thresholds.moderate) {
                        return (condition = "Moderate Condition");
                      } else {
                        return (condition = "Critical Condition");
                      }
                    };

                    calculateCondition();

                    if(cityCounts.countActive === totalMachines) {
                      condition = "Optimal Condition";
                    }

                    return (
                      <div
                        key={cityCounts._id}
                        className="post-card cursor-pointer flex-1 max-[350px]:min-w-52 max-[380px]:min-w-72 max-[450px]:min-w-80 max-[600px]:min-w-96 max-[700px]:min-w-64 max-[800px]:min-w-80 max-[950px]:min-w-64 max-[1000px]:min-w-72 max-[1150px]:min-w-80 max-[1250px]:min-w-64 max-[1350px]:min-w-72 max-[1520px]:min-w-80 min-w-96"
                      >
                        <>
                          {cityDetails && (
                            <>
                              <div className="font-medium leading-[120%] text-[24px] pl-1">
                                <p>
                                  {cityDetails.city} - {cityDetails.malls} Malls
                                </p>
                              </div>
                              <div className="py-4">
                                <img
                                  src={cityDetails.imgURL}
                                  alt={cityDetails.city}
                                  className="post-card_img bg-white"
                                />
                              </div>
                            </>
                          )}

                          <div className="font-medium leading-[200%] text-[19px] pl-1">
                            <p>Machine Active - {cityCounts.countActive}</p>
                          </div>

                          <div className="font-medium leading-[160%] text-[18px] pl-1">
                            <p>Machine Idle - {cityCounts.countIdle}</p>
                          </div>

                          <div className="font-medium leading-[160%] text-[18px] pl-1 text-orange-600">
                            <p>Alerts - {cityCounts.countAlert}</p>
                          </div>

                          <div className="font-medium leading-[160%] text-[18px] pl-1 text-orange-600">
                            <p>
                              Machine Not Working - {cityCounts.countNotWorking}
                            </p>
                          </div>

                          {cityDetails && (
                            <div className="font-medium leading-[160%] text-[18px] pl-1 text-orange-700">
                              <p>Power Con.: - {cityDetails.powerCon}</p>
                            </div>
                          )}

                          <>
                            <button
                              type="button"
                              // onClick={onAssignUser}
                              className={`${buttonCSS} shad-button_primary my-3 rounded-lg text-[18px]`}
                              disabled={loader}
                            >
                              {loader ? <Loader /> : "Detailed Overview"}
                            </button>
                          </>

                          <div
                            className={`font-bold leading-[160%] text-[21px] pl-1 py-2 rounded-md mt-4 ${
                              condition === "Critical Condition"
                                ? "bg-orange-600 text-white"
                                : "bg-white text-orange-600"
                            }`}
                          >
                            <p>{condition}</p>
                          </div>
                        </>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
