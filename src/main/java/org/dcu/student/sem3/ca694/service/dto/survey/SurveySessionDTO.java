package org.dcu.student.sem3.ca694.service.dto.survey;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

/**
 * @author Hadrien BAILLY.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SurveySessionDTO {

    private String id;

    private LocalDateTime date;

    private Boolean completed;

    private List<SurveyChronoDto> chronos;
}
