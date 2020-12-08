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
import carbook.dao.VeDao;
import carbook.dao.XeDao;
import carbook.entity.Ben;
import carbook.entity.TuyenXe;
import carbook.entity.TuyenXeModelData;
import carbook.entity.TuyenXePhoBienDataModel;
import carbook.entity.VeOverviewDataModel;
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
	
	@Autowired
	private VeDao veDao;
	
	@RequestMapping(value ="/create", method = RequestMethod.POST )
	public ResponseEntity<BaseResponse> create(
			@RequestBody TuyenXeRequest wrapper){
		BaseResponse response = new BaseResponse();
		TuyenXe tuyenXe= new TuyenXe();
		tuyenXe.setDiemDiId(wrapper.getDiemDiId());
		tuyenXe.setDiemToiId(wrapper.getDiemToiId());
		tuyenXe.setKhoangCach(wrapper.getKhoangCach());
		tuyenXe.setGiaCa(wrapper.getGiaCa());
		tuyenXe.setKhoangThoiGian(wrapper.getThoiGianChay());
		
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
			
			tuyenXe.setDiemDiId(wrapper.getDiemDiId());
			tuyenXe.setDiemToiId(wrapper.getDiemToiId());
			tuyenXe.setKhoangCach(wrapper.getKhoangCach());
			tuyenXe.setGiaCa(wrapper.getGiaCa());
			tuyenXe.setKhoangThoiGian(wrapper.getThoiGianChay());
			tuyenXeDao.update(tuyenXe);
			response.setData(tuyenXe);
			return new ResponseEntity<BaseResponse>(response,HttpStatus.OK);
		}
	}
	
	
	@RequestMapping(value ="/get-tuyen-xe", method = RequestMethod.GET)
	public ResponseEntity<BaseResponse> sptuyenxe(
			@RequestParam(name = "diem_di_id", required = false, defaultValue = "f") int diemDiId,
			@RequestParam(name = "diem_toi_id", required = false, defaultValue = "7") int diemToiId) {
		BaseResponse response= new BaseResponse();
		TuyenXe tuyenXe = tuyenXeDao.spGetByDiemDiDiemToi(diemDiId, diemToiId);
		if(tuyenXe!=null) {
		Ben ben = benDao.findOne(diemToiId);
		TuyenXeCustomerResponse responsedate = new TuyenXeCustomerResponse(ben,tuyenXe);
		response.setData(responsedate);
		}else {
			response.setMessageError("Không tìm thấy tuyến xe phù hợp");
		}
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
	
	@RequestMapping(value ="/", method = RequestMethod.GET )
	public ResponseEntity<BaseResponse> getAll(){
		
		BaseResponse response = new BaseResponse();
		List<TuyenXeModelData> list = tuyenXeDao.findAll();
		response.setData(list);
		return new ResponseEntity<BaseResponse>(response,HttpStatus.OK);
	}
	
	@RequestMapping(value ="/get-tuyen-xe-pho-bien", method = RequestMethod.GET )
	public ResponseEntity<BaseResponse> spGetListTuyenXePhoBien(){
		
		BaseResponse response = new BaseResponse();
		List<TuyenXePhoBienDataModel> list = tuyenXeDao.spGetListTuyenXePhoBien();
		response.setData(list);
		return new ResponseEntity<BaseResponse>(response,HttpStatus.OK);
	}
	
	@RequestMapping(value ="/list-tuyen-xe-theo-ve", method = RequestMethod.GET )
	public ResponseEntity<BaseResponse> spGetTuyenXeTrongNgay(
			 ){
		BaseResponse response = new BaseResponse();
		List<VeOverviewDataModel> list= veDao.spGetTuyenXeTrongNgay();
		response.setData(list);
		return new ResponseEntity<BaseResponse>(response,HttpStatus.OK);
	
	}
}
