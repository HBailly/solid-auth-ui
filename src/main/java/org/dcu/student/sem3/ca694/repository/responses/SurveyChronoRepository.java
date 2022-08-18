package org.dcu.student.sem3.ca694.repository.responses;

import org.dcu.student.sem3.ca694.domain.responses.SurveyChrono;
import org.dcu.student.sem3.ca694.domain.responses.SurveyChronoId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SurveyChronoRepository extends JpaRepository<SurveyChrono, SurveyChronoId> {
}
