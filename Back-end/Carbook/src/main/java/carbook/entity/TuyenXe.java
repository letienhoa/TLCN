package carbook.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="tuyen_xe")
public class TuyenXe {

	@Id
	@Column(name="id")
	private int id;
	
	@Column(name="diem_di")
	private String diemDi;
	
	@Column(name="diem_toi")
	private String diemToi;
	
	@Column(name="khoang_cach")
	private int khoangCach;
	
	@Column(name="gia_ca")
	private String giaCa;
	
	public TuyenXe() {
		
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
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

	public String getGiaCa() {
		return giaCa;
	}

	public void setGiaCa(String giaCa) {
		this.giaCa = giaCa;
	}
	
	
}
