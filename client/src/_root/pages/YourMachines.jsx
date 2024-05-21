import Loader from "../../components/shared/Loader";
import { useEffect, useState } from "react";
import MachineCard from "../../components/shared/MachineCard";

const YourMachines = () => {
  const [machines, setMachines] = useState(null);
  const [machinesByUser, setMachinesByUser] = useState(null);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    setLoader(true);

    if (user?.authority === "admin") {
      const fetchAllMachines = async () => {
        try {
          const response = await fetch(`https://unimall-server.onrender.com/getAllMachines`);

          const result = await response.json();

          if (result.success) {
            setMachines(result.allMachines);
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
    }

    if (user?.authority === "user") {
      const fetchAllMachinesByUser = async () => {
        try {
          const response = await fetch(
            `https://unimall-server.onrender.com/getAllMachinesByUser/${user.id}`
          );

          const result = await response.json();

          if (result.success) {
            setMachinesByUser(result.allMachinesByUser);
          }
        } catch (error) {
          setError(true);
          console.log(
            "status: " + error.status + " || " + "Error: " + error.message
          );
          alert("status: " + error.status + " || " + "Error: " + error.message);
        }
      };

      fetchAllMachinesByUser();
    }

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

  return (
    <>
      <div className="flex flex-1">
        <div className="flex flex-1 py-10 px-5 md:px-8 min-[800px]:px-2 min-[900px]:px-8 lg:p-10 overflow-scroll custom-scrollbar">
          {user?.authority === "admin" ? (
            <div className="flex flex-col gap-2 md:gap-3">
              <h2 className="h3-bold md:h2-bold text-left w-full">
                Your Machines
              </h2>
              {loader ? (
                <Loader />
              ) : machines ? (
                <div className="max-w-screen-xl py-5">
                  <div className="min-[300px]:grid max-[600px]:grid-cols-1 min-[600px]:grid-cols-2 min-[1150px]:grid-cols-3 gap-4 min-[800px]:gap-2 min-[900px]:gap-4">
                    {machines?.map((machine, index) => (
                      <div
                        key={machine._id + index}
                        className="post-card cursor-pointer flex-1 max-[350px]:min-w-52 max-[380px]:min-w-72 max-[450px]:min-w-80 max-[600px]:min-w-96 max-[700px]:min-w-64 max-[800px]:min-w-80 max-[950px]:min-w-64 max-[1000px]:min-w-72 max-[1150px]:min-w-80 max-[1250px]:min-w-64 max-[1350px]:min-w-72 max-[1520px]:min-w-80 min-w-96"
                      >
                        <MachineCard machine={machine} />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <h3 className="text-[19px] font-bold leading-[140%] tracking-tighter md:text-[22px] text-left w-full py-4">
                  Currently you have no machines.
                </h3>
              )}
            </div>
          ) : user?.authority === "user" ? (
            <div className="flex flex-col gap-2 md:gap-3">
              <h2 className="h3-bold md:h2-bold text-left w-full">
                Your Machines
              </h2>
              {loader ? (
                <Loader />
              ) : machinesByUser ? (
                <div className="max-w-screen-xl py-5">
                  <div className="min-[300px]:grid max-[600px]:grid-cols-1 min-[600px]:grid-cols-2 min-[1150px]:grid-cols-3 gap-4 min-[800px]:gap-2 min-[900px]:gap-4">
                    {machinesByUser?.map((machine, index) => (
                      <div
                        key={machine.AU_id + index}
                        className="post-card cursor-pointer flex-1 max-[350px]:min-w-52 max-[380px]:min-w-72 max-[450px]:min-w-80 max-[600px]:min-w-96 max-[700px]:min-w-64 max-[800px]:min-w-80 max-[950px]:min-w-64 max-[1000px]:min-w-72 max-[1150px]:min-w-80 max-[1250px]:min-w-64 max-[1350px]:min-w-72 max-[1520px]:min-w-80 min-w-96"
                      >
                        <MachineCard
                          machine={machine}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <h3 className="text-[19px] font-bold leading-[140%] tracking-tighter md:text-[22px] text-left w-full py-4">
                  Currently you have no machines.
                </h3>
              )}
            </div>
          ) : (
            <div className="max-w-5xl gap-3 justify-start w-full">
              <h2 className="h3-bold md:h2-bold text-left w-full">
                Your have no Machine assigned to you.
              </h2>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default YourMachines;
