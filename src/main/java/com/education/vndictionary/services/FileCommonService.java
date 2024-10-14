package com.education.vndictionary.services;

import com.education.vndictionary.dtos.FileDto;
import com.education.vndictionary.dtos.requests.UploadFileRequest;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface FileCommonService {
    FileDto uploadFile(UploadFileRequest req) throws IOException;

    FileDto uploadFile(MultipartFile file) throws IOException;

    void deleteFile(String path) throws IOException;
}
