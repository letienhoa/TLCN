package carbook.controller;

import java.util.Date;
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

import carbook.dao.VeDao;
import carbook.entity.ThongKeDoanhThuModelData;
import carbook.entity.VeCustomerDataModel;
import carbook.entity.VeThongKeModelDate;
import carbook.response.BaseResponse;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/ve")
public class VeController {

	
	@Autowired
	private VeDao veDao;
	
	@RequestMapping(value ="thong-ke-theo-tuyen", method = RequestMethod.GET )
	public ResponseEntity<BaseResponse> spGetTotalRevenueTuyenXe(
			@RequestParam(name = "time", required = false) Date time,
			@RequestParam(name = "selecter", required = false, defaultValue = "7") Integer selecter){
		BaseResponse response = new BaseResponse();
		List<VeThongKeModelDate> list = veDao.spGetTotalRevenueTuyenXe(time, selecter);
		response.setData(list);
		return new ResponseEntity<BaseResponse>(response,HttpStatus.OK);
	}	
	
	@RequestMapping(value ="thong-ke-doanh-thu", method = RequestMethod.GET )
	public ResponseEntity<BaseResponse> spGetTotalRevenueTiket(
			@RequestParam(name = "time", required = false, defaultValue = "f") Date time,
			@RequestParam(name = "selecter", required = false, defaultValue = "7") Integer selecter){
		BaseResponse response = new BaseResponse();
		List<ThongKeDoanhThuModelData> list = veDao.spGetTotalRevenueTiket(time, selecter);
		response.setData(list);
		return new ResponseEntity<BaseResponse>(response,HttpStatus.OK);
	}
		
	@RequestMapping(value ="thong-ke-theo-khach-hang", method = RequestMethod.GET )
	public ResponseEntity<BaseResponse> spGetVeForCustomer(
			@RequestParam(name = "khach_hang_id", required = false) Integer khachHang){
		BaseResponse response = new BaseResponse();
		List<VeCustomerDataModel> list = veDao.spGetVeForCustomer(khachHang);
		response.setData(list);
		return new ResponseEntity<BaseResponse>(response,HttpStatus.OK);
	}
	
}
