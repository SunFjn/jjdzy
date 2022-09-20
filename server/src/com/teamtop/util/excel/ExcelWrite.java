package com.teamtop.util.excel;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectOutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

public class ExcelWrite {
	private static Map<String,String> typeTransMap = new HashMap<String,String>();
	private static List<String> baseTypeList = new ArrayList<>();
	private static Map<String,Class<?>> typeClass = new HashMap<String,Class<?>>();
	private static String structName = "Struct_";
	private static String configName = "Config_";
	private static String newLine = "\r\n";
	private static String tab = "    ";
	private static String newLineTab = newLine+tab;
	private static String fileBasePath = "G:\\代码\\workspace2\\yt2\\src\\";
	private static String packagePath = "com.teamtop.util.excel.auto";
	
	static{
		typeTransMap.put("INT", "int");
		typeTransMap.put("STRING", "String");
		typeTransMap.put("SHORT", "short");
		typeTransMap.put("BYTE", "byte");
		typeTransMap.put("LONG", "long");
		
		baseTypeList.add("int");
		baseTypeList.add("String");
		baseTypeList.add("short");
		baseTypeList.add("byte");
		baseTypeList.add("long");
		
		typeClass.put("Integer[]", new Integer[1].getClass());
	}
	
	private static boolean isBaseType(String ori){
		return baseTypeList.contains(ori);
	}
	
	/*private static String getConstructType(String ori){
		String real = typeTransMap.get(ori);
		if(real==null){
			return "String";
		}
		return real;
	}*/
	
	public static void transTypeArr(String[] typeArr){
		int i = 0;
		for(String type:typeArr){
			Iterator<String> it = typeTransMap.keySet().iterator();
			while(it.hasNext()){
				String next = it.next();
				if(type.indexOf(next)>=0){
					typeArr[i] = type.replaceFirst(next, typeTransMap.get(next));
					break;
				}
			}
			i++;
		}
	}
	public static void writeStructClass(String fileName,String excelName,String[] typeArr,String[] fieldArr,String[] commonArr) {
		StringBuilder sb = new StringBuilder();
		sb.append("package ").append(packagePath).append(";");
		sb.append(newLine);
		sb.append("/**");
		sb.append(newLine);
		sb.append(" * ").append(fileName);
		sb.append(newLine);
		sb.append(" */");
		sb.append(newLine);
		sb.append("public class ").append(structName).append(excelName).append(" {");
		
		for(int j=1;j<fieldArr.length;j++){
			//field
			
			sb.append(newLineTab);
			sb.append("/**").append(commonArr[j]).append("*/");
			sb.append(newLineTab);
			sb.append("private ").append(typeArr[j]).append(" ").append(fieldArr[j]).append(";");
//			sb.append("//").append(commonArr[j]);
		}
		
		for(int j=1;j<fieldArr.length;j++){
			//getter
			sb.append(newLineTab);
			sb.append("/**");
			sb.append(newLineTab);
			sb.append(" * ").append(commonArr[j]);
			sb.append(newLineTab);
			sb.append(" */");
			sb.append(newLineTab);
			sb.append("public ").append(typeArr[j]).append(" get").append(toUpperCaseFirstOne(fieldArr[j])).append("() {");
			sb.append(newLineTab);
			sb.append(tab);
			sb.append("return ").append(fieldArr[j]).append(";");
			sb.append(newLineTab);
			sb.append("}");
		}
		/*for(int j=1;j<fieldArr.length;j++){
			//setter
			sb.append(newLineTab);
			sb.append("public void set").append(toUpperCaseFirstOne(fieldArr[j])).append("(").append(typeTransMap.get(typeArr[j])).append(" ").append(fieldArr[j]).append("){");
			sb.append(newLineTab);
			sb.append(tab);
			sb.append("this.").append(fieldArr[j]).append(" = ").append(fieldArr[j]).append(";");
			sb.append(newLineTab);
			sb.append("}");
		}*/
		
		//constructor
		sb.append(newLineTab);
		sb.append("public ").append(structName).append(excelName).append("(");
		for(int j=1;j<fieldArr.length;j++){
			//int id, String name, int type, int level,
			String type = typeArr[j];
			if(!isBaseType(type)){
				type = "String";
			}
			sb.append(type).append(" ").append(fieldArr[j]);
			if(j<fieldArr.length-1){
				sb.append(",");
			}
		}
		sb.append(") {");
		for(int j=1;j<fieldArr.length;j++){
			sb.append(newLineTab);
			sb.append(tab);
			if(isBaseType(typeArr[j])){
				//基本类型
				//this.id = id;
				sb.append("this.").append(fieldArr[j]).append(" = ").append(fieldArr[j]).append(";");
			}else{
				//JsonUtils.toObj("[73154,73156,73149,73144,73145,73167,73148,73152,73146,73136,73223,73190]", Integer[].class);
				sb.append("this.").append(fieldArr[j]).append(" = ExcelJsonUtils.toObj(").append(fieldArr[j]).append(",").append(typeArr[j]).append(".class").append(");");
				
			}
		}
		sb.append(newLineTab);
		sb.append("}");
		sb.append(newLine);
		sb.append("}");
		
		String filePath = fileBasePath + packagePath.replaceAll("\\.", "\\\\") + "\\" + structName + excelName + ".java";
		write(filePath, sb.toString());
//		System.err.println(sb.toString());
		
	}
	
	public static void writeConfigClass(String excelName,String[] typeArr,HashMap<String,Object[]> dataMap){
		StringBuilder sb = new StringBuilder();
		sb.append("package ").append(packagePath).append(";");
		sb.append(newLine);
		sb.append("import ").append(packagePath.substring(0, packagePath.indexOf("auto"))).append("ConfigBase;");
		sb.append(newLine);
		// extends ConfigBase<Struct_map>
		sb.append("public class ").append(configName).append(excelName).append(" extends ConfigBase<").append(structName).append(excelName).append(">").append(" {");
		sb.append(newLineTab);
		sb.append("private static ").append(configName).append(excelName).append(" ins = null;");
		sb.append(newLineTab);
		sb.append("public static ").append(configName).append(excelName).append(" getIns(){");
		sb.append(newLineTab);
		sb.append(tab);
		sb.append("if(ins==null){");
		sb.append(newLineTab);
		sb.append(tab);
		sb.append(tab);
		sb.append("ins = new ").append(configName).append(excelName).append("();");
		sb.append(newLineTab);
		sb.append(tab);
		sb.append("}");
		sb.append(newLineTab);
		sb.append(tab);
		sb.append("return ins;");
		sb.append(newLineTab);
		sb.append("}");
		sb.append(newLineTab);
		Iterator<Entry<String, Object[]>> it = dataMap.entrySet().iterator();
		int size = dataMap.size();
		if(size < 500) {
			sb.append("public ").append(configName).append(excelName).append("(){");
			while(it.hasNext()){
				sb.append(newLineTab);
				sb.append(tab);
				Entry<String, Object[]> next = it.next();
				//this.dataMap.put(1,new Struct_map(1,2,3));
				sb.append("dataMap.put(").append(next.getKey()).append(",new ").append(structName).append(excelName).append("(");
				Object[] value = next.getValue();
				for(int j=1;j<value.length;j++){
//					String constructType = getConstructType(typeArr[j]);
//					String type = getType(typeArr[j]);
					String type = typeArr[j];
					if("String".equals(type) || !isBaseType(type)){
						sb.append("\"");
						sb.append(value[j]);
						sb.append("\"");
					}else{
						sb.append(value[j]);
					}
					if(j<value.length-1){
						sb.append(",");
					}
				}
				sb.append("));");
			}
			sb.append(newLineTab);
			sb.append("}");
		}else {
			int methodNum = size % 500 == 0 ?size /500: size / 500 + 1;
			sb.append("public ").append(configName).append(excelName).append("(){");
			for(int i = 0; i < methodNum; i ++) {
				sb.append(newLineTab);
				sb.append(tab);
				sb.append("setData").append(i + 1).append("();");
			}
			sb.append(newLineTab);
			sb.append("}");
			sb.append(newLineTab);
			for(int i = 0; i < methodNum; i ++) {
				int rowNum = 0;
				sb.append(newLineTab);
				sb.append("private void setData").append(i + 1).append("(){");
				while(it.hasNext()){
					sb.append(newLineTab);
					sb.append(tab);
					Entry<String, Object[]> next = it.next();
					//this.dataMap.put(1,new Struct_map(1,2,3));
					sb.append("dataMap.put(").append(next.getKey()).append(",new ").append(structName).append(excelName).append("(");
					
					Object[] value = next.getValue();
					for(int j=1;j<value.length;j++){
//						String constructType = getConstructType(typeArr[j]);
//						String type = getType(typeArr[j]);
						String type = typeArr[j];
						if("String".equals(type)){
							sb.append("\"");
							sb.append(value[j]);
							sb.append("\"");
						}else if(!isBaseType(type)){
							sb.append("\"");
							if(type.indexOf("[][]")>0){
								if(!"0".equals(value[j])){
									String v = (String) value[j];
									v = v.replaceAll("\\]\\[", "\\],\\[");
									sb.append("[").append(v).append("]");
								}else{
									sb.append(value[j]);
								}
							}else{
								sb.append(value[j]);
							}
							sb.append("\"");
						}else{
							sb.append(value[j]);
						}
						if(j<value.length-1){
							sb.append(",");
						}
					}
					sb.append("));");
					rowNum ++;
					if(rowNum % 500 == 0) break;
				}
				sb.append(newLineTab);
				sb.append("}");
			}
		}
		
		//reset
		sb.append(newLineTab);
		sb.append("public void reset(){");
		sb.append(newLineTab);
		sb.append(tab);
		sb.append("ins = null;");
		sb.append(newLineTab);
		sb.append("}");
		sb.append(newLine);
		sb.append("}");
		
		String filePath = fileBasePath + packagePath.replaceAll("\\.", "\\\\") + "\\" + configName + excelName + ".java";
//		String dataPath = fileBasePath + packagePath.replaceAll("\\.", "\\\\") + "\\" + configName + excelName + ".data";
		write(filePath, sb.toString());
//		System.err.println(sb.toString());
//		writeBytes(dataPath, dataMap);
	}
	public static void write(String path,String classStr) {
		File file = new File(path);
		if(!file.exists()){
			try {
				file.createNewFile();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		try {
			FileOutputStream out = new FileOutputStream(file);
			//int i = 0;
			byte [] b = classStr.getBytes("utf-8");
			out.write(b);
			out.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	@SuppressWarnings("unused")
	private static void writeBytes(String path,Object obj){
		try {
			ObjectOutputStream outputStr = new ObjectOutputStream(new FileOutputStream(path));
			outputStr.writeObject(obj);
			outputStr.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 首字母转大写 若原来已经是首字母大写则直接返回原字符串
	 * 
	 * @param s
	 *            字符串
	 * @return 转换后的首字母大写字符串
	 */
	private static String toUpperCaseFirstOne(String s) {
		if (Character.isUpperCase(s.charAt(0)))
			return s;
		else
			return (new StringBuilder()).append(Character.toUpperCase(s.charAt(0))).append(s.substring(1)).toString();
	}
}
