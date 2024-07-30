'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { IoCartOutline } from "react-icons/io5";
import { useSelector } from 'react-redux';

function Header() {

    const cartData = useSelector((state)=> state.AddProductReducer)
    const [cartCount, setCartCount] = useState(0)
    
    useEffect(()=>{
        if(cartData){
            console.log(cartData);
            let countNo = 0;
            cartData.items.forEach(ele => {
                countNo += ele.qty
            });
            setCartCount(countNo)
        }
    }, [cartData])

  return (
    <>
        <div className='bg-white shadow-md px-3 py-3 flex items-center justify-between'>
            <h1><Link href={'/'} className='font-semibold text-xl'>Kanhasoft <span className='text-sm text-red-600'>Product</span></Link></h1>
            <ul className='flex items-center'>
                <li>
                    <Link href={'/'} className='font-semibold text-sm'>Product</Link>
                </li>
                <li className='ml-3'>
                    <Link href={'/cart'} className='font-semibold text-sm relative'>
                        <IoCartOutline className='text-xl'/>
                        <span className='text-xs bg-red-600 w-4 h-4 rounded-full text-white flex items-center justify-center absolute -top-2 -right-2'>{cartCount}</span>
                    </Link>
                </li>
            </ul>
        </div>
    
    </>
  )
}

export default Header