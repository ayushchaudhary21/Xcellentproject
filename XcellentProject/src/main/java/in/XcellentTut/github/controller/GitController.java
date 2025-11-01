package in.XcellentTut.github.controller;
import in.XcellentTut.github.dto.GitHubMapped;
import in.XcellentTut.github.dto.RepoList;
import in.XcellentTut.github.service.GitHubService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class GitController {
    private final GitHubService gitHubService;

    public GitController(GitHubService gitHubService) {
        this.gitHubService = gitHubService;
    }


    @GetMapping("{username}")
    public ResponseEntity<List<RepoList>>getRepo(@PathVariable("username") String  username)
    {
        return new ResponseEntity<>(gitHubService.getAllRepo(username), HttpStatus.OK);
    }
    @GetMapping("/{username}/{repoName}")
    public GitHubMapped getRepoDetails(
            @PathVariable String username,
            @PathVariable String repoName) {
        return gitHubService.getRepoDetails(username, repoName);
    }

}
