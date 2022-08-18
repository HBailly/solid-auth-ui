package org.dcu.student.sem3.ca694.domain.responses;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.hibernate.Hibernate;

import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

/**
 * @author Hadrien BAILLY.
 */
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class SurveyChronoId implements Serializable {

    @NonNull
    private String session;
    @NonNull
    private Integer scenario;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        SurveyChronoId that = (SurveyChronoId) o;
        return Objects.equals(session, that.session) && Objects.equals(scenario, that.scenario);
    }

    @Override
    public int hashCode() {
        return Objects.hash(session, scenario);
    }
}
