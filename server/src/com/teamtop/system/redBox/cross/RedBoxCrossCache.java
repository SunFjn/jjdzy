package com.teamtop.system.redBox.cross;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.log.LogTool;

public class RedBoxCrossCache extends AbsServerEvent{
	
	/*** 红包唯一id,需要入库记录	 */
	private static AtomicLong boxUnitId = new AtomicLong();
	/**
	 * partid=》红包唯一id=》红包
	 */
	private static ConcurrentHashMap<Integer,ConcurrentHashMap<Long, RedBoxCross>>  redBoxMap=new ConcurrentHashMap<>();
	
	

	public static ConcurrentHashMap<Integer, ConcurrentHashMap<Long, RedBoxCross>> getRedBoxMap() {
		return redBoxMap;
	}

	public static void setRedBoxMap(ConcurrentHashMap<Integer, ConcurrentHashMap<Long, RedBoxCross>> redBoxMap) {
		RedBoxCrossCache.redBoxMap = redBoxMap;
	}
	
	public static long getAndAddBattleUnitId(){
		return boxUnitId.getAndIncrement();
	}

	/**
	 * 查找数据
	 * @author lobbyer
	 * @date 2016年8月25日
	 */
	public static void findData() {
		try {
			List<RedBoxCross> redBoxCrossList = RedBoxCrossDao.getIns().findAllJoinerList();
			if(redBoxCrossList != null) {
				for(RedBoxCross redBoxCross:redBoxCrossList) {
			        int partId = redBoxCross.getBelongPartid();
			        
					ConcurrentHashMap<Long, RedBoxCross> concurrentHashMap = RedBoxCrossCache.getRedBoxMap().get(partId);
					if (concurrentHashMap==null) {
						concurrentHashMap=new ConcurrentHashMap<>();
						RedBoxCrossCache.getRedBoxMap().put(partId, concurrentHashMap);
					}
					concurrentHashMap.put(redBoxCross.getBoxid(), redBoxCross);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, "startServer findInfo exception!");
		}
	}

	
	@Override
	public void startServer() throws RunServerException {
		findData();
		long maxid=0;
		for (Integer partid:redBoxMap.keySet()) {
			ConcurrentHashMap<Long, RedBoxCross> concurrentHashMap = redBoxMap.get(partid);
			for (long boxunitid:concurrentHashMap.keySet()) {
				if (boxunitid>maxid) {
					maxid=boxunitid;
				}
			}
		}
		boxUnitId.set(maxid+1);
	}
	
	/**
	 * 保存数据
	 * @author lobbyer
	 * @date 2016年8月25日
	 */
	public static void saveData() {
		try {
			List<RedBoxCross> AllRedBoxCross = new ArrayList<RedBoxCross>();
			Set<Integer> keySet = RedBoxCrossCache.getRedBoxMap().keySet();
			for (int partId : keySet) {
				ConcurrentHashMap<Long, RedBoxCross> concurrentHashMap = RedBoxCrossCache.getRedBoxMap().get(partId);
				for(RedBoxCross redBoxCross:concurrentHashMap.values()) {
					AllRedBoxCross.add(redBoxCross);
				}
			}
			RedBoxCrossDao.getIns().insertOnDuplicateBatch(AllRedBoxCross, null, GameProperties.getFirstZoneId());
		} catch (Exception e) {
			LogTool.error(e, "saveData update Exception!");
		}
	}

	@Override
	public void shutdownServer() {
		try {
			saveData();
		} catch (Exception e) {
			LogTool.error(e, this, " shutdownServer CrossRedBoxCache");
		}
	}

}
