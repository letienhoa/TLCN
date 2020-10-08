package carbook.daoimpl;

import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import javax.transaction.Transactional;

import org.springframework.stereotype.Repository;

import carbook.dao.AbstractDao;
import carbook.dao.TuyenXeDao;
import carbook.entity.TuyenXe;

@Transactional
@Repository("tuyenXeDao")
public class TuyenXeDaoImpl extends AbstractDao<Integer,TuyenXe> implements TuyenXeDao {

	@Override
	public TuyenXe spGetByDiemDiDiemToi(String DiemDi, String DiemToi) {
		CriteriaQuery<TuyenXe> criteria = this.getBuilder().createQuery(TuyenXe.class);

		Root<TuyenXe> root = criteria.from(TuyenXe.class);
		criteria.select(root).where(this.getBuilder().equal(root.get("diem_di"), DiemDi));
		criteria.select(root).where(this.getBuilder().equal(root.get("diem_toi"),DiemToi));
		return this.getSession().createQuery(criteria).uniqueResult();
	}

}
