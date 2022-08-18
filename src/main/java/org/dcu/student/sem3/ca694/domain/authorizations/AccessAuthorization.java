package org.dcu.student.sem3.ca694.domain.authorizations;

import lombok.*;
import org.dcu.student.sem3.ca694.domain.responses.SurveySession;
import org.hibernate.Hibernate;
import org.hibernate.annotations.Type;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;

/**
 * @author Hadrien BAILLY.
 */
@Getter
@Setter
@ToString
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "solid_access_authorization")
public class AccessAuthorization implements Serializable {

    @Id
    private String id;

    @ManyToOne
    @JoinColumn(name = "session_id")
    @NonNull
    private SurveySession session;

    @NonNull
    private Integer scenario;

    @NonNull
    @CreatedDate
    @Builder.Default
    private LocalDateTime createdDate = LocalDateTime.now();

    @Lob
    @NonNull
    @Type(type = "org.hibernate.type.TextType")
    private String turtle;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        AccessAuthorization that = (AccessAuthorization) o;
        return id != null && Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
