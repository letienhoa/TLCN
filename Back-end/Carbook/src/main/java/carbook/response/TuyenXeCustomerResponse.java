package carbook.response;

import com.fasterxml.jackson.annotation.JsonProperty;

import carbook.entity.Ben;
import carbook.entity.TuyenXe;

public class TuyenXeCustomerResponse {

	private int id;
	
	@JsonProperty("diem_di")
	private String diemDi;
	
	@JsonProperty("diem_toi")
	private String diemToi;
	
	@JsonProperty("khoang_cach")
	private int khoangCach;
	
	@JsonProperty("gia_ca")
	private int giaCa;
	
	private String picture;
	
	public TuyenXeCustomerResponse() {
		
	}
	
	public TuyenXeCustomerResponse(Ben ben,TuyenXe tuyenXe) {
		this.id= tuyenXe.getId();
		this.diemDi= tuyenXe.getDiemDi();
		this.diemToi=tuyenXe.getDiemToi();
		this.giaCa=tuyenXe.getGiaCa();
		this.khoangCach=tuyenXe.getKhoangCach();
		this.picture= ben.getPicture();
	}

	public String getDiemDi() {
		return diemDi;
	}

	public void setDiemDi(String diemDi) {
		this.diemDi = diemDi;
	}

	public String getDiemToi() {
		return diemToi;
	}

	public void setDiemToi(String diemToi) {
		this.diemToi = diemToi;
	}

	public int getKhoangCach() {
		return khoangCach;
	}

	public void setKhoangCach(int khoangCach) {
		this.khoangCach = khoangCach;
	}

	public int getGiaCa() {
		return giaCa;
	}

	public void setGiaCa(int giaCa) {
		this.giaCa = giaCa;
	}

	public String getPicture() {
		return picture;
	}

	public void setPicture(String picture) {
		this.picture = picture;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
	
	
}
