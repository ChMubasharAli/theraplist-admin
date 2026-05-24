import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { LuArrowUpRight } from "react-icons/lu";
import LatestUsers from "../components/LatestUsers";
import { Link } from "react-router-dom";

function Dashboard() {
  const [latestData, setLatestData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/dashboard`,
      );
      const data = await response.json();
      setLatestData(data);
    };
    fetchData();
  }, []);

  const { lastMessage } = latestData;
  return (
    <div>
      <Layout>
        <div className="px-4 pt-12 overflow-auto">
          <h1 className="font-bold text-3xl">Dashboard</h1>
        </div>
        <div className="grid grid-cols-2 justify-center gap-5 pt-12 items-center p-5">
          <div className="bg-[#00303A] h-[200px]  rounded-3xl p-10 text-white flex justify-start cursor-pointer    ">
            <div className="w-[80%]">
              <h2 className="text-[1.8rem] font-semibold">Number of Clients</h2>
              <h3 className="text-[1.8rem] font-bold">
                {latestData.userCount}
              </h3>
            </div>
            <Link
              to={"/Clients"}
              className="w-[20%] flex items-end justify-end"
            >
              <LuArrowUpRight className="text-[40px] text-[#00303A] bg-white rounded-full hover:bg-[#00303A] hover:text-white hover:border-white hover:border-2 transition-all ease-in-out duration-300" />
            </Link>
          </div>

          <div className="bg-[#00303A] h-[200px]  rounded-3xl p-10 text-white flex justify-start cursor-pointer ">
            <div className="w-[80%]">
              <h2 className="text-[1.8rem] font-semibold">
                Number of Providers
              </h2>
              <h3 className="text-[1.8rem] font-bold">
                {latestData.providerCount}
              </h3>
            </div>
            <Link
              to={"/Providers"}
              className="w-[20%] flex items-end justify-end"
            >
              <LuArrowUpRight className="text-[40px] text-[#00303A] bg-white rounded-full hover:bg-[#00303A] hover:text-white hover:border-white hover:border-2 transition-all ease-in-out duration-300" />
            </Link>
          </div>
        </div>

        <div className="p-5 ">
          <div className="bg-white BoxShadow h-[250px] rounded-3xl p-10 text-white flex flex-col cursor-pointer">
            <div className="space-y-4">
              <h2 className="text-[1.3rem] text-[#00303A] font-semibold">
                New Message
              </h2>
              <p className="text-[1.1rem] text-black">{lastMessage?.message}</p>
            </div>

            <Link to={"/Messages"} className="mt-6 flex justify-end w-full ">
              <button className="text-[#00303A] border border-[rgb(0,48,58)] px-5 py-2 rounded-md font-semibold text-[1.1rem] hover:bg-[#00303A] hover:text-white transition-all ease-in-out duration-200">
                Go to inbox
              </button>
            </Link>
          </div>
        </div>

        <div className="p-5">
          <LatestUsers />
        </div>
      </Layout>
    </div>
  );
}

export default Dashboard;
