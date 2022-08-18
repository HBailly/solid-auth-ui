package org.dcu.student.sem3.ca694.domain.responses;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * @author Hadrien BAILLY.
 * @see org.dcu.student.sem3.ca694.service.dto.survey.SurveySessionDTO
 */
@Getter
@Setter
@ToString
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "survey_session")
public class SurveySession implements Serializable {

    @Id
    private String id;

    @NonNull
    private LocalDateTime date;

    @NonNull
    private Boolean completed;

}
