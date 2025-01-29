"use client"

import { useState } from "react"
import { Card, CardBody, CardHeader } from "@heroui/react"
import { Button } from "@heroui/react"
import { Input } from "@heroui/react"
import { Upload } from "lucide-react"
import {Alert} from "@heroui/alert";

export default function CVUploadForm() {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle")
  const [apiReply, setApiReply] = useState<string>('')

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0])
      setUploadStatus("idle")
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!file) return

    setIsUploading(true)
    setUploadStatus("idle")

    // Simulating file upload with a timeout
    setTimeout(() => {
      setIsUploading(false)
      setUploadStatus("success")
      // Reset file input
      setFile(null)
    }, 2000)

    const formData = new FormData()
    formData.append('file', file)
    try {
      const response = await fetch('http://127.0.0.1:5003/upload', {
        method: 'POST',
        headers: {
          'Filename': file.name
        },
        body: formData,
      })
      if (response.ok) {
        let res = await response.json()
        setUploadStatus('success')
        setApiReply(res.message)
      } else {
        setUploadStatus('error')
      }
    } catch (error) {
      setUploadStatus('error')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="flex h-screen justify-center items-center bg-transparent">
    <Card className="flex content-center">
      <CardHeader className="flex flex-col items-start px-6 py-4">
        <h2 className="text-2xl font-bold">Upload Your CV</h2>
        <p className="text-sm text-default-500">Please upload your CV in .docx format</p>
        <p className="text-sm text-default-500">Our well trained A.I. CV analyzer will determine if you will get the position of A.I. Expert in our company</p>
        <br />
        {apiReply && 
          <Alert>{apiReply}</Alert>
        }
      </CardHeader>
      <CardBody className="px-6 py-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input type="file" accept=".docx" onChange={handleFileChange} disabled={isUploading} label="Choose File" />
          <Button
            type="submit"
            disabled={!file || isUploading}
            color="primary"
            className="w-full"
            startContent={<Upload className="h-4 w-4" />}
          >
            {isUploading ? "Uploading..." : "Upload CV"}
          </Button>
          {uploadStatus === "success" && <p className="text-sm text-success">CV uploaded successfully!</p>}
          {uploadStatus === "error" && <p className="text-sm text-danger">Error uploading CV. Please try again.</p>}
        </form>
      </CardBody>
    </Card>
    </div>
  )
}

