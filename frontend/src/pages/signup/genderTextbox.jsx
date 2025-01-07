const GenderCheckbox = ({  handleCheckboxChange ,selectedGender}) => {
	return (
		<div className='flex'>
			<div className='form-control'>
				<label className={`label gap-2 cursor-pointer`}>
					<span className='label-text text-white'>Male</span>
					<input type='checkbox' className={`checkbox border-white ${selectedGender === "male" ? "selected" : ""} `} 
					checked={selectedGender === 'male'}
					onChange={() => handleCheckboxChange('male')}
					/>
				</label>
			</div>
			<div className='form-control'>
				<label className={`label gap-2 cursor-pointer`}>
					<span className='label-text text-white'>Female</span>
					<input type='checkbox' className={`checkbox border-white ${selectedGender === "female" ? "selected" : ""} `}
					checked={selectedGender === 'female'}
					onChange={() => handleCheckboxChange('female')}
					/>
				</label>
			</div>
		</div>
	);
};
export default GenderCheckbox;