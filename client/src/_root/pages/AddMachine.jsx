import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Filter from "bad-words";
import { UserContext } from "../../store/user-context";
import Loader from "../../components/shared/Loader";

const AddMachine = () => {
  const navigate = useNavigate();

  const { user } = useContext(UserContext);
  const [mall, setMall] = useState("");

  const [city, setCity] = useState("");
  const cities = [
    "Mumbai",
    "Agra",
    "Ahmedabad",
    "Bareilly",
    "Bengaluru",
    "Chennai",
    "Indore",
    "Kolkata",
    "Lucknow",
    "Pune",
  ];

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

  const handleCityChange = (e) => {
    setCity(e.target.value);
    setMall("");
  };

  const [machine, setMachine] = useState("");
  const machines = [
    "ATM",
    "Vending Machine",
    "Escalators and Elevators",
    "Photo Booth",
    "Ticket Machine",
    "Arcade Game Machine",
    "Massage Chair",
    "Parking Payment Machine",
    "Water Dispenser",
    "Charging Station",
    "Currency Exchange Machine",
    "Locker Rental Machine",
  ];

  const [description, setDescription] = useState("");
  const [loader, setLoader] = useState(false);

  // Filter out abusive and bad words
  const filter = new Filter();

  function filterAbusiveWords(text) {
    return filter.clean(text);
  }

  const onSubmit = async () => {
    setLoader(true);

    const token = localStorage.getItem("authToken");

    const formData = new FormData();
    if (user.id) {
      formData.append("adminId", user.id);
    }

    if (user.name) {
      formData.append("name", user.name);
    }

    if (city) {
      formData.append("city", city);
    }

    if (mall) {
      formData.append("mall", mall);
    }

    if (machine) {
      formData.append("machine", machine);
    }

    if (description) {
      const filteredDescription = filterAbusiveWords(description);
      formData.append("description", filteredDescription);
    }

    if (
      !formData.has("city") &&
      !formData.has("mall") &&
      !formData.has("machine")
    ) {
      setLoader(false);
      alert("You have not filled all mandatory fields.");
      return;
    }

    const addPost = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/addMachine/${user.id}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );

        const result = await response.json();

        if (result.success) {
          navigate(-1);
        }

        if (response.status === 401) {
          alert(result.message);
        }

        if (response.status === 403) {
          alert(result.message);
        }

        setLoader(false);
      } catch (error) {
        setLoader(false);
        console.log(
          "status: " +
            error.status +
            " || " +
            "Error Adding Machine: " +
            error.message
        );
        alert(
          "status: " +
            error.status +
            " || " +
            "Error Adding Machine: " +
            error.message
        );
      }
    };

    addPost();
  };

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("user"));

  //   if (!user) {
  //     navigate("/sign-in");
  //   }
  // }, []);

  const buttonCSS =
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2";

  const inputCSS =
    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <div className="flex flex-1">
      <div className="common-container">
        {user?.authority === "admin" ? (
          <>
            <div className="max-w-5xl flex-start gap-3 justify-start w-full">
              <img
                src="/assets/icons/add-post.svg"
                alt="add"
                width={36}
                height={36}
              />
              <h2 className="h3-bold md:h2-bold text-left w-full">
                Add Machine
              </h2>
            </div>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-9 w-full max-w-5xl"
            >
              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 shad-form_label"
                  htmlFor="addCity"
                >
                  Select City *
                </label>

                <select
                  id="addCity"
                  value={city}
                  onChange={handleCityChange}
                  className={`${inputCSS} shad-textarea`}
                >
                  <option value="" disabled>
                    Select a City
                  </option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              {city && (
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 shad-form_label"
                    htmlFor="addMall"
                  >
                    Select Mall *
                  </label>

                  <select
                    id="addMall"
                    value={mall}
                    onChange={(e) => setMall(e.target.value)}
                    className={`${inputCSS} shad-textarea`}
                  >
                    <option value="" disabled>
                      Select a Mall
                    </option>
                    {(mallsByCity[city] || []).map((mall) => (
                      <option key={mall} value={mall}>
                        {mall}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 shad-form_label"
                  htmlFor="addMachine"
                >
                  Select Machine *
                </label>

                <select
                  id="addMachine"
                  value={machine}
                  onChange={(e) => setMachine(e.target.value)}
                  className={`${inputCSS} shad-textarea`}
                >
                  <option value="" disabled>
                    Select a Machine
                  </option>
                  {machines.map((machine) => (
                    <option key={machine} value={machine}>
                      {machine}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 shad-form_label"
                  htmlFor="addDescription"
                >
                  Machine Description (Optional)
                </label>

                <textarea
                  id="addDescription"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={`${inputCSS} h-32 min-h-[3rem] max-w-[calc(100%-1rem)] resize-vertical shad-textarea`}
                />
              </div>

              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 shad-form_label"
                  htmlFor="assignUser"
                >
                  Assign User
                </label>

                <input
                  id="assignUser"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={`${inputCSS} shad-textarea`}
                />
              </div>

              <div className="flex gap-4 items-center justify-end">
                <button
                  type="button"
                  className={`${buttonCSS} shad-button_dark_4`}
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={onSubmit}
                  className={`${buttonCSS} shad-button_primary`}
                  disabled={loader}
                >
                  {loader ? <Loader /> : "Add Machine"}
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="max-w-5xl flex-start gap-3 justify-start w-full">
            <h2 className="h3-bold md:h2-bold text-left w-full">
              Your Account doesn't support this feature.
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddMachine;
