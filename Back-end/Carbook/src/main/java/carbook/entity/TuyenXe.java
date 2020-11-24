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
	
	@Column(name="diem_di_id")
	private int diemDiId;
	
	@Column(name="diem_toi_id")
	private int diemToiId;
	
	@Column(name="khoang_cach")
	private int khoangCach;
	
	@Column(name="gia_ca")
	private int giaCa;
	
	public TuyenXe() {
		
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getDiemDiId() {
		return diemDiId;
	}

	public void setDiemDiId(int diemDi) {
		this.diemDiId = diemDi;
	}

	public int getDiemToiId() {
		return diemToiId;
	}

	public void setDiemToiId(int diemToi) {
		this.diemToiId = diemToi;
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
	
	
}
