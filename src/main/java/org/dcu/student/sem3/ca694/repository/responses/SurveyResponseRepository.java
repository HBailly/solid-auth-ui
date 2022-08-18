package org.dcu.student.sem3.ca694.repository.responses;

import org.dcu.student.sem3.ca694.domain.responses.SurveyResponse;
import org.dcu.student.sem3.ca694.domain.responses.SurveyResponseId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SurveyResponseRepository extends JpaRepository<SurveyResponse, SurveyResponseId> {
}
