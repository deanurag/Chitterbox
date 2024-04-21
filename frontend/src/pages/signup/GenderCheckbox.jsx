import React from 'react'

const GenderCheckbox = ({onCheckBoxChange, selectedGender}) => {
  return (
    <div className='flex justify-between'>
        <div className='form-control'>
            <label className={`label gap-2 cursor-pointer ${selectedGender === 'male'? "selected": ""}`}>
                <span className='text-base label-text'>Male</span>
                <input type='checkbox' className='checkbox border-slate-900' checked={selectedGender=== "male"} onChange={()=>onCheckBoxChange("male")}/>
            </label>
        </div>
        <div className='form-control'>
            <label className={`label gap-2 cursor-pointer ${selectedGender === 'female'? "selected": ""}`}>
                <span className='text-base label-text'>Female</span>
                <input type='checkbox' className='checkbox border-slate-900' checked={selectedGender=== "female"} onChange={()=>onCheckBoxChange("female")}/>
            </label>
        </div>
        <div className='form-control'>
            <label className={`label gap-2 cursor-pointer ${selectedGender === 'others'? "selected": ""}`}>
                <span className='text-base label-text'>Others</span>
                <input type='checkbox' className='checkbox border-slate-900' checked={selectedGender=== "others"} onChange={()=>onCheckBoxChange("others")}/>
            </label>
        </div>
    </div>
  )
}

export default GenderCheckbox