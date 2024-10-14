import axiosInstance from "../../../axios";

 const uploadFileToServer = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await axiosInstance.post("/upload/file", formData);
    console.log(res);
    return res?.data?.url;
}

export default uploadFileToServer;