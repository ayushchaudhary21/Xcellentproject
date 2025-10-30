package in.XcellentTut.github.service;

import in.XcellentTut.github.dto.GitHubMapped;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class GitHubService {
    @Autowired
    private RestTemplate restTemplate;

    private final String apiCall = "https://api.github.com/users/";

    public List<String> getAllRepo(String username) {
        String finalAPI = apiCall + username + "/repos";

        try {
            GitHubMapped[] repos = restTemplate.getForObject(finalAPI, GitHubMapped[].class);
            if (repos == null || repos.length == 0) {
                throw new RuntimeException("No public repositories found for user: " + username);
            }
            return Arrays.stream(repos)
                    .map(GitHubMapped::getName)
                    .collect(Collectors.toList());
        } catch (HttpClientErrorException.NotFound e) {
            throw new RuntimeException("User not found: " + username);
        }

    }
    public GitHubMapped getRepoDetails(String username, String repoName) {
        String finalAPI = "https://api.github.com/repos/" + username + "/" + repoName;

        try {
            GitHubMapped repo = restTemplate.getForObject(finalAPI, GitHubMapped.class);
            if (repo == null) {
                throw new RuntimeException("Repository not found: " + repoName);
            }
            return repo;
        } catch (HttpClientErrorException.NotFound e) {
            throw new RuntimeException("Repository not found for user: " + username);
        }
    }

}
