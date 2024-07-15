import MessageConatiner from "../../component/Message/MessageConatiner";
import Sidebar from "../../component/siderBar/sideBar";

export const Home = () => {
	return (
		<div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
			<Sidebar />
            <MessageConatiner />
		</div>
	);
};
// export default Home;