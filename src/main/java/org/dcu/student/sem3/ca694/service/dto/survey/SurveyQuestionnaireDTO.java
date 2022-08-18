package org.dcu.student.sem3.ca694.service.dto.survey;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

/**
 * @author Hadrien BAILLY.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SurveyQuestionnaireDTO {

    private String name;

    private Map<String, SurveySectionDTO> sectionsByName;
}
