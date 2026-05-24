import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
    return (
        <div className="layout overflow-hidden flex justify-start items-start h-[100vh]">
            <div className='w-[16%] max-h-full '>
                <Sidebar />
            </div>
            <main className='w-[84%] overflow-y-auto h-full'>
                {children}
            </main>
        </div>
    );
};

export default Layout;
