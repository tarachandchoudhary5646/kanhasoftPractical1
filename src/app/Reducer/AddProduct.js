'use client'
const initialData = {
    items: [],
    deliveryFee:0,
    totalAmount:0,
    coupon:null
}

const AddProductReducer = (state = initialData, action) => {
    switch(action.type){
        case('ADD_TO_CART'):
            let newItem = action.payload
            let itemExist = false;
            //let updatedIems = [...state.items, newItem]
            
            let updatedIems = state.items.map((item, index)=>{
                if(item.id == newItem.id){
                    itemExist = true;
                    return {...item, qty : item.qty+1}
                }
                return item
            })

            if(!itemExist){
                updatedIems = [...state.items, {...newItem, qty:1}]
            }
            console.log(updatedIems);

            const updateTotalamount = parseFloat((state.totalAmount + newItem.price).toFixed(2));
            const updateDeliveryFee = updateTotalamount < 500 ? 50 : 0

            console.log(state);
            return{
                ...state,
                items:updatedIems,
                totalAmount:updateTotalamount,
                deliveryFee:updateDeliveryFee
            }
        
        case('COUPON_APPLY'):
            let couponCode = action.payload
            let discountAmnt = 0;
            if(couponCode == 'COPX'){
                discountAmnt = Math.ceil(state.totalAmount/10 < 100 ? state.totalAmount/10 : 100)
            }else if(couponCode == 'COPY'){
                discountAmnt = Math.ceil(state.totalAmount/5 < 150 ? state.totalAmount/5 : 150)
            }else if(couponCode == 'COPZ'){
                discountAmnt = Math.ceil((state.totalAmount*3)/10 < 200 ? (state.totalAmount*3)/10 : 200)
            }
            console.log(discountAmnt);
            return{
                ...state,
                totalAmount: parseFloat((state.totalAmount - discountAmnt).toFixed(2)),
                coupon:couponCode,
            }

        case('REMOVE_PRODUCT'):
            let itemId = action.payload
            let updatedItems = state.items.filter((item) => item.id != itemId)
            let removedItem = state.items.filter((item) => item.id == itemId)
            let updatedTotalAmnt = parseFloat((state.totalAmount - removedItem[0].price).toFixed(2));
            let updatedDeliveryAmnt = updatedTotalAmnt < 500 ? 50 : 0
            return{
                ...state,
                items:updatedItems,
                totalAmount:updatedTotalAmnt,
                deliveryFee:updatedDeliveryAmnt
            }

        case('QTY_UPDATE'):
            let itemQty = action.payload
            console.log(itemQty);
            

        default:
            return state;
    }
}

export default AddProductReducer;