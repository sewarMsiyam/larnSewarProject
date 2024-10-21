"use client"
import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { X } from 'lucide-react';

interface DropZoneProps {
    onFileUpload: (file: File | null) => void;
}

const DropZone: React.FC<DropZoneProps> = ({ onFileUpload }) => {
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
        maxFiles: 1,
    });

    useEffect(() => {
        if (file) {
            if (file.type.startsWith('image/')) {
                const objectUrl = URL.createObjectURL(file);
                setPreview(objectUrl);
                return () => URL.revokeObjectURL(objectUrl);
            } else {
                setPreview(null);
            }
        }
    }, [file]);

    const removeFile = () => {
        setFile(null);
        setPreview(null);
        onFileUpload(null);
    };

    const getFileIcon = (fileName: string) => {
        const extension = fileName.split('.').pop()?.toLowerCase();
        return `https://cdn.jsdelivr.net/gh/dmhendricks/file-icon-vectors/dist/icons/vivid/${extension}.svg`;
    };

    return (
        <div>
            {!file ? (
                <div
                    {...getRootProps()}
                    className={`p-6 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors duration-300 bg-[#f3f4f6] ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                        }`}
                >
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <p className="text-blue-500">أفلت الملف هنا ...</p>
                    ) : (
                        <p>اسحب وأفلت الملف هنا، أو انقر لتحديد الملف</p>
                    )}
                    <p className="text-sm text-gray-500 mt-2">
                        يمكنك رفع أي نوع من الملفات
                    </p>
                </div>
            ) : (
                <div className="mt-4">
                    <div className="relative inline-block">
                        {preview ? (
                            <img
                                src={preview}
                                alt="File preview"
                                className="w-32 h-32 object-cover rounded"
                            />
                        ) : (
                            <div className="w-32 h-32 flex items-center justify-center bg-gray-200 rounded">
                                <img
                                    src={getFileIcon(file.name)}
                                    alt={file.name}
                                    className="w-16 h-16"
                                />
                            </div>
                        )}
                        <button
                            onClick={removeFile}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xl flex items-center justify-center"
                            type="button"
                        >
                                <span>  <X size={14} /></span>
                        </button>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">{file.name}</p>
                </div>
            )}
        </div>
    );
};

export default DropZone;