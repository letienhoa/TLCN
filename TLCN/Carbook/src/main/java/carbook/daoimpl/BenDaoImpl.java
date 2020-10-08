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
	public List<String> spGetBenToi(int benDiId) {
		ProcedureCall procedureCall = this.getSession().createStoredProcedureCall("sp_get_ben_toi");
		procedureCall.registerParameter("benDiId",Integer.class,ParameterMode.IN).bindValue(benDiId);
		List<String> list =procedureCall.getResultList();
		return list;
	}

}
