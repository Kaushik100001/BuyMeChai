import React from 'react'
import { ethers } from 'ethers';


const Buy = ({state}) => {
    const buyChai = async (e) => {
        e.preventDefault() ;
        const {contract}= state
        const name = document.querySelector("#name").value
        const message = document.querySelector("#message").value
        console.log(name , contract, message)
        const amount  = {value : ethers.utils.parseEther("0.001")}
        const transaction = await contract.buyChai(name , message , amount)
        transaction.wait()
        console.log("Done TRansaction")
    }
    
    return (
        <div class="m-2">
            <form onSubmit={buyChai}>
                <input class  type="text" id='name' placeholder='Enter your name' />
                <input type="text"  id='message' placeholder='Enter Message' />
                <div class="m-2">
                <button type='submit' class="btn btn-primary">Pay</button>
                </div>

            </form>
        </div>
    )
}

export default Buy