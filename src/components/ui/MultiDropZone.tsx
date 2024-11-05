"use client"
import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { X, File as FileIcon } from 'lucide-react';

interface DropZoneProps {
    onFilesUpload: (files: File[]) => void;
    maxFiles?: number;
    maxSize?: number; // in bytes
}

const DropZone: React.FC<DropZoneProps> = ({ 
    onFilesUpload, 
    maxFiles = 10,
    maxSize = 10 * 1024 * 1024 // 10MB default
}) => {
    const [files, setFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<{ [key: string]: string }>({});

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles(prevFiles => {
            const newFiles = [...prevFiles, ...acceptedFiles];
            // If we exceed maxFiles, take only the first maxFiles
            const limitedFiles = newFiles.slice(0, maxFiles);
            onFilesUpload(limitedFiles);
            return limitedFiles;
        });
    }, [maxFiles, onFilesUpload]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        maxFiles,
        maxSize,
    });

    useEffect(() => {
        // Create previews for image files
        const newPreviews: { [key: string]: string } = {};
        files.forEach(file => {
            if (file.type.startsWith('image/')) {
                const objectUrl = URL.createObjectURL(file);
                newPreviews[file.name] = objectUrl;
            }
        });
        setPreviews(newPreviews);

        // Cleanup
        return () => {
            Object.values(newPreviews).forEach(URL.revokeObjectURL);
        };
    }, [files]);

    const removeFile = (fileName: string) => {
        setFiles(prevFiles => {
            const newFiles = prevFiles.filter(file => file.name !== fileName);
            onFilesUpload(newFiles);
            return newFiles;
        });
        
        if (previews[fileName]) {
            URL.revokeObjectURL(previews[fileName]);
            setPreviews(prev => {
                const newPreviews = { ...prev };
                delete newPreviews[fileName];
                return newPreviews;
            });
        }
    };

    const getFileIcon = (fileName: string) => {
        const extension = fileName.split('.').pop()?.toLowerCase();
        return `https://cdn.jsdelivr.net/gh/dmhendricks/file-icon-vectors/dist/icons/vivid/${extension}.svg`;
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div className="w-full">
            <div
                {...getRootProps()}
                className={`p-6 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors duration-300 bg-[#f3f4f6] 
                    ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
            >
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p className="text-blue-500">أفلت الملفات هنا ...</p>
                ) : (
                    <div>
                        <p>اسحب وأفلت الملفات هنا، أو انقر لتحديد الملفات</p>
                        <p className="text-sm text-gray-500 mt-2">
                            الحد الأقصى: {maxFiles} ملفات، حجم كل ملف: {formatFileSize(maxSize)}
                        </p>
                    </div>
                )}
            </div>

            {files.length > 0 && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {files.map((file, index) => (
                        <div key={`${file.name}-${index}`} className="relative bg-gray-50 p-3 rounded-lg">
                            <div className="group relative">
                                {previews[file.name] ? (
                                    <img
                                        src={previews[file.name]}
                                        alt={file.name}
                                        className="w-full h-24 object-cover rounded"
                                    />
                                ) : (
                                    <div className="w-full h-24 flex items-center justify-center bg-gray-100 rounded">
                                        <div className="flex flex-col items-center">
                                            <FileIcon className="w-8 h-8 text-gray-400" />
                                            <span className="text-xs text-gray-500 mt-1">
                                                {file.name.split('.').pop()?.toUpperCase()}
                                            </span>
                                        </div>
                                    </div>
                                )}
                                <button
                                    onClick={() => removeFile(file.name)}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                                    type="button"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                            <div className="mt-2">
                                <p className="text-sm text-gray-600 truncate" title={file.name}>
                                    {file.name}
                                </p>
                                <p className="text-xs text-gray-400">
                                    {formatFileSize(file.size)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DropZone;