package carbook.dao;

import java.util.List;

import carbook.entity.Ben;

public interface BenDao {

	List<Ben> findAll();
	
	List<String> spGetBenToi(int benDiId);
	
	
}
