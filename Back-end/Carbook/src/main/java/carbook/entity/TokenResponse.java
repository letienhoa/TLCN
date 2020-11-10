package carbook.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

public class TokenResponse {

	@JsonProperty("Token")
	private final String jwttoken;
	
	public TokenResponse(String maToken) {
		this.jwttoken =maToken;
	}

	public String getJwttoken() {
		return jwttoken;
	}	
	
}
