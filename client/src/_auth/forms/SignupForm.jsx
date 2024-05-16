import { Input } from "../../components/shared/Input";
import { useForm, FormProvider } from "react-hook-form";
import {
  name_validation,
  email_validation,
  password_validation,
  username_validation,
  authority_validation,
} from "../../utils/inputValidations";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/shared/Loader";

const SignupForm = () => {
  const navigate = useNavigate();

  const methods = useForm();
  const [loader, setLoader] = useState(false);

  const onSubmit = methods.handleSubmit((data) => {
    setLoader(true);

    const { userName: username, ...rest } = data;
    const newData = { username, ...rest };

    const signingUp = async () => {
      try {
        const response = await fetch("http://localhost:5000/signUp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newData),
        });

        const result = await response.json();

        if (result.success) {
          methods.reset();
          navigate("/sign-in");
        }

        if (response.status === 400) {
          alert(result.message);
        }

        if (response.status === 500) {
          alert(result.message);
        }

        setLoader(false);
        // const result = await response.json().then((data) => {
        //   const redirectURL = data.redirectURL;
        //   if(redirectURL) {
        //     window.location.href = redirectURL;
        //   } else {
        //     alert('Error ji');
        //   }
        // });
      } catch (error) {
        setLoader(false);
        console.log(
          "status: " + error.status + " || " + "Error: " + error.message
        );
        alert("status: " + error.status + " || " + "Error: " + error.message);
      }
    };

    signingUp();
  });

  const buttonCSS =
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2";

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("user"));

  //   if (user) {
  //     navigate("/");
  //   }
  // }, []);

  return (
    <FormProvider {...methods}>
      <div className="sm:w-420 flex-center flex-col">
        <form
          onSubmit={(e) => e.preventDefault()}
          noValidate
          autoComplete="off"
          className="flex flex-col gap-3 w-full mt-0"
        >
          <div className="flex flex-col items-center">
            <img src="/assets/images/bloggram.png" width={220} alt="logo" />

            <h2 className="h3-bold md:h2-bold pt-2 sm:pt-0 mt-1">
              Create a new account
            </h2>
            <p className="text-light-3 small-medium md:base-regular mt-0 mb-0">
              To use UniMall, Please enter your details
            </p>
          </div>

          <Input {...name_validation} />
          <Input {...username_validation} />
          <Input {...email_validation} />
          <Input {...password_validation} />
          <Input {...authority_validation} />

          <button
            onClick={onSubmit}
            className={`${buttonCSS} shad-button_primary`}
          >
            {loader ? (
              <div className="flex-center gap-2">
                <Loader />
              </div>
            ) : (
              "Sign up"
            )}
          </button>

          <p className="text-small-regular text-light-2 text-center mt-2">
            Already have an account?
            <Link
              to="/sign-in"
              className="text-primary-500 text-small-semibold ml-1"
            >
              Log in
            </Link>
          </p>
        </form>
      </div>
    </FormProvider>
  );
};

export default SignupForm;
