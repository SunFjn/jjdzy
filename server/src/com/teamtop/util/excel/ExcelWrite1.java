package com.teamtop.util.excel;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;

public class ExcelWrite1 {
	private static HSSFWorkbook workbook = null;

	/**
	 * 判断文件是否存在.
	 * 
	 * @param fileDir 文件路径
	 * @return
	 */
	public static boolean isFileExist(String fileDir) {
		boolean flag;
		File file = new File(fileDir);
		flag = file.exists();
		return flag;
	}

	/**
	 * 判断文件的sheet是否存在.
	 * 
	 * @param fileDir   文件路径
	 * @param sheetName 表格索引名
	 * @return
	 */
	public static boolean isSheetExist(String fileDir, String sheetName) throws Exception {
		boolean flag = false;
		File file = new File(fileDir);
		if (file.exists()) { // 文件存在
			// 创建workbook
			try {
				workbook = new HSSFWorkbook(new FileInputStream(file));
				// 添加Worksheet（不添加sheet时生成的xls文件打开时会报错)
				HSSFSheet sheet = workbook.getSheet(sheetName);
				if (sheet != null)
					flag = true;
			} catch (Exception e) {
				throw e;
			}

		} else { // 文件不存在
			flag = false;
		}
		return flag;
	}

	/**
	 * 创建新excel.
	 * 
	 * @param fileDir       excel的路径
	 * @param sheetName     要创建的表格索引
	 * @param titleRowNames excel的第一行即表格头
	 */
	public static void createExcel(String fileDir, String sheetName, String[] titleRowNames) throws Exception {
		// 创建workbook
		workbook = new HSSFWorkbook();
		// 添加Worksheet（不添加sheet时生成的xls文件打开时会报错)
		HSSFSheet sheet = workbook.createSheet(sheetName);
		short[] columnWidth = ExcelConst.SystemStateEnum_COLUMNWIDTH;
		for (short i = 0; i < titleRowNames.length; i++) {
			sheet.setColumnWidth(i, columnWidth[i]);
		}
		HSSFCellStyle style = workbook.createCellStyle(); // 生成一个样式
		getTitleStyle(style);
		// 新建文件
		FileOutputStream out = null;
		try {
			// 添加表头
			HSSFRow row = sheet.createRow(0); // 创建第一行
			for (short i = 0; i < titleRowNames.length; i++) {
				HSSFCell cell = row.createCell(i);
				cell.setCellStyle(style);
				cell.setCellValue(titleRowNames[i]);
			}
			out = new FileOutputStream(fileDir);
			workbook.write(out);
		} catch (Exception e) {
			throw e;
		} finally {
			try {
				if (out != null) {
					out.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

	/**
	 * 删除文件.
	 * 
	 * @param fileDir 文件路径
	 */
	public static boolean deleteExcel(String fileDir) {
		boolean flag = false;
		File file = new File(fileDir);
		// 判断目录或文件是否存在
		if (!file.exists()) { // 不存在返回 false
			return flag;
		} else {
			// 判断是否为文件
			if (file.isFile()) { // 为文件时调用删除文件方法
				file.delete();
				flag = true;
			}
		}
		return flag;
	}

	/**
	 * 往excel中写入(已存在的数据无法写入).
	 * 
	 * @param fileDir   文件路径
	 * @param sheetName 表格索引
	 * @param object
	 * @throws Exception
	 */
	public static void writeToExcel(String fileDir, String sheetName, List<List<String>> rowsList) throws Exception {
		// 创建workbook
		File file = new File(fileDir);
		try {
			workbook = new HSSFWorkbook(new FileInputStream(file));
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		// 流
		FileOutputStream out = null;
		HSSFSheet sheet = workbook.getSheet(sheetName);
		HSSFCellStyle style = workbook.createCellStyle();
		HSSFCellStyle style2 = workbook.createCellStyle();

		getRowStyle(1, style);
		getRowStyle(2, style2);
		// 获取表格的总行数
		// int rowCount = sheet.getLastRowNum() + 1; // 需要加一
		// 获取表头的列数
		int columnCount = sheet.getRow(0).getLastCellNum() + 1;
		try {
			// 获得表头行对象
			HSSFRow titleRow = sheet.getRow(0);
			if (titleRow != null) {
				for (int rowId = 0; rowId < rowsList.size(); rowId++) {
					List<String> rowList = rowsList.get(rowId);
					HSSFRow newRow = sheet.createRow(rowId + 1);
					for (short columnIndex = 0; columnIndex < columnCount; columnIndex++) { // 遍历表头
						HSSFCell cell = newRow.createCell(columnIndex);
						int flag = rowId + 1;
						if (flag % 2 == 1) {// 行样式变换
							cell.setCellStyle(style);
						} else {
							cell.setCellStyle(style2);
						}
						cell.setCellValue(rowList.get(columnIndex));
					}
				}
			}

			out = new FileOutputStream(fileDir);
			workbook.write(out);
		} catch (Exception e) {
			throw e;
		} finally {
			try {
				if (out != null) {
					out.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

	/**
	 * 写入到excel，如有同名文件则删除再重新写入
	 * 
	 * @param fileDir       文件路径
	 * @param sheetName     表格索引
	 * @param titleRowNames excel的第一行即表格头
	 * @param mapList
	 * @throws Exception
	 */
	public static void writeToExcel_f1(String fileDir, String sheetName, String[] titleRowNames,
			List<List<String>> rowsList) throws Exception {
		if (isFileExist(fileDir)) {
			deleteExcel(fileDir);
		}
		createExcel(fileDir, sheetName, titleRowNames);
		writeToExcel(fileDir, sheetName, rowsList);
	}

	public static void main(String[] args) throws Exception {
//		System.out.println(ExcelWrite1.isFileExist("E:/test2.xls")); // 创建文件
//		String title[] = { "id", "name", "password" };
//		ExcelWrite1.createExcel("E:/test2.xls", "sheet1", title);
//		List<Map<String, String>> list = new ArrayList<Map<String, String>>();
//		Map<String, String> map = new HashMap<String, String>();
//		map.put("id", "111");
//		map.put("name", "张三");
//		map.put("password", "111！@#");
//
//		Map<String, String> map2 = new HashMap<String, String>();
//		map2.put("id", "222");
//		map2.put("name", "李四");
//		map2.put("password", "222！@#");
//		list.add(map);
//		list.add(map2);
//		ExcelWrite1.writeToExcel("E:/test2.xls", "sheet1", list);

//		String sql = "select aaa,bbb,ccc from dddd";
//		String sqlForSplit = sql.substring(sql.toLowerCase().indexOf("select") + 6, sql.toLowerCase().indexOf("from"))
//				.trim();
//		String sqlRemoveFrom = sql.substring(sql.toLowerCase().indexOf("from") + 5).trim();
//		System.out.println(sqlRemoveFrom);
//		String tableName = sqlRemoveFrom.indexOf(" ") == -1 ? sqlRemoveFrom
//				: sqlRemoveFrom.substring(0, sqlRemoveFrom.indexOf(" "));
//		System.out.println(tableName);

	}

	public static void getTitleStyle(HSSFCellStyle style) {
		// 设置这些样式
		style.setFillForegroundColor(HSSFColor.LIGHT_ORANGE.index);
		style.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
		style.setBorderBottom(HSSFCellStyle.BORDER_THIN);
		style.setBorderLeft(HSSFCellStyle.BORDER_THIN);
		style.setBorderRight(HSSFCellStyle.BORDER_THIN);
		style.setBorderTop(HSSFCellStyle.BORDER_THIN);
		style.setAlignment(HSSFCellStyle.ALIGN_CENTER);
		// 生成一个字体
		HSSFFont font = workbook.createFont();
		font.setColor(HSSFColor.VIOLET.index);
		font.setFontHeightInPoints((short) 12);
		font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
		// 把字体应用到当前的样式
		style.setFont(font);
	}

	public static void getRowStyle(int i, HSSFCellStyle style2) {
		// 生成并设置另一个样式
		if (i % 2 == 1) {
			style2.setFillForegroundColor(HSSFColor.LIGHT_YELLOW.index);
		} else {
			style2.setFillForegroundColor(HSSFColor.LIGHT_GREEN.index);
		}
		style2.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
		style2.setBorderBottom(HSSFCellStyle.BORDER_THIN);
		style2.setBorderLeft(HSSFCellStyle.BORDER_THIN);
		style2.setBorderRight(HSSFCellStyle.BORDER_THIN);
		style2.setBorderTop(HSSFCellStyle.BORDER_THIN);
		style2.setAlignment(HSSFCellStyle.ALIGN_CENTER);
		style2.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
		// 生成另一个字体
		HSSFFont font2 = workbook.createFont();
		font2.setBoldweight(HSSFFont.BOLDWEIGHT_NORMAL);
		// 把字体应用到当前的样式
		style2.setFont(font2);
	}
}
