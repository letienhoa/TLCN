package carbook.dao;

import java.util.List;

import carbook.entity.BaseEntity;
import carbook.entity.KhachHang;

public interface KhachHangDao  {

	public BaseEntity create(BaseEntity entity);
	
	public void update(BaseEntity entity);
	
	public List<KhachHang> findAll();
	
	public BaseEntity getById(int id);
	
	public KhachHang getByTaiKhoanMatKhau(String taiKhoan,String matKhau);
}
