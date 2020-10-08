package carbook.dao;

import java.util.List;

import carbook.entity.Xe;

public interface XeDao {

	List<Xe> getXeByTuyenXe(int tuyenXeId);
	
	List<Integer> spGetGioChay(int tuyenXeId);
}
