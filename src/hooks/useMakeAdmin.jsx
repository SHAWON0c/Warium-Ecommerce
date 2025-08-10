// src/hooks/useMakeAdmin.js
import { useCallback } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "./useAxiosSecure";


const useMakeAdmin = (refetch) => {
    const axiosSecure = useAxiosSecure();

    const handleMakeAdmin = useCallback(async (userId, user_id) => {
        console.log("Make Admin:", userId);

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, make admin!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/admin/${userId}`)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "User has been made admin successfully!",
                                showConfirmButton: false,
                                timer: 1500
                            });

                            if (refetch) refetch();
                        } else {
                            Swal.fire(
                                "Error!",
                                "Could not update the user to admin.",
                                "error"
                            );
                        }
                    })
                    .catch(() => {
                        Swal.fire(
                            "Error!",
                            "Something went wrong while updating the user.",
                            "error"
                        );
                    });
            }
        });
    }, [axiosSecure, refetch]);

    return handleMakeAdmin;
};

export default useMakeAdmin;
