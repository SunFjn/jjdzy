package com.teamtop.util.common;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

public class Tools {
	/**
	 * 分割符"_"
	 */
	public static final String DELIMITER_INNER_ITEM = "_";
	/**
	 * 分割符"|"
	 */
	public static final String DELIMITER_BETWEEN_ITEMS = "|";
	/**
	 * 分割符"\\|"
	 */
	private static final String DELIMITER_ARGS_ITEMS = "\\|";
	/**
	 * 分割符","
	 */
	public static final String DELIMITER_CAS_ITEMS = ",";

	/**
	 * ID标示符"$"
	 */
	public static final String DELIMITER_ID_ITEMS = "$";

	/**
	 * ID标示分割符符"\\$"
	 */
	private static final String DELIMITER_ID_ARGS_ITEMS = "\\$";
	
	/**
	 * 字符串替换符"XXX"
	 */
	public static final String REPLACEMENT = "XXX";
	
	/**
	 * 语句分隔符号、
	 */
	public static final String STATEMENT_DELIMITER = "、";
	
	/**
	 * 分号;
	 */
	public static final String SEMICOLON_DELIMITER = ";";
	
	/**
	 * 星号 *
	 */
	public static final String STAR_DELIMITER = "*";
	
	/**
	 * 字段处理
	 */
	public static final String CAPITAL = "[A-Z]";
	/**
	 * 把字符串转换为基本类型对象（String、Integer、Short、Double、Float） 前提条件：字符串是数字
	 * 
	 * @param str
	 * @param c
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public static <T> T stringNumber2BasicTypes(String str, Class<T> c) {
		if (String.class.equals(c)) {
			return (T) str;
		} else if (Integer.class.equals(c)) {
			return (T) Integer.valueOf(str);
		} else if (Long.class.equals(c)) {
			return (T) Long.valueOf(str);
		} else if (Double.class.equals(c)) {
			return (T) Double.valueOf(str);
		} else if (Float.class.equals(c)) {
			return (T) Float.valueOf(str);
		} else if (Short.class.equals(c)) {
			return (T) Short.valueOf(str);
		} else {
			throw new IllegalArgumentException("无效的类型：" + c.getSimpleName());
		}
	}

	

	/**
	 * 把以delimiter分割的字符串分解成数组T[]
	 * 
	 * @param str
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public static <T> T[] delimiterString2Array(String str, String delimiter, Class<T> c) {
		String tempDelimiter = DELIMITER_BETWEEN_ITEMS.equals(delimiter) ? DELIMITER_ARGS_ITEMS
				: delimiter;
		String[] arr = null;
		if (str != null && str.length() > 0) {
			arr = str.split(tempDelimiter);
		}
		if (arr == null || arr.length == 0) {
			return null;
		}

		T[] newArray = (T[]) Array.newInstance(c, arr.length);
		for (int i = 0; i < arr.length; i++) {
			newArray[i] = stringNumber2BasicTypes(arr[i], c);
		}
		return newArray;
	}
	
	/**
	 * 构造字符串,delimiter参数为分隔符，譬如delimiter为|分隔符，则格式为object|...|object
	 * 
	 * @param objects
	 * @return
	 */
	public static <T> String constructArray2String(String delimiter, T[] objs) {
		StringBuilder bf = null;
		if (objs != null && objs.length > 0) {
			for (T obj : objs) {
				if (obj != null) {
					if (bf == null) {
						bf = new StringBuilder();
					} else {
						bf.append(delimiter);
					}
					bf.append(obj);
				}
			}
		}
		return bf == null ? null : bf.toString();
	}

	/**
	 * 把以delimiter分割的字符串分解成List<T>
	 * 
	 * @param str
	 * @return
	 */
	public static <T> List<T> delimiterString2List(String str, String delimiter, Class<T> c) {
		if (str == null|| str.length() == 0) {
			return null;
		}
		String tempDelimiter = DELIMITER_BETWEEN_ITEMS.equals(delimiter) ? DELIMITER_ARGS_ITEMS
				: delimiter;
		String[] arr = str.split(tempDelimiter);
		if (arr == null || arr.length == 0) {
			return null;
		}
		List<T> result = new ArrayList<T>(arr.length);
		for (int i = 0; i < arr.length; i++) {
			result.add((T) stringNumber2BasicTypes(arr[i], c));
		}
		return result;
	}
	
	/**
	 * 构造字符串,delimiter参数为分隔符，譬如delimiter为|分隔符，则格式为object|...|object
	 * 
	 * @param objects
	 * @return
	 */
	public static <T> String constructList2String(String delimiter, List<T> objs) {
		StringBuilder bf = null;
		if (objs != null && objs.size() > 0) {
			for (T obj : objs) {
				if (obj != null) {
					if (bf == null) {
						bf = new StringBuilder();
					} else {
						bf.append(delimiter);
					}
					bf.append(obj);
				}
			}
		}
		return bf == null ? null : bf.toString();
	}

	/**
	 * 把以1_2_...|2_3_...分割的字符串分解成List<T[]>
	 * 
	 * @param str
	 * @return
	 */
	public static <T> List<T[]> delimiterString2ListArray(String str, Class<T> c) {
		if (str == null|| str.length() == 0) {
			return null;
		}
		String[] arr = str.split(DELIMITER_ARGS_ITEMS);
		if (arr == null || arr.length == 0) {
			return null;
		}
		List<T[]> result = new ArrayList<T[]>(arr.length);
		for (int i = 0; i < arr.length; i++) {
			result.add(delimiterString2Array(arr[i], DELIMITER_INNER_ITEM, c));
		}
		return result;
	}
	
	/**
	 * 构造字符串,把List<T[]>转为1_2|2_3存储
	 * 
	 * @param objects
	 * @return
	 */
	public static <T> String constructListArray2String(List<T[]> objs) {
		return constructListArray2String(objs , DELIMITER_BETWEEN_ITEMS , DELIMITER_INNER_ITEM);
	}
	
	/**
	 * 
	 * 
	 * @param objects
	 * @return
	 */
	/**
	 * 构造字符串,把List<T[]>转为1_2|2_3存储
	 * @param objs
	 * @param delimiter1  为例子的符号 |
	 * @param delimiter2  为例子的符号  _
	 * @return
	 */
	public static <T> String constructListArray2String(List<T[]> objs , String delimiter1,
			String delimiter2) {
		StringBuilder bf = null;
		if (objs != null && objs.size() > 0) {
			for (T[] array : objs) {
				if (array != null) {
					if (bf == null) {
						bf = new StringBuilder();
					} else {
						bf.append(delimiter1);
					}
					bf.append(constructArray2String(delimiter2,array));
				}
			}
		}
		return bf == null ? null : bf.toString();
	}
	

	/**
	 * 把以1_2|2_3|3_5类似格式的字符串分解成HashMap<K,V>
	 * 该类型字符串无相同key的结构
	 * 
	 * @param <K>
	 *            key类型
	 * @param <V>
	 *            value类型
	 * @param str
	 * @param delimiter1
	 *            在这个例子是\\|字符
	 * @param delimiter2
	 *            在这个例子是_字符
	 * @param k
	 * @param v
	 * @return
	 */
	public static <K, V> Map<K, V> delimiterString2Map(String str, String delimiter1,
			String delimiter2, Class<K> k, Class<V> v) {
		if (str != null && str.length() > 0) {

			String tempDelimiter1 = DELIMITER_BETWEEN_ITEMS.equals(delimiter1) ? DELIMITER_ARGS_ITEMS
					: delimiter1;
			String tempDelimiter2 = DELIMITER_BETWEEN_ITEMS.equals(delimiter2) ? DELIMITER_ARGS_ITEMS
					: delimiter2;

			String[] arr = str.split(tempDelimiter1);
			Map<K, V> map = new HashMap<K, V>(arr.length);
			for (String s : arr) {
				String[] subArr = s.split(tempDelimiter2);
				K subKey = (K) stringNumber2BasicTypes(subArr[0], k);
				V subValue = stringNumber2BasicTypes(subArr[1], v);
				map.put(subKey, subValue);
			}
			return map;
		} else {
			return null;
		}
	}

	/**
	 * HashMap<K,V> 构造为1_2|2_3|3_5格式的字符串
	 * 该类型字符串无相同key的结构
	 * 
	 * @param Map<K, V> map
	 *            map
	 * @return
	 */
	public static <K, V> String constructMap2String(Map<K, V> map) {
		if (CollectionUtil.isEmpty(map)) {
			return null;
		}
		StringBuffer sb = new StringBuffer();
		for (Map.Entry<K, V> entry : map.entrySet()) {
			if (entry.getValue()==null) {
				continue;
			}
			if (sb.length() > 0) {
				sb.append(DELIMITER_BETWEEN_ITEMS);
			}
			sb.append(entry.getKey()).append(DELIMITER_INNER_ITEM).append(entry.getValue());
		}
		return sb.toString();
	}
	
	/**
	 * 把以1_2_3|2_2_3|3_2_3类似格式的字符串分解成HashMap<K,V[]>
	 * 该类型字符串无相同key的结构
	 * 
	 * @param <K>
	 *            key类型
	 * @param <V>
	 *            value类型
	 * @param str
	 * @param delimiter1
	 *            在这个例子是\\|字符
	 * @param delimiter2
	 *            在这个例子是_字符
	 * @param k
	 * @param v
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public static <K, V> Map<K, V[]> delimiterString2MapArray(String str, Class<K> k, Class<V> v) {

		if (str != null && str.length() > 0) {
			String[] arr = str.split(DELIMITER_ARGS_ITEMS);
			Map<K, V[]> map = new HashMap<K, V[]>(arr.length);
			for (String s : arr) {
				String[] subArr = s.split(DELIMITER_INNER_ITEM);
				K subKey = (K) stringNumber2BasicTypes(subArr[0], k);
				V[] valueArray = (V[]) Array.newInstance(v, subArr.length-1);
				for (int i = 1; i < subArr.length; i++) {
					valueArray[i - 1] = stringNumber2BasicTypes(subArr[i], v);
				}
				map.put(subKey, valueArray);
			}
			return map;
		} else {
			return null;
		}
	}
	
	/**
	 * HashMap<K,V[]> 构造为1_2_3|2_3_3|3_5_3格式的字符串
     * 该类型字符串无相同key的结构
	 * 
	 * @param Map
	 *            <K, V[]> map map
	 * @return
	 */
	public static <K, V> String constructMapArray2String(Map<K, V[]> map) {
		if (CollectionUtil.isEmpty(map)) {
			return null;
		}
		StringBuffer sb = new StringBuffer();
		for (Map.Entry<K, V[]> entry : map.entrySet()) {
			if (entry.getValue()==null||entry.getValue().length==0) {
				continue;
			}
			if (sb.length() > 0) {
				sb.append(DELIMITER_BETWEEN_ITEMS);
			}
			sb.append(entry.getKey()).append(DELIMITER_INNER_ITEM).append(
					constructArray2String(DELIMITER_INNER_ITEM, entry.getValue()));
		}
		return sb.toString();
	}
	
	/**
	 * 把以1_2_3|2_2_3|3_2_3类似格式的字符串分解成HashMap<K,List<V>>
	 * 该类型字符串无相同key的结构
	 * 
	 * @param <K>
	 *            key类型
	 * @param <V>
	 *            value类型
	 * @param str
	 * @param delimiter1
	 *            在这个例子是\\|字符
	 * @param delimiter2
	 *            在这个例子是_字符
	 * @param k
	 * @param v
	 * @return
	 */
	public static <K, V> Map<K, List<V>> delimiterString2MapList(String str, Class<K> k, Class<V> v) {
		if (str != null && str.length() > 0) {
			String[] arr = str.split(DELIMITER_ARGS_ITEMS);
			Map<K, List<V>> map = new HashMap<K, List<V>>(arr.length);
			for (String s : arr) {
				String[] subArr = s.split(DELIMITER_INNER_ITEM);
				K subKey = (K) stringNumber2BasicTypes(subArr[0], k);
				List<V> valueList = new ArrayList<V>();
				for (int i = 1; i < subArr.length; i++) {
					valueList.add(stringNumber2BasicTypes(subArr[i], v));
				}
				map.put(subKey, valueList);
			}
			return map;
		} else {
			return null;
		}
	}
	
	/**
	 * HashMap<K,List<V>> 构造为1_2|2_3|3_5格式的字符串
     * 该类型字符串无相同key的结构
	 * 
	 * @param Map
	 *            <K, List<V>> map map
	 * @return
	 */
	public static <K, V> String constructMapList2String(Map<K, List<V>> map) {
		if (CollectionUtil.isEmpty(map)) {
			return null;
		}
		StringBuffer sb = new StringBuffer();
		for (Map.Entry<K, List<V>> entry : map.entrySet()) {
			if (CollectionUtil.isEmpty(entry.getValue())) {
				continue;
			}
			if (sb.length() > 0) {
				sb.append(DELIMITER_BETWEEN_ITEMS);
			}
			sb.append(entry.getKey()).append(DELIMITER_INNER_ITEM).append(
					constructList2String(DELIMITER_INNER_ITEM, entry.getValue()));
		}
		return sb.toString();
	}
	
	/**
	 * 将格式如1_2_3|2_1_3的字符串解释成Map<T,Map<K,V>> 
	 * 该类型字符串无相同key的结构
	 * 
	 * @param str
	 * @return
	 */
	public static <T, K, V> Map<T, Map<K, V>> delimiterString2MapMap(String str, Class<T> t,
			Class<K> k, Class<V> v) {
		if (str != null && str.length() > 0) {
			String[] arr = str.split(DELIMITER_ARGS_ITEMS);
			Map<T, Map<K, V>> map = new HashMap<T, Map<K, V>>(arr.length);
			Map<K, V> subMap = null;
			T key = null;
			String[] subArr = null;
			for (String s : arr) {
				subArr = s.split(DELIMITER_INNER_ITEM);
				key = stringNumber2BasicTypes(subArr[0], t);
				if (map.get(key) == null) {
					subMap = new HashMap<K, V>();
					map.put(key, subMap);
				} else {
					subMap = map.get(key);
				}
				subMap.put(stringNumber2BasicTypes(subArr[1], k), stringNumber2BasicTypes(
						subArr[2], v));
			}
			return map;
		} else {
			return null;
		}
	}
	
	
	/**
	 * 将格式如1_2_3_3|2_1_3_2的字符串解释成Map<T,Map<K,V[]>> 
	 * 该类型字符串无相同key的结构
	 * @param str
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public static <T, K, V> Map<T, Map<K, V[]>> delimiterString2MapMapArray(String str, Class<T> t,
			Class<K> k, Class<V> v) {
		if (str != null && str.length() > 0) {
			String[] arr = str.split(DELIMITER_ARGS_ITEMS);
			Map<T, Map<K, V[]>> map = new HashMap<T, Map<K, V[]>>(arr.length);
			Map<K, V[]> subMap = null;
			T key = null;
			String[] subArr = null;
			for (String s : arr) {
				subArr = s.split(DELIMITER_INNER_ITEM);
				key = stringNumber2BasicTypes(subArr[0], t);
				if (map.get(key) == null) {
					subMap = new HashMap<K, V[]>();
					map.put(key, subMap);
				} else {
					subMap = map.get(key);
				}
				
				V[] valueArray = (V[]) Array.newInstance(v, subArr.length - 2);
				for (int i = 2; i < subArr.length; i++) {
					valueArray[i - 2] = stringNumber2BasicTypes(subArr[i], v);
				}
				subMap.put(stringNumber2BasicTypes(subArr[1], k) , valueArray );
			}
			return map;
		} else {
			return null;
		}
	}
	

	/**
	 * 将Map<T, Map<K, V>解释成串格式如1_2_3|3_3_4|2_1_3的字符 
	 * 该类型字符串无相同key的结构
	 * 
	 * @param map
	 * @return str
	 */
	public static <T, K, V> String constructMapMap2String(Map<T, Map<K, V>> map) {
		StringBuffer bf = null;
		if (map != null && map.size() > 0) {
			for (Map.Entry<T, Map<K, V>> entry : map.entrySet()) {
				Map<K, V> subMap = entry.getValue();
				if (!CollectionUtil.isEmpty(subMap)) {
					for (Map.Entry<K, V> subEntry : subMap.entrySet()) {
						if (subEntry.getValue() == null) {
							continue;
						}
						if (bf == null) {
							bf = new StringBuffer();
						} else {
							bf.append(DELIMITER_BETWEEN_ITEMS);
						}
						bf.append(entry.getKey()).append(DELIMITER_INNER_ITEM).append(
								subEntry.getKey()).append(DELIMITER_INNER_ITEM).append(
								subEntry.getValue());
					}
				}
			}
			return bf == null ? null : bf.toString();
		} else {
			return null;
		}
	}
	
	
	/**
	 * 将Map<T, Map<K, V[]>解释成串格式如1_2_3_4|3_3_4_4|2_1_3_4的字符 
	 * 该类型字符串无相同key的结构
	 * 
	 * @param map
	 * @return str
	 */
	public static <T, K, V> String constructMapMapArray2String(Map<T, Map<K, V[]>> map) {
		StringBuffer bf = null;
		if (map != null && map.size() > 0) {
			for (Map.Entry<T, Map<K, V[]>> entry : map.entrySet()) {
				Map<K, V[]> subMap = entry.getValue();
				if (!CollectionUtil.isEmpty(subMap)) {
					for (Map.Entry<K, V[]> subEntry : subMap.entrySet()) {
						if (subEntry.getValue() == null) {
							continue;
						}
						if (bf == null) {
							bf = new StringBuffer();
						} else {
							bf.append(DELIMITER_BETWEEN_ITEMS);
						}
						
						bf.append(entry.getKey()).append(DELIMITER_INNER_ITEM).append(
								subEntry.getKey());
						
						if(subEntry.getValue() != null && subEntry.getValue().length > 0){
							for(V temp : subEntry.getValue()){
								bf.append(DELIMITER_INNER_ITEM).append(temp);
							}
						}
					}
				}
			}
			return bf == null ? null : bf.toString();
		} else {
			return null;
		}
	}
	
	
	
	
	
	/**
	 * 把以1_2_3|2_3_4|3_5_6_7类似格式的字符串分解成HashMap<K,List<V[]> 
	 * 该类型字符串是相同key的结构
	 * 
	 * @param str
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public static <K, V> Map<K, List<V[]>> delimiterString2MapListArray(String str, Class<K> k,
			Class<V> v) {
		if (str != null && str.length() > 0) {
			String[] arr = str.split(DELIMITER_ARGS_ITEMS);
			Map<K, List<V[]>> map = new HashMap<K, List<V[]>>(arr.length);
			K key = null;
			String[] subArr = null;
			for (String s : arr) {
				subArr = s.split(DELIMITER_INNER_ITEM);
				key = stringNumber2BasicTypes(subArr[0], k);
				List<V[]> list = map.get(key);
				if (list == null) {
					list = new ArrayList<V[]>();
					map.put(key, list);
				}
				V[] valueArray = (V[]) Array.newInstance(v, subArr.length - 1);
				for (int i = 1; i < subArr.length; i++) {
					valueArray[i - 1] = stringNumber2BasicTypes(subArr[i], v);
				}
				list.add(valueArray);
			}
			return map;
		} else {
			return null;
		}
	}
	
	/**
	 * 把以1_2_3|2_3_4|3_5_6_7类似格式的字符串分解成HashMap<K,List<V[]>
	 * 该类型字符串是相同key的结构
	 * 
	 * @param str
	 * @return
	 */
	public static <K, V> String constructMapListArray2String(Map<K, List<V[]>> map) {
		StringBuilder bf = null;
		if (map != null && map.size() > 0) {
			for (K key : map.keySet()) {
				List<V[]> list = map.get(key);
				if (!CollectionUtil.isEmpty(list)) {
					for (int i = 0; i < list.size(); i++) {
						if (list.get(i) == null||list.get(i).length==0) {
							continue;
						}
						if (bf == null) {
							bf = new StringBuilder();
						} else {
							bf.append(DELIMITER_BETWEEN_ITEMS);
						}
						bf.append(key).append(DELIMITER_INNER_ITEM).append(
								constructArray2String(DELIMITER_INNER_ITEM, list.get(i)));
					}
				}
			}
			return bf == null ? null : bf.toString();
		} else {
			return null;
		}
	}
	public static long getMonthStartTime(Date dayTime) {
        Calendar c = Calendar.getInstance();
        c.setTime(dayTime);
        c.set(Calendar.DAY_OF_MONTH,1);
        c.set(Calendar.HOUR_OF_DAY, 0);
        c.set(Calendar.MINUTE, 0);
        c.set(Calendar.SECOND, 1);
        c.set(Calendar.MILLISECOND, 0);
        return c.getTimeInMillis();
    }
	
	public static long getMonthEndTime(Date dayTime) {
        Calendar c = Calendar.getInstance();
        c.setTime(dayTime);
        c.set(Calendar.DAY_OF_MONTH,c.getActualMaximum(Calendar.DAY_OF_MONTH));
        c.set(Calendar.HOUR_OF_DAY, 23);
        c.set(Calendar.MINUTE, 59);
        c.set(Calendar.SECOND, 59);
        return c.getTimeInMillis();
    }
	 public static String getTableName(String value)throws Exception{
		  Pattern p = Pattern.compile(CAPITAL);
		  StringBuffer sb = new StringBuffer();
		  List<Integer> intList = new ArrayList<Integer>();
		  for (int i = 1; i < value.length(); i++) {
			  if(p.matcher(value.substring(i, i+1)).matches()){
				  intList.add(i);
			  }
		  }
		  if(intList.size()>0){
			  for(int i = 0;i < intList.size();i++){
				  if(i==0){
				    sb.append(value.substring(0, intList.get(i)).toLowerCase()).append(DELIMITER_INNER_ITEM);
				  }else{
					sb.append(value.substring(intList.get(i-1), intList.get(i)).toLowerCase()).append(DELIMITER_INNER_ITEM);
				  }
			  }
			  sb.append(value.substring(intList.get(intList.size()-1)).toLowerCase());
		  }else{
			  sb.append(value);
		  }
		return sb.toString();
	  }
	 
	 /**
	  * 判断字符串是否为数字
	 * @param str
	 * @return
	 */
	public static boolean isNumeric(String str) {
		for (int i = 0; i < str.length(); i++) {
//			System.out.println(str.charAt(i));
			if (!Character.isDigit(str.charAt(i))) {
				return false;
			}
		}
		return true;
	}
	
	/**
	 * copy数组
	 * @param a
	 * @return
	 */
	public static int[][] copyArray(int[][] a){
		int [][] obj = new int[a.length][];
		for (int i = 0; i < a.length; i++) {
			int [] data = new int[a[i].length];
			for (int j = 0; j < a[i].length; j++) {
				data[j] = a[i][j];
			}
			obj[i] = data;
		}
		return obj;
	}
	
	/**
	 * 把两个数组叠加，相同属性的就相加
	 * @param a 
	 * @param b
	 * @return 全新的数组副本
	 */
	public static int[][] appendArray(int[][] a , int[][] b){
		int[][] temp = null;
		List<int[]> arrays = new ArrayList<int[]>();
		if(a != null){
			temp = copyArray(a);
			for(int[] t : temp){
				arrays.add(t);
			}
		}
		
		if(b != null){
			for(int[] tempb : b){
				boolean flag = false;
				for(int[] tempArray : arrays){
					if(tempArray[0] == tempb[0]){
						tempArray[1] = tempArray[1] + tempb[1];
						flag = true;
						break;
					}
				}
				if(!flag){
					int[] c = new int[tempb.length];
					for(int i=0 ; i<c.length ; i++){
						c[i] = tempb[i];
					}
					arrays.add(c);
				}
			}
		}
		
		int[][] result = new int[arrays.size()][];
		for(int i=0 ; i<arrays.size() ; i++){
			result[i] = arrays.get(i);
		}
		
		return result;
	}
	
	
}
