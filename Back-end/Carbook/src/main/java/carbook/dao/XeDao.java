package carbook.dao;

import java.util.List;

import carbook.entity.Xe;

public interface XeDao {
	
	Xe create(Xe entity);
	
	void update(Xe entity);

	List<Xe> getXeByTuyenXe(int tuyenXeId);
	
	List<Integer> spGetGioChay(int tuyenXeId);
	
	List<Xe> findAll();
	
	Xe findOne(int id);
}
