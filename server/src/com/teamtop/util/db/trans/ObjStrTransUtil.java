package com.teamtop.util.db.trans;

import java.lang.reflect.Array;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;
import java.util.TreeSet;
import java.util.concurrent.ConcurrentSkipListSet;
import java.util.concurrent.ConcurrentHashMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.util.common.ConcurrentHashSet;
import com.teamtop.util.log.LogTool;

/**
 * 对象与字符串转换工具<br/>
 * 改成转换成字符串时不用key，用数组下表，并且解决类增删字段的问题 需要在model类配合标注@FieldVar使用<br/>
 * 使用这个工具的注意点：<br/>
 * 1.必须在每个字段使用标注@FieldVar来标明顺序，并且顺序不能有重复。 <br/>
 * 2.必须有getter和setter。 <br/>
 * 3.必须有空的构造方法。<br/>
 * 4.不支持Object[]，但支持明确类型的数组如:Pig[],基础类型及包装类数组int[],long[],byte[],short[],boolean
 * [],Integer[],Short[],Byte[],Long[],String[],Boolean[] <br/>
 * 5.不支持字段有父类 <br/>
 * 6.不支持map的value为Boolean<br/>
 * 7.类改字段名没有关系。<br/>
 * 
 * @author kyle
 * 
 */
public class ObjStrTransUtil {
	private final static String DOT = ",";
	private final static String QU = ":";
	private final static String LB = "{";
	private final static String RB = "}";
	private final static String IS = "is";
	private final static String GET = "get";
	private final static String SET = "set";
	private final static String ADD = "add";
	private final static String PUT = "put";
	private final static String EMPTY = "!";
	private final static String NULL = "null";

	/**
	 * 用于toStr时根据class读取field[]的map key:class,value:包装了Field和order的FieldExt
	 */
	private static Map<Class<?>, FieldExt[]> fieldConMap = new HashMap<Class<?>, FieldExt[]>();
	private static List<Class<?>> mapListArrs = new ArrayList<Class<?>>();
	static {
		explianMapListArrayTrans();
	}
	private static Logger logger = LoggerFactory.getLogger(ObjStrTransUtil.class);
	/**
	 * 对象转换成str<br/>
	 * 需要在model类配合标注@FieldVar使用
	 * 
	 * @param obj
	 *            对象
	 * @return 转换后的str
	 * @throws Exception
	 */
	public static String toStr(Object obj) throws Exception {
		final StringBuilder sb = new StringBuilder();
		if (obj == null)
			return null;
		doToStr(obj,null, sb);
		return sb.toString();
	}

	/**
	 * 字符串转换成对象</br> 需要在model类配合标注@FieldVar使用
	 * 
	 * @param data
	 *            字符串数据
	 * @param clazz
	 *            类的Class
	 * @return 转换后的对象
	 * @throws Exception
	 */
	public static <T> T toObj(String data, Class<T> clazz) throws Exception {
		TransNode node = getNode(data);
		T t = null;
		try {
			List<TransNode> children = node.getChildren();
			if(children!=null && children.size()>0){
				t = doToObj(node.getChildren().get(0), clazz, null,false);
			}
		} catch (Exception e) {
			logger.error(LogTool.exception(e));
		} finally {
			node = null;
		}
		return t;
	}
	/**
	 * 获取map list字符串对应的类型
	 * @param data
	 * @param field
	 * @return
	 * @throws Exception
	 */
	public static Object getMapListObj(String data,Field field) throws Exception{
		if(NULL.equals(data)) return null;
		Object obj = null;
		TransNode node = getNode(data);
//		try {
			Type type = field.getGenericType();
			if("root".equals(node.getName())){
				List<TransNode> children = node.getChildren();
				if(children!=null && children.size()>0){
					node = children.get(0);
				}
			}
			if(type instanceof ParameterizedType){
				obj =  doGetMapListClazzType((ParameterizedType)type,node);
			}else if(type instanceof Class<?>){
				obj = doGetValueForMapList((Class<?>)type, node.getName(), node);
			}
//		} catch (Exception e) {
//			logger.error(LogFormat.exception(e));
//		}
		node = null;
		return obj;
	}
	
	public static String toSuperClassStr(Object obj) throws Exception {
		final StringBuilder sb = new StringBuilder();
		doToStr(obj, obj.getClass().getSuperclass(), sb);
		return sb.toString();
	}
	
	public static <T> T toSuperClassObj(String data, Class<T> clazz, T obj,boolean findSupper) throws Exception {
		TransNode node = getNode(data);
		T t = null;
		try {
			List<TransNode> children = node.getChildren();
			if(children!=null && children.size()>0){
				t = doToObj(children.get(0), clazz, obj,findSupper);
			}
		} catch (Exception e) {
			logger.error(LogTool.exception(e));
		} finally {
			node = null;
		}
		return t;
	}
	/**
	 * 对象是否为map list 数组类型<br/>
	 * map支持Map、Hashmap、concurrentHashMap、TreeMap<br/>
	 * list支持List、ArrayList
	 * 
	 * @param obj
	 * @return
	 */
	public static boolean isMapListArr(Class<?> clazz) {
		if (clazz == null)
			return false;
		return mapListArrs.contains(clazz);
	}

	/**
	 * 获取FieldExt[]，如果没有，则尝试去分析此clazz
	 * 
	 * @param clazz
	 * @return FieldExt[]
	 */
	private static FieldExt[] getFieldExtArr(Class<?> clazz, boolean findSuper) {
		if (findSuper) {
			clazz = clazz.getSuperclass();
		}
		FieldExt[] fieldExts = fieldConMap.get(clazz);
		if (fieldExts == null) {
			explainFieldTrans(clazz);
			fieldExts = fieldConMap.get(clazz);
		}
		return fieldExts;
	}

	/**
	 * 解析字段obj和str相互转换需要用到的map，用于此转换工具使用时可以快速获取class的field数据
	 */
	private static void explainFieldTrans(Class<?> clazz) {
		Field[] declaredFields = clazz.getDeclaredFields();
		TreeMap<Integer, FieldExt> fieldMap = new TreeMap<Integer, FieldExt>();
		int maxOrder = 0;
		for (Field field : declaredFields) {
			FieldOrder fv = field.getAnnotation(FieldOrder.class);
			if (fv != null) {
				int order = fv.order();
				fieldMap.put(order, new FieldExt(field, fv.order()));
				if (order > maxOrder) {
					maxOrder = order;
				} else if (order == maxOrder) {
					throw new RuntimeException("clazz:" + clazz + ",order repeat,order is:" + order);
				}
			}
		}
		FieldExt[] extArr = new FieldExt[maxOrder];
		for (int i = 1; i <= maxOrder; i++) {
			FieldExt fieldExt = fieldMap.get(i);
			if (fieldExt == null) {
				fieldExt = new FieldExt(null, i);
			}
			extArr[i - 1] = fieldExt;
		}
		fieldConMap.put(clazz, extArr);
	}

	/**
	 * 加入map list 数组类型作为obj是否为这些类型的判断依据
	 */
	private static void explianMapListArrayTrans() {
		mapListArrs.add(Map.class);
		mapListArrs.add(HashMap.class);
		mapListArrs.add(TreeMap.class);
		mapListArrs.add(ConcurrentHashMap.class);
		mapListArrs.add(List.class);
		mapListArrs.add(ArrayList.class);
		mapListArrs.add(byte[].class);
		mapListArrs.add(Byte[].class);
		mapListArrs.add(short[].class);
		mapListArrs.add(Short[].class);
		mapListArrs.add(int[].class);
		mapListArrs.add(Integer[].class);
		mapListArrs.add(long[].class);
		mapListArrs.add(Long[].class);
		mapListArrs.add(boolean[].class);
		mapListArrs.add(Boolean[].class);
		mapListArrs.add(String[].class);
		mapListArrs.add(Object[].class);
		mapListArrs.add(Set.class);
		mapListArrs.add(HashSet.class);
		mapListArrs.add(ConcurrentHashSet.class);
	}

	/**
	 * 辅助字符串转换成对象使用，获取字符串对应的node节点
	 * 
	 * @param data
	 *            字符串数据
	 * @return 对应node节点
	 */
	private static TransNode getNode(String data) {
		TransNode currNode = TransNode.createNode("root");
		int length = data.length();
		StringBuilder sb = new StringBuilder();
		for (int i = 0; i < length; i++) {
			String currStr = String.valueOf(data.charAt(i));
			if (LB.equals(currStr)) {
				TransNode newNode = TransNode.createNode(currStr);
				currNode.addChild(newNode);
				currNode = newNode;
			} else if (RB.equals(currStr)) {
				if (sb.length() > 0) {
					TransNode newNode = TransNode.createNode(sb.toString());
					currNode.addChild(newNode);
					sb.setLength(0);
				}
				currNode = currNode.getParent();
			} else if (DOT.equals(currStr)) {
				if (sb.length() > 0) {
					TransNode newNode = TransNode.createNode(sb.toString());
					currNode.addChild(newNode);
					sb.setLength(0);
				}
			} else if (QU.equals(currStr)) {
				i++;
				TransNode newNode = TransNode.createNode(currStr);
				newNode.setKey(sb.toString());
				currNode.addChild(newNode);
				currNode = newNode;
				sb.setLength(0);
			} else {
				sb.append(currStr);
			}

		}
		if (sb.length() > 0) {
			TransNode newNode = TransNode.createNode(sb.toString());
			currNode.addChild(newNode);
		}
		return currNode;
	}

	/**
	 * 辅助字符串转换成对象的实现方法
	 * 
	 * @param node
	 *            字符串对应的node节点
	 * @param clazz
	 *            类的Class
	 * @return 转换后的对象
	 * @throws Exception
	 */
	private static <T> T doToObj(TransNode node, Class<T> clazz, T t,boolean findSupper) throws Exception {
		final List<TransNode> children = node.getChildren();
		FieldExt[] fieldExtArr = getFieldExtArr(clazz, findSupper);
		int fieldLen = fieldExtArr.length;
		if (children != null) {
			int nodeSize = children.size();
			if(nodeSize==1 && NULL.equals(children.get(0).getName())){
				return null;
			}
			T obj = null;
			if (t == null) {
				obj = clazz.newInstance();
			} else {
				obj = t;
			}
			for (int i = 0; i < fieldLen; i++) {
				FieldExt fieldExt = fieldExtArr[i];
				Field field = fieldExt.getField();
				if (field == null) {
//					logger.info(clazz.getName()+",field not exist,order is:" + (i + 1));
					continue;
				}
				if (nodeSize < i + 1) {
					//现有数据长度少于类成员数量
					logger.info(clazz.getName()+",data size less than,order is:" + (i + 1));
					continue;
				}
				TransNode currNode = children.get(i);
				if(currNode==null){
					logger.info(clazz.getName()+",data not exist,order is:" + (i + 1));
					continue;
				}
				Object value = indoToObj(currNode, field);
				Method method = clazz.getMethod(SET + toUpperCaseFirstOne(field.getName()), field.getType());
				method.invoke(obj, value);

			}
			return obj;
		}
		return null;
	}

	private static Object indoToObj(TransNode currNode, Field field) throws Exception {
		String name = currNode.getName();
		if (NULL.equals(name)) {
			return null;
		}
		Object value = null;
		Class<?> type = field.getType();
		if (type.isAssignableFrom(int.class) || type.isAssignableFrom(Integer.class)) {
			// int Integer
			value = Integer.parseInt(name);
		} else if (type.isAssignableFrom(short.class) || type.isAssignableFrom(Short.class)) {
			// short Short
			value = Short.parseShort(name);
		} else if (type.isAssignableFrom(long.class) || type.isAssignableFrom(Long.class)) {
			// long Long
			value = Long.parseLong(name);
		} else if (type.isAssignableFrom(byte.class) || type.isAssignableFrom(Byte.class)) {
			// byte Byte
			value = Byte.parseByte(name);
		} else if (type.isAssignableFrom(float.class) || type.isAssignableFrom(Float.class)) {
			// float
			value = Float.parseFloat(name);
		} else if (type.isAssignableFrom(double.class) || type.isAssignableFrom(Double.class)) {
			// double
			value = Double.parseDouble(name);
		} else if (type.isAssignableFrom(boolean.class) || type.isAssignableFrom(Boolean.class)) {
			// boolean Boolean
			value = Boolean.parseBoolean(name);
		} else if (type.isAssignableFrom(String.class)) {
			// String
			if (EMPTY.equals(name)) {
				name = "";
			}
			value = name;
		} else if (type.isAssignableFrom(List.class) || type.isAssignableFrom(ArrayList.class)|| type.isAssignableFrom(LinkedList.class)) {
			// List
			Type listType = field.getGenericType();
			if(listType instanceof ParameterizedType){
				value =  doGetMapListClazzType((ParameterizedType)listType,currNode);
			}
		} else if (type.isAssignableFrom(Map.class)||type.isAssignableFrom(HashMap.class)||type.isAssignableFrom(ConcurrentHashMap.class)||type.isAssignableFrom(LinkedHashMap.class)) {
			// Map
			Type mapType = field.getGenericType();
			if(mapType instanceof ParameterizedType){
				value =  doGetMapListClazzType((ParameterizedType)mapType,currNode);
			}
		} else if(type.isAssignableFrom(Set.class)||type.isAssignableFrom(HashSet.class)||type.isAssignableFrom(ConcurrentHashSet.class )||type.isAssignableFrom(LinkedHashSet.class)||type.isAssignableFrom(TreeSet.class)||type.isAssignableFrom(ConcurrentSkipListSet.class)){
			// Set
			Type setType = field.getGenericType();
			if (setType instanceof ParameterizedType) {
				value = doGetMapListClazzType((ParameterizedType) setType, currNode);
			}
		}else if (type.isArray()) {
			// array
			Class<?> elementType = type.getComponentType();
			List<TransNode> listChirldren = currNode.getChildren();
			int size = listChirldren.size();
			value = Array.newInstance(elementType, size);
			for (int m = 0; m < size; m++) {
				TransNode listNode = listChirldren.get(m);
				name = listNode.getName();
				if (EMPTY.equals(name)||LB.equals(name)||RB.equals(name)) {
					break;
				}
				Object arrayValue = null;
				if (elementType.isAssignableFrom(int.class) || elementType.isAssignableFrom(Integer.class)) {
					// int Integer
					arrayValue = Integer.parseInt(name);
				} else if (elementType.isAssignableFrom(short.class) || elementType.isAssignableFrom(Short.class)) {
					// short Short
					arrayValue = Short.parseShort(name);
				} else if (elementType.isAssignableFrom(long.class) || elementType.isAssignableFrom(Long.class)) {
					// long Long
					arrayValue = Long.parseLong(name);
				} else if (elementType.isAssignableFrom(float.class) || elementType.isAssignableFrom(Float.class)) {
					// float
					arrayValue = Float.parseFloat(name);
				} else if (elementType.isAssignableFrom(double.class) || elementType.isAssignableFrom(Double.class)) {
					//double
					arrayValue = Double.parseDouble(name);
				} else if (elementType.isAssignableFrom(byte.class) || elementType.isAssignableFrom(Byte.class)) {
					// byte Byte
					arrayValue = Byte.parseByte(name);
				} else if (elementType.isAssignableFrom(boolean.class) || elementType.isAssignableFrom(Boolean.class)) {
					// boolean Boolean
					arrayValue = Boolean.parseBoolean(name);
				} else {
					// Object
					arrayValue = doToObj(listNode, elementType, null,false);
				}
				Array.set(value, m, arrayValue);
			}
		} else {
			// other type
			value = doToObj(currNode, type, null,false);
		}
		return value;
	}


	/**
	 * tostr的detail逻辑
	 * 
	 * @param invoke
	 * @param sb
	 * @throws Exception
	 */
	private static void doToStr(Object invoke, Class<?> clazz, StringBuilder sb) throws Exception {
		if (invoke == null) {
			sb.append(NULL);
			return;
		}
		if (invoke instanceof Integer || invoke instanceof Long || invoke instanceof Short || invoke instanceof Byte || invoke instanceof Float|| invoke instanceof Double) {
			// base type
			sb.append(invoke);
		} else if (invoke instanceof String) {
			if (((String) invoke).length() == 0) {
				sb.append(EMPTY);
			} else {
				sb.append(invoke);
			}
		} else {
			sb.append(LB);
			if(invoke.getClass().isArray()){
				writeArray(invoke, sb);
			} else if (invoke instanceof List) {
				// List
				writeList(invoke, sb);
			} else if (invoke instanceof Map) {
				// Map
				writeMap(invoke, sb);
			} else if (invoke instanceof Set) {
				// Set
				writeSet(invoke, sb);
			} else {
				// other type
				if (clazz == null) {
					clazz = invoke.getClass();
				}
				FieldExt[] declaredFields = getFieldExtArr(clazz, false);
				int length = declaredFields.length;
				for (int i = 0; i < length; i++) {
					FieldExt ext = declaredFields[i];
					Field field = ext.getField();
					if (field == null) {
						sb.append(NULL);
					} else {
						String fieldName = field.getName();
						Method method = null;
						Class<?> fieldClazz = field.getType();
						if (fieldClazz.isAssignableFrom(boolean.class)) {
							// boolean
							method = clazz.getMethod(IS + toUpperCaseFirstOne(fieldName));
							sb.append(method.invoke(invoke));
						} else {
							method = clazz.getMethod(GET + toUpperCaseFirstOne(fieldName));
							doToStr(method.invoke(invoke),fieldClazz, sb);
						}
					}
					if (i < length - 1) {
						sb.append(DOT);
					}
				}
			}
			sb.append(RB);
		}
	}
	
	private static void writeArray(Object obj, StringBuilder sb) throws Exception {
		int len = Array.getLength(obj);
		if (len == 0) {
			sb.append(EMPTY);
		} else {
			for (int i = 0; i < len; i++) {
				doToStr(Array.get(obj, i),null,sb);
				if (i < len - 1) {
					sb.append(DOT);
				}
			}
		}
	}
	
	private static void writeList(Object obj, StringBuilder sb) throws Exception {
		List<?> list = (List<?>) obj;
		int size = list.size();
		if (size == 0) {
			sb.append(EMPTY);
		} else {
			for (int i = 0; i < size; i++) {
				doToStr(list.get(i),null,sb);
				if (i < size - 1) {
					sb.append(DOT);
				}
			}
		}
		
	}
	
	private static void writeMap(Object obj, StringBuilder sb) throws Exception {
		Map<?, ?> map = (Map<?, ?>) obj;
		int size = map.size();
		if (size == 0) {
			sb.append(EMPTY);
		} else {
			int m = 0;
			Iterator<?> it = map.keySet().iterator();
			while (it.hasNext()) {
				Object key = it.next();
				Object value = map.get(key);
				sb.append(key).append(QU).append(LB);
				doToStr(value,null, sb);
				sb.append(RB);
				if (m < size - 1) {
					sb.append(DOT);
				}
				m++;
			}
		}
		
		
		
	}

	private static void writeSet(Object obj, StringBuilder sb) throws Exception {
		Set<?> set = (Set<?>) obj;
		int size = set.size();
		if (size == 0) {
			sb.append(EMPTY);
		} else {
			int m = 0;
			Iterator<?> iterator = set.iterator();
			for (; iterator.hasNext();) {
				Object value = iterator.next();
				doToStr(value, null, sb);
				if (m < size - 1) {
					sb.append(DOT);
				}
				m++;
			}
		}
	}

	private static Object doGetMapListClazzType(ParameterizedType pt,TransNode node) throws Exception{
		Type rawType = pt.getRawType();
		Class<?> rawClazz = null;
		Object obj = null;
		Method method = null;
		if(rawType instanceof Class<?>){
			rawClazz = (Class<?>) rawType;
//			System.err.println("rawClazz:"+rawClazz);
			//类型 Map List 或者 Class.class类型
			if(rawClazz.isAssignableFrom(Map.class)){
				obj = Class.forName("java.util.HashMap").newInstance();
			}else if(rawClazz.isAssignableFrom(List.class)){
				obj = Class.forName("java.util.ArrayList").newInstance();
			}else if(rawClazz.isAssignableFrom(Set.class)) {
				obj = Class.forName("java.util.HashSet").newInstance();
			}else{
				obj = rawClazz.newInstance();
			}
		}else{
			return null;
		}
		if(rawClazz.isAssignableFrom(Class.class)){
//			System.err.println("this is clazz");
		}else{
			Type[] acts = pt.getActualTypeArguments();
			if(acts!=null){
				int len = acts.length;
				if(len==1){
					// list or set
					method = obj.getClass().getMethod(ADD, Object.class);
					List<TransNode> children = node.getChildren();
					if(children!=null){
						for (TransNode cn : children) {
							String name = cn.getName();
							if (EMPTY.equals(name)) {
								break;
							}
							Type type = acts[0];
							if (type instanceof Class<?>) {
								Object value = doGetValueForMapList(( Class<?>)type, name, cn);
//							System.err.println("list general type:"+type);
								method.invoke(obj, value);
							}else if (type instanceof ParameterizedType) {
								//value是Map
								ParameterizedType vpt = (ParameterizedType) type;
								Object value = doGetMapListClazzType(vpt,cn);
								method.invoke(obj, value);
							}
						}
					}
				}else if(len==2){
					//map
					method = obj.getClass().getMethod(PUT, Object.class, Object.class);
					List<TransNode> children = node.getChildren();
					if(children!=null){
						for (TransNode cn : children) {
							String name = cn.getName();
							if (EMPTY.equals(name)) {
								break;
							}
							if (cn.getKey() == null){
								continue;
							}
							List<TransNode> valueChildren = cn.getChildren();
							//处理key
							Object keyObj = null;
							Type keyType = acts[0];
							if (keyType instanceof Class<?>) {
//							System.err.println("map key general type:"+keyType);
								keyObj = doGetValueForMapList(( Class<?>)keyType, cn.getKey(), cn);
							}else if (keyType instanceof ParameterizedType) {
								//可以为这种类型 Map<Class<?>, Object>
							}
							//处理value
							Object valueObj = null;
							for(TransNode valueNode:valueChildren){
								Type valueType = acts[1];
								if (valueType instanceof Class<?>) {
									//value是基础类型、数组、Object
									Class<?> clazz = (Class<?>) valueType;
									valueObj = doGetValueForMapList(clazz, valueNode.getName(), valueNode);
//								System.err.println("map value general type:"+clazz);
								} else if (valueType instanceof ParameterizedType) {
									//value是Map
									ParameterizedType vpt = (ParameterizedType) valueType;
									valueObj = doGetMapListClazzType(vpt,valueNode);
								}
							}
							method.invoke(obj, keyObj,valueObj);
						}
					}
					
				}
			}
		}
		return obj;
	}
	
	private static Object doGetValueForMapList(Class<?> genericClazz,String listNodeName,TransNode valueNode) throws Exception{
		Object genericObj = null;
		if (genericClazz.isAssignableFrom(int.class) || genericClazz.isAssignableFrom(Integer.class)) {
			// int Integer
			genericObj = Integer.parseInt(listNodeName);
		} else if (genericClazz.isAssignableFrom(long.class) || genericClazz.isAssignableFrom(Long.class)) {
			// long Long
			genericObj = Long.parseLong(listNodeName);
		} else if (genericClazz.isAssignableFrom(String.class)) {
			// String
			genericObj = listNodeName;
		} else if (genericClazz.isAssignableFrom(Boolean.class)) {
			// Boolean
			genericObj = Boolean.parseBoolean(listNodeName);
		}else if(genericClazz.isArray()){
			Class<?> elementType = genericClazz.getComponentType();
			List<TransNode> listChirldren = valueNode.getChildren();
			if(listChirldren!=null){
				int size = listChirldren.size();
				genericObj = Array.newInstance(elementType, size);
				String name = null;
				for (int m = 0; m < size; m++) {
					TransNode listNode = listChirldren.get(m);
					name = listNode.getName();
					if (EMPTY.equals(name)) {
						break;
					}
					Object arrayValue = null;
					if (elementType.isAssignableFrom(int.class) || elementType.isAssignableFrom(Integer.class)) {
						// int Integer
						arrayValue = Integer.parseInt(name);
					} else if (elementType.isAssignableFrom(short.class) || elementType.isAssignableFrom(Short.class)) {
						// short Short
						arrayValue = Short.parseShort(name);
					} else if (elementType.isAssignableFrom(float.class) || elementType.isAssignableFrom(Float.class)) {
						// short Short
						arrayValue = Float.parseFloat(name);
					} else if (elementType.isAssignableFrom(double.class) || elementType.isAssignableFrom(Double.class)) {
						// short Short
						arrayValue = Double.parseDouble(name);
					} else if (elementType.isAssignableFrom(long.class) || elementType.isAssignableFrom(Long.class)) {
						// long Long
						arrayValue = Long.parseLong(name);
					} else if (elementType.isAssignableFrom(byte.class) || elementType.isAssignableFrom(Byte.class)) {
						// byte Byte
						arrayValue = Byte.parseByte(name);
					} else if (elementType.isAssignableFrom(boolean.class) || elementType.isAssignableFrom(Boolean.class)) {
						// boolean Boolean
						arrayValue = Boolean.parseBoolean(name);
					}else if (elementType.isAssignableFrom(String.class)) {
						// String
						arrayValue = name;
					} else {
						// Object
						arrayValue = doToObj(listNode, elementType, null,false);
					}
					Array.set(genericObj, m, arrayValue);
				}
			}
		} else {
			genericObj = doToObj(valueNode, genericClazz, null,false);
		}
		return genericObj;
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
