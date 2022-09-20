package com.teamtop.netty.util.test;

import java.io.File;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.beanutils.BeanUtils;

import com.teamtop.util.communication.io.protocol.ProtocolAssist;

public class XXBuildMain {
	private static int classnum = 0;
	private static int methodGenNum = 0;
	public static void main(String[] args) {
		testBuild();
	}
	public static void testBuild(){
		for(int i=1;i<=3;i++){
			File file = new File("F:\\workspace\\YT2\\src\\com\\teamtop\\system");
			doBuild(file);
			System.err.println("classnum:"+classnum);
			System.err.println("contructGenNum:"+classnum);
			System.err.println("methodGenNum:"+(methodGenNum*2));
			classnum = 0;
			methodGenNum = 0;
		}
		System.err.println();
	}
	public static void doBuild(File file){
		try {
			File[] listFiles = file.listFiles();
			for(File f:listFiles){
				if(f.isDirectory()){
					if(f.getName().indexOf("protocol")>=0){
						System.err.println("dir:"+f.getAbsolutePath());
					}
					doBuild(f);
				}else{
					String name = f.getName();
					if(name.indexOf("Req")>=0){
						classnum++;
						name = name.substring(0, name.indexOf(".java"));
						String path = f.getPath();
						path = path.substring(path.indexOf("src")+4,path.indexOf(".java"));
						path = path.replace("\\", ".");
						System.err.println(path);
						Object build = build(Class.forName(path));
						use(build);
					}
				}
			}
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
	}
	public static <T> T build(Class<T> protocolClass){
		T dest = null;
		try {
			dest = protocolClass.newInstance();
		} catch (Exception e) {
			e.printStackTrace();
		}
		String[] fieldNames = ((ProtocolAssist)dest).sortFieldsName();
		Map<String,Object> properties = new HashMap<String,Object>();
		
		try{
			if(fieldNames != null && fieldNames.length > 0){
				Field[] fields = protocolClass.getDeclaredFields();
				if(fields != null && fields.length > 0){
					Map<String,Field> fieldsMap = new HashMap<String,Field>();
					for(Field field : fields){
						fieldsMap.put(field.getName(), field);
					}
					
					for(String fieldName : fieldNames){
						Field field = fieldsMap.get(fieldName);
						String fieldTypeName = field.getType().getName();
						if(fieldTypeName.equalsIgnoreCase("byte") || fieldTypeName.equalsIgnoreCase("java.lang.Byte")){
							properties.put(fieldName, 0);
						}else if(fieldTypeName.equalsIgnoreCase("short") || fieldTypeName.equalsIgnoreCase("java.lang.Short")){
							properties.put(fieldName, 0);
						}else if(fieldTypeName.equalsIgnoreCase("int") || fieldTypeName.equalsIgnoreCase("java.lang.Integer")){
							properties.put(fieldName, 0);
						}else if(fieldTypeName.equalsIgnoreCase("long") || fieldTypeName.equalsIgnoreCase("java.lang.Long")){
							properties.put(fieldName, 0);
						}else if(fieldTypeName.equalsIgnoreCase("float") || fieldTypeName.equalsIgnoreCase("java.lang.Float")){
							properties.put(fieldName, 1.0f);
						}else if(fieldTypeName.equalsIgnoreCase("double") || fieldTypeName.equalsIgnoreCase("java.lang.Double")){
							properties.put(fieldName, 1.0);
						}else if(fieldTypeName.equalsIgnoreCase("java.lang.String")){
							properties.put(fieldName, "abc");
						}else if(fieldTypeName.startsWith("[") && fieldTypeName.contains("java.lang.Object")){
							properties.put(fieldName, new Object[]{});
						}
					}
				}
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		try {
			BeanUtils.populate(dest, properties);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return dest;
	}
	
	public static void use(Object obj) {
		try {
			Class<? extends Object> protocolClass = obj.getClass();
			Field[] fields = protocolClass.getDeclaredFields();
			if(fields != null && fields.length > 0){
				for(Field field : fields){
					Method method = null;
					if (obj.getClass().isAssignableFrom(boolean.class)) {
						// boolean
						method = obj.getClass().getMethod("is" + toUpperCaseFirstOne(field.getName()));
					} else {
						method = obj.getClass().getMethod("get" + toUpperCaseFirstOne(field.getName()));
					}
					Object invoke = method.invoke(obj);
					methodGenNum++;
//					System.err.println(invoke);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	private static String toUpperCaseFirstOne(String s) {
		if (Character.isUpperCase(s.charAt(0)))
			return s;
		else
			return (new StringBuilder())
					.append(Character.toUpperCase(s.charAt(0)))
					.append(s.substring(1)).toString();
	}
}
