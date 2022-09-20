package com.teamtop.util.db.trans;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.common.ConcurrentHashSet;

public class TransInnerUtil extends AbsServerEvent{
	private static TransInnerUtil ins = null;

	public static TransInnerUtil getIns() {
		if (ins == null)
			ins = new TransInnerUtil();
		return ins;
	}
	/**
	 * 获取FieldExt[]，如果没有，则尝试去分析此clazz
	 * 
	 * @param clazz
	 * @return FieldExt[]
	 */
	public static FieldExt[] getFieldExtArr(Class<?> clazz, boolean findSuper) {
		if (findSuper) {
			clazz = clazz.getSuperclass();
		}
		FieldExt[] fieldExts = TransInnerUtil.fieldConMap.get(clazz);
		if (fieldExts == null) {
			TransInnerUtil.explainFieldTrans(clazz);
			fieldExts = TransInnerUtil.fieldConMap.get(clazz);
		}
		return fieldExts;
	}

	/**
	 * 解析字段obj和str相互转换需要用到的map，用于此转换工具使用时可以快速获取class的field数据
	 */
	public static void explainFieldTrans(Class<?> clazz) {
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
		TransInnerUtil.fieldConMap.put(clazz, extArr);
	}
	/**
	 * 获取FieldExt[]，如果没有，则尝试去分析此clazz
	 * 
	 * @param clazz
	 * @return FieldExt[]
	 */
	public static Map<Integer,FieldExt> getFieldExtArrV2(Class<?> clazz, boolean findSuper) {
		if (findSuper) {
			clazz = clazz.getSuperclass();
		}
		Map<Integer, FieldExt> map = fieldExtMap.get(clazz);
		if (map == null) {
			explainFieldTransV2(clazz);
			map = fieldExtMap.get(clazz);
		}
		return map;
	}
	
	
	/**
	 * 解析字段obj和byte相互转换需要用到的map，用于此转换工具使用时可以快速获取class的field数据
	 */
	public static void explainFieldTransV2(Class<?> clazz) {
		Field[] declaredFields = clazz.getDeclaredFields();
		TreeMap<Integer, FieldExt> fieldMap = new TreeMap<Integer, FieldExt>();
		for (Field field : declaredFields) {
			FieldOrder fv = field.getAnnotation(FieldOrder.class);
			if (fv != null) {
				int order = fv.order();
				if(!fieldMap.containsKey(order)){
					fieldMap.put(order, new FieldExt(field, fv.order()));
				}else{
					throw new RuntimeException("clazz:" + clazz + ",order repeat,order is:" + order);
				}
			}
		}
		TransInnerUtil.fieldExtMap.put(clazz, fieldMap);
	}
	/**
	 * 用于toStr时根据class读取field[]的map key:class,value:包装了Field和order的FieldExt
	 */
	public static Map<Class<?>, FieldExt[]> fieldConMap = new HashMap<Class<?>, FieldExt[]>();
	public static Map<Class<?>, Map<Integer,FieldExt>> fieldExtMap = new HashMap<Class<?>, Map<Integer,FieldExt>>();
	static List<Class<?>> mapListArrs = new ArrayList<Class<?>>();
	
	/**
	 * 加入map list 数组 set 类型作为obj是否为这些类型的判断依据
	 */
	static void explianMapListArrayTrans() {
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

	public static boolean isBaseType(Object obj) {
		if (obj instanceof Integer || obj instanceof Short || obj instanceof String || obj instanceof Byte || obj instanceof Long) {
			return true;
		}
		return false;
	}

	public static boolean isBaseType(Class<?> clazz){
		return clazz.isAssignableFrom(int.class) || clazz.isAssignableFrom(Integer.class)||clazz.isAssignableFrom(short.class)||
		clazz.isAssignableFrom(Short.class)||clazz.isAssignableFrom(long.class)|| clazz.isAssignableFrom(Long.class)
		||clazz.isAssignableFrom(byte.class) ||clazz.isAssignableFrom(Byte.class);
	}
	public static boolean isBaseWrapType(Class<?> clazz){
		return clazz.isAssignableFrom(Integer.class)||clazz.isAssignableFrom(Short.class)
				|| clazz.isAssignableFrom(Long.class)||clazz.isAssignableFrom(Byte.class);
	}

	public static boolean isMapListArrSet(Object obj) {
		if (obj == null)
			return false;
		if (obj instanceof Map || obj instanceof HashMap || obj instanceof TreeMap || obj instanceof ConcurrentHashMap || obj instanceof List || obj instanceof ArrayList || obj instanceof byte[]
				|| obj instanceof Byte[] || obj instanceof short[] || obj instanceof Short[] || obj instanceof int[] || obj instanceof Integer[] || obj instanceof long[] || obj instanceof Long[]
				|| obj instanceof boolean[] || obj instanceof Boolean[] || obj instanceof String[] || obj instanceof Object[] || obj instanceof Set || obj instanceof HashSet || obj instanceof ConcurrentHashSet) {
			return true;
		}
		return false;
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
	 * 首字母转大写 若原来已经是首字母大写则直接返回原字符串
	 * 
	 * @param s
	 *            字符串
	 * @return 转换后的首字母大写字符串
	 */
	public static String toUpperCaseFirstOne(String s) {
		if (Character.isUpperCase(s.charAt(0)))
			return s;
		else
			return (new StringBuilder()).append(Character.toUpperCase(s.charAt(0))).append(s.substring(1)).toString();
	}
	/**
	 * 首字母转小写 若原来已经是首字母大写则直接返回原字符串
	 * 
	 * @param s
	 *            字符串
	 * @return 转换后的首字母小写字符串
	 */
	public static String toLowerCaseFirstOne(String s) {
		if (Character.isLowerCase(s.charAt(0)))
			return s;
		else
			return (new StringBuilder()).append(Character.toLowerCase(s.charAt(0))).append(s.substring(1)).toString();
	}
	public final static String GET = "get";
	public final static String SET = "set";
	public final static String IS = "is";
	public final static String ADD = "add";
	public final static String PUT = "put";
	
	
	@Override
	public void startServer() throws RunServerException {
		List<Class<?>> list = new ArrayList<>();
		boolean exc = false;
		for(Class<?> clazz:list){
			Field[] declaredFields = clazz.getDeclaredFields();
			TreeMap<Integer, FieldExt> fieldMap = new TreeMap<Integer, FieldExt>();
			for (Field field : declaredFields) {
				FieldOrder fv = field.getAnnotation(FieldOrder.class);
				if (fv != null) {
					int order = fv.order();
					if(!fieldMap.containsKey(order)){
						fieldMap.put(order, new FieldExt(field, fv.order()));
					}else{
						exc = true;
						throw new RuntimeException("clazz:" + clazz + ",order repeat,order is:" + order);
					}
				}
			}
			if(exc){
				throw new RunServerException(null, "clazz:" + clazz + ",order repeat");
			}
			TransInnerUtil.fieldExtMap.put(clazz, fieldMap);
		}
	}

}
