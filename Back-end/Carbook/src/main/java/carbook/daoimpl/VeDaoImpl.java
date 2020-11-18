package carbook.daoimpl;

import java.util.Date;
import java.util.List;

import javax.persistence.ParameterMode;
import javax.transaction.Transactional;

import org.hibernate.procedure.ProcedureCall;
import org.springframework.stereotype.Repository;

import carbook.dao.AbstractDao;
import carbook.dao.VeDao;
import carbook.entity.ThongKeDoanhThuModelData;
import carbook.entity.Ve;
import carbook.entity.VeThongKeModelDate;

@SuppressWarnings("unchecked")
@Transactional
@Repository("veDao")
public class VeDaoImpl extends AbstractDao<Integer,Ve> implements VeDao {

	@Override
	public List<VeThongKeModelDate> spGetTotalRevenueTuyenXe(Date time, int selectTime) {
		ProcedureCall procedureCall = this.getSession().createStoredProcedureCall("sp_get_total_revenue_tuyen_xe",VeThongKeModelDate.class);
		procedureCall.registerParameter("startTime",Date.class,ParameterMode.IN).bindValue(time);
		procedureCall.registerParameter("selectTime",Integer.class,ParameterMode.IN).bindValue(selectTime);
		
		List<VeThongKeModelDate> list =procedureCall.getResultList();
		return list;
	}

	@Override
	public List<ThongKeDoanhThuModelData> spGetTotalRevenueTiket(Date time, int selectTime) {
		ProcedureCall procedureCall = this.getSession().createStoredProcedureCall("sp_get_total_revenue_ticket",ThongKeDoanhThuModelData.class);
		procedureCall.registerParameter("startTime",Date.class,ParameterMode.IN).bindValue(time);
		procedureCall.registerParameter("selectTime",Integer.class,ParameterMode.IN).bindValue(selectTime);
		
		List<ThongKeDoanhThuModelData> list =procedureCall.getResultList();
		return list;
	}

}