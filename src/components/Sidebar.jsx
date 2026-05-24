import React from 'react'
// import logo from '../../public/logo.png'
import { MdSpaceDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { MdLocalHospital } from "react-icons/md";
import { FaMessage } from "react-icons/fa6";
import { Link } from 'react-router-dom';

function Sidebar() {
    return (
        <div className='h-full'>
            <div className='bg-[#00303A]   h-screen flex justify-start items-start flex-col '>

                <div className='w-full h-[150px]'>
                    <img src='/logo.png' alt="logo" className='w-full h-full object-cover object-center' />
                </div>

                <div className='flex flex-col justify-start items-start px-6 py-5 w-full '>
                    <ul className='text-white space-y-6 w-full text-[1.2rem] font-bold'>
                        <Link to='/' className='p-2 rounded-md font-semibold bg-white text-[#00303A] w-full border border-white  cursor-pointer transition-all ease-in-out duration-200 hover:bg-gray-200 flex justify-start items-center gap-2'><MdSpaceDashboard size={20} /> Dashboard</Link>
                        <Link to='/Clients' className='p-2 rounded-md font-semibold bg-white text-[#00303A] w-full border border-white  cursor-pointer transition-all ease-in-out duration-200 hover:bg-gray-200 flex justify-start items-center gap-2'><FaUsers size={20} />Clients</Link>
                        <Link to='/Providers' className='p-2 rounded-md font-semibold bg-white text-[#00303A] w-full border border-white cursor-pointer transition-all ease-in-out duration-200 hover:bg-gray-200 flex justify-start items-center gap-2'><MdLocalHospital size={20} />Provider</Link>
                        <Link to='/Messages' className='p-2 rounded-md font-semibold bg-white text-[#00303A] w-full border border-white cursor-pointer transition-all ease-in-out duration-200 hover:bg-gray-200 flex justify-start items-center gap-2'><FaMessage size={20} />Messages</Link>
                        <Link to='/posts' className='p-2 rounded-md font-semibold bg-white text-[#00303A] w-full border border-white cursor-pointer transition-all ease-in-out duration-200 hover:bg-gray-200 flex justify-start items-center gap-2'><FaMessage size={20} />Posts</Link>
                        <Link to='/Transactions' className='p-2 rounded-md font-semibold bg-white text-[#00303A] w-full border border-white cursor-pointer transition-all ease-in-out duration-200 hover:bg-gray-200 flex justify-start items-center gap-2'><FaMessage size={20} />Transactions</Link>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Sidebar