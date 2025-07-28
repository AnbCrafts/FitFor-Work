import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { WorkContext } from '../../ContextAPI/WorkContext';
import { Divide, Send } from 'lucide-react';

const ChatBox = () => {
  const {hash} = useParams();
  const {getUserDataById,userData,getAllAdmins,allAdmins,sendMessage,getMessages,allMessages,} = useContext(WorkContext);
  const [sender,setSender] = useState(null);
  const [receiver,setReceiver] = useState({
    name:"",
    id:""
  });
  const [message,setMessage] = useState("");

  


  useEffect(()=>{
        const id = localStorage.getItem("userId");
        setSender(id);
        getUserDataById(id);
        getAllAdmins();
  },[hash])

  useEffect(()=>{
     if(allAdmins && allAdmins.length === 1){
      setReceiver({
        name:allAdmins[0].adminName,
        id:allAdmins[0].userId
      })
    }
  },[allAdmins])

  


  useEffect(()=>{
if(sender && receiver.id){
  getMessages(sender,receiver.id);
  getMessages(receiver.id,sender);
}
  },[sender,receiver])

 
  



 



  return (
    <div className='min-h-[100vh] w-[90%] mx-auto bg-[#0e0e37] rounded-2xl shadow-2xl p-5'>
      <div className='w-fit mx-auto'>
        <h1 className='text-5xl  font-bold inline bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500 text-transparent bg-clip-text'>
      Drop your Queries here
  </h1>
      </div>

      <div className='h-auto w-full p-5 bg-gray-900 text-2xl shadow-2xl mt-10'>
        
        <div className='flex items-start gap-5 justify-start'>
        <div className='flex items-center justify-start gap-3 mb-5'>

          <div className='h-12 w-12 rounded-full p-0.5 border border-indigo-500'>
            <img src={userData?.picture} className='w-full h-full object-cover rounded-full' alt="" />

          </div>
          <h1 className='text-lg bg-[white] text-gray-900 font-semibold py-1 px-5 rounded-2xl'>{userData?.username}</h1>
        </div>

       {
        receiver.name !== "" ?  
       ( <div className='flex items-center  gap-5 justify-start'>
        
        <Send className='mb-5'/>

        <div className='flex items-center justify-start gap-3 mb-5'>

          <div className='h-12 w-12 rounded-full p-0.5 border border-indigo-500 flex items-center justify-center'>
            <span className='text-4xl mb-1.5 font-bold inline bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500 text-transparent bg-clip-text'>
              {receiver?.name[0]}
            </span>

          </div>
          <h1 className='text-lg bg-[white] text-gray-900 font-semibold py-1 px-5 rounded-2xl'>{receiver?.name}</h1>
        </div>
        </div>)
        :(
              <p className='text-gray-400 italic text-sm'>
      No admin selected yet
    </p>

        )
       }

        </div>

        <div className='flex flex-col p-5 bg-[#05051a] rounded-2xl max-h-[80vh] h-[80vh] overflow-y-scroll noScroll'>
  {/* Always show current time at the top */}
  <div className='py-1 mb-5 w-fit mx-auto text-center'>
    <span className='text-sm text-gray-400'>
      {new Date().toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short'
      })}
    </span>
  </div>

  {allMessages?.map((msg, index) => {
    const currentTime = new Date(msg.createdAt); // Assuming each message has `createdAt`
    const prevTime = index > 0 ? new Date(allMessages[index - 1].createdAt) : null;

    let showTime = false;

    if (index === 0) {
      showTime = true;
    } else {
      const diff = (currentTime - prevTime) / (1000 * 60); // difference in minutes
      if (diff >= 30) showTime = true;
    }

    return (
      <React.Fragment key={msg._id || index}>
        {showTime && (
          <div className='py-1 mb-5 w-fit mx-auto text-center'>
            <span className='text-sm text-gray-400'>
              {currentTime.toLocaleString('en-IN', {
                dateStyle: 'medium',
                timeStyle: 'short'
              })}
            </span>
          </div>
        )}
        <div className={msg.senderId === sender ? 'sent message mb-1' : 'received message mb-1'}>
         <div className=''>
           <p>{msg.content}</p>
         </div>
        </div>
      </React.Fragment>
    );
  })}
</div>



       <div className='py-3'> 
  <textarea  
    className='text-lg/tight outline-none bg-white/5 px-5 py-2 border w-full rounded-xl border-gray-600 resize-none' 
    name="" 
    id="" 
    value={message} 
    onChange={(e) => setMessage(e.target.value)} 
    placeholder='Write something here ...'
    onKeyDown={(e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault(); // prevent newline

    if (!message.trim()) return; // prevent empty messages
    if (!receiver?.id || !sender) {
      alert("Receiver or sender missing");
      return;
    }

    const formData = {
      senderId: sender,
      receiverId: receiver.id,
      content: message.trim()
    };

    sendMessage(sender, receiver.id, formData);
    setMessage(""); 
  }
}}

  />
</div>




      </div>


      <div className='mt-5 p-5'>
        <h1 className='text-2xl  font-bold inline bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500 text-transparent bg-clip-text'>
      Complaint to -
  </h1>

  <div className='mt-10'>
    {
      allAdmins && allAdmins.map((item,index)=>{
        return(
          <div onClick={()=>setReceiver({
            name:item.adminName,
            id:item._id
          })}  key={index} className='flex mb-5 cursor-pointer hover:shadow-2xl hover:bg-white/20 items-center justify-center gap-3 py-2.5 w-xs border border-gray-500 rounded-lg bg-white/10'>
           <div className='h-12 w-12 p-0.5 border bg-gray-900 border-indigo-500 rounded-full flex items-center justify-center '>
            <span className='text-4xl mb-1.5 font-bold inline bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500 text-transparent bg-clip-text'>
              {item.adminName[0]}
            </span>

           </div>
            <span className='text-xl text-white font-semibold'>{item.adminName}</span>

          </div>
        )
      })
    }

  </div>
      </div>
      
    </div>
  )
}

export default ChatBox
