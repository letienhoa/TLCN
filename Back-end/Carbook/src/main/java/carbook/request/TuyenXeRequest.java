package carbook.request;

import com.fasterxml.jackson.annotation.JsonProperty;

public class TuyenXeRequest {

	@JsonProperty("diem_di")
	private String diemDi;
	
	@JsonProperty("diem_toi")
	private String diemToi;
	
	@JsonProperty("khoang_cach")
	private int khoangCach;
	
	@JsonProperty("gia_ca")
	private int giaCa;
	
	@JsonProperty("thoi_gian_hanh_trinh")
	private int thoiGianChay;
	
	public TuyenXeRequest() {
		
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

	public int getThoiGianChay() {
		return thoiGianChay;
	}

	public void setThoiGianChay(int thoiGianChay) {
		this.thoiGianChay = thoiGianChay;
	}
	
	
}
