package carbook.dao;

import java.util.List;

import carbook.entity.TuyenXe;
import carbook.entity.TuyenXeModelData;

public interface TuyenXeDao {

	TuyenXe create(TuyenXe entity);
	
	void update(TuyenXe entity);
	
	TuyenXe findOne(int id);
	
	List<TuyenXeModelData> findAll();
	
	TuyenXe spGetByDiemDiDiemToi(int DiemDi,int DiemToi);
	
}
