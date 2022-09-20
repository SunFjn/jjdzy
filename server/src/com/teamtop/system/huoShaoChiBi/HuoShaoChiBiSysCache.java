package com.teamtop.system.huoShaoChiBi;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.db.trans.ObjStrTransUtil;
import com.teamtop.util.excel.ExcelJsonUtils;
import com.teamtop.util.log.LogTool;

import excel.config.Config_hscb_751;
import excel.struct.Struct_hscb_751;


public class HuoShaoChiBiSysCache extends AbsServerEvent {
	
	public static HuoShaoChiBiSysCache ins;
	
	public static HuoShaoChiBiSysCache getIns() {
		if(ins == null){
			ins = new HuoShaoChiBiSysCache();
		}
		return ins;
	}
	/**
	 * 每层掉落
	 */
	private static Map<Integer, List<ProbabilityEventModel>> bossDropMap = new HashMap<Integer, List<ProbabilityEventModel>>();
	/**
	 * 火烧赤壁公共缓存
	 */
	private static HuoShaoChiBiCache huoShaoChiBiCache = new HuoShaoChiBiCache();
	
	public static Map<Integer, List<ProbabilityEventModel>> getBossDropMap() {
		return bossDropMap;
	}

	public static void setBossDropMap(Map<Integer, List<ProbabilityEventModel>> bossDropMap) {
		HuoShaoChiBiSysCache.bossDropMap = bossDropMap;
	}

	public static HuoShaoChiBiCache getHuoShaoChiBiCache() {
		return huoShaoChiBiCache;
	}

	public static void setHuoShaoChiBiCache(HuoShaoChiBiCache huoShaoChiBiCache) {
		HuoShaoChiBiSysCache.huoShaoChiBiCache = huoShaoChiBiCache;
	}

	@Override
	public void startServer() throws RunServerException {
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.HUO_SHAO_CHI_BI);
			String content = globalData.getContent();
			if (content==null||content.equals("")||content.equals("{}")) {
				setHuoShaoChiBiCache(huoShaoChiBiCache);
			}else{
				setHuoShaoChiBiCache(ObjStrTransUtil.toObj(content, HuoShaoChiBiCache.class));
			}
		} catch (Exception e) {
			LogTool.error(e, HuoShaoChiBiSysCache.class, "HuoShaoChiBiSysCache has wrong");
		}
	}
	
	@Override
	public void shutdownServer(){
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.HUO_SHAO_CHI_BI);
			globalData.setContent(ObjStrTransUtil.toStr(getHuoShaoChiBiCache()));
			GlobalCache.doSync(globalData);
		} catch (Exception e) {
			LogTool.error(e, this, "HuoShaoChiBiSysCache shutdownServer has wrong");
		}
	}
	
	@Override
	public void initExcel() throws RunServerException {
		initDrop();
	}

	public void initDrop() {
		List<Struct_hscb_751> bossList = Config_hscb_751.getIns().getSortList();
		for (Struct_hscb_751 boss : bossList) {
			List<ProbabilityEventModel> bossDropData = ExcelJsonUtils.getGeneralDropData(boss.getBossdl());
			bossDropMap.put(boss.getId(), bossDropData);
		}
		
	}
	
	

}
