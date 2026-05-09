import React, {useState} from 'react';

const Select = (props: { initValue: boolean, onClick: (status: boolean) => void }) => {

    const [selected, setSelected] = useState(props.initValue)

    const baseClasses = "transition-all w-[80px] h-[40px] rounded flex items-center px-2 cursor-pointer border border-1"
    const selectedClasses = baseClasses + " border-yellow justify-end"
    const notSelectedClasses = baseClasses + "  border-white"

    return <div
        className={selected ? selectedClasses : notSelectedClasses}
        onClick={() => {
            setSelected(!selected)
            props.onClick(!selected)
        }}>
        <div className={`transition-all w-[28px] h-[28px] rounded-full ${selected ? "bg-yellow" : "bg-white"}`}>
        </div>
    </div>
};

export default Select;
