package com.teamtop.system.event.backstage.events.flowMMCache;

import java.lang.reflect.Array;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Queue;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedQueue;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.system.event.backstage.AbsBackstageEvent;
import com.teamtop.system.event.backstage.dao.BackstageDao;
import com.teamtop.util.cache.LRUCache;
import com.teamtop.util.cache.LRUMap;
import com.teamtop.util.cache.union.SysEnum;
import com.teamtop.util.cache.union.UC;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;
/**
 * 游戏内缓存
 * @author Administrator
 *
 */
public class FlowMMCacheEvent extends AbsBackstageEvent{
	private static FlowMMCacheEvent ins;
	public static FlowMMCacheEvent getIns() {
		if (ins == null)
			ins = new FlowMMCacheEvent();
		return ins;
	}
	/**
	 * 自增id
	 */
	public static final String ID_INCRE = "(null,";
	/**
	 * 逗号
	 */
	public static final String QU = ",";
	/**
	 * 右引号
	 */
	public static final String RIGHT = ")";
	
	
	@Override
	public void shutdownServer() {
		executeOneHour(TimeDateUtil.getCurrentTime());
	}

	@Override
	public void executeOneHour(int currTime) {
		initCacheFlow();
		ConcurrentLinkedQueue<B_FlowMMCache> flowMMCacheModelList = FlowMMCache.getFlowMMCacheModelList();
		ConcurrentHashMap<Integer, ConcurrentLinkedQueue<B_FlowMMCache>> map = new ConcurrentHashMap<Integer, ConcurrentLinkedQueue<B_FlowMMCache>>();
		map.put(GameProperties.getFirstZoneId(), flowMMCacheModelList);
		try {
			BackstageDao.insertBatch(map);
		} catch (Exception e) {
			LogTool.error(e, this, "executeOneHour Exception!");
		} finally {
			if(flowMMCacheModelList != null) 
				flowMMCacheModelList.clear();
		}
	}
	
	@Override
	public void executeOneDay(int currTime) {
		if(GameProperties.gmFlag) return;
		try {
			/*List<B_FlowMMCache> mmCache = HoutaiDao.getIns().getMMCache(GameProperties.getFirstZoneId(), currTime - TimeDateUtil.ONE_DAY_INT);
			StringBuilder sbAll = new StringBuilder();
			if(mmCache!=null){
				Map<String, List<B_FlowMMCache>> map = new HashMap<String, List<B_FlowMMCache>>();
				for(B_FlowMMCache mm:mmCache){
					String key = mm.getCacheType() + "_" + mm.getCacheName();
					List<B_FlowMMCache> list = map.get(key);
					if(list==null){
						list = new ArrayList<B_FlowMMCache>();
						map.put(key, list);
					}
					list.add(mm);
				}
				Map<String, List<B_FlowMMCache>> matchMap = new HashMap<String, List<B_FlowMMCache>>();
				Iterator<Entry<String, List<B_FlowMMCache>>> it = map.entrySet().iterator();
				while(it.hasNext()){
					Entry<String, List<B_FlowMMCache>> next = it.next();
					List<B_FlowMMCache> value = next.getValue();
					int last1 = 0;
					float per1 = 0;
					int last2 = 0;
					float per2 = 0;
					int last3 = 0;
					float per3 = 0;
					for(B_FlowMMCache mm:value){
						if(last1>0){
							float per = mm.getSize1() - last1;
							per1 += per;
						}
						last1 = mm.getSize1();
						if(last2>0){
							float per = mm.getSize2() - last2;
							per2 += per;
						}
						last2 = mm.getSize2();
						if(last3>0){
							float per = mm.getSize3() - last3;
							per3 += per;
						}
						last3 = mm.getSize3();
					}
					if(per1>50 || per2>500 || per3>2000){
						matchMap.put(next.getKey(), value);
					}
				}
				Iterator<Entry<String, List<B_FlowMMCache>>> mit = matchMap.entrySet().iterator();
				while(mit.hasNext()){
					Entry<String, List<B_FlowMMCache>> next = mit.next();
					StringBuilder sb = new StringBuilder();
					sb.append("name:").append(next.getKey()).append(":").append("\r\n");
					for(B_FlowMMCache mm:next.getValue()){
						sb.append(TimeDateUtil.printOnlyTime(mm.getTime())).append(",size1:").append(mm.getSize1()).append(",size2:").append(mm.getSize2()).append(",size3:").append(mm.getSize3()).append("\r\n");
					}
					LogTool.info(sb.toString(),this);
					sbAll.append(sb);
				}
			}
			if(sbAll.length()>0){
				QQMailCache.sendWarn(QQMailEnum.MMCACHE, sbAll.toString());
			}*/
		} catch (Exception e) {
			LogTool.error(e,this,"executeOneDay Exception!");
		}
	}

	/**
	 * 遍历缓存管理中的缓存，计算大小并入流水，不需要查看调用者信息
	 */
	public static void initCacheFlow(){
		//UC缓存
		Map<SysEnum, ConcurrentHashMap<Integer, Object>> sm = UC.getSm();
//		Iterator<Entry<SysEnum, ConcurrentHashMap<Integer, Object>>> it = sm.entrySet().iterator();
//		while(it.hasNext()){
//			Entry<SysEnum, ConcurrentHashMap<Integer, Object>> next = it.next();
//			SysEnum key = next.getKey();
//			String name = key.name();
//			ConcurrentHashMap<Integer, Object> value = next.getValue();
//			Iterator<Entry<Integer, Object>> vit = value.entrySet().iterator();
//			while(vit.hasNext()){
//				Entry<Integer, Object> vnext = vit.next();
//				Integer k2 = vnext.getKey();
//				Object v2 = vnext.getValue();
//				String countCacheSize = countCacheSize(v2);
//				addFlowVigor( name, countCacheSize);
//			}
//		}
		//其他缓存
		ConcurrentHashMap<String, Object> otherCacheMap = FlowMMCache.getOtherCacheMap();
//		Iterator<Entry<String, Object>> oit = otherCacheMap.entrySet().iterator();
//		while(oit.hasNext()){
//			Entry<String, Object> next = oit.next();
//			String countCacheSize = countCacheSize(next.getValue());
//			addFlowVigor(next.getKey(),"", 2, "", countCacheSize);
//		}
		Map<String, Object> cacheMap = UC.getCacheMap();
		Iterator<Entry<String, Object>> iterator = cacheMap.entrySet().iterator();
		while(iterator.hasNext()){
			Entry<String, Object> next = iterator.next();
			String name = next.getKey();
			Object value = next.getValue();
			String countCacheSize = countCacheSize(value);
			int sizeAll = UC.getSize(value);
			addFlowVigor( name, countCacheSize, sizeAll);
		}
	}
	
	/**
	 * 计算缓存每层map或list的大小
	 * @param name 缓存名称
	 * @return 以1:java.util.HashMap,1;2:java.util.HashMap,2;3:java.util.ArrayList,2;3:java.util.ArrayList,2;格式返回
	 * 		   冒号前的数字表示层数，冒号后面是'类,大小'
	 */
	private static String countCacheSize(Object obj){
		if(obj==null) return "0";
		StringBuffer sb = new StringBuffer();
		countSize(obj, 1, sb);
		return sb.toString();
	}
	
	public static boolean countSize(Object obj, int num, StringBuffer sb){
		if(obj==null) return false;
		if(obj instanceof Map ){
			//Map类型
			sb.append(num+":");
			sb.append(obj.getClass().getName()+",");
			Map<?,?> map = (Map<?,?>) obj;
			sb.append(map.size()+"_");
			Iterator<?> iter = map.keySet().iterator();
			while(iter.hasNext()){
				Object tempKey = iter.next();
				boolean countSize = countSize(map.get(tempKey), num+1, sb);
				if(!countSize) break;
			}
		}else if(obj instanceof List){
			//List类型
			sb.append(num+":");
			sb.append(obj.getClass().getName()+",");
			List<?> list = (List<?>) obj;
			sb.append(list.size()+"_");
			Iterator<?> iter = list.iterator();
			while(iter.hasNext()){
				boolean countSize = countSize(iter.next(), num+1, sb);
				if(!countSize) break;
			}
		}else if(obj instanceof Set){
			//Set类型
			sb.append(num+":");
			sb.append(obj.getClass().getName()+",");
			Set<?> set = (Set<?>) obj;
			sb.append(set.size()+"_");
			Iterator<?> iter = set.iterator();
			while(iter.hasNext()){
				boolean countSize = countSize(iter.next(), num+1, sb);
				if(!countSize) break;
			}
		}else if(obj instanceof Queue){
			//Queue类型
			sb.append(num+":");
			sb.append(obj.getClass().getName()+",");
			Queue<?> set = (Queue<?>) obj;
			sb.append(set.size()+"_");
			Iterator<?> iter = set.iterator();
			while(iter.hasNext()){
				boolean countSize = countSize(iter.next(), num+1, sb);
				if(!countSize) break;
			}
		}else if(obj.getClass().isArray()){
			//数组类型
			sb.append(num+":");
			sb.append(obj.getClass().getName()+",");
			sb.append(Array.getLength(obj)+"_");
		}else if(obj instanceof LRUCache ){
			//LRUCache类型
			sb.append(num+":");
			sb.append(obj.getClass().getName()+",");
			LRUCache<?,?> map = (LRUCache<?,?>) obj;
			LRUMap<?, ?> lruMap = map.get();
			sb.append(lruMap.size()+"_");
			Iterator<?> iter = lruMap.keySet().iterator();
			while(iter.hasNext()){
				Object tempKey = iter.next();
				boolean countSize = countSize(lruMap.get(tempKey), num+1, sb);
				if(!countSize) break;
			}
		}else{
			return false;
		}
		return true;
	}
	
	/**
	 * 记录缓存流水
	 * @param cacheName 缓存名称
	 * @param caller 调用者
	 * @param sizeStr 大小字符串，以1:java.util.HashMap,1;格式，冒号前的数字表示层数，冒号后面是'类,大小'
	 * @return
	 */
	public static void addFlowVigor( String cacheName, String sizeStr, int sizeAll){
		B_FlowMMCache mmCacheFlowModel = new B_FlowMMCache();
		mmCacheFlowModel.setTime(TimeDateUtil.getCurrentTime());
		mmCacheFlowModel.setCacheName(cacheName);
		mmCacheFlowModel.setSizeAll(sizeAll);
		
		Map<String, String> cacheNameMap = UC.getCacheNameMap();
		String className = cacheNameMap.get( cacheName);
		mmCacheFlowModel.setClassName(className);
//		mmCacheFlowModel.setCacheType(cacheType);
//		mmCacheFlowModel.setOperType(operType);
//		mmCacheFlowModel.setCaller(caller);
		//解析大小字符串
		String[] tempArr = sizeStr.split("\\_");
		for(int i=0; i<tempArr.length; i++){
			String[] tempMapArr = null;
			String[] tempValue = null;
			try{
				if("".equals(tempArr[i])){
					continue;
				}else{
					tempMapArr = tempArr[i].split("\\:");
				}
				if(tempMapArr==null || 0==tempMapArr.length){
					continue;
				}
				int key = Integer.parseInt(tempMapArr[0]);
				tempValue = tempMapArr[1].split("\\,");
				switch(key){
					case 1:
						//第一层类与大小
						mmCacheFlowModel.setCacheType1(tempValue[0]);
						int size1 = mmCacheFlowModel.getSize1();
						mmCacheFlowModel.setSize1(size1 + Integer.parseInt(tempValue[1]));
						break;
					case 2:
						//第二层类与大小
						mmCacheFlowModel.setCacheType2(tempValue[0]);
						int size2 = mmCacheFlowModel.getSize2();
						mmCacheFlowModel.setSize2(size2 + Integer.parseInt(tempValue[1]));
						break;
					case 3:
						//第三层类与大小
						mmCacheFlowModel.setCacheType3(tempValue[0]);
						int size3 = mmCacheFlowModel.getSize3();
						mmCacheFlowModel.setSize3(size3 + Integer.parseInt(tempValue[1]));
						break;
					case 4:
						//第四层类与大小
						mmCacheFlowModel.setCacheType4(tempValue[0]);
						int size4 = mmCacheFlowModel.getSize4();
						mmCacheFlowModel.setSize4(size4 + Integer.parseInt(tempValue[1]));
						break;
					default:
						break;
				}
			}catch(Exception e){
				LogTool.error(e,FlowMMCacheEvent.class,"sizeStr:"+sizeStr);
			}
		}
		FlowMMCache.addFlowVigor(mmCacheFlowModel);
	}
}
