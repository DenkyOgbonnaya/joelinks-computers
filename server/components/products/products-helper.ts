export const uploadImagesToCloudinary = async(files:any, dataUri:any, uploader:any) => {
    const newImages = [];
    if(files.length > 0){
        for(let i=0; i< files.length; i+=1){
            let datauri = dataUri(files[i]).content;
            try {
                let result = await uploader.upload(datauri, {folder: "joelinks"});
            newImages.push({
                url: result.url,
                id: result.public_id
            })
            } catch (err) {
                throw err;
            }
        }
        return newImages || [];
    }
}