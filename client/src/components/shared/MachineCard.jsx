import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../store/user-context";
import Loader from "./Loader";

const MachineCard = ({ machine }) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [loader, setLoader] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [machineUser, setMachineUser] = useState(null);
  const [machineStatus, setMachineStatus] = useState({
    active: machine.machineActive === "Yes" ? "active" : null,
    idle: machine.machineIdle === "Yes" ? "idle" : null,
    alert: machine.alert === "Yes" ? "alert" : null,
    notWorking: machine.machineNotWorking === "Yes" ? "notWorking" : null,
  });

  const handleStatusChange = (status) => {
    setMachineStatus({
      active: status === "active" ? "active" : null,
      idle: status === "idle" ? "idle" : null,
      alert: status === "alert" ? "alert" : null,
      notWorking: status === "notWorking" ? "notWorking" : null,
    });
  };

  const handleMachineUserChange = (selectedOption) => {
    setMachineUser(selectedOption);
  };

  const onSettingStatus = async () => {
    setLoader(true);

    const data = {};
    if (machineStatus.active) {
      data.machineActive = "Yes";
    } else {
      data.machineActive = machineStatus.active;
    }

    if (machineStatus.idle) {
      data.machineIdle = "Yes";
    } else {
      data.machineIdle = machineStatus.idle;
    }

    if (machineStatus.alert) {
      data.alert = "Yes";
    } else {
      data.alert = machineStatus.alert;
    }

    if (machineStatus.notWorking) {
      data.machineNotWorking = "Yes";
    } else {
      data.machineNotWorking = machineStatus.notWorking;
    }

    const setMachineStatus = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/editMachineStatus/${machine._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
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

    setMachineStatus();
  };

  const onAssignUser = async () => {
    setLoader(true);

    const data = {};
    data.AU_id = machineUser.value.userId;
    data.AU_name = machineUser.value.name;
    data.AU_username = machineUser.value.username;

    const addPost = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/assignUser/${machine._id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
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

  const buttonCSS =
    "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2";

  useEffect(() => {
    setLoader(true);

    const fetchAllUsers = async () => {
      try {
        const response = await fetch(`http://localhost:5000/getAddedUsers`);

        const result = await response.json();

        if (result.success) {
          const usersOptions = result.addedUsers.map((user) => ({
            value: {
              userId: user.AU_id,
              name: user.AU_name,
              username: user.AU_username,
            },
            label: `${user.AU_name} (${user.AU_username})`,
          }));

          setAllUsers(usersOptions);
        }
      } catch (error) {
        console.log(
          "status: " + error.status + " || " + "Error: " + error.message
        );
        alert("status: " + error.status + " || " + "Error: " + error.message);
      }
    };

    fetchAllUsers();

    setLoader(false);
  }, []);

  return (
    <>
      <div className="font-medium leading-[120%] text-[24px]">
        {machine.machine && <p>Machine - {machine.machine}</p>}
      </div>

      {user.authority === "admin" && (
        <div className="font-medium leading-[130%] text-[13px] pb-1">
          {machine._id && <p>({machine._id})</p>}
        </div>
      )}

      {/* {cityDetails && (
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
      )} */}

      {/* {post.image && (
        <div>
          <img
            src={`https://bloggram-mern.onrender.com/uploads/images/${post.image}`}
            alt="post image"
            className="post-card_img"
          />
        </div>
      )} */}

      <div className="font-medium leading-[200%] text-[19px]">
        {machine.mall && <p>Mall - {machine.mall}</p>}
      </div>

      <div className="font-medium leading-[160%] text-[18px]">
        {machine.city && <p>City - {machine.city}</p>}
      </div>

      <div className="font-medium leading-[180%] text-[18px]">
        {machine.AU_name ? (
          <p>User - {machine.AU_name}</p>
        ) : (
          <p>User - Not Assigned yet</p>
        )}
      </div>

      <div className="font-medium leading-[160%] text-[18px]">
        {machine.AU_name ? (
          <p>Username - {machine.AU_username}</p>
        ) : (
          <p>Username - Not Assigned yet</p>
        )}
      </div>

      {machine.description && (
        <div className="small-medium lg:base-medium py-5">
          <p className="text-justify text-[16px]">
            Machine Description - {machine.description}
          </p>
        </div>
      )}

      {user.authority === "admin" && (
        <>
          <div className="font-medium leading-[50%] text-[20px] text-orange-600 pb-6">
            {machineStatus.active && (
              <p>Machine Status - {machineStatus.active}</p>
            )}
            {machineStatus.idle && <p>Machine Status - {machineStatus.idle}</p>}
            {machineStatus.alert && (
              <p>Machine Status - {machineStatus.alert}</p>
            )}
            {machineStatus.notWorking && (
              <p>Machine Status - {machineStatus.notWorking}</p>
            )}
          </div>
          <div className="space-y-2">
            <label
              className="text-[16px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 shad-form_label"
              htmlFor="assignUser"
            >
              Assign or Change User
            </label>

            <Select
              id="assignUser"
              value={machineUser}
              onChange={handleMachineUserChange}
              options={allUsers}
              className={`rounded-md text-sm text-black shad-textarea`}
              placeholder="Search and select a user"
            />
          </div>

          <button
            type="button"
            onClick={onAssignUser}
            className={`${buttonCSS} shad-button_primary mt-3 ml-1 rounded-lg`}
            disabled={loader}
          >
            {loader ? <Loader /> : "Assign"}
          </button>
        </>
      )}

      {user.authority === "user" && (
        <>
          <div className="space-y-2">
            <label
              className="text-[18px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 shad-form_label"
              htmlFor="machineStatus"
            >
              Set Machine Status
            </label>

            <div className="flex flex-col space-y-1">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="machineStatus"
                  value="active"
                  checked={machineStatus.active === "active"}
                  onChange={() => handleStatusChange("active")}
                  className="mr-2"
                />
                Active
              </label>

              <label className="flex items-center">
                <input
                  type="radio"
                  name="machineStatus"
                  value="idle"
                  checked={machineStatus.idle === "idle"}
                  onChange={() => handleStatusChange("idle")}
                  className="mr-2"
                />
                Idle
              </label>

              <label className="flex items-center">
                <input
                  type="radio"
                  name="machineStatus"
                  value="alert"
                  checked={machineStatus.alert === "alert"}
                  onChange={() => handleStatusChange("alert")}
                  className="mr-2"
                />
                Alert
              </label>

              <label className="flex items-center">
                <input
                  type="radio"
                  name="machineStatus"
                  value="notWorking"
                  checked={machineStatus.notWorking === "notWorking"}
                  onChange={() => handleStatusChange("notWorking")}
                  className="mr-2"
                />
                Not Working
              </label>
            </div>
          </div>

          <button
            type="button"
            onClick={onSettingStatus}
            className={`${buttonCSS} shad-button_primary mt-3 ml-1 rounded-lg`}
            disabled={loader}
          >
            {loader ? <Loader /> : "Set Status"}
          </button>
        </>
      )}
    </>
  );
};

export default MachineCard;
