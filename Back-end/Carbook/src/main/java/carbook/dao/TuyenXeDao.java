package carbook.dao;

import carbook.entity.TuyenXe;

public interface TuyenXeDao {

	TuyenXe create(TuyenXe entity);
	
	void update(TuyenXe entity);
	
	TuyenXe findOne(int id);
	
	TuyenXe spGetByDiemDiDiemToi(int DiemDi,int DiemToi);
	
}
