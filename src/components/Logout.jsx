import React from 'react'
import { BiLogOut } from 'react-icons/bi'
import Swal from 'sweetalert2'
import { useLogoutMutation } from '../services/authApi'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { removeUser } from '../services/authSlice'
const Logout = () => {
    const [logout] = useLogoutMutation();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    const logoutHandler = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do Yoy Want to LogOut",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
        }).then( async (result) => {
            if (result.isConfirmed) {
                const data = await logout(token)
                Swal.fire(
                    'Logout Successfully !',
                    
                  )
                if(data){
                    dispatch(removeUser())
                    navigate('/login')
                }
            }
          })
    }
      
  return (
    <div>
       <div onClick={logoutHandler} href="#" className="ms-1 flex items-center text-tcolor cursor-pointer">
            <span className=" text-[22px] mr-4">
              <BiLogOut />
            </span>
            <h1 className="text-[15px] font-semibold">Logout</h1>
          </div>
    </div>
  )
}

export default Logout
