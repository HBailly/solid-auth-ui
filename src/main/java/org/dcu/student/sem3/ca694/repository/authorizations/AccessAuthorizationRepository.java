package org.dcu.student.sem3.ca694.repository.authorizations;

import org.dcu.student.sem3.ca694.domain.authorizations.AccessAuthorization;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccessAuthorizationRepository extends JpaRepository<AccessAuthorization, String> {
}
