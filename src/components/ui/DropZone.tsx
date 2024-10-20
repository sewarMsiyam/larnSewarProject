"use client"
import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

interface DropZoneProps {
    onFileUpload: (file: File | null) => void;
    acceptedFileTypes?: string[];
}

const DropZone: React.FC<DropZoneProps> = ({ onFileUpload, acceptedFileTypes = ['image/*', 'application/pdf'] }) => {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            const newFile = acceptedFiles[0];
            setFile(newFile);
            onFileUpload(newFile);
        }
    }, [onFileUpload]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: acceptedFileTypes.reduce((acc, curr) => ({ ...acc, [curr]: [] }), {}),
        maxFiles: 1,
    });

    useEffect(() => {
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);

            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [file]);

    const removeFile = () => {
        setFile(null);
        setPreview(null);
        onFileUpload(null);
    };

    return (
        <div>
            {!file ? (
                <div
                    {...getRootProps()}
                    className={`p-6 border-2  border-dashed rounded-lg text-center cursor-pointer transition-colors duration-300 bg-[#f3f4f6] ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                        }`}
                >
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <p className="text-blue-500">أفلت الملف هنا ...</p>
                    ) : (
                        <p>اسحب وأفلت الملف هنا، أو انقر لتحديد الملف</p>
                    )}
                    <p className="text-sm text-gray-500 mt-2">
                        يُسمح بالملفات من النوع {acceptedFileTypes.join(', ')}.
                    </p>
                </div>
            ) : (
                <div className="mt-4">
                    <div className="relative inline-block">
                        {file.type.startsWith('image/') ? (
                            <img
                                src={preview!}
                                alt="File preview"
                                className="w-full h-fit object-cover rounded"
                            />
                        ) : (
                            <div className="w-32 h-32 flex items-center justify-center bg-gray-200 rounded">
                                <span className="text-xs text-center">{file.name}</span>
                            </div>
                        )}
                        <button
                            onClick={removeFile}
                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-8 h-8 text-3xl flex items-center justify-center"
                            type="button"
                        >
                            <span>x</span>
                        </button>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">{file.name}</p>
                </div>
            )}
        </div>
    );
};

export default DropZone;