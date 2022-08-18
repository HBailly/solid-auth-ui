package org.dcu.student.sem3.ca694.web.rest.rdf;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.dcu.student.sem3.ca694.domain.authorizations.AccessAuthorization;
import org.dcu.student.sem3.ca694.domain.authorizations.DataAuthorization;
import org.dcu.student.sem3.ca694.domain.responses.SurveySession;
import org.dcu.student.sem3.ca694.service.authorizations.AccessAuthorizationService;
import org.dcu.student.sem3.ca694.service.authorizations.DataAuthorizationService;
import org.dcu.student.sem3.ca694.service.survey.SurveySessionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.FileNotFoundException;

/**
 * @author Hadrien BAILLY.
 */
@Slf4j
@RestController
@RequestMapping("/rdf")
@AllArgsConstructor
public class RdfEntity {

    private final AccessAuthorizationService accessAuthorizationService;
    private final DataAuthorizationService dataAuthorizationService;
    private final SurveySessionService surveySessionService;

    @PutMapping(value = "/auth/{scenario}/{id}")
    public @ResponseBody ResponseEntity<String> putAuthFile(@PathVariable int scenario, @PathVariable String id,
                                                            @RequestParam String sessionId,
                                                            @Valid @RequestBody String body) {

        final SurveySession session = surveySessionService.findById(sessionId)
            .orElseThrow(IllegalStateException::new);

        log.debug("Storing access authorization with id [{}]...", id);
        final AccessAuthorization accessAuthorization = AccessAuthorization.builder()
            .id(id)
            .scenario(scenario)
            .session(session)
            .turtle(body)
            .build();

        accessAuthorizationService.save(accessAuthorization);
        log.debug("Access authorization with id [{}] successfully stored!", id);

        return ResponseEntity
            .status(HttpStatus.CREATED)
            .build();
    }

    @PutMapping(value = "/auth/{scenario}/{auth}/{id}")
    public @ResponseBody ResponseEntity<String> putDataFile(@PathVariable int scenario, @PathVariable String auth, @PathVariable String id,
                                                            @RequestParam String sessionId,
                                                            @Valid @RequestBody String body) {

        final SurveySession session = surveySessionService.findById(sessionId)
            .orElseThrow(IllegalStateException::new);

        log.debug("Storing data authorization with id [{}]...", id);
        try {
            final AccessAuthorization accessAuthorization = accessAuthorizationService.findById(auth)
                .orElseThrow(FileNotFoundException::new);

            final DataAuthorization dataAuthorization = DataAuthorization.builder()
                .session(session)
                .scenario(scenario)
                .accessAuthorization(accessAuthorization)
                .id(id)
                .turtle(body)
                .build();

            dataAuthorizationService.save(dataAuthorization);
            log.debug("Data authorization with id [{}] successfully stored!", id);

            return ResponseEntity
                .status(HttpStatus.CREATED)
                .build();

        } catch (FileNotFoundException e) {
            return ResponseEntity
                .status(HttpStatus.UNPROCESSABLE_ENTITY)
                .body(String.format("Container access authorization with ID [%s] not found", auth));
        }
    }
}
