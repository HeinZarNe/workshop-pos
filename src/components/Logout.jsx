import React from "react";
import { BiLogOut } from "react-icons/bi";
import Swal from "sweetalert2";
import { useLogoutMutation } from "../services/authApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeUser } from "../services/authSlice";
const Logout = () => {
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const logoutHandler = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      iconColor: "#bb86fc",
      buttonsStyling: false,
      width: "20em",
      color: "#fafafa",
      heightAuto: false,
      background: "#1E1E1E",
      focusConfirm:true,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      customClass: {
        cancelButton:
          "bg-primary text-secondary rounded-lg border-2 border-primary px-4 font-mono py-2",
        confirmButton:
          "bg-transparent text-primary rounded-lg border-2 border-primary px-7 font-mono py-2",
        // htmlContainer: '!pb-0',
        actions: " !mt-5 !w-[100%] flex justify-center gap-9",
        icon: "!p-0",
        title: "!mt-0 !pt-0",
      },
      // cancelButtonColor: "#bb86fc",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const data = await logout(token);
        Swal.fire({
          title: "Logout successfully !",
          buttonsStyling: false,
          color: '#bb86fc',
          width: '25em',
          background: '#1e1e1e',
          customClass:{
            title: 'text-primary',
            // htmlContainer: 'bg-secondary',
            // action: '!mt-2',
            confirmButton: 'bg-primary text-secondary px-6 py-2 font-mono font-semibold rounded-lg'
          }

        });
        if (data) {
          dispatch(removeUser());
          navigate("/login");
        }
      }
    });
  };

  return (
    <div>
      <div
        onClick={logoutHandler}
        href="#"
        className="ms-1  flex items-center text-tcolor cursor-pointer"
      >
        <span className=" text-[22px] mr-4">
          <BiLogOut />
        </span>
        <h1 className="text-[15px] font-semibold">Logout</h1>
      </div>
    </div>
  );
};

export default Logout;
