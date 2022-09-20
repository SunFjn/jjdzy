package com.teamtop.system.activity.ativitys.yuanXiao;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossCache;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.main.RunServerException;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.yuanXiao.model.YuanXiaoCrossDao;
import com.teamtop.system.activity.ativitys.yuanXiao.model.YuanXiaoCrossJoiner;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.log.LogTool;

public class YuanXiaoCrossSyscache extends AbsServerEvent{
	/**
	 * 参与者缓存 分区id-玩家id-参加数据
	 */
	private static ConcurrentHashMap<Integer,ConcurrentHashMap<Long, YuanXiaoCrossJoiner>> yuanXiaoCrossMap =new ConcurrentHashMap<Integer,ConcurrentHashMap<Long,  YuanXiaoCrossJoiner>>();

	
	public static ConcurrentHashMap<Integer, ConcurrentHashMap<Long, YuanXiaoCrossJoiner>> getYuanXiaoCrossMap() {
		return yuanXiaoCrossMap;
	}

	public static void setYuanXiaoCrossMap(
			ConcurrentHashMap<Integer, ConcurrentHashMap<Long, YuanXiaoCrossJoiner>> yuanXiaoCrossMap) {
		YuanXiaoCrossSyscache.yuanXiaoCrossMap = yuanXiaoCrossMap;
	}


	@Override
	public void startServer() throws RunServerException {
		
		try {
			findData();
			
		
		} catch (Exception e) {
			LogTool.error(e, "YuanXiaoCrossSyscache startServer findInfo exception!");
		}
	}
	
	/**
	 * 查找数据
	 * @author lobbyer
	 * @date 2016年8月25日
	 */
	public static void findData() {
		try {
			List<YuanXiaoCrossJoiner> joinerList = YuanXiaoCrossDao.getIns().findAllJoinerList();
			if(joinerList != null) {
				for(YuanXiaoCrossJoiner joiner:joinerList) {
			        int partId = CrossCache.getPartId(joiner.getBelongZoneid());
			        joiner.setBelongPartid(partId);
					ConcurrentHashMap<Long, YuanXiaoCrossJoiner> concurrentHashMap = YuanXiaoCrossSyscache.getYuanXiaoCrossMap().get(partId);
					if (concurrentHashMap==null) {
						concurrentHashMap=new ConcurrentHashMap<>();
						YuanXiaoCrossSyscache.getYuanXiaoCrossMap().put(partId, concurrentHashMap);
					}
					concurrentHashMap.put(joiner.getHid(), joiner);
					
				}
			}
		} catch (Exception e) {
			LogTool.error(e, "crossKing startServer findInfo exception!");
		}
	}
	
	/**
	 * 保存数据
	 * @author lobbyer
	 * @date 2016年8月25日
	 */
	public static void saveData() {
		try {
			List<YuanXiaoCrossJoiner> AllJoinerList = new ArrayList<YuanXiaoCrossJoiner>();
			Set<Integer> keySet = YuanXiaoCrossSyscache.getYuanXiaoCrossMap().keySet();
			for (int partId : keySet) {
				ConcurrentHashMap<Long, YuanXiaoCrossJoiner> concurrentHashMap = YuanXiaoCrossSyscache.getYuanXiaoCrossMap().get(partId);
				for(YuanXiaoCrossJoiner yuanXiaoCrossJoiner:concurrentHashMap.values()) {
					
					AllJoinerList.add(yuanXiaoCrossJoiner);
				}
			}
			YuanXiaoCrossDao.getIns().insertOnDuplicateBatch(AllJoinerList, null, GameProperties.getFirstZoneId());
		} catch (Exception e) {
			LogTool.error(e, "saveData update Exception!");
		}
	}
	
	@Override
	public void shutdownServer() {
		saveData();
	}
	
	

}
