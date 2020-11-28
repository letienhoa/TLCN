package carbook.configuration;

import javax.servlet.Filter;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.session.SessionManagementFilter;

import carbook.service.CustomAccessDeniedHandler;
import carbook.service.JwtAuthenticationTokenFilter;
import carbook.service.RestAuthenticationEntryPoint;




@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Bean
    CorsFilter corsFilter() {
        CorsFilter filter = new CorsFilter();
        return filter;
    }
  @Bean
  public JwtAuthenticationTokenFilter jwtAuthenticationTokenFilter() throws Exception {
    JwtAuthenticationTokenFilter jwtAuthenticationTokenFilter = new JwtAuthenticationTokenFilter();
    jwtAuthenticationTokenFilter.setAuthenticationManager(authenticationManager());
    return jwtAuthenticationTokenFilter;
  }
  @Bean
  public RestAuthenticationEntryPoint restServicesEntryPoint() {
    return new RestAuthenticationEntryPoint();
  }
  @Bean
  public CustomAccessDeniedHandler customAccessDeniedHandler() {
    return new CustomAccessDeniedHandler();
  }
  @Bean
  @Override
  protected AuthenticationManager authenticationManager() throws Exception {
    return super.authenticationManager();
  }
  protected void configure(HttpSecurity http) throws Exception {
	  

	    
		  http.csrf().ignoringAntMatchers("/api/**");
		  
		   http.addFilterBefore(corsFilter(), SessionManagementFilter.class)
		   .antMatcher("/api/**").httpBasic().authenticationEntryPoint(restServicesEntryPoint()).and()
	      .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and().authorizeRequests()
	      .antMatchers(HttpMethod.POST,"/api/ben/**").access("hasRole('ROLE_ADMIN')")
	      .antMatchers(HttpMethod.POST,"/api/tuyenxe/**").access("hasRole('ROLE_ADMIN')")
	      .antMatchers("/api/ben/get").access("hasRole('ROLE_USER')")
	      .antMatchers( "/api/tram-dung/get").access("hasRole('ROLE_USER')")
	      .antMatchers( "/api/khach-hang/logout").access("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
	      .antMatchers( "/api/khach-hang/change-password").access("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
	      .antMatchers( "/api/khach-hang/test").access("hasRole('ROLE_USER')")
	      .and()
	      .addFilterBefore(jwtAuthenticationTokenFilter(), UsernamePasswordAuthenticationFilter.class)
	      
	      .exceptionHandling().accessDeniedHandler(customAccessDeniedHandler());
	    
	

	    
	    
	    
	    
	  
	    

	    
	    
	  }

}
