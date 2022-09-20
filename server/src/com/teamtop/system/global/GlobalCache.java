package com.teamtop.system.global;

import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.Properties.PropertiesTools;
import com.teamtop.util.cache.union.UC;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

/**
 * @author Sam
 * 公共数据缓存
 */
public class GlobalCache extends AbsServerEvent{
	//当前后端版本号
	private static String version = "";
	private static ConcurrentHashMap<Integer,GlobalData> globalMap = UC.reg("globalMap", new ConcurrentHashMap<Integer,GlobalData>());//公共数据缓存
	private static Logger logger = LoggerFactory.getLogger(GlobalCache.class);
	@Override
	public void startServer() throws RunServerException {
		try {
			version = PropertiesTools.getVersion();
			List<GlobalData> findMany = GlobalDataDao.getIns().findMany();
			if(findMany!=null){
				for (GlobalData globalData : findMany) {
					if(!globalMap.containsKey(globalData.getType())){
						//有可能初始化这个之前就被其他地方单独查询并修改过某个type
						globalMap.put(globalData.getType(), globalData);
					}
				}
			}
		} catch (Exception e) {
			throw new RunServerException(e, "");
		}
	}
	
	@Override
	public void shutdownServer() {
		try {
			//跨服活动缓存
			doSync();
		} catch (Exception e) {
			logger.error(LogTool.exception(e));
		}
	}
	
	/**
	 * 把内存的数据同步到数据库
	 */
	public static void doSync(){
		try {
			Map<Integer, GlobalData> globalMap = getGlobalMap();
			Iterator<Integer> iterator = globalMap.keySet().iterator();
			int zoneid = GameProperties.getFirstZoneId();
			while(iterator.hasNext()){
				Integer next = iterator.next();
				GlobalData globalData = globalMap.get(next);
				GlobalDataDao.getIns().update(globalData,zoneid);
			}
		} catch (Exception e) {
			logger.error(LogTool.exception(e));
		}
	}
	/**
	 * 同步某个globaldata入库
	 * @param data
	 */
	public static void doSync(GlobalData data){
		try {
			GlobalDataDao.getIns().update(data,GameProperties.getFirstZoneId());
		} catch (Exception e) {
			logger.error(LogTool.exception(e));
		}
	}
	
	/**
	 * 拿到缓存
	 * @param id
	 * @return
	 */
	public static GlobalData getGlobalData(int type){
		GlobalData globalData = globalMap.get(type);
		try {
			if(globalData==null){
				globalData = GlobalDataDao.getIns().find(type,GameProperties.getFirstZoneId());
				if(globalData!=null){
					if(globalData.getContent().equals("")){
						String data = init(type);
						globalData.setContent(data);
					}
					globalMap.put(type, globalData);
				}else{
					//初始化数据
					globalData = new GlobalData();
					globalData.setId(type);
					globalData.setType(type);
					globalData.setSyncTime(TimeDateUtil.getCurrentTime());
					String data = init(type);
					globalData.setContent(data);
					globalMap.put(type, globalData);
					GlobalDataDao.getIns().insert(globalData,GameProperties.getFirstZoneId());
				}
			}else{
				if(globalData.getContent()!=null&& globalData.getContent().equals("")){
					String data = init(type);
					globalData.setContent(data);
				}
			}
		} catch (Exception e) {
			logger.error(LogTool.exception(e));
		}
		return globalMap.get(type);
	}
	
	/**
	 * 初始化
	 * @param flag
	 * @return
	 */
	public static String init(int flag){
		try {
			StringBuffer sb = new StringBuffer();
			return sb.toString();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "";
	}

	/**
	 * 获取数据
	 * @return
	 */
	public static Map<Integer, GlobalData> getGlobalMap(){
		return globalMap;
	}

	public static String getVersion() {
		return version;
	}
	public static void setVersion(String version) {
		GlobalCache.version = version;
	}
}
