package carbook.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import carbook.dao.BenDao;
import carbook.dao.TuyenXeDao;
import carbook.dao.XeDao;
import carbook.entity.Ben;
import carbook.entity.TuyenXe;
import carbook.entity.Xe;
import carbook.request.TuyenXeRequest;
import carbook.response.BaseResponse;
import carbook.response.GioChayResponse;
import carbook.response.TuyenXeCustomerResponse;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/tuyenxe")
public class TuyenXeController {

	@Autowired
	private TuyenXeDao tuyenXeDao;
	
	@Autowired
	private BenDao benDao;
	
	@Autowired
	private XeDao xeDao;
	
	@RequestMapping(value ="/create", method = RequestMethod.POST )
	public ResponseEntity<BaseResponse> create(
			@RequestBody TuyenXeRequest wrapper){
		BaseResponse response = new BaseResponse();
		TuyenXe tuyenXe= new TuyenXe();
		tuyenXe.setDiemDi(wrapper.getDiemDi());
		tuyenXe.setDiemToi(wrapper.getDiemToi());
		tuyenXe.setGiaCa(wrapper.getGiaCa());
		tuyenXe.setKhoangCach(wrapper.getThoiGianChay());
		
		tuyenXeDao.create(tuyenXe);
		response.setData(tuyenXe);
		return new ResponseEntity<BaseResponse>(response,HttpStatus.OK);
	}
	
	@RequestMapping(value ="/{id}/update", method = RequestMethod.POST )
	public ResponseEntity<BaseResponse> update(
			@PathVariable(name="id")int id,
			@RequestBody TuyenXeRequest wrapper){
		BaseResponse response = new BaseResponse();
		TuyenXe tuyenXe =tuyenXeDao.findOne(id);
		if(tuyenXe==null)
		{
			response.setMessageError("không tồn tại tuyến xe này =((");
			return new ResponseEntity<BaseResponse>(response,HttpStatus.BAD_REQUEST);
			
		} else {
			
			tuyenXe.setDiemDi(wrapper.getDiemDi());
			tuyenXe.setDiemToi(wrapper.getDiemToi());
			tuyenXe.setGiaCa(wrapper.getGiaCa());
			tuyenXe.setKhoangCach(wrapper.getThoiGianChay());
			tuyenXeDao.update(tuyenXe);
			response.setData(tuyenXe);
			return new ResponseEntity<BaseResponse>(response,HttpStatus.OK);
		}
	}
	
	
	@RequestMapping(value ="/get-tuyen-xe", method = RequestMethod.GET)
	public ResponseEntity<BaseResponse> sptuyenxe(
			@RequestParam(name = "diem_di", required = false, defaultValue = "f") String diemdi,
			@RequestParam(name = "diem_toi", required = false, defaultValue = "7") String diemtoi) {
		BaseResponse response= new BaseResponse();
		TuyenXe tuyenXe = tuyenXeDao.spGetByDiemDiDiemToi(diemdi, diemtoi);
		Ben ben = benDao.findOne(diemtoi);
		TuyenXeCustomerResponse responsedate = new TuyenXeCustomerResponse(ben,tuyenXe);
		response.setData(responsedate);
		return new ResponseEntity<BaseResponse>(response,HttpStatus.OK);
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
