
import React, { useState, useRef } from 'react';
import { Upload, FilePlus, File, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileUploaderProps {
  label: string;
  description: string;
  required?: boolean;
  accept?: string;
  onChange: (file: File | null) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  label,
  description,
  required = false,
  accept = '.pdf,.docx,.doc',
  onChange
}) => {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      setFile(droppedFile);
      onChange(droppedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      onChange(selectedFile);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const removeFile = () => {
    setFile(null);
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2 w-full">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">
          {label} {required && <span className="text-resume-error">*</span>}
        </label>
        {file && (
          <button 
            onClick={removeFile}
            className="text-xs text-resume-error flex items-center space-x-1 hover:underline"
          >
            <X className="w-3 h-3" /> <span>Remove</span>
          </button>
        )}
      </div>
      
      {!file ? (
        <div
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "upload-area flex flex-col items-center justify-center",
            dragging && "upload-area-active"
          )}
        >
          <input
            type="file"
            ref={fileInputRef}
            className="file-input"
            accept={accept}
            onChange={handleFileChange}
          />
          <Upload className="h-10 w-10 text-muted-foreground mb-2" />
          <p className="text-sm font-medium">Drag & drop or click to upload</p>
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        </div>
      ) : (
        <div className="p-4 border rounded-lg bg-accent/30 flex items-center">
          <div className="bg-resume-primary/10 p-2 rounded-full mr-3">
            <File className="h-5 w-5 text-resume-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{file.name}</p>
            <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
          </div>
          <button
            onClick={handleClick}
            className="ml-4 p-1.5 rounded-full hover:bg-accent"
          >
            <FilePlus className="h-4 w-4 text-resume-secondary" />
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
