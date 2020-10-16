package carbook.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="ve")
public class Ve {

	@Id
	private int id;
	
	@Column(name="gio_chay")
	private String gioChay;
	
	@Column(name="gio_ket_thuc")
	private String gioKetThuc;
	
	@Column(name="id_xe")
	private int idXe;
	
	@Column(name="sdt_khach_hang")
	private String sdtKhachHang;
	

	private String email;
	
	private String 	code;
	
	public Ve() {
		
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getGioChay() {
		return gioChay;
	}

	public void setGioChay(String gioChay) {
		this.gioChay = gioChay;
	}

	public String getGioKetThuc() {
		return gioKetThuc;
	}

	public void setGioKetThuc(String gioKetThuc) {
		this.gioKetThuc = gioKetThuc;
	}

	public int getIdXe() {
		return idXe;
	}

	public void setIdXe(int idXe) {
		this.idXe = idXe;
	}

	public String getSdtKhachHang() {
		return sdtKhachHang;
	}

	public void setSdtKhachHang(String sdtKhachHang) {
		this.sdtKhachHang = sdtKhachHang;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}
	
	
}
