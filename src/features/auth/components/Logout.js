import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logOutAsync, selectLoggedInUser } from '../authSlice'
import { Navigate } from 'react-router-dom';

const Logout = () => {
    const user = useSelector(selectLoggedInUser);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(user){
            dispatch(logOutAsync(user.id));
        }
    });

  return (
    <>
        {!user && <Navigate to={'/login'} replace={true}></Navigate>}
    </>
  )
}

export default Logout