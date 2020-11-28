package carbook.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class VeCustomerDataModel {
 
	@Id
	private int id;
	
	@Column(name="gio_chay")
	private int gioChay;
	
	@Column(name="ngay_chay")
	private Date ngayChay;
	
	@Column(name="gia_ve")
	private int giaVe;
	
	@Column(name="ben_di")
	private String benDi;
	
	@Column(name="ben_toi")
	private String benToi;
	
	@Column(name="ngay_dat")
	private Date ngayDat;
	
	@Column(name="ngay_thanh_toan")
	private Date ngayThanhToan;
	
	@Column(name="trang_thai")
	private String trangThai;
	
	public VeCustomerDataModel() {
		
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getGioChay() {
		return gioChay;
	}

	public void setGioChay(int gioChay) {
		this.gioChay = gioChay;
	}

	public Date getNgayChay() {
		return ngayChay;
	}

	public void setNgayChay(Date ngayChay) {
		this.ngayChay = ngayChay;
	}

	public int getGiaVe() {
		return giaVe;
	}

	public void setGiaVe(int giaVe) {
		this.giaVe = giaVe;
	}

	public String getBenDi() {
		return benDi;
	}

	public void setBenDi(String benDi) {
		this.benDi = benDi;
	}

	public String getBenToi() {
		return benToi;
	}

	public void setBenToi(String benToi) {
		this.benToi = benToi;
	}

	public Date getNgayDat() {
		return ngayDat;
	}

	public void setNgayDat(Date ngayDat) {
		this.ngayDat = ngayDat;
	}

	public Date getNgayThanhToan() {
		return ngayThanhToan;
	}

	public void setNgayThanhToan(Date ngayThanhToan) {
		this.ngayThanhToan = ngayThanhToan;
	}

	public String getTrangThai() {
		return trangThai;
	}

	public void setTrangThai(String trangThai) {
		this.trangThai = trangThai;
	}
	
	
}
