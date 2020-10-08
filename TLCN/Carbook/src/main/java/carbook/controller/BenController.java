package carbook.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import carbook.dao.BenDao;
import carbook.entity.Ben;


@RestController
@RequestMapping("/api/web/ben")
public class BenController {

	@Autowired
	private BenDao benDao;
	
	@RequestMapping(value ="/get-list-ben-toi", method = RequestMethod.GET)
	public List<String> spGetBenToi(
			@RequestParam(name = "ben_di_id", required = false, defaultValue = "0") int benDiId){
		List<String> data = benDao.spGetBenToi(benDiId);
		
        return data;
	}
	
	@RequestMapping(value ="", method = RequestMethod.GET)
	public List<Ben> getAll(){
		List<Ben> data = benDao.findAll();
		
        return data;
	}
}
