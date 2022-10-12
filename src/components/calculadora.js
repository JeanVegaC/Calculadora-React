import { paste } from '@testing-library/user-event/dist/paste';
import React, { useState, useEffect } from 'react';
import { createRef, useRef } from 'react';
import Footer from './footer';

export default function Calculadora() {
    const [data, setData] = useState(null);
    // const [operator,setOperator] = useState(false);
    let count = 0;

    let refData = useRef();

    const handleEdit = async (e) => {

        if (refData.current != undefined) {

            if (count == 2) {
                await result();
                console.log(e);
            }

            refData.current.textContent += e;

            if (refData.current.textContent.indexOf('+')) count = 1
            if (refData.current.textContent.indexOf('*')) count = 1
            if (refData.current.textContent.indexOf('/')) count = 1
            if (refData.current.textContent.indexOf('-')) count = 1

        }
    }

    const result = () => {
        if (refData.current != undefined) {
            setData(refData.current.textContent);
        }

    }

    useEffect(() => {

        if (data != null) {
            let arr = data.split(' ');

            if (data.includes('*')) {
                let dat1 = arr[arr.indexOf('*') - 1],
                    dat2 = arr[arr.indexOf('*') + 1];

                let res = data;
                res = res.replace(/ /g, '').replace(`${dat1}*${dat2}`, parseInt(dat1) * parseInt(dat2));
                refData.current.textContent = res;
                setData(res);
            }
            if (data.includes('/')) {
                let dat1 = arr[arr.indexOf('/') - 1],
                    dat2 = arr[arr.indexOf('/') + 1];

                let res = data;
                res = res.replace(/ /g, '').replace(`${dat1}/${dat2}`, parseInt(dat1) / parseInt(dat2));
                refData.current.textContent = res;
                setData(res);
            }
            if (data.includes('+')) {
                let dat1 = arr[arr.indexOf('+') - 1],
                    dat2 = arr[arr.indexOf('+') + 1];

                let res = data;
                res = res.replace(/ /g, '').replace(`${dat1}+${dat2}`, parseInt(dat1) + parseInt(dat2));
                console.log(res);
                refData.current.textContent = res;
                setData(res);
            }
            if (data.includes('-')) {
                let dat1 = arr[arr.indexOf('-') - 1],
                    dat2 = arr[arr.indexOf('-') + 1];

                let res = data;
                res = res.replace(/ /g, '').replace(`${dat1}-${dat2}`, parseInt(dat1) - parseInt(dat2));
                refData.current.textContent = res;
                setData(res);
            }

        }
    }, [data])

    useEffect(() => {


    }, [refData])

    return (
        <>
        <main>
            <div className='calculadora'>
                <div className='result'>
                    <span ref={refData}></span>
                </div>
                <ul className='teclado'>
                    <li onClick={() => handleEdit(1)}>1</li>
                    <li onClick={() => handleEdit(2)}>2</li>
                    <li onClick={() => handleEdit(3)}>3</li>
                    <li onClick={() => { count++; handleEdit(' + ') }}>+</li>
                    <li onClick={() => handleEdit(4)}>4</li>
                    <li onClick={() => handleEdit(5)}>5</li>
                    <li onClick={() => handleEdit(6)}>6</li>
                    <li onClick={() => { count++; handleEdit(' * ') }}>*</li>
                    <li onClick={() => handleEdit(7)}>7</li>
                    <li onClick={() => handleEdit(8)}>8</li>
                    <li onClick={() => handleEdit(9)}>9</li>
                    <li onClick={() => { count++; handleEdit(' / ') }}>/</li>
                    <li onClick={() => handleEdit(0)}>0</li>
                    <li onClick={() => { count++; handleEdit(' - ') }}>-</li>
                    <li onClick={() => { refData.current.textContent = ''; setData('') }}>AC</li>
                    <li onClick={() => { result(); count-- }}>=</li>
                </ul>
            </div>
        </main>
        <Footer/>
        </>


    )
}