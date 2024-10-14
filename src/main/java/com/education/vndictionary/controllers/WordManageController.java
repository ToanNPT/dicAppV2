package com.education.vndictionary.controllers;

import com.education.vndictionary.common.Messages;
import com.education.vndictionary.common.HttpResponseUtil;
import com.education.vndictionary.dtos.BaseHttpResponse;
import com.education.vndictionary.dtos.PaginatedHttpResponse;
import com.education.vndictionary.dtos.WordDto;
import com.education.vndictionary.dtos.requests.WordSearchParams;
import com.education.vndictionary.exceptions.AppErrorException;
import com.education.vndictionary.services.WordService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/")
public class WordManageController {

    private final WordService wordService;


    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @GetMapping("view/words")
    public PaginatedHttpResponse viewWords(
            @RequestParam(value = "page", required = false) Integer page,
            @RequestParam(value = "size", required = false) Integer size
    ) {
        try {
            logger.info("View words");
            return this.wordService.getAllWords(size, page);
        } catch (Exception e) {
            throw new AppErrorException(HttpStatus.INTERNAL_SERVER_ERROR.value(), Messages.INTERNAL_SERVER_ERROR);
        } finally {
            logger.info("Finished view words");
        }
    }

    @GetMapping("view/words/{id}")
    public BaseHttpResponse getWordById(@PathVariable("id") Integer id) {
        try {
            logger.info(String.format("Get word by id: %d", id));
            WordDto dto = this.wordService.getWordById(id, true);
            return HttpResponseUtil.createSuccessResponse(dto);

        } catch (Exception e) {
            throw new AppErrorException(HttpStatus.INTERNAL_SERVER_ERROR.value(), Messages.INTERNAL_SERVER_ERROR);
        } finally {
            logger.info(String.format("Finished get word by id: %d", id));
        }
    }

    @GetMapping("view/words/search")
    public BaseHttpResponse searchWords(
            @ModelAttribute WordSearchParams q
    ) {
        try {
            logger.info(String.format("Search words by keyword: %s", q));
            return this.wordService.searchWords(q);

        } finally {
            logger.info(String.format("Finished search words by keyword: %s", q));
        }
    }

    @PostMapping("manage/words")
    public BaseHttpResponse createWord(@RequestBody WordDto wordDto) {

        try {
            logger.info("Create word");
            var dto = this.wordService.createWord(wordDto);
            return HttpResponseUtil.createSuccessResponse(dto);
        } catch (Exception e) {
            throw new AppErrorException(HttpStatus.INTERNAL_SERVER_ERROR.value(), Messages.INTERNAL_SERVER_ERROR);
        } finally {
            logger.info("Finished create word");
        }
    }

    @PutMapping("manage/words/{id}")
    public BaseHttpResponse updateWord(@PathVariable("id") Integer id, @RequestBody WordDto wordDto) {
        try {
            logger.info("Update word");
            this.wordService.updateWord(id, wordDto);
            return HttpResponseUtil.createSuccessResponse();
        } catch (Exception e) {
            throw new AppErrorException(HttpStatus.INTERNAL_SERVER_ERROR.value(), Messages.INTERNAL_SERVER_ERROR);
        } finally {
            logger.info("Finished update word");
        }
    }

    @DeleteMapping("manage/words/{id}")
    public BaseHttpResponse deleteWord(@PathVariable("id") Integer id) {
        try {
            logger.info(String.format("Delete word by id: %d", id));
            this.wordService.deleteWord(id);
            return HttpResponseUtil.createSuccessResponse();
        } catch (Exception e) {
            throw new AppErrorException(HttpStatus.INTERNAL_SERVER_ERROR.value(), Messages.INTERNAL_SERVER_ERROR);
        } finally {
            logger.info(String.format("Finished delete word by id: %d", id));
        }
    }


}
