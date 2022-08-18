package org.dcu.student.sem3.ca694.service.authorizations;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.dcu.student.sem3.ca694.domain.authorizations.AccessAuthorization;
import org.dcu.student.sem3.ca694.domain.authorizations.DataAuthorization;
import org.dcu.student.sem3.ca694.repository.authorizations.AccessAuthorizationRepository;
import org.dcu.student.sem3.ca694.repository.authorizations.DataAuthorizationRepository;
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
public class DataAuthorizationService {

    private final AccessAuthorizationRepository accessAuthorizationRepository;
    private final DataAuthorizationRepository dataAuthorizationRepository;

    public void save(final DataAuthorization dataAuthorization) {
        dataAuthorizationRepository.save(dataAuthorization);
    }

    public Optional<DataAuthorization> findByAuthorizationAndId(final String accessAuthorizationId, final String id) {
        return accessAuthorizationRepository.findById(accessAuthorizationId)
            .flatMap(access -> this.findByAuthorizationAndId(access, id));
    }

    public Optional<DataAuthorization> findByAuthorizationAndId(final AccessAuthorization accessAuthorization, final String id) {
        return dataAuthorizationRepository.findByAccessAuthorizationAndId(accessAuthorization, id);
    }

}
