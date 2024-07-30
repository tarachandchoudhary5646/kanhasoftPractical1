'use client'

import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CouponApply, qtyUpdate, removeProduct } from '../Action';
import Link from 'next/link';

function Cart() {

    const dispatch = useDispatch();
    const cartData = useSelector((state)=> state.AddProductReducer)
    const [cart, setCart] = useState([]);
    const [deliveryFee, setDeliveryFee] = useState();
    const [totalAmount, setTotalAmount] = useState();
    const [coupon, setCoupon] = useState(null);
    const [qty, setQty] = useState();

    useEffect(()=>{
        if(cartData.items){
            setCart(cartData.items)
            setDeliveryFee(cartData.deliveryFee)
            setTotalAmount(cartData.totalAmount)
        }
    }, [cartData])

    const applyCoupon = () => {
        dispatch(CouponApply(coupon))
    }

    const itemRemove = (id) =>{
        console.log(id);
        dispatch(removeProduct(id))
    }



    if(cart.length == 0){
        return(
            <>
                <div className='max-w-[1000px] mx-auto my-10 px-3 text-center'>
                    <h2 className='text-xl font-semibold'>Your Cart is empty</h2>
                    <p className='my-3'>Please add items</p>
                    <Link href={'/'} className='mt-2 bg-red-600 text-white font-semibold text-sm py-2 px-3 rounded-md'>Product listing</Link>
                </div>
            </> 
        )
    }else{
        return (
            <>
                <div className='max-w-[1000px] mx-auto my-10 px-3'>
                    <div className='grid grid-cols-3 gap-4'>
                        <div className='col-span-2 bg-slate-50 border border-slate-100 rounded-md overflow-hidden'>
                            <h3 className='bg-slate-200 py-2 px-3 text-lg font-semibold'>Cart Item</h3>
                            <div className='p-3'>
                                {
                                    cart?.map((item, index)=>(
                                        <div key={item.id} className='flex items-center bg-white border border-slate-200 rounded-md p-3 shadow-sm mb-2'>
                                            <figure>
                                                <Image src={item.image} alt={item.title} width={100} height={50} />
                                            </figure>
                                            <div className='pl-4'>
                                                <h4 className='font-semibold text-md'>{item.title}</h4>
                                                <p className='font-semibold mt-2 text-md'>${item.price}</p>
                                                <div className='flex items-center mt-2'>
                                                    <div className='flex items-center mr-3 text-xs font-semibold'>
                                                        Qty - {item.qty}
                                                    </div>
                                                    <button className='text-red-600 font-semibold text-xs' onClick={()=> itemRemove(item.id)}>Remove</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className='bg-slate-50 border border-slate-100 rounded-md overflow-hidden'>
                            <h3 className='bg-slate-200 py-2 px-3 text-lg font-semibold'>Cart Amount</h3>
                            <div className='p-3'>
                                <ul>
                                    <li className='py-2 flex items-center justify-between border-b border-slate-300'>
                                        <p className='text-sm font-semibold'>Delivery Fee</p>
                                        <span className='font-semibold text-sm'>{deliveryFee}</span>
                                    </li>
                                </ul>
                                <div className='py-2'>
                                    <h5 className='font-semibold text-sm mb-2'>Coupon</h5>
                                    <div className='flex bg-white border border-slate-300 rounded-md overflow-hidden'>
                                        <input type='text' placeholder='Coupon' className='w-full h-9 text-sm pl-3 outline-none focus:outline-none' onChange={(e)=> setCoupon(e.target.value)}/>
                                        <button onClick={applyCoupon} className='bg-red-600 text-white font-semibold text-sm h-9 px-3'>Apply</button>
                                    </div>
                                </div>
                                <ul>
                                    <li className='py-2 flex items-center justify-between border-b border-slate-300'>
                                        <p className='text-sm font-semibold'>Cart Total</p>
                                        <span className='font-semibold text-sm'>{totalAmount}</span>
                                    </li>
                                </ul>
                                <button className='mt-2 bg-green-600 py-2 rounded-md text-sm font sem w-full font-semibold text-white'>Pay amount</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Cart