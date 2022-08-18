package org.dcu.student.sem3.ca694.repository.authorizations;

import org.dcu.student.sem3.ca694.domain.authorizations.AccessAuthorization;
import org.dcu.student.sem3.ca694.domain.authorizations.DataAuthorization;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DataAuthorizationRepository extends JpaRepository<DataAuthorization, String> {
    Optional<DataAuthorization> findByAccessAuthorizationAndId(final AccessAuthorization accessAuthorization, final String id);
}
