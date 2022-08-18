package org.dcu.student.sem3.ca694.service.dto.survey;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * @author Hadrien BAILLY.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SurveySectionDTO {

    private String name;

    private List<SurveyResponseDTO> questions;

}
