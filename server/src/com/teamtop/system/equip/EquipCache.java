package com.teamtop.system.equip;

import java.util.HashMap;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.util.cache.union.UC;
import com.teamtop.util.log.LogTool;

import excel.config.Config_eqiuplv_204;
import excel.config.Config_zhuangbei_204;
import excel.struct.Struct_eqiuplv_204;
import excel.struct.Struct_zhuangbei_204;

/**
 * 装备缓存类/神装
 * @author hepl
 *
 */
public class EquipCache extends AbsServerEvent {
	
	/**	 * 神装/将印升级缓存 部位-> 装备系统id-> Struct_eqiuplv_204	 */
	private static HashMap<Integer,HashMap<Integer, Struct_eqiuplv_204>> godEquipLvMap = UC.reg("eqiuplv204EquipMap", new HashMap<Integer,HashMap<Integer, Struct_eqiuplv_204>>());
	//装备最大等级
	private static int equipMaxLv = 0;
	//装备最大转生等级
	private static int equipMaxRebornLv = 0;
	/**	 * 装备唯一id,需要入库记录	 */
	private static AtomicLong equipUnitId = new AtomicLong();
	
	
	public static HashMap<Integer, HashMap<Integer, Struct_eqiuplv_204>> getGodEquipLvMap() {
		return godEquipLvMap;
	}
	/**
	 * 装备最大等级
	 * @return
	 */
	public static int getEquipMaxLv(){
		return equipMaxLv;
	}
	/**
	 * 装备最大转生等级
	 * @return
	 */
	public static int getEquipMaxRebornLv(){
		return equipMaxRebornLv;
	}	/**
	 * 获取当前最大装备唯一id
	 * @return 当前最大装备唯一id
	 */
	public static long getBattleUnitId(){
		return equipUnitId.get();
	}
	/**
	 * 使当前最大装备唯一id加1并返回
	 * @return 增加后的战斗唯一id
	 */
	public static long getAndAddBattleUnitId(){
		if(equipUnitId.get()<=0 || equipUnitId.get()>Long.MAX_VALUE){
			int ori = 10000+GameProperties.getFirstZoneId();
			String str = ori + "00000000001";
			long unitId = Long.parseLong(str);
			equipUnitId.set(unitId);
		}
		return equipUnitId.getAndIncrement();
	}

	@Override
	public void initExcel() throws RunServerException {
		List<Struct_zhuangbei_204> list = Config_zhuangbei_204.getIns().getSortList();
		for(Struct_zhuangbei_204 excel : list){
			int rebornLv = excel.getLv()[0][0];
			int level = excel.getLv()[0][1];
			if(level > equipMaxLv){
				equipMaxLv = level;
			}
			if(rebornLv > equipMaxRebornLv){
				equipMaxRebornLv = rebornLv;
			}
		}
		//神装 将印 转生装备 升级
		List<Struct_eqiuplv_204> godlist =Config_eqiuplv_204.getIns().getSortList();
		for (Struct_eqiuplv_204 excel : godlist) {
			if (getGodEquipLvMap().containsKey(excel.getBuwei())) {
				getGodEquipLvMap().get(excel.getBuwei()).put(excel.getUp(), excel);
			}else {
				getGodEquipLvMap().put(excel.getBuwei(), new HashMap<Integer, Struct_eqiuplv_204>());
				getGodEquipLvMap().get(excel.getBuwei()).put(excel.getUp(), excel);
			}
		}
		
		
	}
	
	@Override
	public void startServer() throws RunServerException {
		GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.EQUIP_UNITID);
		String content = globalData.getContent();
		if(content!=null && !"".equals(content)){
			Long unitId = Long.parseLong(content);
			equipUnitId.set(unitId);
		}else{
			int ori = 10000+GameProperties.getFirstZoneId();
			String str = ori + "00000000001";
			long unitId = Long.parseLong(str);
			equipUnitId.set(unitId);
		}
	}

	@Override
	public void shutdownServer() {
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.EQUIP_UNITID);
			String dataStr = equipUnitId + "";
			globalData.setContent(dataStr);
			GlobalCache.doSync(globalData);
		} catch (Exception e) {
			LogTool.error(e, this, " shutdownServer EquipCache");
		}
	}
}
