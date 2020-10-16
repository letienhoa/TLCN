package carbook.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class TuyenXeModelData {

	@Id
	private int id;
	
	public TuyenXeModelData() {
		
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
	
	
}
