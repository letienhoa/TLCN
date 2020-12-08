package carbook.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class GiuongMapDataModel {

	@Id
	private int id;

	@Column(name="id_ve")
	private int idVe;
	
	private int stt;
	
	public GiuongMapDataModel() {
		
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getIdVe() {
		return idVe;
	}

	public void setIdVe(int idVe) {
		this.idVe = idVe;
	}

	public int getStt() {
		return stt;
	}

	public void setStt(int stt) {
		this.stt = stt;
	}
	
}
