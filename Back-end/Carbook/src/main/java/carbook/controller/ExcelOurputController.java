package carbook.controller;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import carbook.dao.VeDao;
import carbook.entity.VeExcelDataModel;
import carbook.response.BaseResponse;
import carbook.response.VeExcelResponse;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/excel")
public class ExcelOurputController {
	
	@Autowired
	private VeDao veDao;
	
	@RequestMapping(value ="/xuat-file", method = RequestMethod.POST )
	public ResponseEntity<BaseResponse> test(
			@RequestParam("id_tuyen_xe")int idTuyenXe ){
		BaseResponse response = new BaseResponse();
		
		
		XSSFWorkbook workbook = new XSSFWorkbook();
	    XSSFSheet sheet = workbook.createSheet("Customer_Info");
	    int rowNum = 0;
	    Row firstRow = sheet.createRow(rowNum++);
	    Cell firstCell = (Cell) firstRow.createCell(0);
	    firstCell.setCellValue("Danh Sách vé xe");
	    List<VeExcelDataModel> list = veDao.spXuatFileExcel(idTuyenXe);
	    
	    List<VeExcelResponse> listData = new VeExcelResponse().mapToList(list);
	    Cell cell;
        Row row;
        row = sheet.createRow(rowNum);
	    
        // EmpNo
        cell = row.createCell(0, CellType.STRING);
        cell.setCellValue("id");
        cell = row.createCell(1, CellType.STRING);
        cell.setCellValue("tuyen_xe");
        cell = row.createCell(2, CellType.STRING);
        cell.setCellValue("gio_chay");
        cell = row.createCell(3 ,CellType.STRING);
        cell.setCellValue("gio_ket_thuc");
        cell = row.createCell(4, CellType.STRING);
        cell.setCellValue("sdt_khach_hang");
        cell = row.createCell(5, CellType.STRING);
        cell.setCellValue("email");
        cell = row.createCell(6, CellType.STRING);
        cell.setCellValue("code");
        cell = row.createCell(7, CellType.STRING);
        cell.setCellValue("gia_ve");
        cell = row.createCell(8, CellType.STRING);
        cell.setCellValue("point");
        cell = row.createCell(9, CellType.STRING);
        cell.setCellValue("date");

        
	    
	    for (VeExcelResponse veExcel : listData) {
	    	rowNum++;
	         row = sheet.createRow(rowNum);
	        Cell cell1 = row.createCell(0);
	        cell1.setCellValue(veExcel.getId());
	        
	        Cell cell2 = row.createCell(1);
	        cell2.setCellValue(veExcel.getTuyenXe());
	        
	        Cell cell3 = row.createCell(2);
	        cell3.setCellValue(veExcel.getGioChay());
	        
	        Cell cell4 = row.createCell(3);
	        cell4.setCellValue(veExcel.getGioKetThuc());
	        
	        Cell cell5 = row.createCell(4);
	        cell5.setCellValue(veExcel.getSdt());
	        
	        Cell cell6 = row.createCell(5);
	        cell6.setCellValue(veExcel.getEmail());
	        
	        Cell cell7 = row.createCell(6);
	        cell7.setCellValue(veExcel.getCode());
	        
	        Cell cell8 = row.createCell(7);
	        cell8.setCellValue(veExcel.getGiaVe());
	        
	        Cell cell9 = row.createCell(8);
	        cell9.setCellValue(veExcel.getPoint());
	        
	        Cell cell10 = row.createCell(9);
	        cell10.setCellValue(veExcel.getDate());
	      }
	    
	    try {
	    	 File file = new File("D:/employee.xls");
	         file.getParentFile().mkdirs();
	    	
	        FileOutputStream outputStream = new FileOutputStream(file);
	        workbook.write(outputStream);
	        workbook.close();
	      } catch (FileNotFoundException e) {
	        e.printStackTrace();
	      } catch (IOException e) {
	        e.printStackTrace();
	      }

	    Long messageSql= veDao.spUpdateVeXeTrangThai(idTuyenXe);
	    if(messageSql==1) {
	    	response.setMessageError("Lỗi cập nhập trạng thái của vé xe !!!");
	    }
	    response.setData(listData);
		return new ResponseEntity<BaseResponse>(response,HttpStatus.OK);
	
	}
	
	
}
