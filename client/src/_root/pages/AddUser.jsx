import { useNavigate } from "react-router-dom";
import Loader from "../../components/shared/Loader";
import { useEffect, useState } from "react";
import Select from "react-select";
import UserCard from "../../components/shared/UserCard";

const AddUser = () => {
  const navigate = useNavigate();

  const [addedUsers, setAddedUsers] = useState(null);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [machineUser, setMachineUser] = useState(null);

  const handleMachineUserChange = (selectedOption) => {
    setMachineUser(selectedOption);
  };

  const user = JSON.parse(localStorage.getItem("user"));

  const addUser = async () => {
    setLoader(true);

    const data = {};
    data.AU_id = machineUser.value.userId;
    data.AU_name = machineUser.value.name;
    data.AU_username = machineUser.value.username;
    data.avatarImgURL = machineUser.value.avatarImgURL;
    data.profileImgURL = machineUser.value.profileImgURL;

    const addUser = async () => {
      try {
        const response = await fetch(`http://localhost:5000/addUser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (result.success) {
          navigate("/");
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

    addUser();
  };

  useEffect(() => {
    setLoader(true);

    const fetchAddedUsers = async () => {
      try {
        const response = await fetch(`http://localhost:5000/getAddedUsers`);

        const result = await response.json();

        if (result.success) {
          setAddedUsers(result.addedUsers);
        }
      } catch (error) {
        console.log(
          "status: " + error.status + " || " + "Error: " + error.message
        );
        alert(
          "status: " +
            error.status +
            " || " +
            "Error Fetching Users: " +
            error.message
        );
      }
    };

    const fetchAllUsers = async () => {
      try {
        const response = await fetch(`http://localhost:5000/getUsers`);

        const result = await response.json();

        if (result.success) {
          const usersOptions = result.users.map((user) => ({
            value: {
              userId: user._id,
              name: user.name,
              username: user.username,
              avatarImgURL: user.avatarImgURL,
              profileImgURL: user.profileImgURL,
            },
            label: `${user.name} (${user.username})`,
          }));

          setAllUsers(usersOptions);
        }
      } catch (error) {
        setError(true);
        console.log(
          "status: " + error.status + " || " + "Error: " + error.message
        );
        alert(
          "status: " +
            error.status +
            " || " +
            "Error Fetching Users: " +
            error.message
        );
      }
    };

    fetchAllUsers();
    fetchAddedUsers();

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
          {user?.authority === "admin" ? (
            <div className="flex flex-col gap-2 md:gap-3">
              <h2 className="h3-bold md:h2-bold text-left w-full">
                Search and Add User
              </h2>
              <div className="space-y-2">
                <Select
                  id="assignUser"
                  value={machineUser}
                  onChange={handleMachineUserChange}
                  options={allUsers}
                  className={`rounded-md text-sm text-black shad-textarea pt-2`}
                  placeholder="Search and select a user"
                />
              </div>

              <div className="flex gap-4 items-center justify-start">
                <button
                  type="button"
                  onClick={addUser}
                  className={`${buttonCSS} shad-button_primary`}
                  disabled={loader}
                >
                  {loader ? <Loader /> : "Add User"}
                </button>
              </div>

              <h2 className="h3-bold md:h2-bold text-left w-full pt-6">
                Added Users
              </h2>

              {loader ? (
                <Loader />
              ) : addedUsers ? (
                <div className="max-w-screen-xl py-0">
                  <div className="min-[300px]:grid max-[600px]:grid-cols-1 min-[600px]:grid-cols-2 min-[1150px]:grid-cols-3 gap-4 min-[800px]:gap-2 min-[900px]:gap-4">
                    {addedUsers?.map((user) => (
                      <div
                        key={user.AU_username}
                        className="post-card cursor-pointer flex-1 max-[350px]:min-w-52 max-[380px]:min-w-72 max-[450px]:min-w-80 max-[600px]:min-w-96 max-[700px]:min-w-64 max-[800px]:min-w-80 max-[950px]:min-w-64 max-[1000px]:min-w-72 max-[1150px]:min-w-80 max-[1250px]:min-w-64 max-[1350px]:min-w-72 max-[1520px]:min-w-80 min-w-96"
                      >
                        <UserCard key={user.AU_id} addedUser={user} />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <h3 className="h3-bold md:h2-bold text-left w-full">
                  Currently you have not added any Users.
                </h3>
              )}
            </div>
          ) : (
            <div className="max-w-5xl gap-3 justify-start w-full">
              <h2 className="h3-bold md:h2-bold text-left w-full">
                Your Account doesn't support this feature.
              </h2>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AddUser;
