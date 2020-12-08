package carbook.daoimpl;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.persistence.ParameterMode;
import javax.transaction.Transactional;

import org.hibernate.procedure.ProcedureCall;
import org.springframework.stereotype.Repository;

import carbook.dao.AbstractDao;
import carbook.dao.VeDao;
import carbook.entity.GiuongMapDataModel;
import carbook.entity.ThongKeDoanhThuModelData;
import carbook.entity.ThongTinVeDataModel;
import carbook.entity.Ve;
import carbook.entity.VeCustomerDataModel;
import carbook.entity.VeExcelDataModel;
import carbook.entity.VeOverviewDataModel;
import carbook.entity.VeThongKeModelDate;
import carbook.request.VeRequest;
import carbook.response.VeExcelVer1Response;
import carbook.service.UtilsService;

@SuppressWarnings("unchecked")
@Transactional
@Repository("veDao")
public class VeDaoImpl extends AbstractDao<Integer, Ve> implements VeDao {

	@Override
	public List<VeThongKeModelDate> spGetTotalRevenueTuyenXe(Date time, int selectTime) {
		ProcedureCall procedureCall = this.getSession().createStoredProcedureCall("sp_get_total_revenue_tuyen_xe",
				VeThongKeModelDate.class);
		procedureCall.registerParameter("startTime", Date.class, ParameterMode.IN).bindValue(time);
		procedureCall.registerParameter("selectTime", Integer.class, ParameterMode.IN).bindValue(selectTime);

		List<VeThongKeModelDate> list = procedureCall.getResultList();
		return list;
	}

	@Override
	public List<ThongKeDoanhThuModelData> spGetTotalRevenueTiket(Calendar time, int selectTime) {
		ProcedureCall procedureCall = this.getSession().createStoredProcedureCall("sp_get_total_revenue_ticket",
				ThongKeDoanhThuModelData.class);
		procedureCall.registerParameter("startTime", Calendar.class, ParameterMode.IN).bindValue(time);
		procedureCall.registerParameter("selectTime", Integer.class, ParameterMode.IN).bindValue(selectTime);

		List<ThongKeDoanhThuModelData> list = procedureCall.getResultList();
		return list;
	}

	@Override
	public List<VeCustomerDataModel> spGetVeForCustomer(int khachHang) {
		ProcedureCall procedureCall = this.getSession().createStoredProcedureCall("sp_get_ve_xe_for_customer",
				VeCustomerDataModel.class);
		procedureCall.registerParameter("khachHangId", Integer.class, ParameterMode.IN).bindValue(khachHang);

		List<VeCustomerDataModel> list = procedureCall.getResultList();
		return list;
	}

	@Override
	public Long create(VeRequest wrapper, String slot, String code) {
		ProcedureCall procedureCall = this.getSession().createStoredProcedureCall("sp_insert_ve_giuong_map");
		procedureCall.registerParameter("gioChay", Integer.class, ParameterMode.IN).bindValue(wrapper.getGioChay());
		procedureCall.registerParameter("gioKetThuc", Integer.class, ParameterMode.IN)
				.bindValue(wrapper.getGioKetThuc());
		procedureCall.registerParameter("idTuyenXe", Integer.class, ParameterMode.IN).bindValue(wrapper.getIdTuyenXe());
		procedureCall.registerParameter("sdt", String.class, ParameterMode.IN).bindValue(wrapper.getSdt());
		procedureCall.registerParameter("email", String.class, ParameterMode.IN).bindValue(wrapper.getEmail());
		procedureCall.registerParameter("date", Date.class, ParameterMode.IN)
				.bindValue(UtilsService.changeStringToDate(wrapper.getDate()));
		procedureCall.registerParameter("giaVe", Integer.class, ParameterMode.IN)
				.bindValue(wrapper.getGiaVe().intValue());
		procedureCall.registerParameter("code", String.class, ParameterMode.IN).bindValue(code);
		procedureCall.registerParameter("slot", String.class, ParameterMode.IN).bindValue(slot);
		procedureCall.registerParameter("message", Long.class, ParameterMode.OUT);
		procedureCall.execute();
		return (Long) procedureCall.getOutputParameterValue("message");
	}

	@Override
	public Long spUpdateVe(int id, String sdt, String email) {
		ProcedureCall procedureCall = this.getSession().createStoredProcedureCall("sp_update_ve");
		procedureCall.registerParameter("idUser", Integer.class, ParameterMode.IN).bindValue(id);
		procedureCall.registerParameter("newSdt", String.class, ParameterMode.IN).bindValue(sdt);
		procedureCall.registerParameter("newEmail", String.class, ParameterMode.IN).bindValue(email);
		procedureCall.registerParameter("message", Long.class, ParameterMode.OUT);
		procedureCall.execute();
		return (Long) procedureCall.getOutputParameterValue("message");

	}

	@Override
	public List<VeExcelDataModel> spXuatFileExcel(int id,int hour) {
		ProcedureCall procedureCall = this.getSession().createStoredProcedureCall("sp_xuat_file_excel",
				VeExcelDataModel.class);
		procedureCall.registerParameter("idTuyenXe", Integer.class, ParameterMode.IN).bindValue(id);
		procedureCall.registerParameter("hour", Integer.class, ParameterMode.IN).bindValue(hour);

		List<VeExcelDataModel> veEDM = procedureCall.getResultList();
		return veEDM;
	}

	@Override
	public Long spUpdateVeXeTrangThai(int idTuyenXe) {
		ProcedureCall procedureCall = this.getSession().createStoredProcedureCall("sp_update_ve_xe_trang_thai",
				VeExcelDataModel.class);
		procedureCall.registerParameter("idTuyenXe", Integer.class, ParameterMode.IN).bindValue(idTuyenXe);
		procedureCall.registerParameter("message", Long.class, ParameterMode.OUT);

		procedureCall.execute();
		return (Long) procedureCall.getOutputParameterValue("message");
	}

	
	  @Override 
	  public List<VeExcelVer1Response> spGetThongTinVe(int idTuyenXe,int hour) { 
		  ProcedureCall procedureCall = this.getSession().createStoredProcedureCall("sp_get_thong_tin_xuat_ve",ThongTinVeDataModel.class); 
		  procedureCall.registerParameter("idTuyenXe", Integer.class, ParameterMode.IN).bindValue(idTuyenXe);
			procedureCall.registerParameter("hour", Integer.class, ParameterMode.IN).bindValue(hour);
		  List<ThongTinVeDataModel> list1 =procedureCall.getResultList();

		  ProcedureCall procedureCall1 = this.getSession().createStoredProcedureCall("sp_get_thong_tin_giuong",GiuongMapDataModel.class); 
		  procedureCall1.registerParameter("idTuyenXe", Integer.class, ParameterMode.IN).bindValue(idTuyenXe);
		  procedureCall1.registerParameter("hour", Integer.class, ParameterMode.IN).bindValue(hour);
		  List<GiuongMapDataModel> list2 = procedureCall1.getResultList();
		  
		  List<VeExcelVer1Response> listData = new VeExcelVer1Response().mapToList(list1);
	  
		  for(int i=0;i<listData.size();i++) { 
			  for(int j=0;j<list2.size();j++) {
				  if(list1.get(i).getId()==list2.get(j).getIdVe()) {
					  String g="";
					  if(list2.get(j).getStt()<=22) {
						  if(list2.get(j).getStt()<10){
							  g= "A0"+ String.valueOf(list2.get(j).getStt());
						  }
						  else {
							  g= "A"+ String.valueOf(list2.get(j).getStt());
						  }
					  }else {
						  if(list2.get(j).getStt()<32) {
							  g= "B0"+ String.valueOf(list2.get(j).getStt()-22);
						  }else {
							  g= "B"+ String.valueOf(list2.get(j).getStt()-22);
						  }
					  }
					  
					  listData.get(i).getSlotss().add(g); 
				  	} 
			  } 
		  } return listData; 
	}

	@Override
	public List<VeOverviewDataModel> spGetTuyenXeTrongNgay() {
		ProcedureCall procedureCall = this.getSession().createStoredProcedureCall("sp_get_tuyen_xe_trong_ngay",VeOverviewDataModel.class); 
		  
		  List<VeOverviewDataModel> list1 =procedureCall.getResultList();
		  return list1;
	}
	 

	
	 

}
