"use client";
import React from 'react';
import { useSearchParams, useRouter } from "next/navigation";
import Header from './common/Header';
import { useEffect, useState } from "react";
import Image from 'next/image';
import Footer from './common/Footer';
import { DATA, MERTICES } from '@/utils/Helper';

const Details = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [fileName, setFileName] = useState("");

    useEffect(() => {
        const storedFileName = localStorage.getItem("uploadedFileName");
        if (storedFileName) {
            setFileName(storedFileName);
        }
    }, []);

    const metricCount = searchParams.get("metric") || "";

    const handleMetricClick = (count: number, title: string) => {
        const params = new URLSearchParams(searchParams.toString());

        const formattedTitle = title.toLowerCase().replace(/\s+/g, "-");

        params.set("metric", count.toString());
        params.set("title", formattedTitle);

        router.push(`?${params.toString()}`, { scroll: false });
    };

    return (
        <div className='bg-[#F6F6F6]'>
            <Header />
            <div className="container max-w-[1180px] mx-auto px-4">
                <h2 className="text-2xl font-semibold pb-[34px] lg:text-left text-center">
                    {fileName ? fileName : "No file uploaded"}
                </h2>
                <div className="flex max-lg:flex-wrap gap-4 lg:justify-between justify-center">
                    {DATA.map((item, index) => (
                        <div key={index} className={`bg-white py-[19px] px-4 flex items-center gap-4 ${item.maxWidth} rounded-[8px] max-lg:mb-4`}>
                            <Image src={item.image} alt={item.alt} width={60} height={60} />
                            <div>
                                {!item.isButton && <p className="text-black w-[13px] bg-black h-1"></p>}
                                <p className="font-normal md:text-xl text-base max-w-[365px] xl:mr-16 whitespace-nowrap">{item.label}</p>
                            </div>
                            {item.isButton && (
                                <button className="text-[#ED1C24] font-medium text-sm border border-[#ED1C24] rounded-[49px] bg-[#FFF1F2] py-2 px-4">
                                    {item.buttonText}
                                </button>
                            )}
                        </div>
                    ))}
                </div>
                <h4 className='font-semibold text-2xl pt-[31.93px] pb-[24.07px] xl:text-left text-center'>Detailed metrices</h4>
                <div className="flex flex-wrap xl:gap-6 items-center pb-[46px] lg:justify-between justify-center">
                    <div className="xl:!w-[558px] w-[420px]">
                        {MERTICES.map((item, index) => (
                            <div
                                key={index}
                                className="flex bg-white py-3 px-4 mb-4 rounded-[8px] items-center gap-4 max-w-[558px] cursor-pointer hover:bg-gray-100"
                                onClick={() => handleMetricClick(item.count, item.title)}
                            >
                                <p className="font-medium md:text-2xl text-lg bg-[#FFF1F2] size-10 flex items-center justify-center rounded-full">
                                    {item.count}
                                </p>
                                <div className="flex justify-between w-full">
                                    <p className="font-normal text-sm whitespace-nowrap">{item.title}</p>
                                    <Image src="/assets/images/svg/detail-arrow.svg" alt="detail-arrow" width={12} height={6} />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='bg-white rounded-[8px] lg:mt-0 mt-5'>
                        <Image src="/assets/images/png/chart.png" alt='circle' width={558} height={464} />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Details;
