package carbook.dao;

import java.util.Date;
import java.util.List;

import carbook.entity.ThongKeDoanhThuModelData;
import carbook.entity.VeThongKeModelDate;

public interface VeDao {

	List<VeThongKeModelDate> spGetTotalRevenueTuyenXe(Date time,int selectTime);
	
	List<ThongKeDoanhThuModelData> spGetTotalRevenueTiket(Date time,int selectTime);
}
