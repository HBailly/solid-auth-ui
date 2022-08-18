package org.dcu.student.sem3.ca694.web.rest.survey;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.tuple.ImmutablePair;
import org.apache.commons.lang3.tuple.Pair;
import org.dcu.student.sem3.ca694.domain.responses.SurveyChrono;
import org.dcu.student.sem3.ca694.domain.responses.SurveyResponse;
import org.dcu.student.sem3.ca694.domain.responses.SurveySession;
import org.dcu.student.sem3.ca694.repository.responses.SurveyChronoRepository;
import org.dcu.student.sem3.ca694.service.dto.survey.*;
import org.dcu.student.sem3.ca694.service.survey.SurveyResponseService;
import org.dcu.student.sem3.ca694.service.survey.SurveySessionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.IntStream;

/**
 * @author Hadrien BAILLY.
 */
@Slf4j
@RestController
@RequestMapping("/survey")
@AllArgsConstructor
public class SurveyApi {

    private final SurveyResponseService surveyResponseService;
    private final SurveySessionService surveySessionService;
    private final SurveyChronoRepository surveyChronoRepository;

    @PostMapping(value = "/session")
    public @ResponseBody ResponseEntity<String> postSession(@RequestBody final SurveySessionDTO dto) {

        final String sessionId = dto.getId();
        final List<SurveyChronoDto> chronos = dto.getChronos();

        final SurveySession session = SurveySession.builder()
                .id(sessionId)
                .date(dto.getDate())
                .completed(dto.getCompleted())
                .build();
        surveySessionService.save(session);

        IntStream.range(0, chronos.size())
                .boxed()
                .map(index -> new ImmutablePair<>(index, chronos.get(index)))
                .filter(pair -> pair.getRight().isValid())
                .map(pair -> createSurveyChrono(session, pair))
                .forEach(surveyChronoRepository::save);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .build();
    }

    private SurveyChrono createSurveyChrono(SurveySession session, Pair<Integer, SurveyChronoDto> pair) {

        final int index = pair.getLeft();
        final SurveyChronoDto dto = pair.getRight();

        return SurveyChrono.builder()
                .session(session)
                .scenario(index + 1)
                .startTime(dto.getStartTime())
                .stopTime(dto.getStopTime())
                .build();
    }

    @PostMapping(value = "/questions")
    public @ResponseBody ResponseEntity<String> postQuestionnaire(@RequestParam final String sessionId,
                                                                  @RequestBody final SurveyQuestionnaireDTO dto) {

        final SurveySession session = surveySessionService.findById(sessionId)
                .orElseThrow(IllegalStateException::new);

        log.debug("Storing new questionnaire...");
        for (SurveySectionDTO section : dto.getSectionsByName().values()) {
            log.debug("Processing section [{}] ({} responses)", section.getName(), section.getQuestions().size());

            for (SurveyResponseDTO response : section.getQuestions()) {
                if (response.shouldBeSaved()) {

                    final SurveyResponse surveyResponse = createSurveyResponse(dto, session, section, response);

                    surveyResponseService.save(surveyResponse);
                }
            }
        }
        log.debug("questionnaire stored.");

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .build();
    }

    private SurveyResponse createSurveyResponse(SurveyQuestionnaireDTO dto, SurveySession session, SurveySectionDTO section, SurveyResponseDTO response) {
        return SurveyResponse.builder()
                .session(session)
                .questionnaire(dto.getName())
                .section(section.getName())
                .index((response.getIndex()))
                .type(response.getType())
                .question(response.getText())
                .answer(response.getAnswer())
                .build();
    }
}
