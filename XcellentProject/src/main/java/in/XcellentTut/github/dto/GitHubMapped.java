package in.XcellentTut.github.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GitHubMapped {
    private String name;
    private String description;
    private String language;
    @JsonProperty("stargazers_count")
    private int stars;

    @JsonProperty("forks_count")
    private int forks;

    @JsonProperty("watchers_count")
    private int watchers;

    @JsonProperty("updated_at")
    private String lastUpdated;

    private Owner owner;


    @Data
    public static class Owner {
        private String login;
        private long id;
        private String html_url;
        private String avatar_url;
        private String type;
    }
}

