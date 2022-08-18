package org.dcu.student.sem3.ca694.domain.responses;

import lombok.*;
import org.hibernate.Hibernate;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Arrays;
import java.util.Objects;

/**
 * @author Hadrien BAILLY.
 * @see org.dcu.student.sem3.ca694.service.dto.survey.SurveyResponseDTO
 */
@Getter
@Setter
@ToString
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@IdClass(SurveyResponseId.class)
@Table(name = "survey_response")
public class SurveyResponse implements Serializable {

    @Id
    @ManyToOne(optional = false)
    @JoinColumn(name = "session_id", nullable = false)
    @NonNull
    private SurveySession session;

    @Id
    @NonNull
    private String questionnaire;

    @Id
    @NonNull
    private String section;

    @Id
    @NonNull
    private Integer index;

    @NonNull
    private String type;

    @Lob
    @NonNull
    @Type(type = "org.hibernate.type.TextType")
    private String question;

    @Lob
    @Type(type = "org.hibernate.type.TextType")
    private String answer;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        SurveyResponse that = (SurveyResponse) o;
        return Objects.equals(session, that.session)
                && Objects.equals(questionnaire, that.questionnaire)
                && Objects.equals(section, that.section)
                && Objects.equals(index, that.index);
    }

    @Override
    public int hashCode() {
        return Objects.hash(session,
                questionnaire,
                section,
                index);
    }

    public enum QuestionType {
        TEXT("TEXT"),
        RADIO("RADIO"),
        MULTI("MULTI"),
        OTHER("OTHER");

        private final String text;

        QuestionType(final String text) {
            this.text = text;
        }

        public static QuestionType parse(final String text) {
            return Arrays.stream(QuestionType.values())
                    .filter(val -> val.text.equalsIgnoreCase(text))
                    .findFirst()
                    .orElse(OTHER);
        }
    }
}
