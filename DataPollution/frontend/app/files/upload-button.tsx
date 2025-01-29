'use client'

import { useState } from 'react'
import { Button, Input } from '@heroui/react'
import uploadFile from './upload-file'

export default function UploadButton() {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsUploading(true)
    setUploadedFile(null)

    const formData = new FormData(event.currentTarget)
    try {
      const result = await uploadFile(formData)
      if (result.success) {
        setUploadedFile(result.fileName)
      }
    } catch (error) {
      console.error('Upload failed:', error)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <Input type="file" name="file" required />
      <Button type="submit" disabled={isUploading}>
        {isUploading ? 'Uploading...' : 'Upload New File'}
      </Button>
      {uploadedFile && (
        <p className="text-green-600">Successfully uploaded: {uploadedFile}</p>
      )}
    </form>
  )
}

