package com.education.vndictionary;

import com.education.vndictionary.services.FileCommonService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

@SpringBootTest
public class FileCommonServiceTest {
    @Autowired
    FileCommonService fileCommonService;

    private final Path root = Paths.get("uploads");

    @Test
    public void testDeleteFile() {
        String oldFile = "http://localhost:8080/uploads/0bf49ad8-ac37-4e3d-a29d-b4a36fc73072_22082024152138.png";
        try {
            fileCommonService.deleteFile(oldFile);
            Path dupCheck = root.resolve("bf49ad8-ac37-4e3d-a29d-b4a36fc73072_22082024152138.png");
            assert !dupCheck.toFile().exists();

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Test
    public void testDeleteUnKnowFile() {
        String oldFile = "http://localhost:8080/uploads/0bf49ad8-ac37-4e3d-a29d-b4a36fc73072_22082024152138xxx.png";
        Assertions.assertDoesNotThrow(() -> fileCommonService.deleteFile(oldFile));
        Path dupCheck = root.resolve("bf49ad8-ac37-4e3d-a29d-b4a36fc73072_22082024152138xxx.png");
        assert !dupCheck.toFile().exists();
    }


}
