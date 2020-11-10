package carbook.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import carbook.dao.TramDungDao;
import carbook.entity.TramDung;
import carbook.response.BaseResponse;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/tram-dung")
public class TramDungController {

	@Autowired
	private TramDungDao tramDungDao;
	
	@RequestMapping(value ="/get-list-tram-dung-tuyen-xe", method = RequestMethod.GET)
	public ResponseEntity<BaseResponse> sptuyenxe(
			@RequestParam(name = "diem_di", required = false, defaultValue = "f") int diemdi,
			@RequestParam(name = "diem_toi", required = false, defaultValue = "7") int diemtoi) {
		BaseResponse response= new BaseResponse();
		List<TramDung> data = tramDungDao.spGetTramDungForTuyenXe(diemdi, diemtoi);
		response.setData(data);
		return new ResponseEntity<BaseResponse>(response,HttpStatus.OK);
	}
	

	@RequestMapping(value ="/get", method = RequestMethod.GET)
	public ResponseEntity<BaseResponse> test() {
		BaseResponse response= new BaseResponse();
		return new ResponseEntity<BaseResponse>(response,HttpStatus.OK);
	}
}
