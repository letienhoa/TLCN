package carbook.dao;

import java.util.List;

import carbook.entity.BaseEntity;
import carbook.entity.User;
import carbook.entity.UserToken;

public interface KhachHangDao  {

	public BaseEntity create(BaseEntity entity);
	
	public void update(BaseEntity entity);
	
	public List<User> findAll();
	
	public BaseEntity getById(int id);
	
	public UserToken getByTaiKhoanMatKhau(String taiKhoan,String matKhau);
	
	public UserToken loadUserByUsername(String username);
	
	public User findByUsername(String name);
}
