package com.education.vndictionary.services.impl;

import com.education.vndictionary.common.CommonConstant;
import com.education.vndictionary.common.CommonUtils;
import com.education.vndictionary.dtos.FileDto;
import com.education.vndictionary.dtos.requests.UploadFileRequest;
import com.education.vndictionary.exceptions.AppErrorException;
import com.education.vndictionary.services.FileCommonService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.*;
import java.util.UUID;

@Service
public class FileCommonServiceImpl implements FileCommonService {

    @Value("${dictionary.app.upload-dir}")
    private String uploadDir;

    @Value("${dictionary.app.url-uploads}")
    private String serverUploadUrl;

    @Override
    public FileDto uploadFile(UploadFileRequest req) throws IOException {
        FileDto dto = new FileDto();
        if (req.getFile() == null) {
            throw AppErrorException.badRequestException("File is required");
        }

        MultipartFile file = req.getFile();
        ZoneId zoneId = ZoneId.of(ZoneOffset.UTC.getId());

        String key = String.format(
                "%s_%s",
                UUID.randomUUID(),
                CommonUtils.formatDateTime(LocalDateTime.now(zoneId), CommonConstant.DATE_TIME_FORMAT_1)
        );

        String fileOrg = String.format("%s.%s", key, CommonUtils.getFileExtension(file.getOriginalFilename()));

        FileCopyUtils.copy(file.getBytes(), new File(uploadDir + fileOrg));

        // upload file to server
        dto.setKey(key);
        dto.setUrl(serverUploadUrl + fileOrg);
        return dto;
    }

    @Override
    public FileDto uploadFile(MultipartFile file) throws IOException {
        UploadFileRequest req = new UploadFileRequest();
        req.setFile(file);
        return this.uploadFile(req);
    }


    @Override
    public void deleteFile(String path) throws IOException {
        Path root = Paths.get(uploadDir);
        String[] paths = path.split("/");

        if (paths.length == 0) {
            throw new RuntimeException("Invalid path");
        }

        Path file = root.resolve(paths[paths.length - 1]);
        Files.deleteIfExists(file);
    }

}
