// src/hooks/useMakeAdmin.js
import { useCallback } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "./UseAxiosSecure";



const useMakeModerator = (refetch) => {
    const axiosSecure = useAxiosSecure();

    const handleMakeModerator= useCallback(async (userId, user_id) => {
        console.log("Make Admin:", userId);

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, make moderator!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/moderator/${userId}`)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "User has been made moderator successfully!",
                                showConfirmButton: false,
                                timer: 1500
                            });

                            if (refetch) refetch();
                        } else {
                            Swal.fire(
                                "Error!",
                                "Could not update the user to moderator.",
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

    return handleMakeModerator;
};

export default useMakeModerator;
