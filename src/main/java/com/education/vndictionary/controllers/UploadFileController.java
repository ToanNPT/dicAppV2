package com.education.vndictionary.controllers;

import com.education.vndictionary.common.Messages;
import com.education.vndictionary.dtos.FileDto;
import com.education.vndictionary.dtos.requests.UploadFileRequest;
import com.education.vndictionary.exceptions.AppErrorException;
import com.education.vndictionary.services.FileCommonService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/")
@RequiredArgsConstructor
public class UploadFileController {

    private final FileCommonService fileCommonService;

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @PostMapping(value = "upload/file", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = "application/json")
    public FileDto doUploadFile(@RequestPart(value = "file", required = true) MultipartFile file) {
        try {
            UploadFileRequest req = new UploadFileRequest();
            req.setFile(file);

            logger.info(String.format("Do Upload File "));
            FileDto dto = fileCommonService.uploadFile(req);
            return dto;
        } catch (IOException e) {
            e.printStackTrace();
            throw new AppErrorException(HttpStatus.INTERNAL_SERVER_ERROR.value(), Messages.INTERNAL_SERVER_ERROR);
        } finally {
            logger.info("Finished upload file");
        }
    }
}
