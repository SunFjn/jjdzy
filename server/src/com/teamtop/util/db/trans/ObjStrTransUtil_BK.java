package com.teamtop.util.db.trans;

import java.lang.reflect.Array;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

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
public class ObjStrTransUtil_BK {
	private final static String DOT = ",";
	private final static String QU = ":";
	private final static String LB = "{";
	private final static String RB = "}";
	public final static String EMPTY = "!";
	public final static String NULL = "null";
	private static Logger logger = LoggerFactory.getLogger(ObjStrTransUtil.class);
	static {
		TransInnerUtil.explianMapListArrayTrans();
	}

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
			return NULL;
		doToStr(obj, obj.getClass(), sb);
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
			t = doToObj(node, clazz, null);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			node = null;
		}
		return t;
	}

	/**
	 * 获取map list字符串对应的类型
	 * 
	 * @param data
	 * @param field
	 * @return
	 * @throws Exception
	 */
	public static Object getMapListObj(String data, Field field) throws Exception {
		if (NULL.equals(data))
			return null;
		Object obj = null;
		TransNode node = getNode(data);
		try {
			Type type = field.getGenericType();
			if (type instanceof ParameterizedType) {
				if ("root".equals(node.getName())) {
					node = node.getChildren().get(0);
				}
				obj = doGetMapListClazzType((ParameterizedType) type, node);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		node = null;
		return obj;
	}

	public static String toSuperClassStr(Object obj) throws Exception {
		final StringBuilder sb = new StringBuilder();
		doToStr(obj, obj.getClass().getSuperclass(), sb);
		return sb.toString();
	}

	/**
	 * 辅助字符串转换成对象使用，获取字符串对应的node节点
	 * 
	 * @param data
	 *            字符串数据
	 * @return 对应node节点
	 */
	static TransNode getNode(String data) {
		TransNode currNode = TransNode.createNode("root");
		;
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
	static <T> T doToObj(TransNode node, Class<T> clazz, T t) throws Exception {
		final List<TransNode> children = node.getChildren();
		FieldExt[] fieldExtArr = TransInnerUtil.getFieldExtArr(clazz, t == null ? false : true);
		int fieldLen = fieldExtArr.length;
		if (children != null) {
			int nodeSize = children.size();
			if (nodeSize == 1 && NULL.equals(children.get(0).getName())) {
				return null;
			}
			T obj = null;
			if (t == null) {
				try {
					obj = clazz.newInstance();
				} catch (Exception e) {
					logger.error(LogTool.exception(e, "clazz:" + clazz));
				}
			} else {
				obj = t;
			}
			for (int i = 0; i < fieldLen; i++) {
				FieldExt fieldExt = fieldExtArr[i];
				Field field = fieldExt.getField();
				if (field == null) {
					System.err.println("field not exist,order is:" + (i + 1));
					continue;
				}
				if (nodeSize < i + 1) {
					System.err.println("data not exist,order is:" + (i + 1));
					continue;
				}
				TransNode currNode = children.get(i);
				Object value = indoToObj(currNode, field);
				Method method = clazz.getMethod(TransInnerUtil.SET + TransInnerUtil.toUpperCaseFirstOne(field.getName()), field.getType());
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
			// byte Byte
			value = Float.parseFloat(name);
		} else if (type.isAssignableFrom(boolean.class) || type.isAssignableFrom(Boolean.class)) {
			// boolean Boolean
			value = Boolean.parseBoolean(name);
		} else if (type.isAssignableFrom(String.class)) {
			// String
			if (EMPTY.equals(name)) {
				name = "";
			}
			value = name;
		} else if (type.isAssignableFrom(List.class) || type.isAssignableFrom(ArrayList.class)) {
			// List
			Type listType = field.getGenericType();
			if (listType instanceof ParameterizedType) {
				value = doGetMapListClazzType((ParameterizedType) listType, currNode);
			}
		} else if (type.isAssignableFrom(Map.class) || type.isAssignableFrom(HashMap.class) || type.isAssignableFrom(ConcurrentHashMap.class) || type.isAssignableFrom(LinkedHashMap.class)) {
			// Map
			Type mapType = field.getGenericType();
			if (mapType instanceof ParameterizedType) {
				value = doGetMapListClazzType((ParameterizedType) mapType, currNode);
			}
		} else if (type.isArray()) {
			// array
			Class<?> elementType = type.getComponentType();
			List<TransNode> listChirldren = currNode.getChildren();
			int size = listChirldren.size();
			value = Array.newInstance(elementType, size);
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
				} else if (elementType.isAssignableFrom(long.class) || elementType.isAssignableFrom(Long.class)) {
					// long Long
					arrayValue = Long.parseLong(name);
				} else if (elementType.isAssignableFrom(byte.class) || elementType.isAssignableFrom(Byte.class)) {
					// byte Byte
					arrayValue = Byte.parseByte(name);
				} else if (elementType.isAssignableFrom(boolean.class) || elementType.isAssignableFrom(Boolean.class)) {
					// boolean Boolean
					arrayValue = Boolean.parseBoolean(name);
				} else {
					// Object
					arrayValue = doToObj(listNode, elementType, null);
				}
				Array.set(value, m, arrayValue);
			}
		} else {
			// other type
			value = doToObj(currNode, type, null);
		}
		return value;
	}

	/**
	 * 对象转换str实现方法
	 * 
	 * @param obj
	 *            对象
	 * @param sb
	 *            StringBuilder用于拼接
	 * @throws Exception
	 */
	private static void doToStr(Object obj, Class<?> clazz, StringBuilder sb) throws Exception {
		// Class<?> clazz = obj.getClass();
		if (obj == null) {
			sb.append(NULL);
			return;
		}
		if (TransInnerUtil.mapListArrs.contains(clazz)) {
			indoToStr(obj, sb);
			return;
		}
		FieldExt[] declaredFields = TransInnerUtil.getFieldExtArr(clazz, false);
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
					method = clazz.getMethod(TransInnerUtil.IS + TransInnerUtil.toUpperCaseFirstOne(fieldName));
					Object invoke = method.invoke(obj);
					sb.append(invoke);
				} else {
					method = clazz.getMethod(TransInnerUtil.GET + TransInnerUtil.toUpperCaseFirstOne(fieldName));
					Object invoke = method.invoke(obj);
					indoToStr(invoke, sb);
				}
			}
			if (i < length - 1) {
				sb.append(DOT);
			}
		}
	}

	/**
	 * tostr的detail逻辑
	 * 
	 * @param invoke
	 * @param sb
	 * @throws Exception
	 */
	private static void indoToStr(Object invoke, StringBuilder sb) throws Exception {
		if (invoke == null) {
			sb.append(NULL);
			return;
		}
		if (invoke instanceof Integer || invoke instanceof Long || invoke instanceof Short || invoke instanceof Byte || invoke instanceof Float) {
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
			if (invoke instanceof Integer[] || invoke instanceof Byte[] || invoke instanceof Long[] || invoke instanceof Short[] || invoke instanceof Boolean[]) {
				Object[] arr = (Object[]) invoke;
				int len = arr.length;
				if (len == 0) {
					sb.append(EMPTY);
				} else {
					for (int j = 0; j < len; j++) {
						Object arrObj = arr[j];
						sb.append(arrObj);
						if (j < len - 1) {
							sb.append(DOT);
						}
					}
				}
			} else if (invoke instanceof int[]) {
				int[] arr = (int[]) invoke;
				int len = arr.length;
				if (len == 0) {
					sb.append(EMPTY);
				} else {
					for (int j = 0; j < len; j++) {
						Object arrObj = arr[j];
						sb.append(arrObj);
						if (j < len - 1) {
							sb.append(DOT);
						}
					}
				}
			} else if (invoke instanceof byte[]) {
				byte[] arr = (byte[]) invoke;
				int len = arr.length;
				if (len == 0) {
					sb.append(EMPTY);
				} else {
					for (int j = 0; j < len; j++) {
						Object arrObj = arr[j];
						sb.append(arrObj);
						if (j < len - 1) {
							sb.append(DOT);
						}
					}
				}
			} else if (invoke instanceof short[]) {
				short[] arr = (short[]) invoke;
				int len = arr.length;
				if (len == 0) {
					sb.append(EMPTY);
				} else {
					for (int j = 0; j < len; j++) {
						Object arrObj = arr[j];
						sb.append(arrObj);
						if (j < len - 1) {
							sb.append(DOT);
						}
					}
				}
			} else if (invoke instanceof long[]) {
				long[] arr = (long[]) invoke;
				int len = arr.length;
				if (len == 0) {
					sb.append(EMPTY);
				} else {
					for (int j = 0; j < len; j++) {
						Object arrObj = arr[j];
						sb.append(arrObj);
						if (j < len - 1) {
							sb.append(DOT);
						}
					}
				}
			} else if (invoke instanceof boolean[]) {
				boolean[] arr = (boolean[]) invoke;
				int len = arr.length;
				if (len == 0) {
					sb.append(EMPTY);
				} else {
					for (int j = 0; j < len; j++) {
						Object arrObj = arr[j];
						sb.append(arrObj);
						if (j < len - 1) {
							sb.append(DOT);
						}
					}
				}
			} else if (invoke instanceof Object[]) {
				// Object[]
				Object[] arr = (Object[]) invoke;
				int len = arr.length;
				if (len == 0) {
					sb.append(EMPTY);
				} else {
					for (int j = 0; j < len; j++) {
						Object arrObj = arr[j];
						sb.append(LB);
						if (arrObj == null) {
							sb.append(NULL);
						} else
							doToStr(arrObj, arrObj.getClass(), sb);
						sb.append(RB);
						if (j < len - 1) {
							sb.append(DOT);
						}
					}
				}
			} else if (invoke instanceof List) {
				// List
				List<?> list = (List<?>) invoke;
				int size = list.size();
				if (size == 0) {
					sb.append(EMPTY);
				} else {
					for (int j = 0; j < size; j++) {
						Object listObj = list.get(j);
						if (listObj instanceof Integer || listObj instanceof String || listObj instanceof Long || listObj instanceof Short || listObj instanceof Byte || listObj instanceof Boolean) {
							// base type
							sb.append(listObj);
						} else {
							sb.append(LB);
							doToStr(listObj, listObj.getClass(), sb);
							sb.append(RB);
						}
						if (j < size - 1) {
							sb.append(DOT);
						}
					}
				}
			} else if (invoke instanceof Map) {
				// Map
				Map<?, ?> map = (Map<?, ?>) invoke;
				int size = map.size();
				if (size == 0) {
					sb.append(EMPTY);
				} else {
					int m = 0;
					Iterator<?> it = map.keySet().iterator();
					while (it.hasNext()) {
						Object key = it.next();
						sb.append(key).append(QU).append(LB);
						Object value = map.get(key);
						if (value instanceof Integer || value instanceof String || value instanceof Long || value instanceof Short || value instanceof Byte || value instanceof Boolean) {
							// base type
							sb.append(value);
						} else {
							if (value instanceof List || TransInnerUtil.mapListArrs.contains(value.getClass())) {
								indoToStr(value, sb);
							} else {
								sb.append(LB);
								doToStr(value, value.getClass(), sb);
								sb.append(RB);
							}
						}
						sb.append(RB);
						if (m < size - 1) {
							sb.append(DOT);
						}
						m++;
					}
				}
			} else {
				// other type
				doToStr(invoke, invoke.getClass(), sb);
			}
			sb.append(RB);
		}
	}

	private static Object doGetMapListClazzType(ParameterizedType pt, TransNode node) throws Exception {
		Type rawType = pt.getRawType();
		Class<?> rawClazz = null;
		Object obj = null;
		Method method = null;
		if (rawType instanceof Class<?>) {
			rawClazz = (Class<?>) rawType;
			// System.err.println("rawClazz:"+rawClazz);
			// 类型 Map List 或者 Class.class类型
			if (rawClazz.isAssignableFrom(Map.class)) {
				obj = Class.forName("java.util.HashMap").newInstance();
			} else if (rawClazz.isAssignableFrom(List.class)) {
				obj = Class.forName("java.util.ArrayList").newInstance();
			} else {
				obj = rawClazz.newInstance();
			}
		} else {
			return null;
		}
		if (rawClazz.isAssignableFrom(Class.class)) {
			// System.err.println("this is clazz");
		} else {
			Type[] acts = pt.getActualTypeArguments();
			if (acts != null) {
				int len = acts.length;
				if (len == 1) {
					// list
					method = obj.getClass().getMethod(TransInnerUtil.ADD, Object.class);
					List<TransNode> children = node.getChildren();
					for (TransNode cn : children) {
						String name = cn.getName();
						if (EMPTY.equals(name)) {
							break;
						}
						Type type = acts[0];
						if (type instanceof Class<?>) {
							Object value = doGetValueForMapList((Class<?>) type, name, cn);
							// System.err.println("list general type:"+type);
							method.invoke(obj, value);
						}
					}
				} else if (len == 2) {
					// map
					method = obj.getClass().getMethod(TransInnerUtil.PUT, Object.class, Object.class);
					List<TransNode> children = node.getChildren();
					for (TransNode cn : children) {
						String name = cn.getName();
						if (EMPTY.equals(name)) {
							break;
						}
						List<TransNode> valueChildren = cn.getChildren();
						// 处理key
						Object keyObj = null;
						Type keyType = acts[0];
						if (keyType instanceof Class<?>) {
							// System.err.println("map key general type:"+keyType);
							keyObj = doGetValueForMapList((Class<?>) keyType, cn.getKey(), cn);
						} else if (keyType instanceof ParameterizedType) {
							// 可以为这种类型 Map<Class<?>, Object>
						}
						// 处理value
						Object valueObj = null;
						for (TransNode valueNode : valueChildren) {
							Type valueType = acts[1];
							if (valueType instanceof Class<?>) {
								// value是基础类型、数组、Object
								Class<?> clazz = (Class<?>) valueType;
								valueObj = doGetValueForMapList(clazz, valueNode.getName(), valueNode);
								// System.err.println("map value general type:"+clazz);
							} else if (valueType instanceof ParameterizedType) {
								// value是Map
								ParameterizedType vpt = (ParameterizedType) valueType;
								valueObj = doGetMapListClazzType(vpt, valueNode);
							}
						}
						method.invoke(obj, keyObj, valueObj);
					}

				}
			}
		}
		return obj;
	}

	private static Object doGetValueForMapList(Class<?> genericClazz, String listNodeName, TransNode valueNode) throws Exception {
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
		} else if (genericClazz.isArray()) {
			Class<?> elementType = genericClazz.getComponentType();
			List<TransNode> listChirldren = valueNode.getChildren();
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
				} else if (elementType.isAssignableFrom(long.class) || elementType.isAssignableFrom(Long.class)) {
					// long Long
					arrayValue = Long.parseLong(name);
				} else if (elementType.isAssignableFrom(byte.class) || elementType.isAssignableFrom(Byte.class)) {
					// byte Byte
					arrayValue = Byte.parseByte(name);
				} else if (elementType.isAssignableFrom(boolean.class) || elementType.isAssignableFrom(Boolean.class)) {
					// boolean Boolean
					arrayValue = Boolean.parseBoolean(name);
				} else {
					// Object
					arrayValue = doToObj(listNode, elementType, null);
				}
				Array.set(genericObj, m, arrayValue);
			}
		} else {
			genericObj = doToObj(valueNode, genericClazz, null);
		}
		return genericObj;
	}


	public static <T> T toSuperClassObj(String data, Class<T> clazz, T obj) throws Exception {
		TransNode node = getNode(data);
		T t = null;
		try {
			t = doToObj(node, clazz, obj);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			node = null;
		}
		return t;
	}
}
