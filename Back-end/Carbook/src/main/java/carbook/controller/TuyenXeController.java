package carbook.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import carbook.dao.TuyenXeDao;
import carbook.dao.XeDao;
import carbook.entity.TuyenXe;
import carbook.entity.Xe;
import carbook.response.BaseResponse;
import carbook.response.GioChayResponse;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/web/tuyenxe")
public class TuyenXeController {

	@Autowired
	private TuyenXeDao tuyenXeDao;
	
	@Autowired
	private XeDao xeDao;
	
	@RequestMapping(value ="/get-tuyen-xe", method = RequestMethod.GET)
	public TuyenXe sptuyenxe(
			@RequestParam(name = "diem_di", required = false, defaultValue = "f") String diemdi,
			@RequestParam(name = "diem_toi", required = false, defaultValue = "7") String diemtoi) {
		
		TuyenXe data = tuyenXeDao.spGetByDiemDiDiemToi(diemdi, diemtoi);
		
        return data;
	}
	
	@RequestMapping(value ="/{id}/gio-chay", method = RequestMethod.GET )
	public ResponseEntity<BaseResponse> spgetAll(
			@PathVariable(name= "id") int id){
		BaseResponse response = new BaseResponse();
		List<Xe> list = xeDao.getXeByTuyenXe(id);
		List<GioChayResponse> listData = new GioChayResponse().mapToList(list);
		response.setData(listData);
		return new ResponseEntity<BaseResponse>(response,HttpStatus.OK);
	}
	
}
