export default function uploadFile(formData: FormData) {
    const file = formData.get('file') as File
    if (!file) {
      throw new Error('No file uploaded')
    }
  
    // Here you would typically upload the file to your storage solution
    // For this example, we'll simulate storing the file name
    const fileName = file.name
    
    const myHeaders = new Headers();
    myHeaders.append("Filename", "poison.md");
    myHeaders.append("Content-Type", "text/markdown");

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: file
    };

    fetch("http://127.0.0.1:5004/upload", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
    return { success: true, fileName }
}