package org.dcu.student.sem3.ca694.service.dto.survey;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * @see org.dcu.student.sem3.ca694.domain.responses.SurveyChrono
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SurveyChronoDto {

    private LocalDateTime startTime;
    private LocalDateTime stopTime;
    
    public boolean isValid() {
        return startTime != null && stopTime != null;
    }
}
