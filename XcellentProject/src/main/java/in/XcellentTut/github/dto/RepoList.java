package in.XcellentTut.github.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Data
public class RepoList {
    private String name;
    private int stars;
    private int forks;
    public  RepoList(){}
    public RepoList(String name, int stars, int forks) {
        this.name = name;
        this.stars = stars;
        this.forks = forks;
    }

}
