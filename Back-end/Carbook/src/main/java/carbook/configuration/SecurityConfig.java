package carbook.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import carbook.service.CustomAccessDeniedHandler;
import carbook.service.JwtAuthenticationTokenFilter;
import carbook.service.RestAuthenticationEntryPoint;




@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
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
	  
	    //trạm dừng 
	  //  http.csrf().ignoringAntMatchers("/api/tram-dung/**");
	    
	  //  http.antMatcher("/api/tram-dung/**").httpBasic().authenticationEntryPoint(restServicesEntryPoint()).and()
      //.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and().authorizeRequests()
      //.antMatchers( "/api/tram-dung/get").access("hasRole('ROLE_USER')")
	  //  .and()
      //.addFilterBefore(jwtAuthenticationTokenFilter(), UsernamePasswordAuthenticationFilter.class)
      //.exceptionHandling().accessDeniedHandler(customAccessDeniedHandler());
	  

	  
	  
	    // Disable crsf cho đường dẫn /khach hanb/**
	 //  http.csrf().ignoringAntMatchers("/api/khach-hang/**");
	  
	 //   http.authorizeRequests().antMatchers("/api/khach-hang/login").permitAll();
	 //   http.authorizeRequests().antMatchers("/api/khach-hang/create").permitAll();
	    
	 //   http.antMatcher("/api/khach-hang/**").httpBasic().authenticationEntryPoint(restServicesEntryPoint()).and()
     //   .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and().authorizeRequests()
      //  .antMatchers( "/api/khach-hang/test").access("hasRole('ROLE_USER')")
	   // .and()
       // .addFilterBefore(jwtAuthenticationTokenFilter(), UsernamePasswordAuthenticationFilter.class)
       // .exceptionHandling().accessDeniedHandler(customAccessDeniedHandler());
	    
	    
		//Bến xe
	    
		  http.csrf().ignoringAntMatchers("/api/**");
		  
		   http.antMatcher("/api/**").httpBasic().authenticationEntryPoint(restServicesEntryPoint()).and()
	      .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and().authorizeRequests()
	      .antMatchers(HttpMethod.POST,"/api/ben/**").access("hasRole('ROLE_ADMIN')")
	      .antMatchers("/api/ben/get").access("hasRole('ROLE_USER')")
	      .antMatchers( "/api/ben/get-all-diem-don").access("hasRole('ROLE_ADMIN')")
	      .antMatchers( "/api/tram-dung/get").access("hasRole('ROLE_USER')")
	      .antMatchers( "/api/khach-hang/test").access("hasRole('ROLE_USER')")
	      .and()
	      .addFilterBefore(jwtAuthenticationTokenFilter(), UsernamePasswordAuthenticationFilter.class)
	      .exceptionHandling().accessDeniedHandler(customAccessDeniedHandler());
	    
	

	    
	    
	    
	    
	  
	    

	    
	    
	  }

}
