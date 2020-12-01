package carbook.daoimpl;

import java.util.List;

import javax.persistence.ParameterMode;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import javax.transaction.Transactional;

import org.hibernate.procedure.ProcedureCall;
import org.springframework.stereotype.Repository;

import carbook.dao.AbstractDao;
import carbook.dao.BenDao;
import carbook.entity.Ben;

@SuppressWarnings("unchecked")
@Transactional
@Repository("benDao")
public class BenDaoImpl extends AbstractDao<Integer, Ben> implements BenDao {

	@Override
	public List<Ben> findAll() {		
		CriteriaQuery<Ben> criteria = this.getBuilder().createQuery(Ben.class);
		Root<Ben> root = criteria.from(Ben.class);
		criteria.select(root).orderBy(this.getBuilder().asc(root.get("id")));
		return this.getSession().createQuery(criteria).getResultList();
	}

	@Override
	public List<Ben> spGetBenToi(int benDiId) {
		ProcedureCall procedureCall = this.getSession().createStoredProcedureCall("sp_get_ben_toi",Ben.class);
		procedureCall.registerParameter("benDiId",Integer.class,ParameterMode.IN).bindValue(benDiId);
		List<Ben> list =procedureCall.getResultList();
		return list;
	}

	@Override
	public Ben create(Ben entity) {
		this.getSession().save(entity);
		return entity;
	}

	@Override
	public void update(Ben entity) {
		this.getSession().update(entity);
	}

	@Override
	public Ben findOne(int id) {
		CriteriaQuery<Ben> criteria = this.getBuilder().createQuery(Ben.class);
		Root<Ben> root = criteria.from(Ben.class);
		criteria.select(root).where(this.getBuilder().equal(root.get("id"), id));
		return this.getSession().createQuery(criteria).getSingleResult();
	}

	@Override
	public Ben findOne(String name) {
		CriteriaQuery<Ben> criteria = this.getBuilder().createQuery(Ben.class);
		Root<Ben> root = criteria.from(Ben.class);
		criteria.select(root).where(this.getBuilder().equal(root.get("tenBen"), name));
		return this.getSession().createQuery(criteria).getSingleResult();
	}

}
