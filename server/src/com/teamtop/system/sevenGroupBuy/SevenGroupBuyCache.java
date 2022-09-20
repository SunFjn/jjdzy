package com.teamtop.system.sevenGroupBuy;

import java.util.HashMap;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.system.peacockFloor.PeacockFloorSysCache;
import com.teamtop.util.cache.union.UC;
import com.teamtop.util.log.LogTool;

import excel.config.Config_sctg_730;
import excel.struct.Struct_sctg_730;


public class SevenGroupBuyCache extends AbsServerEvent{
	
	private static SevenGroupBuyCache ins;
	public static SevenGroupBuyCache getIns(){
		if(ins == null) {
			ins = new SevenGroupBuyCache();
		}
		return ins;
	}
	
	/**
	 * 今日首冲人数
	 */
	public static int fristRechargeNum;
	/**
	 * 开服天数-》团购id-》团购信息
	 */
	public static HashMap<Integer, HashMap<Integer, Struct_sctg_730>> sevenGroupBuySysMap=UC.reg("sevenGroupBuySysMap", new HashMap<>());
	
	
	
	@Override
	public void startServer() throws RunServerException {
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.SEVEN_GROUPBUY);
			String content = globalData.getContent();
			if (content==null||content.equals("")||content.equals("{}")) {
				fristRechargeNum=0;
			}else{
				fristRechargeNum=Integer.parseInt(content);
			}
		} catch (Exception e) {
			LogTool.error(e, PeacockFloorSysCache.class, "SevenGroupBuyCache startServer has wrong");
		}
		
	}
	
	public void update() {
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.SEVEN_GROUPBUY);
			globalData.setContent(Integer.toString(fristRechargeNum));
			GlobalCache.doSync(globalData);
		} catch (Exception e) {
			LogTool.error(e, this, "SevenWuShenRankCache update has wrong");
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
		for (Struct_sctg_730 struct_sctg_730:Config_sctg_730.getIns().getSortList()) {
			if(!sevenGroupBuySysMap.containsKey(struct_sctg_730.getTianshu())) {
				sevenGroupBuySysMap.put(struct_sctg_730.getTianshu(), new HashMap<>());
			}
			HashMap<Integer, Struct_sctg_730> sctg_730Map = sevenGroupBuySysMap.get(struct_sctg_730.getTianshu());
			if (!sctg_730Map.containsKey(struct_sctg_730.getId())) {
				sctg_730Map.put(struct_sctg_730.getId(), struct_sctg_730);
			}
		}
		
	}

	
	

}
