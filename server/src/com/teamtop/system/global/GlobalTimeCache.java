package com.teamtop.system.global;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;

public class GlobalTimeCache extends AbsServerEvent {
	@Override
	public void startServer() throws RunServerException {
		/*int type = GlobalConst.GM_ADDTIME.ordinal();
		try {
			GlobalData data = GlobalDataDao.getIns().find(type);
//			Map<Integer, GlobalData> globalMap = GlobalCache.getGlobalMap();
//			if(data == null) {
//				GlobalData globalData = globalMap.get(type);
//				globalData = new GlobalData();
//				globalData.setType(type);
//				globalData.setContent(String.valueOf(0));
//				globalMap.put(type, globalData);
//				GlobalDataDao.getIns().insert(globalData);
//				return;
//			}
			//String timeStr = data.getContent();
			//TimeDateUtil.addTime = Integer.parseInt(timeStr);
		} catch (Exception e) {
			throw new RunServerException(e, "");
		}*/
	}
	
	@Override
	public void shutdownServer() {
		/*int type = GlobalConst.GM_ADDTIME;
		try {
			Map<Integer, GlobalData> globalMap = GlobalCache.getGlobalMap();
			GlobalData globalData = globalMap.get(type);
			if(globalData==null){
				logger.warn(LogTool.getmsg("globaltime shutdown globalData is null"));
				return;
			}
			globalData.setContent(String.valueOf(TimeDateUtil.addTime));
		} catch (Exception e) {
			logger.error(LogTool.exception(e));
		}*/
	}

}
