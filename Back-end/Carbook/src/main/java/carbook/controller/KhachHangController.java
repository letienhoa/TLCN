package carbook.controller;

import java.security.NoSuchAlgorithmException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import carbook.dao.KhachHangDao;
import carbook.entity.KhachHang;
import carbook.request.KhachHangRequest;
import carbook.response.BaseResponse;
import carbook.security.PasswordEncryption;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/khach-hang")
public class KhachHangController {

	@Autowired
	private KhachHangDao khachHangdao;
	
	
	@RequestMapping(value ="/create", method = RequestMethod.POST)
	public ResponseEntity<BaseResponse> create(@RequestBody KhachHangRequest wrapper) {
		BaseResponse response= new BaseResponse();
		String matKhauMK = null;
		KhachHang khachHang =new KhachHang();
		PasswordEncryption pe = new PasswordEncryption();
		try {
			matKhauMK= pe.convertHashToString(wrapper.getMatKhau());
		} catch (NoSuchAlgorithmException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		khachHang.setTaiKhoan(wrapper.getTaiKhoan());
		khachHang.setSdt(wrapper.getTaiKhoan());
		khachHang.setTenKh(wrapper.getTen());
		khachHangdao.create(khachHang);
		response.setData(khachHang);
		return new ResponseEntity<BaseResponse>(response,HttpStatus.OK);

	}
	
	@RequestMapping(value ="/confirm", method = RequestMethod.GET)
	public ResponseEntity<BaseResponse> confirm(@RequestBody KhachHangRequest wrapper) {
		BaseResponse response= new BaseResponse();
		String matKhauMK = null;
		KhachHang khachHang =new KhachHang();
		PasswordEncryption pe = new PasswordEncryption();
		try {
			matKhauMK= pe.convertHashToString(wrapper.getMatKhau());
		} catch (NoSuchAlgorithmException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		khachHang=khachHangdao.getByTaiKhoanMatKhau(wrapper.getTaiKhoan(),matKhauMK);
		if(khachHang==null)
		{
			response.setMessageError("Mật khẩu hay tài khoản sai rồi đó, thử lại nhé");
		} else {
			response.setMessageError("Đăng nhập thành công rồi ,huhuhu");
		}
		response.setData(khachHang);
		return new ResponseEntity<BaseResponse>(response,HttpStatus.OK);

	}
	
}
