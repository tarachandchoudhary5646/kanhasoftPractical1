'use client'
export const addProduct = (data) => {
    return{
        type : 'ADD_TO_CART',
        payload:data
    }
}

export const CouponApply = (data) => {
    return{
        type : 'COUPON_APPLY',
        payload:data
    }
}

export const removeProduct = (data) => {
    return{
        type : 'REMOVE_PRODUCT',
        payload:data
    }
}

export const qtyUpdate = (data) => {
    return{
        type : 'QTY_UPDATE',
        payload:data
    }
}