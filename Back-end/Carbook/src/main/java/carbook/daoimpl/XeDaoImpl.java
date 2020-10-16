package carbook.daoimpl;

import java.util.List;

import javax.persistence.ParameterMode;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import javax.transaction.Transactional;

import org.hibernate.procedure.ProcedureCall;
import org.springframework.stereotype.Repository;

import carbook.dao.AbstractDao;
import carbook.dao.XeDao;
import carbook.entity.Xe;

@Transactional
@Repository("xeDao")
@SuppressWarnings("unchecked")
public class XeDaoImpl extends AbstractDao<Integer, Xe>  implements XeDao{

	@Override
	public List<Xe> getXeByTuyenXe(int tuyenXeId) {
		CriteriaQuery<Xe> criteria= this.getBuilder().createQuery(Xe.class);
		
		Root<Xe> root= criteria.from(Xe.class);
		criteria.select(root).where(this.getBuilder().equal(root.get("tuyen_san_sang_id"), tuyenXeId));
		return this.getSession().createQuery(criteria).getResultList();
	}

	@Override
	public List<Integer> spGetGioChay(int tuyenXeId) {
		ProcedureCall procedureCall = this.getSession().createStoredProcedureCall("sp_get_gio_chay",Integer.class);
		procedureCall.registerParameter("id_tuyen_xe", Integer.class, ParameterMode.IN).bindValue(tuyenXeId);
				List<Integer> list =procedureCall.getResultList();
		return list;
	}

	@Override
	public Xe create(Xe entity) {
		this.getSession().save(entity);
		return entity;
	}

	@Override
	public void update(Xe entity) {
		// TODO Auto-generated method stub
		this.getSession().update(entity);
		
	}

}
