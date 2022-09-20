package com.teamtop.system.openDaysSystem.otherSevenGroupBuy;

import java.util.HashMap;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.system.peacockFloor.PeacockFloorSysCache;
import com.teamtop.util.cache.union.UC;
import com.teamtop.util.log.LogTool;

import excel.config.Config_sctg3_730;
import excel.struct.Struct_sctg3_730;


public class OtherSevenGroupBuyCache extends AbsServerEvent{
	/**
	 * 今日首冲人数
	 */
	public static int fristRechargeNum;
	/**
	 * 开服天数-》团购id-》团购信息
	 */
	public static HashMap<Integer, HashMap<Integer, Struct_sctg3_730>> otherSevenGroupBuyMap=UC.reg("otherSevenGroupBuyMap", new HashMap<>());
	
	
	
	public static int getFristRechargeNum() {
		return fristRechargeNum;
	}


	public static void setFristRechargeNum(int fristRechargeNum) {
		OtherSevenGroupBuyCache.fristRechargeNum = fristRechargeNum;
	}

	public static HashMap<Integer, HashMap<Integer, Struct_sctg3_730>> getOtherSevenGroupBuyMap() {
		return otherSevenGroupBuyMap;
	}


	public static void setOtherSevenGroupBuyMap(
			HashMap<Integer, HashMap<Integer, Struct_sctg3_730>> otherSevenGroupBuyMap) {
		OtherSevenGroupBuyCache.otherSevenGroupBuyMap = otherSevenGroupBuyMap;
	}


	@Override
	public void startServer() throws RunServerException {
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.GROUPBUY_ACT);
			String content = globalData.getContent();
			if (content==null||content.equals("")||content.equals("{}")) {
				fristRechargeNum=0;
			}else{
				fristRechargeNum=Integer.parseInt(content);
			}
		} catch (Exception e) {
			LogTool.error(e, PeacockFloorSysCache.class, "OtherSevenGroupBuyCache startServer has wrong");
		}
		
	}
	
	public void update() {
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.GROUPBUY_ACT);
			globalData.setContent(Integer.toString(fristRechargeNum));
			GlobalCache.doSync(globalData);
		} catch (Exception e) {
			LogTool.error(e, this, "OtherSevenGroupBuyCache update has wrong");
		}
	}
	
	public void shutdownServer(){
		update();
	}
	
	/**
	 * 启动服务器初始化excel
	 *
	 */
	public void initExcel() throws RunServerException{
		for (Struct_sctg3_730 struct_sctg3_730:Config_sctg3_730.getIns().getSortList()) {
			if(!otherSevenGroupBuyMap.containsKey(struct_sctg3_730.getTianshu())) {
				otherSevenGroupBuyMap.put(struct_sctg3_730.getTianshu(), new HashMap<>());
			}
			HashMap<Integer, Struct_sctg3_730> sctg_730Map = otherSevenGroupBuyMap.get(struct_sctg3_730.getTianshu());
			if (!sctg_730Map.containsKey(struct_sctg3_730.getId())) {
				sctg_730Map.put(struct_sctg3_730.getId(), struct_sctg3_730);
			}
		}
		
	}

}
