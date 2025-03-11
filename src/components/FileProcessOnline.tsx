"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { FiUpload } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineFile } from "react-icons/ai";
import { useRouter } from "next/navigation";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { FEATURES } from "@/utils/Helper";

const FileProcessOnline = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const router = useRouter();

    useEffect(() => {
        const storedFiles = JSON.parse(localStorage.getItem("uploadedFiles") || "[]");
        if (storedFiles.length > 0) {
            setFiles(storedFiles.map((fileName: string) => new File([], fileName)));
        }
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            "application/zip": [".zip"], "application/java-archive": [".war", ".ear"],
            "image/jpeg": [".jpg", ".jpeg"], "image/png": [".png"], "image/webp": [".webp"]
        },
        maxSize: 10 * 1024 * 1024,
        onDrop: (acceptedFiles) => {
            console.log("Accepted files:", acceptedFiles);
            if (acceptedFiles.length === 0) return;

            setFiles(acceptedFiles);
            setUploading(true);
            setProgress(0);

            localStorage.setItem("uploadedFiles", JSON.stringify(acceptedFiles.map(file => file.name)));

            const interval = setInterval(() => {
                setProgress((oldProgress) => {
                    if (oldProgress >= 100) {
                        clearInterval(interval);
                        setTimeout(() => {
                            router.push(`/read-process/file-data`);
                        }, 1000);
                    }
                    return Math.min(oldProgress + 20, 100);
                });
            }, 500);
        },
    });

    return (
        <div className="relative min-h-screen">
            <Header />
            <div className="flex flex-col items-center mb-[69px]">
                <h2 className="text-[32px] font-semibold text-center mb-[34px] mt-9 ff-syne">Read & process your files online</h2>
                <div className="bg-white p-4 rounded-xl shadow-md">
                    {!uploading ? (
                        <div
                            {...getRootProps()}
                            className="w-[635px] mx-auto h-[326px] p-4 border-dashed border border-red-400 rounded-lg flex flex-col items-center justify-center bg-white cursor-pointer">
                            <input {...getInputProps()} />
                            <FiUpload className="text-3xl text-gray-500 mb-2" />
                            <p className="text-gray-700">Paste or drag and drop files here</p>
                            <p className="text-xs text-gray-500">Supports ZIP, WAR, EAR, and Images (Max 10MB)</p>
                            <button className="mt-3 bg-red-500 text-white p-2 rounded-[4px]">
                                <IoMdAdd className="text-xl" />
                            </button>
                        </div>
                    ) : (
                        <div className="w-[635px] mx-auto h-[326px] border p-4 border-dashed border-red-400 rounded-lg flex flex-col items-center justify-center bg-white">
                            <div className="flex flex-col gap-3 w-full">
                                {files.map((file, index) => (
                                    <div key={index} className="flex justify-between gap-3 w-full p-2">
                                        <div className="flex items-center gap-2">
                                            {file.type.startsWith("image/") ? (
                                                <Image src={URL.createObjectURL(file)} alt="preview" width={50} height={50} className="rounded-lg" />
                                            ) : (
                                                <AiOutlineFile className="text-2xl text-gray-700" />
                                            )}
                                            <p className="text-gray-700 font-medium text-base">
                                                Uploading <span className="font-bold">{file.name}</span>
                                            </p>
                                        </div>
                                        <p className="text-base text-black mt-2 font-medium">{progress}%</p>
                                    </div>
                                ))}
                                <div className="bg-gray-200 h-[3px] w-full rounded-full">
                                    <div className="bg-red-500 h-[3px] rounded-full" style={{ width: `${progress}%` }}></div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="mt-6 max-w-[667px] mx-auto flex justify-between max-sm:flex-col max-sm:space-y-4">
                    <p className="text-gray-600 text-sm max-w-[355px]">
                        Our accelerator allows you to upload, read, and process multiple file types (e.g., Python, JAR, ZIP, Images), extracting key data like classes, methods, and structure for easy review.</p>
                    <div className="flex flex-col items-start space-y-2">
                        {FEATURES.map((feature, index) => (
                            <p key={index} className="text-gray-600 text-sm flex gap-2">
                                <Image src="/assets/images/svg/tick.svg" alt="tick" width={18} height={18} /> {feature}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default FileProcessOnline;
