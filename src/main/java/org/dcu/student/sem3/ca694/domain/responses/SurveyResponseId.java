package org.dcu.student.sem3.ca694.domain.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.hibernate.Hibernate;

import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

/**
 * @author Hadrien BAILLY.
 */
@Builder
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class SurveyResponseId implements Serializable {

    private static final long serialVersionUID = -2351688471012794755L;

    @NonNull
    private String session;
    @NonNull
    private String questionnaire;
    @NonNull
    private String section;
    @NonNull
    private Integer index;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        SurveyResponseId that = (SurveyResponseId) o;
        return session != null && Objects.equals(session, that.session)
            && questionnaire != null && Objects.equals(questionnaire, that.questionnaire)
            && section != null && Objects.equals(section, that.section)
            && index != null && Objects.equals(index, that.index);
    }

    @Override
    public int hashCode() {
        return Objects.hash(session,
            questionnaire,
            section,
            index);
    }
}
