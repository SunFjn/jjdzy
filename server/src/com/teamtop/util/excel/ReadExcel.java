package com.teamtop.util.excel;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;
import java.util.zip.ZipInputStream;

import javax.xml.parsers.ParserConfigurationException;
import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;

import org.xml.sax.SAXException;

import com.teamtop.main.RunServerException;
import com.teamtop.util.excel.handler.Excel2007CacheHandler;
import com.teamtop.util.excel.handler.Excel2007ParseHandler;

public class ReadExcel {
	//实例化分析工厂
	private static SAXParserFactory factory = SAXParserFactory.newInstance();
	private static SAXParser parser;
	static {
		try {
			parser = factory.newSAXParser();
		} catch (ParserConfigurationException e) {
			e.printStackTrace();
		} catch (SAXException e) {
			e.printStackTrace();
		}
	}
	public static void main(String[] args) throws Exception {
		//new ReadExcel().excelToData();
//		new ReadExcel().excelReadUseZip("E:\\水浒文档集合\\新建文件夹\\AEC15100.xlsx","模板.xlsx");
		//new ReadExcel2007().readExcel2003(new File("E:\\水浒文档集合\\程序用表\\后端用表\\ForbidCMD.xls"));
		//Thread.sleep(10000);
		/*long now = System.currentTimeMillis();
		System.out.println("消耗时间：" + (System.currentTimeMillis() - now));*/
//		String absFilePath = FileUtils.getAbsFilePath("excel");
//		excelToData(absFilePath);
		File dir = new File("G:\\项目\\倚天2\\tencent\\策划数据表");
		File[] listFiles = dir.listFiles();
		for(File f:listFiles){
			if(f.getName().indexOf("xlsx")>=0){
				excelReadUseZip(f.getAbsolutePath(),f.getName());
			}
		}
//		Struct_map struct_map = Config_map.getIns().get(14001);
		//replace
		
		/*Struct_map struct_map = Config_map.getIns().get(14001);
		System.err.println(struct_map);
		
		String c = "com.game.base.excel.auto.Config_map";
		Class<?> clazz = Class.forName(c);
		Method method = clazz.getDeclaredMethod("getIns");
		Method reset = clazz.getDeclaredMethod("reset");
		Object obj = method.invoke(null);
		reset.invoke(obj);
		
		struct_map = Config_map.getIns().get(14001);
		System.err.println(struct_map);*/
		
		/*Config_map config_map = Config_map.getIns();
		Struct_map struct_map = config_map.get(13001);
		System.err.println(struct_map);
		
		String c = "com.game.base.excel.auto.Config_map";
		Class<?> clazz = Class.forName(c);
		Method method = clazz.getDeclaredMethod("getIns");
		Method reset = clazz.getDeclaredMethod("reset");
		Object obj = method.invoke(null);
		reset.invoke(obj);
		
//		config_map.reset();
		config_map = Config_map.getIns();
		struct_map = config_map.get(13001);
		System.err.println(struct_map);
		struct_map = config_map.get(13001);
		System.err.println(struct_map);*/
		
//		Struct_map struct_map = Config_map.getIns().get(13002);
//		struct_map.getFunID();
		
	}

	/**
	 * 读取excel表
	 * 将excel2007当做一个压缩文件读取
	 * @param fileName 文件名
	 * @param fileSimpleName 文件简单名称
	 */
	public static void excelReadUseZip(String fileName, String fileSimpleName) {
		//String fileName = "F:\\输出路径\\404附加属性数值.xlsx";
		InputStream in = null;
		ZipInputStream zin = null;
		try {
			ZipFile file = new ZipFile(fileName);
			in = new BufferedInputStream(new FileInputStream(fileName));  
	        zin = new ZipInputStream(in);  
	        ZipEntry ze;
	        ZipEntry[] zes = new ZipEntry[2];
	        while((ze = zin.getNextEntry())!=null) {
	        	if("xl/sharedStrings.xml".equals(ze.getName())){
	        		zes[0] = ze;
	        	}
	        	if("xl/worksheets/sheet1.xml".equals(ze.getName())){
	        		zes[1] = ze;
	        	}
	        }
	        readCacheXML(file, zes[0],fileSimpleName);
	        readXML(file,zes[1],fileSimpleName);
		} catch (IOException e) {
			e.printStackTrace();
		} finally{
			if(in != null){
				try {
					in.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
			if(zin != null){
				try {
					zin.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}

	/**
	 * 读取sharedString.xml，该xml文件主要保存一系列的字符串
	 * @param file ZipFile 压缩文件
	 * @param zipEntry 解压后的文件，读取在内存在
	 * @param fileName 文件名，非绝对路径
	 */
	private static void readCacheXML(ZipFile file, ZipEntry zipEntry, String fileName) {
		try {
			System.out.println(file.getName());
			//实例化handler
			Excel2007CacheHandler handler = new Excel2007CacheHandler(fileName);
			//解析
			parser.parse(file.getInputStream(zipEntry), handler);
			parser.reset();
		} catch (SAXException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}

	/**
	 * 读取sheet1.xml
	 * @param file ZipFile 压缩文件
	 * @param zipEntry 解压后的文件，读取在内存在
	 * @param fileName 文件名，非绝对路径
	 */
	private static void readXML(ZipFile file, ZipEntry ze, String fileName) {
		try {
			Excel2007ParseHandler handler = new Excel2007ParseHandler(fileName);
			//解析
			parser.parse(file.getInputStream(ze), handler);
			parser.reset();
		} catch (SAXException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 将excel数据写入文件
	 * @throws RunServerException 
	 */
	public static void excelToData(String filePath) throws RunServerException{
		if(filePath == null || "".equals(filePath)){//注意&&与||的用法
			System.out.println("读取路径为空。。。");
			return;
		}
		File file = new File(filePath);
		File[] files = file.listFiles();
		for(File f : files) {
			if(f.isDirectory()) continue;
			if(f.getName().endsWith(".xlsx")){
				excelReadUseZip(f.getAbsolutePath(),f.getName());
			}
		}
//		BaseExcelDecode.initExcelData(WorkBookCache.allDataCache);

	}

}
