package carbook.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import carbook.dao.GiuongDao;
import carbook.entity.GiuongModelData;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/web/giuong")
public class GiuongController {

	@Autowired
	private GiuongDao giuongDao;
	
	
	
	@RequestMapping(value ="/get-list-giuong-for-xe", method = RequestMethod.GET)
	public List<GiuongModelData> spGetGiuongByTuyenXeId(
			@RequestParam(name = "tuyen_xe_id", required = false, defaultValue = "1") int tuyenXeId,
			@RequestParam(name = "gio", required = false, defaultValue = "7") int gio) {
		
		List<GiuongModelData> data =giuongDao.spGetGiuongByTuyenXeId(tuyenXeId, gio);
		
        return data;
	}
	
	
}
