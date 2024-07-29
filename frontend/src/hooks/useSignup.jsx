import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext.jsx";

const useSignup = () => {
	const [loading, setLoading] = useState(false);
  // console.log("loading reyan")
	const { setAuthUser } = useAuthContext();

	const signup = async ({ fullName, userName, password, confirmPassword, gender }) => {
		const success = handleInputErrors({ fullName, userName, password, confirmPassword, gender });
    console.log(fullName, userName, password, confirmPassword, gender)
    console.log(success)
		if (!success) return;


		setLoading(true);
		try {
			const res = await fetch("/api/auth/signup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ fullName, userName, password, confirmPassword, gender }),
			},
     
    );


			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}
			localStorage.setItem("chat-user", JSON.stringify(data));
			 setAuthUser(data);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, signup };
};
export default useSignup;

function handleInputErrors({ fullName, userName, password, confirmPassword, gender }) {
	if (!fullName || !userName || !password || !confirmPassword || !gender) {
    console.log("Please fill in all fields");
		toast.error("Please fill in all fields");
		return false;
	}

	if (password !== confirmPassword) {
    console.log("Passwords do not match");
		toast.error("Passwords do not match");
		return false;
	}

	if (password.length < 6) {
    console.log("Password must be at least 6 characters");
		toast.error("Password must be at least 6 characters");
		return false;
	}

	return true;
}