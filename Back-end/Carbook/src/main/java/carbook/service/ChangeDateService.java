package carbook.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class ChangeDateService {

	public static Date changeStringToDate(String chuoiDate) {
		
		SimpleDateFormat formatter = new SimpleDateFormat("yyy/MM/dd");
		Date ngay = null;
		try {
			ngay = formatter.parse(chuoiDate);
		} catch (ParseException e) {
			
			e.printStackTrace();
		}
		return ngay;
	}
	
	public String changeDateToString(Date ngay) {
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy/MM/dd");
		String chuoiNgay = formatter.format(ngay);
		return chuoiNgay;
	}
	
	public static Date changeFormatDate(Date ngay) {
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy/MM/dd");
		String chuoiNgay = formatter.format(ngay);
		try {
			ngay = formatter.parse(chuoiNgay);
		} catch (ParseException e) {
			
			e.printStackTrace();
		}
		return ngay;
	}
}