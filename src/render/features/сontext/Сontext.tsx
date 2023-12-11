import React from "react"
import Input from "../../UI/Input";
import Btn from "../../UI/Btn";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";

const Context = () => {

    const data: {
        l1: string
        l2: string
    }[] = [
        {
            l1: 'Потому что "мама мыла раму", а "Apple любит музыку".',
            l2: 'Because "mom soap frame", and "Apple loves music".'
        },
        {
            l1: 'Моя мама мыла посуду, слушая радио.',
            l2: 'I was in the kitchen washing dishes, listening to the radio.'
        },
        {
            l1: 'Когда-то моя мама мыла посуду в этом ресторане.',
            l2: 'My mom used to wash dishes at this restaurant.'
        },
        {
            l1: 'Потому что "мама мыла раму", а "Apple любит музыку".',
            l2: 'Because "mom soap frame", and "Apple loves music".'
        },
        {
            l1: 'Моя мама мыла посуду, слушая радио.',
            l2: 'I was in the kitchen washing dishes, listening to the radio.'
        },
        {
            l1: 'Когда-то моя мама мыла посуду в этом ресторане.',
            l2: 'My mom used to wash dishes at this restaurant.'
        },
        {
            l1: 'Потому что "мама мыла раму", а "Apple любит музыку".',
            l2: 'Because "mom soap frame", and "Apple loves music".'
        },
        {
            l1: 'Моя мама мыла посуду, слушая радио.',
            l2: 'I was in the kitchen washing dishes, listening to the radio.'
        },
        {
            l1: 'Когда-то моя мама мыла посуду в этом ресторане.',
            l2: 'My mom used to wash dishes at this restaurant.'
        },
        {
            l1: 'Потому что "мама мыла раму", а "Apple любит музыку".',
            l2: 'Because "mom soap frame", and "Apple loves music".'
        },
        {
            l1: 'Моя мама мыла посуду, слушая радио.',
            l2: 'I was in the kitchen washing dishes, listening to the radio.'
        },
        {
            l1: 'Когда-то моя мама мыла посуду в этом ресторане.',
            l2: 'My mom used to wash dishes at this restaurant.'
        }
    ]

    return <div className={"px-2 pt-4"}>

        <div className={"flex items-center gap-1"}>
            <Input placeholder={"Enter word"} width={100}/>
            <div className={"w-[15px]"}></div>
            <Btn type={"normal"} size={1} clickHandler={() => {
                //
            }}>English</Btn>
            <div className={"w-[40px] text-center"}>
                <FontAwesomeIcon icon={faArrowRight}/>
            </div>
            <Btn type={"normal"} size={1} clickHandler={() => {
                //
            }}>Russian</Btn>
            <Btn type={"normal"} size={1} clickHandler={() => {
                //
            }}>
                <FontAwesomeIcon icon={faMagnifyingGlass}/>
            </Btn>
        </div>
        <ul className={"my-3 h-[395px] overflow-auto"}>
            {data.map((e, i) => {
                return <li key={i} className={"grid grid-cols-2 mb-2"}>
                    <div className={"border-l-4 border-grayDark pl-3"}>{e.l1}</div>
                    <div className={"border-l-4 border-grayDark pl-3"}>{e.l2}</div>
                </li>
            })}

        </ul>
    </div>
}

export default Context
