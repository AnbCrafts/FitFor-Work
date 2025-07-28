import React from 'react'
import { useContext } from 'react'
import { WorkContext } from '../../ContextAPI/WorkContext'
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { Send } from 'lucide-react';

const Notifications = () => {
  const {hash} = useParams();
  const {getAllPingsByUserId,allPingsForThisUser,sendMessage,getMessages,allMessages,getUserDataById,userData,readMessages} = useContext(WorkContext);
const [id,setId] = useState(null);
const [ sender,setSender] = useState(null);

useEffect(()=>{
  const id = localStorage.getItem("adminId");
  setId(id);
 


},[hash]);

useEffect(()=>{
  if(id!==null){
    getAllPingsByUserId(id);

  }
},[id])


  const [message,setMessage] = useState("");

  
  useEffect(()=>{
if(sender && id){
  getMessages(sender,id);
  getUserDataById(sender)
  readMessages(sender,id);
}
  },[sender,id])








  return (
    <div className='min-h-[100vh] w-[90%] mx-auto py-10'>
     
<div className='flex items-center justify-between gap-5'>

     <div className='p-5 bg-white/5 border border-white/20 shadow-2xl  rounded-2xl h-[100vh] max-h-[100vh] overflow-y-scroll noScroll w-fit'>
      {
        allPingsForThisUser && allPingsForThisUser.map((item)=>{
          return(
            <div onClick={()=>{
              setSender(item.senderId)
              item.unreadCount =0;

            }} key={item.senderId} className={`flex cursor-pointer text-gray-900 items-center py-2 px-4 rounded-xl justify-between gap-3 w-xl mb-5 border ${sender===item.senderId?"bg-white/50":"bg-white"}  shadow-2xl`}>
  <div className='flex items-center gap-3'>
    <div className='h-12 w-12 p-0.5 border border-indigo-500 rounded-full'>
      <img src={item.picture} className='h-full w-full object-cover rounded-full' alt="" />
    </div>
    <div className='w-[120px]'>
      <span className='font-semibold text-lg px-1 text-ellipsis whitespace-nowrap overflow-ellipsis'>{item.name}</span>
    </div>
    <div className='text-ellipsis overflow-ellipsis whitespace-nowrap pl-2 border-l-2 border-pink-500'>
      {item.lastMessage}
    </div>
  </div>

  <div className='flex flex-col items-end justify-baseline gap-2 min-w-[50px]'>
    {
      item.unreadCount >0 &&(
        <div className='h-4.5 w-4.5 rounded-full flex items-center justify-center bg-green-500'>
      <span className='text-white text-sm font-semibold'>{item.unreadCount}</span>
    </div>
      )
    }
    <span className='text-xs font-semibold text-gray-600'>
  {new Date(item.lastTimestamp).toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })}
</span>

  </div>
</div>

          )
        })
      }

     </div>

     {
      sender &&(<div className='shadow-2xl rounded-2xl h-[100vh] bg-[#eceaea] flex-1 flex  flex-col items-start justify-between border-2 border-gray-600 '>

      <div className='flex items-start gap-5 justify-start border-b border-gray-400 w-full'>
        <div className='flex items-center justify-start gap-3 mb-5 h-full px-4'>

          <div className='h-12 w-12 rounded-full p-0.5 border border-indigo-500'>
            <img src={userData?.picture} className='w-full h-full object-cover rounded-full' alt="" />

          </div>
          <h1 className='text-lg bg-indigo-500 text-white font-semibold py-1 px-5 rounded-2xl'>{userData?.username}</h1>
        </div>

        </div> 
  


      
       

      <div className='flex flex-col p-5  h-[95vh] overflow-y-scroll noScroll w-full'>
  {/* Always show current time at the top */}
  <div className='py-1 mb-5 w-fit mx-auto text-center'>
    <span className='text-sm text-gray-900'>
      {new Date().toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short'
      })}
    </span>
  </div>

 {allMessages?.map((msg, index) => {
  const currentTime = new Date(msg.createdAt);
  const prevTime = index > 0 ? new Date(allMessages[index - 1].createdAt) : null;
  let showTime = false;

  if (index === 0 || (currentTime - prevTime) / (1000 * 60) >= 30) {
    showTime = true;
  }

  return (
    <React.Fragment key={msg._id || index}>
      {showTime && (
        <div className='py-1 mb-5 w-full mx-auto text-center'>
          <span className='text-sm text-gray-400'>
            {currentTime.toLocaleString('en-IN', {
              dateStyle: 'medium',
              timeStyle: 'short',
            })}
          </span>
        </div>
      )}
      <div className={`flex w-full ${msg.senderId === sender ? 'justify-start' : 'justify-end'} mb-2`}>
        <div className={`max-w-[60%] px-4 py-2 rounded-xl text-white ${
          msg.senderId === sender ? 'sent' : 'received'
        }`}>
          <p>{msg.content}</p>
        </div>
      </div>
    </React.Fragment>
  );
})}

</div>



  <div className='py-3 -mb-4.5 h-fit w-full'> 
  <textarea  
    className='text-lg/tight outline-none bg-white px-5 py-2 border w-full rounded-bl-xl rounded-br-xl border-gray-300 resize-none text-gray-700' 
    name="" 
    id="" 
    value={message} 
    onChange={(e) => setMessage(e.target.value)} 
    placeholder='Write something here ...'
    onKeyDown={(e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault(); // prevent newline

    if (!message.trim()) return; // prevent empty messages
    if (!id || !sender) {
      alert("Receiver or sender missing");
      return;
    }

    const formData = {
      senderId: id,
      receiverId: sender,
      content: message.trim()
    };

    sendMessage(sender, id, formData);
    setMessage(""); 
  }
}}

  />
</div>

      
      
    
     </div>)
     }

</div>



      
    </div>
  )
}

export default Notifications
