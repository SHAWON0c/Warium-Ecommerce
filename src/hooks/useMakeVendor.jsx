// src/hooks/useMakeVendor.js
import { useCallback } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "./useAxiosSecure";

const useMakeVendor = (refetch) => {
  const axiosSecure = useAxiosSecure();

  // Accept both userId and requestId to delete the role request
  const handleMakeVendor = useCallback(
    async (userId, requestId) => {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, make vendor!",
      });

      if (!result.isConfirmed) return;

      try {
        const res = await axiosSecure.patch(`/users/vendor/${userId}`);

        if (res.data.modifiedCount > 0) {
    
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "User has been made vendor successfully!",
            showConfirmButton: false,
            timer: 1500,
          });

          refetch?.();
        } else {
          Swal.fire("Error!", "Could not update the user to vendor.", "error");
        }
      } catch (error) {
        Swal.fire(
          "Error!",
          "Something went wrong while updating the user.",
          "error"
        );
      }
    },
    [axiosSecure, refetch]
  );

  return handleMakeVendor;
};

export default useMakeVendor;
