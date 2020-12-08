package carbook.response;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import carbook.entity.ThongTinVeDataModel;


public class VeExcelVer1Response {

	
	
	private String tenKh;
	
	private String sdt;
	
	private String code;
	

	private List<String> slotss;
	
	public VeExcelVer1Response() {
		this.slotss = new ArrayList<String>();
	}
	 public VeExcelVer1Response(ThongTinVeDataModel e) {
		 
		 this.tenKh=e.getTenKh();
		 this.sdt=e.getSdt();
		 this.code=e.getCode();
		 this.slotss = new ArrayList<String>();
	 }
	

	

	public String getTenKh() {
		return tenKh;
	}

	public void setTenKh(String tenKh) {
		this.tenKh = tenKh;
	}

	public String getSdt() {
		return sdt;
	}

	public void setSdt(String sdt) {
		this.sdt = sdt;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public List<String> getSlotss() {
		return slotss;
	}

	public void setSlotss(List<String> slotss) {
		this.slotss = slotss;
	}
	
	public List<VeExcelVer1Response> mapToList(List<ThongTinVeDataModel> b){
		
		List<VeExcelVer1Response> list= b.stream()
											.map(x->new VeExcelVer1Response(x))
											.collect(Collectors.toList());
		return list;
		
	}
}
