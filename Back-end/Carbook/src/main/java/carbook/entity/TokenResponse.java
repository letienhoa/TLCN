package carbook.entity;


import com.fasterxml.jackson.annotation.JsonProperty;

public class TokenResponse {

	@JsonProperty("Token")
	private final String jwttoken;
	
	@JsonProperty("Roles")
	private String [] roles;
	
	public TokenResponse(String maToken) {
		this.jwttoken =maToken;
	}

	public String getJwttoken() {
		return jwttoken;
	}

	public String [] getRoles() {
		return roles;
	}

	public void setRoles(String [] roles) {
		this.roles = roles;
	}	
	
	
	
}
