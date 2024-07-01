import React from 'react'

const TextInput = React.forwardRef(({
    propTypes, placeholder, styles, label, labelStyles, register, name, error, type
}, ref) => {
    return <div className='w-full flex flex-col mt-2'>
        {
            label && <p className={`text-white text-sm mb-2 ${labelStyles}`}>{label}</p>
        }
        <div>
            <input 
                type={type}
                name={name}
                placeholder={placeholder}
                ref={ref}
                className={`bg-green-100 rounded border border-[#666666] outline-none text-sm text-black px-4 py-3 placeholder:text-[#666] ${styles}`}
                {...register}
                aria-invalid={error ? "true" : "false"}            
            />
        </div>
        {
            error && (
                <span className='text-xs text-[#f64949fe] mt-0.5'>{error}</span>
            )
        }

    </div>
})

export default TextInput;
