import * as React from 'react';

import { toast } from 'sonner';
import { z } from 'zod';

export interface UploadedFile<T = unknown> {
  appUrl?: string;
  key: string;
  name: string;
  serverData?: T;
  size: number;
  type: string;
  url: string;
}

interface UseUploadFileProps {
  headers?: HeadersInit;
  onUploadComplete?: (file: UploadedFile) => void;
  onUploadError?: (error: unknown) => void;
}

export function useUploadFile({
  onUploadComplete,
  onUploadError,
  ...props
}: UseUploadFileProps = {}) {
  const [uploadedFile, setUploadedFile] = React.useState<UploadedFile>();
  const [uploadingFile, setUploadingFile] = React.useState<File>();
  const [progress, setProgress] = React.useState<number>(0);
  const [isUploading, setIsUploading] = React.useState(false);

  async function uploadRepositoryMedia(file: File) {
    setIsUploading(true);
    setUploadingFile(file);
    setProgress(10);

    try {
      const formData = new FormData();

      formData.append('file', file);

      const response = await fetch('/api/admin/media', {
        body: formData,
        headers: props.headers,
        method: 'POST',
      });

      setProgress(85);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'File upload failed.');
      }

      const uploaded = data.file as UploadedFile;

      setUploadedFile(uploaded);
      setProgress(100);

      onUploadComplete?.(uploaded);

      return uploaded;
    } catch (error) {
      const errorMessage = getErrorMessage(error);

      const message =
        errorMessage.length > 0
          ? errorMessage
          : 'Something went wrong, please try again later.';

      toast.error(message);

      onUploadError?.(error);

      // Mock upload for unauthenticated users
      // toast.info('User not logged in. Mocking upload process.');
      const mockUploadedFile = {
        key: 'mock-key-0',
        appUrl: `https://mock-app-url.com/${file.name}`,
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file),
      } as UploadedFile;

      // Simulate upload progress
      let progress = 0;

      const simulateProgress = async () => {
        while (progress < 100) {
          await new Promise((resolve) => setTimeout(resolve, 50));
          progress += 2;
          setProgress(Math.min(progress, 100));
        }
      };

      await simulateProgress();

      setUploadedFile(mockUploadedFile);

      return mockUploadedFile;
    } finally {
      setProgress(0);
      setIsUploading(false);
      setUploadingFile(undefined);
    }
  }

  return {
    isUploading,
    progress,
    uploadedFile,
    uploadFile: uploadRepositoryMedia,
    uploadingFile,
  };
}

export function getErrorMessage(err: unknown) {
  const unknownError = 'Something went wrong, please try again later.';

  if (err instanceof z.ZodError) {
    const errors = err.issues.map((issue) => issue.message);

    return errors.join('\n');
  }
  if (err instanceof Error) {
    return err.message;
  }
  return unknownError;
}

export function showErrorToast(err: unknown) {
  const errorMessage = getErrorMessage(err);

  return toast.error(errorMessage);
}
