package in.XcellentTut.github.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class RestTemplateConfi {
    @Bean
    public RestTemplate restTemplate(){
          return  new RestTemplate();
    }
}
