package carbook.controller;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import carbook.dao.PointDao;
import carbook.dao.QuyDoiDiemDao;
import carbook.dao.VeDao;
import carbook.entity.ThongKeDoanhThuModelData;
import carbook.entity.VeCustomerDataModel;
import carbook.entity.VeExcelDataModel;
import carbook.entity.VeForCustomerByCodeDataModelFinal;
import carbook.entity.VeThongKeModelDate;
import carbook.request.VeHoiKhuRequest;
import carbook.request.VeRequest;
import carbook.response.BaseResponse;
import carbook.response.VeCustomerDataModelResponse;
import carbook.service.EmailService;
import carbook.service.GenerateCode;
import carbook.service.UtilsService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/ve")
public class VeController {

	@Autowired
	private EmailService emailService; 
	
	
	@Autowired
	private VeDao veDao;
	
	@Autowired
	private PointDao pointDao;
	
	@Autowired
	private QuyDoiDiemDao quyDoiDiemDao;
	
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
			@RequestParam(name = "time", required = false, defaultValue = "2020/01/01") Date time,
			@RequestParam(name = "selecter", required = false, defaultValue = "7") Integer selecter){
		BaseResponse response = new BaseResponse();
		Calendar times= Calendar.getInstance();
		times.setTime(time);
		if(selecter==1)
		{
			times.set(Calendar.DAY_OF_MONTH,1);
		}
		else if(selecter==2) {
			 times.set(Calendar.MONTH,1);
			 times.set(Calendar.DAY_OF_MONTH,1);
			 times.add(Calendar.MONTH, -1);
		} else {
			response.setMessageError("yêu cầu lỗi khi nhập mốc chọn, mời chọn lại");
			return new ResponseEntity<BaseResponse>(response,HttpStatus.OK);
		}
		List<ThongKeDoanhThuModelData> list = veDao.spGetTotalRevenueTiket(times, selecter);
		response.setData(list);
		return new ResponseEntity<BaseResponse>(response,HttpStatus.OK);
	}
	
	@RequestMapping(value ="thong-ke-theo-khach-hang", method = RequestMethod.GET )
	public ResponseEntity<BaseResponse> spGetVeForCustomer(
			@RequestParam(name = "khach_hang_id", required = false) Integer khachHang){
		BaseResponse response = new BaseResponse();
		List<VeCustomerDataModel> list = veDao.spGetVeForCustomer(khachHang);
		List<VeCustomerDataModelResponse> listResponse =new VeCustomerDataModelResponse().mapToList(list);
		response.setData(listResponse);
		return new ResponseEntity<BaseResponse>(response,HttpStatus.OK);
	}
	
	@RequestMapping(value ="/create", method = RequestMethod.POST )
	public ResponseEntity<BaseResponse> create(
			@RequestBody VeRequest wrapper){
		BaseResponse response = new BaseResponse();
		String code = GenerateCode.generateStringToEmail(wrapper.getEmail());
		String slots =UtilsService.convertListObjectToJsonArrayt(wrapper.getSlot());
		String ngay=UtilsService.changeDateToString(UtilsService.changeStringToDate(wrapper.getDate()));
		emailService.sendEmail(wrapper.getEmail(),"MÃ CODE XÁC THỰC","QUÝ KHÁCH VUI LÒNG GIỮ MÃ CODE NÀY ĐỂ XÁC THỰC KHI XUẤT PHÁT TẠI BẾN: "
				+"Mã Code: "+code+"                                    "
				+"Mã tuyến xe: "+wrapper.getIdTuyenXe()
				+"       ---      "+"Giờ xuất phát: "+wrapper.getGioChay()+"giờ"
				+"    ---   "+"Vị trí giường nằm: "+slots
				+"       ---     "+"Giá tiền :"+wrapper.getGiaVe()+"vnd"+"     ---     "+"Ngày khởi hành: "+ngay);
		Double parde =wrapper.getGiaVe()/4000;
		int point =parde.intValue();
		Long message1=pointDao.spCreateHistoryPoint(wrapper.getEmail(), point, 0);
		Long messageSQL=veDao.create(wrapper, slots,code);
		if(messageSQL==1||message1==1) {
			response.setMessageError("Lỗi khi thêm dữ liệu dưới database");
		} else {
			response.setData(wrapper);
		}
		return new ResponseEntity<BaseResponse>(response,HttpStatus.OK);
	}
	
	@RequestMapping(value ="/create2", method = RequestMethod.POST )
	public ResponseEntity<BaseResponse> create2(
			@RequestBody VeHoiKhuRequest wrapper){
		BaseResponse response = new BaseResponse();
		VeRequest wrapper1 = new VeRequest();
		
		//Ve 1
		
		// Đổ dữ liệu cho vé 1
		wrapper1.setGioChay(wrapper.getGioChay());
		wrapper1.setGioKetThuc(wrapper.getGioKetThuc());
		wrapper1.setIdTuyenXe(wrapper.getIdTuyenXe());
		wrapper1.setSdt(wrapper.getSdt());
		wrapper1.setEmail(wrapper.getEmail());
		wrapper1.setDate(wrapper.getDate());
		wrapper1.setGiaVe(wrapper.getGiaVe());
		wrapper1.setSlot(wrapper.getSlot());
		String tuyenXe1 = veDao.spGetNameTuyenXe(wrapper.getIdTuyenXe());
		String code = GenerateCode.generateStringToEmail(wrapper.getEmail());
		String slots =UtilsService.convertListObjectToJsonArrayt(wrapper.getSlot());
		String ngay=UtilsService.getDateFormatVN(UtilsService.changeStringToDate(wrapper.getDate()));
		emailService.sendEmail(wrapper.getEmail(),"MÃ CODE XÁC THỰC","QUÝ KHÁCH VUI LÒNG GIỮ MÃ CODE NÀY ĐỂ XÁC THỰC KHI XUẤT PHÁT TẠI BẾN: "
				+"Mã Code: "+code+"                                    "
				+ "Tuyến xe: "+tuyenXe1
				+"       ---      "+"Giờ xuất phát: "+wrapper.getGioChay()+"giờ"
				+"    ---   "+"Vị trí giường nằm: "+slots
				+"       ---     "+"Giá tiền :"+wrapper.getGiaVe()+"vnd"+"     ---     "+"Ngày khởi hành: "+ngay);
		Double parde =wrapper.getGiaVe()/4000;
		int point =parde.intValue();
		Long message1=pointDao.spCreateHistoryPoint(wrapper.getEmail(), point, 0);
		Long messageSQL=veDao.create(wrapper1, slots,code);
		
		
		// Vé 2
		VeRequest wrapper2 = new VeRequest();
		wrapper2.setGioChay(wrapper.getGioChay2());
		wrapper2.setGioKetThuc(wrapper.getGioKetThuc2());
		wrapper2.setIdTuyenXe(wrapper.getIdTuyenXe2());
		wrapper2.setSdt(wrapper.getSdt());
		wrapper2.setEmail(wrapper.getEmail());
		wrapper2.setDate(wrapper.getDate2());
		wrapper2.setGiaVe(wrapper.getGiaVe2());
		wrapper2.setSlot(wrapper.getSlot2());
		String tuyenXe2 = veDao.spGetNameTuyenXe(wrapper.getIdTuyenXe2());
		String code2 = GenerateCode.generateStringToEmail(wrapper.getEmail());
		String slots2 =UtilsService.convertListObjectToJsonArrayt(wrapper.getSlot2());
		String ngay2=UtilsService.getDateFormatVN(UtilsService.changeStringToDate(wrapper.getDate2()));
		emailService.sendEmail(wrapper.getEmail(),"MÃ CODE XÁC THỰC","QUÝ KHÁCH VUI LÒNG GIỮ MÃ CODE NÀY ĐỂ XÁC THỰC KHI XUẤT PHÁT TẠI BẾN: "
				+"Mã Code: "+code2+"                                    "
				+"Tuyến xe: "+tuyenXe2
				+"       ---      "+"Giờ xuất phát: "+wrapper2.getGioChay()+"giờ"
				+"    ---   "+"Vị trí giường nằm: "+slots2
				+"       ---     "+"Giá tiền :"+wrapper2.getGiaVe()+"vnd"+"     ---     "+"Ngày khởi hành: "+ngay2);
		Double parde2 =wrapper2.getGiaVe()/4000;
		int point2 =parde2.intValue();
		Long message2=pointDao.spCreateHistoryPoint(wrapper.getEmail(), point2, 0);
		Long messageSQL2=veDao.create(wrapper2, slots2,code2);
		if(messageSQL==1||message1==1||message2==1||messageSQL2==1) {
			response.setMessageError("Lỗi khi thêm dữ liệu dưới database");
		} else {
			response.setMessageError("Đặt vé thành công");
		}
		return new ResponseEntity<BaseResponse>(response,HttpStatus.OK);
	}
	
	
	
	
	@RequestMapping(value ="get-ve-by-code", method = RequestMethod.GET )
	public ResponseEntity<BaseResponse> spGetVeForCustomerByCode(
			@RequestParam(name = "code", required = false) String code){
		BaseResponse response = new BaseResponse();
		VeForCustomerByCodeDataModelFinal datas= veDao.spGetVeForCustomerByCode(code);
		response.setData(datas);
		return new ResponseEntity<BaseResponse>(response,HttpStatus.OK);
	}

}
