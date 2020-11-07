package carbook.daoimpl;

import java.util.List;

import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import javax.transaction.Transactional;

import org.springframework.stereotype.Repository;

import carbook.dao.AbstractDao;
import carbook.dao.KhachHangDao;
import carbook.entity.BaseEntity;
import carbook.entity.KhachHang;

@Transactional
@Repository("KhachHangDao")
public class KhachHangDaoImpl extends AbstractDao<Integer,KhachHang> implements KhachHangDao {

	@Override
	public BaseEntity create(BaseEntity entity) {
		this.getSession().save(entity);
		return entity;
	}

	@Override
	public void update(BaseEntity entity) {
		this.getSession().update(entity);
	}
	
	@Override
	public List<KhachHang> findAll() {
		CriteriaQuery<KhachHang> criteria = this.getBuilder().createQuery(KhachHang.class);
		Root<KhachHang> root = criteria.from(KhachHang.class);
		criteria.select(root).orderBy(this.getBuilder().asc(root.get("id")));
		return this.getSession().createQuery(criteria).getResultList();
	}

	@Override
	public BaseEntity getById(int id) {
		CriteriaQuery<BaseEntity> criteria = this.getBuilder().createQuery(BaseEntity.class);
		Root<BaseEntity> root = criteria.from(BaseEntity.class);
		criteria.select(root).where(this.getBuilder().equal(root.get("id"), id));
		return this.getSession().createQuery(criteria).getSingleResult();
	}

	@Override
	public KhachHang getByTaiKhoanMatKhau(String taiKhoan, String matKhau) {
		CriteriaQuery<KhachHang> criteria = this.getBuilder().createQuery(KhachHang.class);
		Root<KhachHang> root = criteria.from(KhachHang.class);
		criteria.select(root).where(this.getSession().getCriteriaBuilder().equal(root.get("taiKhoan"),taiKhoan),
									this.getSession().getCriteriaBuilder().equal(root.get("matKhau"), matKhau));
		return this.getSession().createQuery(criteria).getSingleResult();
	}

	
}
