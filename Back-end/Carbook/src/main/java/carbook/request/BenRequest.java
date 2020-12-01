package carbook.request;

import com.fasterxml.jackson.annotation.JsonProperty;

public class BenRequest {

	@JsonProperty("id")
	private int id;
	
	@JsonProperty("ten_ben")
	private String tenBen;

	@JsonProperty("dia_chi")
	private String diaChi;

	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTenBen() {
		return tenBen;
	}
	
	public void setTenBen(String tenBen) {
		this.tenBen = tenBen;
	}
	
	public String getDiaChi() {
		return diaChi;
	}
	
	public void setDiaChi(String diaChi) {
		this.diaChi = diaChi;
	}

}
