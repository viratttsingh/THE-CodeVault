import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

const Home = () => {

    const [title, setTitle] = useState("");
    const [value, setValue] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const pasteId = searchParams.get("pasteId");
    const dispatch=useDispatch();
    const allPastes=useSelector((state)=>state.paste.pastes);


     useEffect(() => {
                if(pasteId){
                    const paste=allPastes.find((p)=>p._id===pasteId);
                    setTitle(paste.title);
                    setValue(paste.content);
                }
             
           
              }, [pasteId])

    function createPaste(){
          const paste={
            title:title,
            content:value,
            _id:pasteId ||
            Date.now().toString(36),
            createdAt:new Date().toISOString
            (), 
            
          }
             
              

          if(pasteId){ //updation
            dispatch(updateToPastes(paste));
          }
          else{ //creation
             dispatch(addToPastes(paste));
          }

          //cleaning
          setTitle('');
          setValue('');
          setSearchParams({});
    }

    return (
        <div>
            
           <div className='flex flex-row gap-7 place-content-between'>
             <input
                className=' p-2 m-2 cursor-text p-1 mt-2 w-[70%] pl-4 rounded-2xl text-white-800 bg-zinc-800 font-serif border-black '
                type="text"
                placeholder='Enter your repository title '
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <button onClick={createPaste} className='font-serif  cursor-pointer px-6 py-2 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 transition-all duration-300'>
                {
                    pasteId ? "Update Repository" :  "Create Repository"
                }
            </button>
           </div>

            <div className='mt-8'>
                <textarea
                className='rounded-2xl font-serif w-full border-white  p-2 m-0  bg-zinc-800 text-white-800 focus:outline-none focus:ring-10 focus:ring-red-2'
    
                      value={value}
                      placeholder='Enter your code, notes, or text...'
                      onChange={(e)=>setValue(e.target.value)}
                       rows={20}
                       
                />
            </div>

        </div>
    )
}

export default Home
