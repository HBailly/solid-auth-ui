package org.dcu.student.sem3.ca694.service.survey;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.dcu.student.sem3.ca694.domain.responses.SurveyChrono;
import org.dcu.student.sem3.ca694.repository.responses.SurveyChronoRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

/**
 * @author Hadrien BAILLY.
 */
@Slf4j
@Service
@Transactional
@AllArgsConstructor
public class SurveyChronoService {

    private final SurveyChronoRepository surveyChronoRepository;

    public void save(final SurveyChrono surveyChrono) {
        surveyChronoRepository.save(surveyChrono);
    }
}
