'use client'

import React, {useEffect, useState} from 'react'
import {Card, CardHeader, CardBody, CardFooter} from "@heroui/card";
import {Button, ButtonGroup} from "@heroui/button";
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell
  } from "@heroui/table";
import UploadButton from './upload-button';

const Files = () => {
    const [files, setFiles] = useState<Array<string>>([])

    useEffect(() => {
        if(files.length == 0) {
        fetchFiles()
        }
    }, [files])
    
    const fetchFiles = () => {
        fetch('http://127.0.0.1:5004/files').then(async(response) => {
            let res = await response.json()
            setFiles(res.files)
            console.log('Set files to: ', files)
        })
    }

    return(
        <div className="container mx-auto p-4">
        <Card>
            <CardHeader>
                <h1>Training Data Files</h1>
            </CardHeader>
            <CardBody>
            <div className="mb-4">
                <UploadButton />
            </div>
            <Table>
                <TableHeader>
                    <TableColumn>File Name</TableColumn>
                </TableHeader>
                <TableBody>
                {files && files.map((file, i) => (
                    <TableRow key={i}>
                        <TableCell>{file}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </CardBody>
        </Card>
    </div>
    )
}

export default Files