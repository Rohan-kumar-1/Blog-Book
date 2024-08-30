import React, { useId } from 'react'


//hum input ka component bna rahe hai but hum is component ko jaha use karrahe hai wah ape sara parameter denge to waha pe is input ka referance v to hona chaiye
const Input = React.forwardRef(function Input({
    label,
    type = 'text',
    className = "",
    ...props
}, ref) {
    const id = useId()
    return (
        <div className='w-full'>
            {label && <label
                className='inline-block mb-2 pl-1'
                htmlFor={id}>
                {label}
            </label>}
            <input
                type={type}
                id={id}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none
                 focus:bg-gray-100 duration-200 border border-gray-200 w-full ${className}`}
                 ref = {ref}
                //  ref use isliye kar rahe hai q ki jo v hum  input me le rahe hai uska access v to chaiye hoga taki uspe methods lga sake
                {...props}

            />
        </div>
    )
})

export default Input
