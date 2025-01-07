import { use ,useState } from "react";
import GenderCheckbox from "./genderTextbox";
import useSignup from "../../hooks/useSignup";
import {toast} from "react-hot-toast"
const SignUp = () => {
const [inputs, setInputs] = useState({
	fullname: "",
	username: "",
	password: "",
	confirmPassword: "",
	gender: "",
})
const handleCheckboxChange = (gender) => {
	setInputs({ ...inputs, gender });
};

const {loading, signup} = useSignup()

const handleSumbit = async (e) => {
	e.preventDefault();
	console.log(inputs);
	await signup(inputs);
}
	return (
		<div className='  flex flex-col items-center justify-center min-w-96 mx-auto'>
			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
				<h1 className='text-3xl font-semibold text-center text-gray-300'>
					Sign Up <span className='text-blue-500'> ChatApp</span>
				</h1>
				<form className="" onSubmit=
				{handleSumbit}>
					<div>
						<label className='label p-2'>
							<span className='text-base label-text text-white'>Full Name</span>
						</label>
						<input type='text' value={inputs.fullname} placeholder='John Doe' 
						onChange={(e) => setInputs({ ...inputs, fullname: e.target.value })}	
						className='w-full input input-bordered  h-10' />
					</div>

					<div>
						<label className='label p-2 '>
							<span className='ttext-whiteext-base label-text text-white'>Username</span>
						</label>
						<input type='text' value={inputs.username} placeholder='johndoe' className='w-full input input-bordered h-10'
						onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
						/>

					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text text-white'>Password</span>
						</label>
						<input
							type='password'
							placeholder='Enter Password'
							className='w-full input input-bordered h-10'
							value={inputs.password}
							onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
						/>
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text text-white'>Confirm Password</span>
						</label>
						<input
							type='password'
							placeholder='Confirm Password'
							className='w-full input input-bordered h-10'
							value={inputs.confirmPassword}
							onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
						/>
					</div>

					<GenderCheckbox handleCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender}/>

					<a className='text-sm text-white hover:underline hover:text-blue-600 mt-2 inline-block' href='/login'>
						Already have an account?
					</a>

					<div>
						<button className='btn btn-block btn-sm mt-2 border border-slate-700'>Sign Up</button>
					</div>
				</form>
			</div>
		</div>
	);
};
export default SignUp;