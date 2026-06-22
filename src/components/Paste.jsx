import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { FaEdit } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaClipboard } from "react-icons/fa";
import { FaShareAlt } from "react-icons/fa";

const Paste = () => {

    const pastes = useSelector((state) => state.paste.pastes);
    const [searchTerm, setSearchTerm] = useState('');

    const dispatch = useDispatch();
    const filteredData = pastes.filter((paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase())
    );


    function handleDelete(pasteId) {
        dispatch(removeFromPastes(pasteId));
    }
    const handleShare = (pasteId) => {
        const shareLink = `${window.location.origin}/pastes/${pasteId}`;

        navigator.clipboard.writeText(shareLink);
        toast.success("Share link copied!");
    };


    return (
        <div>
            <input
                className=' cursor-text p-1 mt-2 w-[70%] pl-4 rounded-2xl text-gray-800 bg-gray-100 font-serif border-black '
                type='search'
                value={searchTerm}
                placeholder='search here...'
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className=' pt-4 flex flex-col gap-4'>
                {
                    filteredData.length > 0 &&
                    filteredData.map(
                        (paste) => {
                            return (
                                <div key={paste._id} className='font-serif overflow-hidden justify-between place-content-evenly bg-zinc-800 text-white-800 rounded-2xl shadow-lg border border-gray-700 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1'>
                                    <div>
                                        {paste.title}
                                    </div>
                                    <div>
                                        {paste.content}
                                    </div>
                                    <div className='flex flex-row place-content-evenly gap-4'>
                                        <button className='cursor-pointer bg-gray-500 hover:bg-red-600 text-white p-2 rounded-full shadow-md transition-all duration-300 hover:scale-110' >
                                            <a href={`/?pasteId=${paste?._id}`}>
                                                <FaEdit size={10} />
                                            </a>

                                        </button>
                                        <button className='cursor-pointer bg-gray-500 hover:bg-red-600 text-white p-2 rounded-full shadow-md transition-all duration-300 hover:scale-110' >
                                            <a href={`/pastes/${paste?._id}`}>
                                                <FaEye size={10} />
                                            </a>

                                        </button>
                                        <button className=' cursor-pointer bg-gray-500 hover:bg-red-600 text-white p-2 rounded-full shadow-md transition-all duration-300 hover:scale-110' onClick={() => handleDelete(paste?._id)} >
                                            <FaTrash size={10} />
                                        </button>
                                        <button className='cursor-pointer bg-gray-500 hover:bg-red-600 text-white p-2 rounded-full shadow-md transition-all duration-300 hover:scale-110' onClick={() => {
                                            navigator.clipboard.writeText(paste?.content)
                                            toast.success("Copied to clipboard");
                                        }
                                        } >
                                            <FaClipboard size={10} />
                                        </button>
                                        <button className=' cursor-pointer bg-gray-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl shadow-md flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-lg' onClick={handleShare}>
                                            <FaShareAlt size={10} />
                                        </button>
                                        <div className="text-sm font-serif text-gray-200">
                                            {new Date(paste.createdAt).toLocaleString("en-IN", {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </div>
                                    </div>

                                </div>

                            )
                        }
                    )
                }
            </div>
        </div>
    )
}

export default Paste
