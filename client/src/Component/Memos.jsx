import React from 'react'
import { useState, useEffect } from 'react'


const Memos = ({state}) => {
   const [memos , setMemos] = useState([]) 
   const {contract}=state 
   useEffect(()=>{
     const memosMessage =async()=>{
      const  memos = await contract.getMemos()
      setMemos(memos)
     }
     contract && memosMessage()
   } , [contract])

  return (
    <div>
      <h5>Message</h5>
      {memos.map((memo)=>{
        return(
          <table class="table table-striped table-hover" key={memo.timestamp}>
            <tbody>
              <tr>
                <td class="p-3">{memo.name}</td>
                <td class="p-3">{memo.message}</td>
                <td class="p-3">{String(memo.timestamp)}</td>
                <td class="p-3">{memo.from}</td>
              </tr>
            </tbody>
          
          </table>
        )
      })}
    </div>
  )
}

export default Memos