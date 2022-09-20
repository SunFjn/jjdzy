package com.teamtop.netty.util.test;

import java.io.File;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

import com.teamtop.main.RunServerException;
import com.teamtop.util.common.CommonUtil;

public class XXSave {
	private static int classnum = 0;
	private static int methodGenNum = 0;
	public static void main(String[] args) {
		save();
	}
	public static void save() {
		for (int i = 1; i <= 3; i++) {
			File file = new File("F:\\workspace\\YT2\\src\\orm");
			checkProperties(file);
			System.err.println("contructGenNum:" + classnum);
			System.err.println("methodGenNum:" + methodGenNum );
			classnum = 0;
			methodGenNum = 0;
		}
		System.err.println();
	}

	private static void checkProperties(File file) {
		try {
			if (file.isDirectory()) {
				File[] listFiles = file.listFiles();
				for (File lf : listFiles) {
					if (file.getName().indexOf(".xml") < 0)
						checkProperties(lf);
				}
			} else {
				SAXReader saxReader = new SAXReader();
				Document doc = saxReader.read(file);
				Element root = doc.getRootElement();
				String tbname = null;
				for (Iterator<?> it = root.elementIterator("tb"); it.hasNext();) {
					Element tb = (Element) it.next();
					String model = tb.attributeValue("model");
					tbname = tb.attributeValue("tbname");
					if (CommonUtil.isNull(tbname) || CommonUtil.isNull(model)) {
						throw new RunServerException(null, "tbname or model is null,tbname:" + tbname + ",model:" + model);
					}
					Class<?> clazz = Class.forName(model);
					classnum++;
					List<String> fields = new ArrayList<String>();
					System.err.println("model:"+model);
					// 字段
					for (Iterator<?> colIt = tb.elementIterator("col"); colIt.hasNext();) {
						Element col = (Element) colIt.next();
						String field = col.attributeValue("field");
						fields.add(field);
					}
					Object build = build(clazz, fields);
					use(build, fields);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static <T> T build(Class<T> protocolClass, List<String> fieldList) {
		T dest = null;
		try {
			dest = protocolClass.newInstance();
		} catch (Exception e) {
			e.printStackTrace();
		}
		try {
			if (fieldList != null && fieldList.size() > 0) {
				for (String fieldName : fieldList) {
					Object value = null;
					Field field = protocolClass.getDeclaredField(fieldName);
					String fieldTypeName = field.getType().getName();
					if (fieldTypeName.equalsIgnoreCase("byte") || fieldTypeName.equalsIgnoreCase("java.lang.Byte")) {
						value =  0;
					} else if (fieldTypeName.equalsIgnoreCase("short") || fieldTypeName.equalsIgnoreCase("java.lang.Short")) {
						value =  0;
					} else if (fieldTypeName.equalsIgnoreCase("int") || fieldTypeName.equalsIgnoreCase("java.lang.Integer")) {
						value =  0;
					} else if (fieldTypeName.equalsIgnoreCase("long") || fieldTypeName.equalsIgnoreCase("java.lang.Long")) {
						value =  0;
					} else if (fieldTypeName.equalsIgnoreCase("float") || fieldTypeName.equalsIgnoreCase("java.lang.Float")) {
						value =  1.0f;
					} else if (fieldTypeName.equalsIgnoreCase("double") || fieldTypeName.equalsIgnoreCase("java.lang.Double")) {
						value =  1.0;
					} else if (fieldTypeName.equalsIgnoreCase("java.lang.String")) {
						value =  "abc";
					}else {
						value =  null;
					}
					Method method = protocolClass.getMethod(
							"set" + toUpperCaseFirstOne(field.getName()), field.getType());
					method.invoke(dest, value);
					methodGenNum++;
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return dest;
	}

	public static void use(Object obj, List<String> fieldList) {
		try {
			Class<? extends Object> protocolClass = obj.getClass();
			if (fieldList != null && fieldList.size() > 0) {
				for (String fieldName : fieldList) {
					Field field = protocolClass.getDeclaredField(fieldName);
					Method method = null;
					if (obj.getClass().isAssignableFrom(boolean.class)) {
						// boolean
						method = obj.getClass().getMethod("is" + toUpperCaseFirstOne(field.getName()));
					} else {
						method = obj.getClass().getMethod("get" + toUpperCaseFirstOne(field.getName()));
					}
					Object invoke = method.invoke(obj);
					methodGenNum++;
					// System.err.println(invoke);
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
			return (new StringBuilder()).append(Character.toUpperCase(s.charAt(0))).append(s.substring(1)).toString();
	}
}
