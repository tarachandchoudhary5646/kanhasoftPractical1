'use client'


import React, { useEffect, useState } from 'react'
import useFetch from '../Components/useFetch'
import Loader from '../Components/Loader'
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { addProduct } from '../Action';

function ProductListing() {

    const dispatch = useDispatch();
    const {data, loading, error} = useFetch('https://fakestoreapi.com/products');
    const [product, setProduct] = useState([]);
    const [loader, setLoader] = useState();
    const [errorField, setErrorField] = useState();
    const showProduct = 3;
    const [startCount, setStartCount] = useState(0)
    const [showTotalProduct, setShowTotalProduct]= useState(showProduct)
    const [currentPage, setCurrentPage] = useState(1);
    const [itemAdded, setItemAdded] = useState(false)
    let pagesArr = []
    
    
    useEffect(()=>{
        if(data){
            setProduct(data)
        }
    }, [data, loading, error])

    let totalPages = Math.ceil(product.length/showProduct);
    for(let i = 1; i <= totalPages; i++){
        pagesArr.push(i)
    }


    if(loading){
        return <Loader/>
    }

    if(error){
        return error
    }

    const loadMore = () => {
        setShowTotalProduct((prev) => prev + showProduct)
    }

    const prevPage = () => {
        setCurrentPage((prev) => prev - 1);
        setStartCount((prev) => prev - showProduct)
        setShowTotalProduct((prev) => prev - showProduct)
    }
    
    const nextPage = () => {
        setCurrentPage((prev) => prev + 1);
        setStartCount(showTotalProduct)
        setShowTotalProduct((prev) => prev + showProduct)
    }

    const changePage = (page) => {
        setCurrentPage(page)
        setStartCount(showProduct * page - showProduct)
        setShowTotalProduct(showProduct * page)
    }

    const addToCart = (item) => {
        setItemAdded(true)
        dispatch(addProduct({
            id:item.id,
            title:item.title,
            qty:1,
            image:item.image,
            price:item.price,
            category:item.category
        }));

        setTimeout(() => {
            setItemAdded(false)
        }, 1000);
    }

  return (
    <>
        <div className='max-w-[1000px] mx-auto my-6 px-3'>
            <div className='grid grid-cols-3 gap-4'>
                {
                    product?.slice(startCount, showTotalProduct).map((item, index)=>{
                        return(
                            <>
                                <div key={index} className='bg-slate-50 shadow-md rounded-md p-3 text-center'>
                                    <figure className='text-center min-h-[180px] flex items-center justify-center'>
                                        <Image className='inline-block' src={item.image} alt={item.title} width={120} height={100}/>
                                    </figure>
                                    <h3 className='mt-2 font-semibold text-sm truncate ...'>{item.title}</h3>
                                    <span className='text-red-600 text-xs font-semibold capitalize'>{item.category}</span>
                                    <h4 className='text-md'>${item.price}</h4>
                                    <button onClick={()=> addToCart(item)} className='mt-2 bg-red-600 text-white font-semibold text-sm py-2 px-3 rounded-md'>Add to cart</button>
                                </div>
                            </>
                        )
                    })
                }
            </div>
            {
                showTotalProduct.length != product.length && (
                    <div className='text-center mt-4'>
                        <button onClick={loadMore} className='mt-2 bg-blue-600 text-white font-semibold text-sm py-2 px-3 rounded-md'>Load more</button>
                    </div>
                )
            }
            
            <div className='mt-5 flex justify-center'>
                <ul className='flex justify-center border border-slate-200 rounded-sm w-auto overflow-hidden'>
                    <li className='border-r border-slate-200'>
                        <button onClick={prevPage} className={`${currentPage === 1 ? 'opacity-50 pointer-events-none' : 'opacity-100'} py-1 px-2 text-sm hover:bg-blue-500 hover:text-white`}>Prev</button>
                    </li>
                    {
                        pagesArr.map((item, index)=>(
                            <li key={index} className='border-r border-slate-200'>
                                <button onClick={()=> changePage(item)} className={`${item == currentPage ? 'bg-blue-600 text-white ' :  ' '}py-1 px-3 text-sm hover:bg-blue-500 hover:text-white`}>{item}</button>
                            </li>
                        ))
                    }
                    <li>
                        <button onClick={nextPage} className={`${currentPage === pagesArr.length ? 'opacity-50 pointer-events-none ' : 'opacity-100 '} py-1 px-2 text-sm hover:bg-blue-500 hover:text-white`}>Next</button>
                    </li>
                </ul>
            </div>
        </div>
        {
            itemAdded?
                <div className='fixed bg-transparent w-full h-full top-0 left-0 flex items-center justify-center'>
                <div className='bg-slate-700 text-white font-semibold rounded-full w-auto py-2 px-4 text-sm'>Item Added</div>
            </div> : ''
        }
        
    </>
  )
}

export default ProductListing