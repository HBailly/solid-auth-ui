package org.dcu.student.sem3.ca694.service.survey;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.dcu.student.sem3.ca694.domain.responses.SurveySession;
import org.dcu.student.sem3.ca694.repository.SurveySessionRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

/**
 * @author Hadrien BAILLY.
 */
@Slf4j
@Service
@Transactional
@AllArgsConstructor
public class SurveySessionService {

    private final SurveySessionRepository surveySessionRepository;

    public void save(final SurveySession surveySession) {
        surveySessionRepository.save(surveySession);
    }

    public Optional<SurveySession> findById(final String id) {
        return surveySessionRepository.findById(id);
    }
}
