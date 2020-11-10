package carbook.entity;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

public class UserToken {

	private String taiKhoan;
	
	private String Password;
	
	private String[] roles;
	
	public UserToken() {
		
	}
	
	public UserToken(User entity) {
		this.taiKhoan = entity.getTaiKhoan();
		this.Password =entity.getPassword();
	}
	
	
	public String getTaiKhoan() {
		return taiKhoan;
	}



	public void setTaiKhoan(String taiKhoan) {
		this.taiKhoan = taiKhoan;
	}



	public String getPassword() {
		return Password;
	}



	public void setPassword(String password) {
		Password = password;
	}



	public String[] getRoles() {
		return roles;
	}



	public void setRoles(String[] roles) {
		this.roles = roles;
	}



	public List<GrantedAuthority> getAuthorities() {
	    List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
	    for (String role : roles) {
	      authorities.add(new SimpleGrantedAuthority(role));
	    }
	    return authorities;
	  }
	
}
