package com.teamtop.util.cache.union;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Queue;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;
/**
 * 统一缓存管理<br/>
 * 所有缓存使用此类管理get和set<br/>
 * 目前仅提供监控功能，不提供类似LRU的功能
 * @author Administrator
 *
 */
public class UC {
	@Deprecated
	private static Map<SysEnum, ConcurrentHashMap<Integer,Object>> sm = new ConcurrentHashMap<SysEnum, ConcurrentHashMap<Integer,Object>>();
	/**
	 * 所有私有缓存
	 */
	private static Map<String, Object> cacheMap = new ConcurrentHashMap<>();
	/**
	 * 记录私有缓存所在的类  key:自定义缓存key  value:注册缓存类名
	 */
	private static Map<String, String> cacheNameMap = new ConcurrentHashMap<>();

	private static Map<String, Integer> nameCountMap = new ConcurrentHashMap<>();
	/**
	 * 注册私有缓存，用于监控
	 * @param name 模块名字
	 * @param t 缓存对象，不能初始化为null，支持的类型,eg：<br>
	 * new HashMap< Integer, List< Struct_XXX>>()<br>
	 * new ConcurrentHashMap< Integer, ActivityInfo>()<br>
	 * new HashSet< Integer>()<br>
	 * new ArrayList< ActivityNoticeItemModel>()<br>
	 * new ConcurrentLinkedQueue< BagBugItem>()<br>
	 * 线程安全List：Collections.synchronizedList(new ArrayList< GodOfWarRank>())<br>
	 * new TreeSet< SoloRunRank>
	 * @return
	 */
	public static <T> T reg(String name,T t){
		try {
			StackTraceElement stack[] = (new Throwable()).getStackTrace();   
			StackTraceElement ste=stack[1];
			String classUrl = ste.getClassName();
			String[] split = classUrl.split("\\.");
			String className = split[split.length-1];
			
			if (CommonUtil.isNull(name)) {
				throw new RuntimeException("缓存名字不能为空！！！className:"+className);
			}
			if (cacheMap.containsKey(name)) {
				// throw new RuntimeException("缓存名字重复！！！，name=" + name+" className:"+className);
				Integer count = nameCountMap.get(name);
				if (count == null) {
					count = 0;
				}
				count += 1;
				nameCountMap.put(name, count);
				name = name + count;
			}
			if ((!(t instanceof List)) && (!(t instanceof Map)) && (!(t instanceof Set)) && (!(t instanceof Queue))) {
				throw new RuntimeException("非法缓存类型，name=" + name+" className:"+className+" class:"+t.getClass());
			}
			setCacheNameMap(name, className);
			cacheMap.put(name, t);
		} catch (Exception e) {
			LogTool.error(e, UC.class, "name:"+name);
		}
		return t;
	}

	public static String getAllCacheSize() {
		StringBuilder sb = new StringBuilder();
		Set<String> cacheNameSet = new HashSet<>(cacheMap.keySet());
		Iterator<String> iterator = cacheNameSet.iterator();
		for (; iterator.hasNext();) {
			String name = iterator.next();
			Object obj = cacheMap.get(name);
//			if (obj == null) {
//				continue;
//			}
//			int size = 0;
//			if (obj instanceof List) {
//				size = ((List) obj).size();
//			} else if (obj instanceof Map) {
//				size = ((Map) obj).size();
//			} else if (obj instanceof Set) {
//				size = ((Set) obj).size();
//			} else if (obj instanceof TreeSet) {
//				size = ((TreeSet) obj).size();
//			}
			int size = getSize(obj);
			sb.append("name=").append(name).append(", ").append(size).append("\n");
		}
		return sb.toString();
	}
	
	public static int getSize(Object obj){
		if (obj == null) {
			return 0;
		}
		int size = 0;//首层数量
		int size2 = 0;//内层总数量
		if (obj instanceof List) {
			size = ((List) obj).size();
			if( size>0){
				List tempObj = (List) obj;
				for( int i=0; i<size; i++){
					Object temp=tempObj.get( i);
					size2 = size2 + getSize( temp);
				}
			}
		} else if (obj instanceof Map) {
			size = ((Map) obj).size();
			if( size>0){
				Map tempObj = (Map) obj;
				Collection mapValues = tempObj.values();
				for(Object temp:tempObj.values()){
					size2 = size2 + getSize( temp);
				}
			}
		} else if (obj instanceof Set) {
			size = ((Set) obj).size();
			if( size>0){
				Set tempObj = (Set) obj;
				for(Object temp:tempObj){
					size2 = size2 + getSize( temp);
				}
			}
		} else if (obj instanceof Queue) {
			size = ((Queue) obj).size();
			if( size>0){
				Queue tempObj = (Queue) obj;
				for(Object temp:tempObj){
					size2 = size2 + getSize( temp);
				}
			}
		} else if (obj.getClass().isArray()){
			//数组类型
			size = Array.getLength(obj);
		}
		if( size2>0)//取最里层的数量
			size=size2;
		return size;
	}
	
	/**
	 * 注册缓存
	 * @param SysEnum
	 * @param name
	 * @param value
	 *//*
	public static void regCache(SysEnum SysEnum,int name,Object value){
		StackTraceElement stack[] = (new Throwable()).getStackTrace();   
		StackTraceElement ste=stack[1];   
		String className = ste.getClassName();
//		System.err.println(className);
		FlowMMCache.regCacheName(className, SysEnum, name);
		ConcurrentHashMap<Integer, Object> map2 = sm.get(SysEnum);
		if(map2==null){
			map2 = new ConcurrentHashMap<Integer, Object>();
			sm.put(SysEnum, map2);
		}
		map2.put(name, value);
	}*/
	/**
	 * 获取get
	 * @param SysEnum 各系统枚举
	 * @param name 自定义缓存名字
	 * @return
	 */
	@SuppressWarnings("unchecked")
	@Deprecated
	public static <V> V get(SysEnum SysEnum,int name){
		return (V) sm.get(SysEnum).get(name);
	}
	/**
	 * 获取第一层key对应的value，适用于缓存是map结构
	 * @param SysEnum 各系统枚举
	 * @param name 自定义缓存名字
	 * @param k key值
	 * @return
	 */
	@SuppressWarnings("unchecked")
	@Deprecated
	public static <K,V> V getMap(SysEnum SysEnum,int name,K k){
		Object object = sm.get(SysEnum).get(name);
		Map<K, V> map = (Map<K, V>) object;
		V v = map.get(k);
		if(v==null){
			//配合需要入库的缓存配置，是否在查的时候进行DB查询
			if(UCTriggerCache.findFromDB(SysEnum+""+name)){
				AbsUCTrigger<?> trigger = UCTriggerCache.getTrigger(SysEnum+""+name);
				v = (V) trigger.loadOne(k);
				map.put(k, v);
			}
		}
		return v; 
	}
	/**
	 * set map结构的缓存数据
	 * @param SysEnum
	 * @param name
	 * @param k
	 * @param v
	 */
	@SuppressWarnings("unchecked")
	@Deprecated
	public static <K,V> void putMap(SysEnum SysEnum,int name,K k,V v){
		Object object = sm.get(SysEnum).get(name);
		Map<K, V> map = (Map<K, V>) object;
		map.put(k, v);
	}
	
	/**
	 * 清除缓存(只能清除Map对象的数据，其它对象会导致强类型转换错误)
	 * @param SysEnum
	 * @param name
	 */
	@SuppressWarnings("rawtypes")
	@Deprecated
	public static void clearMap(SysEnum SysEnum,int name){
		Map map = (Map)sm.get(SysEnum).get(name);
		map.clear();
	}
	@Deprecated
	public static Map<SysEnum, ConcurrentHashMap<Integer, Object>> getSm() {
		return sm;
	}
	public static Map<String, String> getCacheNameMap() {
		return cacheNameMap;
	}
	public static void setCacheNameMap(Map<String, String> cacheNameMap) {
		UC.cacheNameMap = cacheNameMap;
	}
	public static void setCacheNameMap( String nameCache, String nameClass) {
		cacheNameMap.put(nameCache, nameClass);
	}
	public static Map<String, Object> getCacheMap() {
		return cacheMap;
	}

	public static void main(String[] args) {
//		Map<Long, HashMap<Long, HashMap<Long, Integer>>> hashMapHashMapHashMap = UC.reg("hashMapHashMapHashMap", new HashMap<Long, HashMap<Long, HashMap<Long, Integer>>>());
//		HashMap<Long, Integer> mapLongInt = new HashMap<>();
//		mapLongInt.put( 1l, 1);mapLongInt.put( 2l, 1);mapLongInt.put( 3l, 1);
//		HashMap<Long, HashMap<Long, Integer>> mapLongMap1 = new HashMap<>();HashMap<Long, HashMap<Long, Integer>> mapLongMap2 = new HashMap<>();
//		mapLongMap1.put( 1L, mapLongInt);mapLongMap1.put( 2L, mapLongInt);mapLongMap2.put( 1L, mapLongInt);mapLongMap2.put( 2L, mapLongInt);
//		hashMapHashMapHashMap.put( 1L, mapLongMap1);hashMapHashMapHashMap.put( 2L, mapLongMap2);
		
//		Map<Long, HashMap<Long, List<Integer>>> hashMapHashMapList = UC.reg("hashMapHashMapList", new HashMap<Long, HashMap<Long, List<Integer>>>());
		List<Integer> listInteger = new ArrayList<>(); listInteger.add(1);listInteger.add(2);listInteger.add(3);
//		HashMap<Long, List<Integer>> mapLongListInt = new HashMap<>();
//		mapLongListInt.put( 1l, listInteger);mapLongListInt.put( 2l, listInteger);
//		hashMapHashMapList.put( 1l, mapLongListInt);
//		
//		Map<Long, HashMap<Long, Friend>> concurrentHashMap = UC.reg("concurrentHashMap", new ConcurrentHashMap<Long, HashMap<Long, Friend>>());
//		HashMap<Long, Friend> mapLongFriend = new HashMap<>();  mapLongFriend.put( 1l, new Friend()); mapLongFriend.put( 2l, new Friend());
//		concurrentHashMap.put( 1l, mapLongFriend);concurrentHashMap.put( 2l, mapLongFriend);
//		
//		Set< Integer> set = UC.reg("set", new HashSet< Integer>());
//		set.add( 1);set.add( 2);
//		
//		Set< List<Integer>> setList = UC.reg("setList", new HashSet< List<Integer>>());
//		List<Integer> listInteger2 = new ArrayList<>(); listInteger.add(1);listInteger.add(2);listInteger.add(3);
//		setList.add( listInteger);setList.add( listInteger2);
//		
//		List< Friend> arrayList = UC.reg("arrayList", new ArrayList< Friend>());
//		arrayList.add( new Friend());arrayList.add( new Friend());
//		
//		List< ArrayList< ArrayList< Integer>>> arrayListArrayList = UC.reg("arrayListArrayList", new ArrayList< ArrayList<  ArrayList< Integer>>>());
//		ArrayList< ArrayList< Integer>> listListInteger = new ArrayList< ArrayList< Integer>>();
//		ArrayList<Integer> arrayListInteger = new ArrayList<>(); arrayListInteger.add(1);arrayListInteger.add(2);arrayListInteger.add(3);
//		listListInteger.add( arrayListInteger);listListInteger.add( arrayListInteger);
//		arrayListArrayList.add(listListInteger);
//		
//		Queue< Integer> concurrentLinkedQueue = UC.reg("concurrentLinkedQueue", new ConcurrentLinkedQueue< Integer>());
//		concurrentLinkedQueue.add(1);concurrentLinkedQueue.add(1);concurrentLinkedQueue.add(2);
//		
//		Queue< ArrayList< Friend>> concurrentLinkedQueueArrayList = UC.reg("concurrentLinkedQueueArrayList", new ConcurrentLinkedQueue< ArrayList< Friend>>());
//		ArrayList< Friend> listFri = new ArrayList< Friend>(); listFri.add( new Friend());listFri.add( new Friend());
//		concurrentLinkedQueueArrayList.add(listFri);concurrentLinkedQueueArrayList.add(listFri);
//		
//		List< Friend> synchronizedList = UC.reg("synchronizedList", Collections.synchronizedList(new ArrayList< Friend>()));
//		synchronizedList.add( new Friend());synchronizedList.add( new Friend());
//		
//		Set< Integer> treeSet = UC.reg("treeSet", new TreeSet< Integer>());
//		treeSet.add( 1);treeSet.add( 2);
//		
//		System.out.println("一共："+getAllCacheSize());
	}
}
