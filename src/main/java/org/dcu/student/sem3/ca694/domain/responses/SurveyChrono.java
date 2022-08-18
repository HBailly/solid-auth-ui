package org.dcu.student.sem3.ca694.domain.responses;

import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;

/**
 * @author Hadrien BAILLY.
 * @see org.dcu.student.sem3.ca694.service.dto.survey.SurveyChronoDto
 */
@Getter
@Setter
@ToString
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@IdClass(SurveyChronoId.class)
@Table(name = "survey_chrono")
public class SurveyChrono implements Serializable {

    @Id
    @ManyToOne(optional = false)
    @JoinColumn(name = "session_id", nullable = false)
    @NonNull
    private SurveySession session;

    @Id
    @NonNull
    private Integer scenario;

    @NonNull
    private LocalDateTime startTime;

    @NonNull
    private LocalDateTime stopTime;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        SurveyChrono that = (SurveyChrono) o;
        return Objects.equals(session, that.session) && Objects.equals(scenario, that.scenario);
    }

    @Override
    public int hashCode() {
        return Objects.hash(session, scenario);
    }
}
