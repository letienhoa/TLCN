package carbook.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import carbook.dao.TuyenXeDao;
import carbook.entity.TuyenXe;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/web/tuyenxe")
public class TuyenXeController {

	@Autowired
	private TuyenXeDao tuyenXeDao;
	
	@RequestMapping(value ="/get-tuyen-xe", method = RequestMethod.GET)
	public TuyenXe sptuyenxe(
			@RequestParam(name = "diem_di", required = false, defaultValue = "f") String diemdi,
			@RequestParam(name = "diem_toi", required = false, defaultValue = "7") String diemtoi) {
		
		TuyenXe data = tuyenXeDao.spGetByDiemDiDiemToi(diemdi, diemtoi);
		
        return data;
	}
	
	
}
