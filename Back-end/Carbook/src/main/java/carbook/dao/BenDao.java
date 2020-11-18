package carbook.dao;

import java.util.List;

import carbook.entity.Ben;

public interface BenDao {

	Ben create(Ben entity);
	
	void update(Ben entity);
	
	Ben findOne(int id);
	
	Ben findOne(String name);
	
	List<Ben> findAll();
	
	List<Ben> spGetBenToi(int benDiId);
	
	
}
