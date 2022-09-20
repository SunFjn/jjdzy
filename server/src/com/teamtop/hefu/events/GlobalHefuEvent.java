package com.teamtop.hefu.events;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.hefu.DelHero;
import com.teamtop.hefu.HefuDao;
import com.teamtop.hefu.IHefuEvent;
import com.teamtop.system.country.fightNorthAndSouth.FightNSFunction;
import com.teamtop.system.country.newkingship.NewKingShipFunction;
import com.teamtop.system.countrySkill.CountrySkillFunction;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.system.global.GlobalDataDao;
import com.teamtop.system.linglongge.LingLongGeFunction;
/**
 * 公共数据合服处理
 * @author Administrator
 *
 */
public class GlobalHefuEvent implements IHefuEvent {
	private static Logger logger = LoggerFactory.getLogger(GlobalHefuEvent.class);
	/**	 * 玲珑阁（寻宝）	 */
	private List<GlobalData> lingLongGeData = new ArrayList<GlobalData>();
	/**	 * 南征北战	 */
	private List<GlobalData> fightNSData = new ArrayList<GlobalData>();
	/*** 国家职位-王位之争 */
	private List<GlobalData> countryKingData = new ArrayList<GlobalData>();
	/*** 国家技能 */
	private List<GlobalData> countrySkillData = new ArrayList<GlobalData>();
	/*** 国家声望*/
	private List<GlobalData> countryPrestigeData = new ArrayList<GlobalData>();
	
	@Override
	public void beforeDelHeros(List<DelHero> delList, int zoneid) throws Exception {}

	@Override
	public void beforeHefu(int zoneid) throws Exception {
		//玲珑阁(寻宝 已经跨服玩法 只处理和服后的积分 以及 合服后达标人hid集合  )
		GlobalData dataLLG = GlobalDataDao.getIns().find(GlobalConst.LINGLONGGEHIDS,zoneid);
		if(dataLLG != null && dataLLG.getContent() != null && !"".equals(dataLLG.getContent())){
			dataLLG.setZoneid(zoneid);
			lingLongGeData.add(dataLLG);
			logger.info("GlobalConst.LINGLONGGE.zid:"+zoneid+" Content:"+dataLLG.getContent());
		}
		HefuDao.getIns().delGlobaldata(GlobalConst.LINGLONGGEHIDS, zoneid);
		//南征北战
		GlobalData dataNZBZ = GlobalDataDao.getIns().find(GlobalConst.FIGHTNS,zoneid);
		if(dataNZBZ != null && dataNZBZ.getContent() != null && !"".equals(dataNZBZ.getContent())){
			dataNZBZ.setZoneid(zoneid);
			fightNSData.add(dataNZBZ);
			logger.info("GlobalConst.FIGHTNS.zid:"+zoneid+" Content:"+dataNZBZ.getContent());
		}
		HefuDao.getIns().delGlobaldata(GlobalConst.FIGHTNS, zoneid);
		// 国家职位-王位之争
		GlobalData countryNewKing = GlobalDataDao.getIns().find(GlobalConst.NEW_KINGSHIP,zoneid);
		if(countryNewKing != null && countryNewKing.getContent() != null && !"".equals(countryNewKing.getContent())){
			countryNewKing.setZoneid(zoneid);
			countryKingData.add(countryNewKing);
			logger.info("GlobalConst.NEW_KINGSHIP.zid:"+zoneid+" Content:"+countryNewKing.getContent());
		}
		HefuDao.getIns().delGlobaldata(GlobalConst.NEW_KINGSHIP, zoneid);
		// 国家-技能
		GlobalData countrySkill = GlobalDataDao.getIns().find(GlobalConst.COUNTRYSKILL,zoneid);
		if(countrySkill != null && countrySkill.getContent() != null && !"".equals(countrySkill.getContent())){
			countrySkill.setZoneid(zoneid);
			countrySkillData.add(countrySkill);
			logger.info("GlobalConst.COUNTRYSKILL.zid:"+zoneid+" Content:"+countrySkill.getContent());
		}
		HefuDao.getIns().delGlobaldata(GlobalConst.COUNTRYSKILL, zoneid);
		// 国家声望
		GlobalData countryPrestinge = GlobalDataDao.getIns().find(GlobalConst.COUNTRYPRESTIGE,zoneid);
		if(countryPrestinge != null && countryPrestinge.getContent() != null && !"".equals(countryPrestinge.getContent())){
			countryPrestinge.setZoneid(zoneid);
			countryPrestigeData.add(countryPrestinge);
			logger.info("GlobalConst.COUNTRYPRESTIGE.zid:"+zoneid+" Content:"+countryPrestinge.getContent());
		}
		HefuDao.getIns().delGlobaldata(GlobalConst.COUNTRYPRESTIGE, zoneid);
		
		//  魔神吕布 删除历史记录
		HefuDao.getIns().delGlobaldata(GlobalConst.MONSTER_LVBU, zoneid);
		//隆中对
		HefuDao.getIns().delGlobaldata(GlobalConst.LONGZHONGDUI,zoneid);
		//国家boss
		HefuDao.getIns().delGlobaldata(GlobalConst.COUNTRY_BOSS, zoneid);
		
	}

	@Override
	public void afterHefu(int firstZoneid) throws Exception {
		//玲珑阁
		GlobalData globalDataLLG = GlobalCache.getGlobalData(GlobalConst.LINGLONGGEHIDS);
		LingLongGeFunction.getIns().setHeFuData(firstZoneid, lingLongGeData, globalDataLLG);
		GlobalDataDao.getIns().update(globalDataLLG,firstZoneid);
		//南征北战
		GlobalData globalDataNZBZ = GlobalCache.getGlobalData(GlobalConst.FIGHTNS);
		FightNSFunction.getIns().setHeFuData( fightNSData, globalDataNZBZ);
		GlobalDataDao.getIns().update(globalDataNZBZ,firstZoneid);
		//国家职位-王位之争
		GlobalData globalKing = GlobalCache.getGlobalData(GlobalConst.NEW_KINGSHIP);
		NewKingShipFunction.getIns().setHeFuData( countryKingData, globalKing);
		GlobalDataDao.getIns().update(globalKing,firstZoneid);
		
		//国家-技能
		GlobalData countrySkill =GlobalCache.getGlobalData(GlobalConst.COUNTRYSKILL);
		CountrySkillFunction.getIns().setHeFuDataCountrySkill(countrySkillData, countrySkill);
		GlobalDataDao.getIns().update(countrySkill,firstZoneid);
		
		//国家声望
		GlobalData countryPrestinge =GlobalCache.getGlobalData(GlobalConst.COUNTRYPRESTIGE);
		CountrySkillFunction.getIns().setHeFuDataCountryPrestige(countryPrestigeData, countryPrestinge);
		GlobalDataDao.getIns().update(countryPrestinge,firstZoneid);
		
	}

	@Override
	public void heCrossZu(int zoneid) throws Exception {
		// TODO Auto-generated method stub
		
	}
}
