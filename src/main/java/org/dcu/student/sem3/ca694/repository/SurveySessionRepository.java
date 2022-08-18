package org.dcu.student.sem3.ca694.repository;

import org.dcu.student.sem3.ca694.domain.User;
import org.dcu.student.sem3.ca694.domain.responses.SurveySession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the {@link User} entity.
 */
@Repository
public interface SurveySessionRepository extends JpaRepository<SurveySession, String> {
}
