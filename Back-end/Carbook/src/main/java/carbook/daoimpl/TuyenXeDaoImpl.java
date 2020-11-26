package carbook.daoimpl;

import java.util.List;

import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import javax.transaction.Transactional;

import org.springframework.stereotype.Repository;

import carbook.dao.AbstractDao;
import carbook.dao.TuyenXeDao;
import carbook.entity.DiemDon;
import carbook.entity.TuyenXe;

@Transactional
@Repository("tuyenXeDao")
public class TuyenXeDaoImpl extends AbstractDao<Integer,TuyenXe> implements TuyenXeDao {

	@Override
	public TuyenXe spGetByDiemDiDiemToi(int DiemDi, int DiemToi) {
		CriteriaQuery<TuyenXe> criteria = this.getBuilder().createQuery(TuyenXe.class);

		Root<TuyenXe> root = criteria.from(TuyenXe.class);
		criteria.select(root).where(this.getBuilder().equal(root.get("diemDiId"), DiemDi));
		criteria.select(root).where(this.getBuilder().equal(root.get("diemToiId"),DiemToi));
		return this.getSession().createQuery(criteria).uniqueResult();
	}

	@Override
	public TuyenXe create(TuyenXe entity) {
		this.getSession().save(entity);
		return entity;
	}

	@Override
	public void update(TuyenXe entity) {
		this.getSession().update(entity);
		
	}

	@Override
	public TuyenXe findOne(int id) {
		CriteriaQuery<TuyenXe> criteria = this.getBuilder().createQuery(TuyenXe.class);
		Root<TuyenXe> root = criteria.from(TuyenXe.class);
		criteria.select(root).where(this.getBuilder().equal(root.get("id"), id));
		return this.getSession().createQuery(criteria).getSingleResult();
	}

	@Override
	public List<TuyenXe> findAll() {
		CriteriaQuery<TuyenXe> criteria = this.getBuilder().createQuery(TuyenXe.class);
		Root<TuyenXe> root = criteria.from(TuyenXe.class);
		criteria.select(root).orderBy(this.getBuilder().asc(root.get("id")));
		return this.getSession().createQuery(criteria).getResultList();
	}

}
