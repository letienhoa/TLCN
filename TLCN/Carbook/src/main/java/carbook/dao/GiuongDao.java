package carbook.dao;

import java.util.List;

import carbook.entity.GiuongModelData;

public interface GiuongDao {

	List<GiuongModelData> spGetGiuongByTuyenXeId(int tuyenXeId,int gio);
}
