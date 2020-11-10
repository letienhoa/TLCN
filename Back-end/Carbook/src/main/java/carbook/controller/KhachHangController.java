package carbook.controller;

import javax.servlet.http.HttpServletRequest;

import java.security.NoSuchAlgorithmException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import carbook.dao.KhachHangDao;
import carbook.entity.ResponseStatusEnum;
import carbook.entity.TokenResponse;
import carbook.entity.User;
import carbook.entity.UserToken;
import carbook.request.KhachHangRequest;
import carbook.response.BaseResponse;
import carbook.security.PasswordEncryption;
import carbook.service.JwtService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/khach-hang")
public class KhachHangController {

	@Autowired
	private KhachHangDao khachHangdao;
	
	@Autowired
	  private JwtService jwtService;

	
	@RequestMapping(value ="/create", method = RequestMethod.POST)
	public ResponseEntity<BaseResponse> create(@RequestBody KhachHangRequest wrapper) {
		BaseResponse response= new BaseResponse();
		String matKhauMK = null;
		User khachHang =new User();
		khachHang = khachHangdao.findByUsername(wrapper.getTaiKhoan());
		
		if(khachHang!=null) {
			response.setMessageError("Tên tài khoản đã tồn tại, vui lòng nhập lại tên khác <3.");
			response.setStatus(ResponseStatusEnum.DATA_INVALID);
			return new ResponseEntity<BaseResponse>(response,HttpStatus.BAD_REQUEST);
		} else {
			khachHang= new User();
			PasswordEncryption pe = new PasswordEncryption();
			try {
				matKhauMK= pe.convertHashToString(wrapper.getMatKhau());
			} catch (NoSuchAlgorithmException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			khachHang.setTaiKhoan(wrapper.getTaiKhoan());
			khachHang.setSdt(wrapper.getTaiKhoan());
			khachHang.setPassword(matKhauMK);
			khachHang.setTenKh(wrapper.getTen());
			khachHangdao.create(khachHang);
			response.setData(khachHang);
			return new ResponseEntity<BaseResponse>(response,HttpStatus.OK);
		}

	}
	
	@RequestMapping(value ="/login", method = RequestMethod.POST)
	public ResponseEntity<TokenResponse> login(HttpServletRequest request ,@RequestBody KhachHangRequest wrapper) {
		TokenResponse respnse;
		String result = "hihihihi";
		@SuppressWarnings("unused")
		HttpStatus httpStatus=null;
		String matKhauMK = null;
		UserToken khachHang =new UserToken();
		PasswordEncryption pe = new PasswordEncryption();
		try {
			matKhauMK= pe.convertHashToString(wrapper.getMatKhau());
		} catch (NoSuchAlgorithmException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		try {
			khachHang=khachHangdao.getByTaiKhoanMatKhau(wrapper.getTaiKhoan(),matKhauMK);
			if(khachHang==null)
			{
				result = "Wrong userId and password";
				httpStatus = HttpStatus.BAD_REQUEST;
			} else {
				result = jwtService.generateTokenLogin(khachHang.getTaiKhoan());
		      	 httpStatus = HttpStatus.OK;
			}
		} catch (Exception ex) {
		      result = "Server Error";
		      httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		respnse= new TokenResponse(result);
		return new ResponseEntity<TokenResponse>(respnse,HttpStatus.OK);

	}
	
	@RequestMapping(value ="/test", method = RequestMethod.GET)
	public String login1() {
		String result = "hihihihi";
	
		return result;

	}
	
}
