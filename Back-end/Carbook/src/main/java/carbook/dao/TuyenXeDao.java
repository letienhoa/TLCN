package carbook.dao;


import java.util.List;

import carbook.entity.TuyenXe;

public interface TuyenXeDao {

	TuyenXe create(TuyenXe entity);
	
	void update(TuyenXe entity);
	
	TuyenXe spGetByDiemDiDiemToi(String DiemDi,String DiemToi);
	
}
