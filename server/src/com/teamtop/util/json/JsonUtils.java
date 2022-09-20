/**
 * Copyright (c) 2012 teamTopGame
 * All rights reserved.
 */
package com.teamtop.util.json;

import java.io.File;
import java.io.IOException;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.TreeMap;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import jxl.Workbook;
import jxl.write.Label;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;
import jxl.write.WriteException;
import jxl.write.biff.RowsExceededException;

import org.apache.commons.lang3.StringUtils;
import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.JsonParser.Feature;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.type.TypeFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.util.file.FileUtils;

/**
 * Json序列化
 * 
 * @author yxh
 * @since 1.0
 */
public abstract class JsonUtils {
	
	
	public static void manhuangji() throws Exception {
		// 蛮荒记
		String path = "E:\\teamtop\\H5\\fight.txt";
		Object map = jsonEecodeObj2File(path, Object.class);
		System.err.println();
		
		char d = '"';
		StringBuffer sb = new StringBuffer();
		sb.append("{\"1\":2}");
//		sb.append(d).append(1).append(d).append(":").append(2);
		String string = sb.toString();
		System.err.println(string);
		
		
		
		/*map.size();
		Iterator<Entry<Object, Object>> it = map.entrySet().iterator();
		while (it.hasNext()) {
			Entry<Object, Object> next = it.next();
			// 表名
			Object name = next.getKey();
			String excel = path + "config" + "\\" + name + ".xls";
			FileUtils.createFile(excel);
			File file = new File(excel);
			Map<Object, Object> data = (Map<Object, Object>) next.getValue();
			WritableWorkbook workbook = Workbook.createWorkbook(file);
			WritableSheet sheet = workbook.createSheet("sheet1", 0);
			Label label;
			Iterator<Entry<Object, Object>> datait = data.entrySet().iterator();
			int row = 2;
			int rownum = 0;
			List<String> firstrow = new ArrayList<String>();
			String[] firstrowstr = null;
			// 表名
			label = new Label(0, 0, name.toString());
			sheet.addCell(label); // 将单元格加到页
			// id
			label = new Label(0, 1, "id");
			sheet.addCell(label); // 将单元格加到页
			// if (datait.hasNext()) {
			// Object key = datait.next().getKey();
			// try {
			// int k = Integer.parseInt(key.toString());
			// Map<Object, Object> sortdata = new TreeMap<Object, Object>();
			// datait = data.entrySet().iterator();
			// while (datait.hasNext()) {
			// Entry<Object, Object> next2 = datait.next();
			// int kk = Integer.parseInt(next2.getKey().toString());
			// sortdata.put(kk, next2.getValue());
			// }
			// datait = sortdata.entrySet().iterator();
			// } catch (Exception e) {
			// }
			// }

			while (datait.hasNext()) {
				int len1 = 1;
				
				 * Entry<Object, Object> next2 = datait.next(); // 行数，可能没有
				 * Object key = next2.getKey(); // try { // rownum =
				 * Integer.parseInt(numStr.toString()); // } catch (Exception e)
				 * { // System.err.println(); // } // 真实的数据，可能是数组 Object
				 * realdata = next2.getValue(); if (realdata instanceof Map) {
				 * Map<Object, Object> md = (Map<Object, Object>) realdata;
				 * Map<Object, Object> sortdata = new TreeMap<Object, Object>();
				 * sortdata.putAll(md); Iterator<Entry<Object, Object>> mdit =
				 * sortdata.entrySet().iterator(); while (mdit.hasNext()) {
				 
				boolean lenplus = true;
				Entry<Object, Object> next3 = datait.next();
				String key = (String) next3.getKey();
				Object value = next3.getValue();
				if ("t".equals(key)) {
					if (!"json".equals(value.toString())) {
						System.err.println("not json:" + value);
					}
				} else if ("d".equals(key)) {
					if (value instanceof Map) {
						Map<String, Object> map2 = (Map<String, Object>) value;
						Map<Object, Object> smap2 = new TreeMap<Object, Object>();
						smap2.putAll(map2);
						Iterator<Entry<Object, Object>> smap2it = smap2.entrySet().iterator();
						while (smap2it.hasNext()) {
							Entry<Object, Object> next4 = smap2it.next();
							Object id = next4.getKey();
							Object v4 = next4.getValue();
							if (v4 instanceof Map) {

								Map<String, Object> map5 = (Map<String, Object>) v4;
								Map<Object, Object> smap5 = new TreeMap<Object, Object>();
								smap5.putAll(map5);
								Iterator<Entry<Object, Object>> smap5it = smap5.entrySet().iterator();
								while (smap5it.hasNext()) {
									Entry<Object, Object> next5 = smap5it.next();
									String k5 = next5.getKey().toString();
									Object v5 = next5.getValue();
									if (firstrowstr == null) {
										if (firstrow.size() < map5.size()) {
											firstrow.add(k5);
										}
										if (firstrow.size() == map5.size()) {
											firstrowstr = new String[firstrow.size()];
											firstrow.toArray(firstrowstr);
										}
									} else {
										int offset = firstrow.indexOf(k5) - (len1 - 1);
										if (offset != 0) {
											lenplus = false;
											label = new Label(len1 + offset, row, v5.toString());
											len1++;
										}
									}
									if (lenplus) {
										label = new Label(len1++, row, v5.toString());
									}
									sheet.addCell(label); // 将单元格加到页
								}
								label = new Label(0, row, id + "");
								sheet.addCell(label); // 将单元格加到页
								row++;
							} else {
								System.err.println("v4 is not map:" + v4);
							}
						}
					} else {
						System.err.println("value is not map:" + value);
					}
				} else {
					System.err.println("not t or d");
				}
			}
			

			if (firstrowstr != null) {
				// key的字符串
				int i = 1;
				for (String str : firstrowstr) {
					label = new Label(i++, 1, str);
					sheet.addCell(label); // 将单元格加到页
				}
			}
			workbook.write(); // 加入到文件中
			workbook.close(); // 关闭文件，释放资源
		}*/
	}

	@SuppressWarnings("unchecked")
	public static void te() throws Exception {
		StringBuilder sb = new StringBuilder();
		String path = "E:\\teamtop\\H5\\五道至尊\\";
		Map<Object, Object> map = jsonEecodeObj2File("E:\\teamtop\\H5\\五道至尊\\config.json", Map.class);
		// Map<Object,Object> map =
		// jsonEecodeObj2File(path+"SkirmishBaseConfig.json", Map.class);
		// Map<Object,Object> map = jsonEecodeObj2File(path+"ScenesConfig.json",
		// Map.class);
		// Map<Object,Object> map = jsonEecodeObj2File(path+"ExpConfig.json",
		// Map.class);
		// Map<Object,Object> map =
		// jsonEecodeObj2File(path+"ActivityType1Config.json", Map.class);
		// Map<Object,Object> map =
		// jsonEecodeObj2File(path+"SkillsBreakUpgradeConfig.json", Map.class);
		map.size();
		Iterator<Entry<Object, Object>> it = map.entrySet().iterator();
		while (it.hasNext()) {
			Entry<Object, Object> next = it.next();
			// 表名
			Object name = next.getKey();
			String excel = path + "config" + "\\" + name + ".xls";
			FileUtils.createFile(excel);
			File file = new File(excel);
			Map<Object, Object> data = (Map<Object, Object>) next.getValue();
			WritableWorkbook workbook = Workbook.createWorkbook(file);
			WritableSheet sheet = workbook.createSheet("sheet1", 0);
			Label label;
			Iterator<Entry<Object, Object>> datait = data.entrySet().iterator();
			int row = 2;
			int rownum = 0;
			List<String> firstrow = new ArrayList<String>();
			String[] firstrowstr = null;
			// 表名
			label = new Label(0, 0, name.toString());
			sheet.addCell(label); // 将单元格加到页
			// id
			label = new Label(0, 1, "id");
			sheet.addCell(label); // 将单元格加到页
			if (datait.hasNext()) {
				Object key = datait.next().getKey();
				try {
					int k = Integer.parseInt(key.toString());
					Map<Object, Object> sortdata = new TreeMap<Object, Object>();
					datait = data.entrySet().iterator();
					while (datait.hasNext()) {
						Entry<Object, Object> next2 = datait.next();
						int kk = Integer.parseInt(next2.getKey().toString());
						sortdata.put(kk, next2.getValue());
					}
					datait = sortdata.entrySet().iterator();
				} catch (Exception e) {
				}
			}

			while (datait.hasNext()) {
				int len1 = 1;
				Entry<Object, Object> next2 = datait.next();
				// 行数，可能没有
				Object numStr = next2.getKey();
				try {
					rownum = Integer.parseInt(numStr.toString());
				} catch (Exception e) {
					// 不是行数，默认加上
					rownum++;
					// 第一行加上key
					label = new Label(1, 1, "key");
					sheet.addCell(label); // 将单元格加到页
					// 第一行加上value
					label = new Label(2, 1, "value");
					sheet.addCell(label); // 将单元格加到页
					// 加上真正的key的字符串
					label = new Label(1, row, numStr + "");
					sheet.addCell(label); // 将单元格加到页
				}
				// 真实的数据，可能是数组
				Object realdata = next2.getValue();
				if (realdata instanceof Map) {
					Map<Object, Object> md = (Map<Object, Object>) realdata;
					Map<Object, Object> sortdata = new TreeMap<Object, Object>();
					sortdata.putAll(md);
					Iterator<Entry<Object, Object>> mdit = sortdata.entrySet().iterator();
					while (mdit.hasNext()) {
						boolean lenplus = true;
						Entry<Object, Object> next3 = mdit.next();
						String key = (String) next3.getKey();
						Object value = next3.getValue();
						if (firstrowstr == null) {
							if (firstrow.size() < md.size()) {
								firstrow.add(key);
							}
							if (firstrow.size() == md.size()) {
								firstrowstr = new String[firstrow.size()];
								firstrow.toArray(firstrowstr);
							}
						} else {
							int offset = firstrow.indexOf(key) - (len1 - 1);
							if (offset != 0) {
								lenplus = false;
								label = new Label(len1 + offset, row, value.toString());
								len1++;
							}
						}
						if (lenplus) {
							label = new Label(len1++, row, value.toString());
						}
						sheet.addCell(label); // 将单元格加到页
					}
					label = new Label(0, row, rownum + "");
					sheet.addCell(label); // 将单元格加到页
					row++;
				} else if (realdata instanceof List) {
					// 数组 只做2层
					List<Object> list = (List<Object>) realdata;
					int len = list.size();
					for (int i = 0; i < len; i++) {
						Object object = list.get(i);
						if (object instanceof List) {
							List<Object> sublist = (List<Object>) object;
							int sublen = sublist.size();
							for (int j = 0; j < sublen; j++) {
								boolean lenplus = true;
								Object object2 = sublist.get(j);
								if (object2 instanceof Map) {
									Map<Object, Object> submap = (Map<Object, Object>) object2;
									Map<Object, Object> sortdata = new TreeMap<Object, Object>();
									sortdata.putAll(submap);
									Iterator<Entry<Object, Object>> mdit = sortdata.entrySet().iterator();
									while (mdit.hasNext()) {
										Entry<Object, Object> next3 = mdit.next();
										String key = (String) next3.getKey();
										Object value = next3.getValue();
										if (firstrowstr == null) {
											if (firstrow.size() < submap.size()) {
												firstrow.add(key);
											}
											if (firstrow.size() == submap.size()) {
												firstrowstr = new String[firstrow.size()];
												firstrow.toArray(firstrowstr);
											}
										} else {
											int offset = firstrow.indexOf(key) - (len1 - 1);
											if (offset != 0) {
												lenplus = false;
												label = new Label(len1 + offset, row, value.toString());
												len1++;
											}
										}
										if (lenplus) {
											label = new Label(len1++, row, value.toString());
										}
										sheet.addCell(label); // 将单元格加到页
									}
									label = new Label(0, row, (rownum * 100 + i * 10 + j) + "");
									sheet.addCell(label); // 将单元格加到页
									row++;
								} else {
									System.err.println("not match " + name);
								}

							}
						} else if (object instanceof Map) {
							boolean lenplus = true;
							Map<Object, Object> lmap = (Map<Object, Object>) object;
							Map<Object, Object> sortdata = new TreeMap<Object, Object>();
							sortdata.putAll(lmap);
							Iterator<Entry<Object, Object>> mdit = sortdata.entrySet().iterator();
							while (mdit.hasNext()) {
								Entry<Object, Object> next3 = mdit.next();
								String key = (String) next3.getKey();
								Object value = next3.getValue();
								if (firstrowstr == null) {
									if (firstrow.size() < lmap.size()) {
										firstrow.add(key);
									}
									if (firstrow.size() == lmap.size()) {
										firstrowstr = new String[firstrow.size()];
										firstrow.toArray(firstrowstr);
									}
								} else {
									int offset = firstrow.indexOf(key) - (len1 - 1);
									if (offset != 0) {
										lenplus = false;
										label = new Label(len1 + offset, row, value.toString());
										len1++;
									}
								}
								if (lenplus) {
									label = new Label(len1++, row, value.toString());
								}
								sheet.addCell(label); // 将单元格加到页
							}
							label = new Label(0, row, (rownum * 10 + i) + "");
							sheet.addCell(label); // 将单元格加到页
							row++;
						}
					}

					/*
					 * System.err.println("-----"+name+"-----");
					 * System.err.println(data); sb.append("\r\n");
					 * sb.append(name).append("\r\n");
					 * sb.append(data).append("\r\n"); break;
					 */
				} else {
					// 基本数据
					label = new Label(len1++, row, realdata.toString());
					sheet.addCell(label); // 将单元格加到页
					label = new Label(0, row, rownum + "");
					sheet.addCell(label); // 将单元格加到页
					row++;
				}

			}
			if (firstrowstr != null) {
				// key的字符串
				int i = 1;
				for (String str : firstrowstr) {
					label = new Label(i++, 1, str);
					sheet.addCell(label); // 将单元格加到页
				}
			}
			workbook.write(); // 加入到文件中
			workbook.close(); // 关闭文件，释放资源
			// FileUtils.writeData("E:\\teamtop\\H5\\决战沙城\\config2.txt",
			// sb.toString());
		}

	}

	public static void main(String[] args) throws Exception {
		/*
		 * File file = new File("c:\\json.xlsx"); file.createNewFile();
		 * WritableWorkbook workbook = Workbook.createWorkbook(file);
		 * WritableSheet sheet = workbook.createSheet("sheet1", 0); Label label
		 * = new Label(2, 0, "abc"); sheet.addCell(label); workbook.write(); //
		 * 加入到文件中 workbook.close(); // 关闭文件，释放资源
		 */
		// te();
		manhuangji();
//		readB();
	}
	public static void readB(){
		String name = "1";
		byte[] bytes = name.getBytes();
		System.err.println(bytes);
	}

	private final static Logger logger = LoggerFactory.getLogger(JsonUtils.class);

	/**
	 * 私有构造函数，防止实例化
	 */
	private JsonUtils() {
	}

	/**
	 * ObjectMapper实例
	 */
	private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();

	/**
	 * 静态块，可初始化ObjectMapper
	 */
	static {
		configure(Feature.ALLOW_SINGLE_QUOTES, true);
		configure(Feature.ALLOW_UNQUOTED_FIELD_NAMES, true);
		configure(Feature.ALLOW_UNQUOTED_CONTROL_CHARS, false);
	}

	/**
	 * 配置ObjectMapper
	 * 
	 * @param f
	 *            特性
	 * @param state
	 *            特性值
	 */
	public static void configure(Feature f, boolean state) {
		OBJECT_MAPPER.configure(f, state);
	}

	/**
	 * 将一个对象序列化成JSON字符串
	 * 
	 * @param objectSource
	 * @return
	 * @throws IOException
	 */
	public static String toStr(Object objectSource) {
		try {
			if (objectSource == null)
				return null;
			return OBJECT_MAPPER.writeValueAsString(objectSource);
		} catch (Exception e) {
			logger.error("jsonEncode error json is:" + objectSource, e);
		}
		return null;
	}

	/**
	 * 将JSON字符串封装成指定对象
	 * 
	 * @param objectSource
	 *            JSON字符串
	 * @param clazz
	 *            指定的类型
	 * @return 返回指定类型的实例
	 * @throws IOException
	 *             IO操作异常
	 */
	public static <T> T toObj(String objectSource, Class<T> clazz) {
		try {
			if (StringUtils.isBlank(objectSource))
				return null;
			return OBJECT_MAPPER.readValue(objectSource, clazz);
		} catch (Exception e) {
			logger.error("jsonDecode error {}", e);
		}
		return null;
	}

	/**
	 * 字符串转换为HashMap<K,V>
	 * 
	 * @param objectSource
	 * @param keyClass
	 * @param valueClass
	 * @return
	 * @throws JsonParseException
	 * @throws JsonMappingException
	 * @throws IOException
	 */
	public static <K, V> HashMap<K, V> toMap(String objectSource, Class<K> keyClass, Class<V> valueClass) throws JsonParseException, JsonMappingException, IOException {
		// 去除非法字符
		objectSource = getTxtWithoutNTSRElement(objectSource);
		return OBJECT_MAPPER.readValue(objectSource, TypeFactory.defaultInstance().constructMapType(HashMap.class, keyClass, valueClass));
	}

	/**
	 * 将JSON字符串封装成Map对象
	 * 
	 * @param objectSource
	 *            JSON字符串
	 * @param keyClass
	 *            Map的Key类型
	 * @param valueClass
	 *            Map的Value类型
	 * @return 返回HashMap实例
	 * @throws IOException
	 *             IO操作异常
	 */
	public static <K, V> HashMap<K, V> objectJsonMapDecode(String objectSource, Class<K> keyClass, Class<V> valueClass) {
		try {
			// 去除非法字符
			objectSource = getTxtWithoutNTSRElement(objectSource);
			return OBJECT_MAPPER.readValue(objectSource, TypeFactory.defaultInstance().constructMapType(HashMap.class, keyClass, valueClass));
		} catch (IOException e) {
			logger.error("objectJsonMapDecode error json character is : " + objectSource, e);
		}
		return null;
	}

	/**
	 * 将JSON字符串封装成ConcurrentHashMap对象
	 * 
	 * @param objectSource
	 *            JSON字符串
	 * @param keyClass
	 *            Map的Key类型
	 * @param valueClass
	 *            Map的Value类型
	 * @return 返回ConcurrentHashMap实例
	 * @throws IOException
	 *             IO操作异常
	 */
	public static <K, V> ConcurrentHashMap<K, V> objectJsonChMapDecode(String objectSource, Class<K> keyClass, Class<V> valueClass) {
		try {
			// 去除非法字符
			objectSource = getTxtWithoutNTSRElement(objectSource);
			return OBJECT_MAPPER.readValue(objectSource, TypeFactory.defaultInstance().constructMapType(ConcurrentHashMap.class, keyClass, valueClass));
		} catch (IOException e) {
			logger.error("objectJsonMapDecode error json character is : " + objectSource, e);
		}
		return null;
	}

	/**
	 * 将json内容的文件封装成ConcurrentHashMap对象 注意：如果文件不存在则会自动生成并且会返回null
	 * 
	 * @param fileName
	 *            =path+name 文件名字
	 * @param keyClass
	 *            Map的Key类型
	 * @param valueClass
	 *            Map的Value类型
	 * @return 返回ConcurrentHashMap实例
	 */
	public static <K, V> ConcurrentHashMap<K, V> fileChMapDecode(String fileName, Class<K> keyClass, Class<V> valueClass) {
		try {
			File file = new File(FileUtils.getFilePath(fileName));
			if (!file.exists()) {
				file.createNewFile();
				return null;
			}
			if (file.length() == 0)
				return null;
			return OBJECT_MAPPER.readValue(file, TypeFactory.defaultInstance().constructMapType(ConcurrentHashMap.class, keyClass, valueClass));
		} catch (IOException e) {
			logger.error("objectJsonMapDecode error json character is : " + fileName, e);
		}
		return null;
	}

	/**
	 * 将JSON字符串封装成List对象
	 * 
	 * @param objectSource
	 *            JSON字符串
	 * @param clazz
	 *            List类型
	 * @return 返回ConcurrentLinkedQueue实例
	 * @throws IOException
	 *             IO操作异常
	 */
	public static <T> ConcurrentLinkedQueue<T> objectJsonCLDistDecode(String objectSource, Class<T> clazz) {
		try {
			return OBJECT_MAPPER.readValue(objectSource, TypeFactory.defaultInstance().constructCollectionType(ConcurrentLinkedQueue.class, clazz));
		} catch (Exception e) {
			logger.error("objectJsonCWListDecode error json is:" + objectSource, e);
		}
		return null;
	}

	/**
	 * 把对象已json格式存放到fileName文件中 注意：此方法会把以前的文件内容覆盖掉
	 * 
	 * @param fileName文件名
	 * @param objectSource
	 *            对象
	 */
	public static void jsonDecode2File(String fileName, Object objectSource) {
		try {
			OBJECT_MAPPER.writeValue(findFileOrCreate(fileName), objectSource);
		} catch (Exception e) {
			logger.error("fileName=" + fileName + " jsonDecode2File exception:", e);
		}
	}

	/**
	 * 从文件中获取对象 注意：如果文件不存在则会自动生成并且会返回null
	 * 
	 * @param fileName
	 * @param clazz
	 * @return T
	 */
	public static <T> T jsonEecodeObj2File(String fileName, Class<T> clazz) {
		try {
			File file = new File(FileUtils.getFilePath(fileName));
			if (!file.exists()) {
				file.createNewFile();
				return null;
			}
			if (file.length() == 0)
				return null;
			return OBJECT_MAPPER.readValue(file, clazz);
		} catch (Exception e) {
			logger.error("fileName=" + fileName + " className=" + clazz.getName() + " jsonEecodeObj2File exception:", e);
		}
		return null;
	}

	/**
	 * 去除字符串中的空格、回车、换行符、制表符和问号 注： \n 回车( ) \t 水平制表符( ) \s 空格(\u0008) \r 换行( )
	 **/
	public static String getTxtWithoutNTSRElement(String str) {
		String dest = "";
		if (str != null) {
			Pattern p = Pattern.compile("[\\s]|[\t]|[\r]|[\n]|[?]|[^\\p{ASCII}]");
			Matcher m = p.matcher(str);
			dest = m.replaceAll("");
		}
		return dest.replaceAll("\"\"", "\"");
	}

	/**
	 * 创建或者查找一个文件对象 没有找到则创建
	 * 
	 * @return
	 */
	private static File findFileOrCreate(String fileName) {
		File file = new File(FileUtils.getFilePath(fileName));
		try {
			if (!file.exists()) {
				file.createNewFile();
			}
		} catch (IOException e) {
			logger.error("fileName=" + fileName + " findFileOrCreate exception:", e);
		}
		return file;
	}

	/**
	 * 根据model类的成员变量，将其变成对应从1开始的key与该变量的值
	 * {"gangBattle":0,"yunBiaoAfternoon":0,"yunBiaoNight"
	 * :0,"gangRobbertMorning"
	 * :0,"gangRobbertAfternoon":0,"biwu":0,"wordBoss":0,"fish":0,"gangGh":0}
	 * 将会变成 {"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0}
	 * 
	 * @param instance
	 *            事例
	 * @return
	 * @throws Exception
	 */
	public static String getNumOrderJsonByClass(Object instance) throws Exception {
		Class<? extends Object> clazz = instance.getClass();
		Field[] declaredFields = clazz.getDeclaredFields();
		StringBuffer sb = new StringBuffer();
		sb.append("{");
		int length = declaredFields.length;
		for (int i = 0; i < length; i++) {
			Field field = declaredFields[i];
			field.setAccessible(true);
			sb.append("\"").append(i + 1).append("\"").append(":").append(field.get(instance));
			if (i < length - 1) {
				sb.append(",");
			}
		}
		sb.append("}");
		return sb.toString();
	}

	/**
	 * 用于处理数据库text数据格式转换
	 * 
	 * @param objectSource
	 * @param clazz
	 * @return
	 * @throws JsonParseException
	 * @throws JsonMappingException
	 * @throws IOException
	 */
	public static <T> T jsonTrans(String objectSource, Class<T> clazz) throws JsonParseException, JsonMappingException, IOException {
		if (StringUtils.isBlank(objectSource))
			return null;
		return OBJECT_MAPPER.readValue(objectSource, clazz);
	}

	/**
	 * 将JSON字符串封装成指定对象
	 * 
	 * @param objectSource
	 *            JSON字符串
	 * @param clazz
	 *            指定的类型
	 * @return 返回指定类型的实例
	 * @throws IOException
	 *             IO操作异常
	 */
	public static <T> T jsonDecode(String objectSource, Class<T> clazz) {
		try {
			if (StringUtils.isBlank(objectSource))
				return null;
			return OBJECT_MAPPER.readValue(objectSource, clazz);
		} catch (Exception e) {
			logger.error("jsonDecode error {}", e);
		}
		return null;
	}
}
