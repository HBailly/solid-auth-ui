package org.dcu.student.sem3.ca694.web.rest.rdf;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.dcu.student.sem3.ca694.domain.authorizations.AccessAuthorization;
import org.dcu.student.sem3.ca694.domain.authorizations.DataAuthorization;
import org.dcu.student.sem3.ca694.service.authorizations.AccessAuthorizationService;
import org.dcu.student.sem3.ca694.service.authorizations.DataAuthorizationService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * @author Hadrien BAILLY.
 */
@Slf4j
@RestController
@RequestMapping("/rdf")
@AllArgsConstructor
public class RdfResource {

    private static final String TURTLE_EXT = ".ttl";
    private static final MediaType TURTLE = MediaType.valueOf("text/turtle");

    private final AccessAuthorizationService accessAuthorizationService;
    private final DataAuthorizationService dataAuthorizationService;

    @GetMapping(value = "/ontology/{name}", produces = "text/turtle")
    public @ResponseBody ResponseEntity<String> getOntology(@PathVariable String name) throws IOException {

        final String directory = "ontologies";
        return getStringResponseEntity(directory, name);
    }

    @GetMapping(value = "/{dir}/{name}", produces = "text/turtle")
    public @ResponseBody ResponseEntity<String> getFile(@PathVariable String dir, @PathVariable String name) throws IOException {

        final String directory;
        switch (dir) {
            case "data":
                directory = "data";
                break;
            case "data-1":
                directory = "data-simple";
                break;
            case "data-2":
                directory = "data-extended";
                break;
            case "data-3":
                directory = "data-super-extended";
                break;
            default:
                return ResponseEntity.notFound()
                    .build();
        }
        return getStringResponseEntity(directory, name);
    }

    @SuppressWarnings("unused")
    @GetMapping(value = "/auth/{scenario}/{id}", produces = "text/turtle")
    public @ResponseBody ResponseEntity<String> getAccessAuthFile(@PathVariable int scenario, @PathVariable String id) {

        log.debug("Finding access authorization with ID [{}]...", id);
        final Optional<AccessAuthorization> accessAuthorizationOpt = accessAuthorizationService.findById(id);

        if (accessAuthorizationOpt.isPresent()) {
            log.debug("Access authorization with ID [{}] found.", id);
            final AccessAuthorization accessAuthorization = accessAuthorizationOpt.get();
            final String turtle = accessAuthorization.getTurtle();
            return ResponseEntity.ok()
                .contentLength(turtle.length())
                .contentType(TURTLE)
                .body(turtle);
        } else {
            log.debug("Access authorization with ID [{}] not found.", id);
            return ResponseEntity.notFound()
                .build();
        }
    }

    @SuppressWarnings("unused")
    @GetMapping(value = "/auth/{scenario}/{access}/{id}", produces = "text/turtle")
    public @ResponseBody ResponseEntity<String> getDataAuthFile(@PathVariable int scenario, @PathVariable String access, @PathVariable String id) {

        log.debug("Finding data authorization with ID [{}]...", id);
        final Optional<DataAuthorization> dataAuthorizationOpt = dataAuthorizationService.findByAuthorizationAndId(access, id);

        if (dataAuthorizationOpt.isPresent()) {
            log.debug("Data authorization with ID [{}] found.", id);
            final DataAuthorization dataAuthorization = dataAuthorizationOpt.get();
            final String turtle = dataAuthorization.getTurtle();
            return ResponseEntity.ok()
                .contentLength(turtle.length())
                .contentType(TURTLE)
                .body(turtle);
        } else {
            log.debug("Data authorization with ID [{}] not found.", id);
            return ResponseEntity.notFound()
                .build();
        }
    }

    private ResponseEntity<String> getStringResponseEntity(final String directory, final String filename) throws IOException {

        final Path path = Paths.get("files", directory, filename + TURTLE_EXT);
        log.debug("Loading file [{}] from resources...", path);

        try (InputStream is = getClass().getClassLoader().getResourceAsStream(path.toString());
             final BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(Objects.requireNonNull(is)))) {

            final String ttl = bufferedReader.lines().collect(Collectors.joining("\n"));
            log.debug("File [{}] loaded.", path);

            return ResponseEntity.ok()
                .contentLength(ttl.length())
                .contentType(TURTLE)
                .body(ttl);
        } catch (NullPointerException e) {
            log.warn("File [{}] could not be found in directory [{}]", filename, directory);
            return ResponseEntity.notFound()
                .build();
        }
    }
}
