package org.dcu.student.sem3.ca694.service.dto.survey;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.StringUtils;

/**
 * @author Hadrien BAILLY.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SurveyResponseDTO {

    private int index;

    private String type;

    private boolean optional;

    private String text;

    private String answer;

    public boolean shouldBeSaved() {
        return !optional || StringUtils.isNotBlank(answer);
    }
}
