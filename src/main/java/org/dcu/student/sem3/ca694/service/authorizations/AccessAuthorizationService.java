package org.dcu.student.sem3.ca694.service.authorizations;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.dcu.student.sem3.ca694.domain.authorizations.AccessAuthorization;
import org.dcu.student.sem3.ca694.repository.authorizations.AccessAuthorizationRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

/**
 * @author Hadrien BAILLY.
 */
@Slf4j
@Service
@Transactional
@AllArgsConstructor
public class AccessAuthorizationService {

    private final AccessAuthorizationRepository accessAuthorizationRepository;

    public void save(AccessAuthorization accessAuthorization) {
        accessAuthorizationRepository.save(accessAuthorization);
    }

    public Optional<AccessAuthorization> findById(final String id) {
        return accessAuthorizationRepository.findById(id);
    }

}
