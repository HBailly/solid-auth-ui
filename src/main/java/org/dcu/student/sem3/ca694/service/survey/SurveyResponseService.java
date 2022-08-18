package org.dcu.student.sem3.ca694.service.survey;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.dcu.student.sem3.ca694.domain.responses.SurveyResponse;
import org.dcu.student.sem3.ca694.repository.responses.SurveyResponseRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

/**
 * @author Hadrien BAILLY.
 */
@Slf4j
@Service
@Transactional
@AllArgsConstructor
public class SurveyResponseService {

    private final SurveyResponseRepository surveyResponseRepository;

    public void save(SurveyResponse surveyResponse) {
        surveyResponseRepository.save(surveyResponse);
    }
}
