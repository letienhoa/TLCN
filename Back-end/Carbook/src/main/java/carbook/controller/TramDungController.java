package carbook.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import carbook.dao.TramDungDao;
import carbook.entity.TramDung;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/web/tram-dung")
public class TramDungController {

	@Autowired
	private TramDungDao tramDungDao;
	
	@RequestMapping(value ="/get-list-tram-dung-tuyen-xe", method = RequestMethod.GET)
	public List<TramDung> sptuyenxe(
			@RequestParam(name = "diem_di", required = false, defaultValue = "f") int diemdi,
			@RequestParam(name = "diem_toi", required = false, defaultValue = "7") int diemtoi) {
		
		List<TramDung> data = tramDungDao.spGetTramDungForTuyenXe(diemdi, diemtoi);
		
        return data;
	}
}
