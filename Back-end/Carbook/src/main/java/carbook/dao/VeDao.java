package carbook.dao;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import carbook.entity.ThongKeDoanhThuModelData;
import carbook.entity.VeCustomerDataModel;
import carbook.entity.VeThongKeModelDate;
import carbook.request.VeRequest;

public interface VeDao {
	Long spUpdateVe(int id,String sdt,String email);
	
	Long create(VeRequest wrapper, String slot,String code);
	
	List<VeThongKeModelDate> spGetTotalRevenueTuyenXe(Date time,int selectTime);
	
	List<VeCustomerDataModel> spGetVeForCustomer(int khachHang);
	
	List<ThongKeDoanhThuModelData> spGetTotalRevenueTiket(Calendar time,int selectTime);
}
