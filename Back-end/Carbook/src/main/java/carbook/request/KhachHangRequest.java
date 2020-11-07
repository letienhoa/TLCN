package carbook.request;

import com.fasterxml.jackson.annotation.JsonProperty;

public class KhachHangRequest {

	@JsonProperty("tai_khoan")
	private String taiKhoan;
	
	@JsonProperty("mat_khau")
	private String matKhau;
	
	private String ten;
	
	private String sdt;
	
	public String getTaiKhoan() {
		return taiKhoan;
	}

	public void setTaiKhoan(String taiKhoan) {
		this.taiKhoan = taiKhoan;
	}

	public String getMatKhau() {
		return matKhau;
	}

	public void setMatKhau(String matKhau) {
		this.matKhau = matKhau;
	}

	public String getTen() {
		return ten;
	}

	public void setTen(String ten) {
		this.ten = ten;
	}

	public String getSdt() {
		return sdt;
	}

	public void setSdt(String sdt) {
		this.sdt = sdt;
	}


	
	
}
