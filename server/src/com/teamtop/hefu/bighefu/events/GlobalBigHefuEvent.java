package com.teamtop.hefu.bighefu.events;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.hefu.DelHero;
import com.teamtop.hefu.HefuDao;
import com.teamtop.hefu.IHefuEvent;
import com.teamtop.hefu.events.GlobalHefuEvent;
import com.teamtop.system.activity.ativitys.eightDoorAppraiseRankAct.EightDoorAppraiseRankActFunction;
import com.teamtop.system.activity.ativitys.godGenSendGiftAct.GodGenSendGiftActFunction;
import com.teamtop.system.activity.ativitys.rechargeRankAct.RechargeRankActFunction;
import com.teamtop.system.activity.ativitys.shaoZhuQiYuanRankAct.ShaoZhuQiYuanRankActFunction;
import com.teamtop.system.crossCommonRank.CommonRankFunction;
import com.teamtop.system.crossHeroesList.HeroesListFunction;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.system.global.GlobalDataDao;
import com.teamtop.system.linglongge.LingLongGeFunction;
/**
 * 合中央服 以及 大跨服组 处理
 * @author jjjjyyy
 *
 */
public class GlobalBigHefuEvent implements IHefuEvent {
	private static Logger logger = LoggerFactory.getLogger(GlobalHefuEvent.class);
	
	/**	 * 玲珑阁（寻宝）	 */
	private List<GlobalData> lingLongGeData = new ArrayList<GlobalData>();
	/**	 * 群英榜	 */
	private List<GlobalData> heroesListData = new ArrayList<GlobalData>();
	/** * 神将送礼 */
	private List<GlobalData> crossGodGenSendData = new ArrayList<GlobalData>();
	/** * 三国庆典-消费排行*/
	private List<GlobalData> consumeRankData = new ArrayList<GlobalData>();
	/** * 三国庆典-豪礼转盘排名*/
	private List<GlobalData> zhuanPanRankData = new ArrayList<GlobalData>();
	/** * 充值排行*/
	private List<GlobalData> rechargeRankData = new ArrayList<GlobalData>();
	/** 鉴定排名**/
	private List<GlobalData>  eightDoorData=new ArrayList<>();
	/** 神将现世**/
	private List<GlobalData>  godGenThisData=new ArrayList<>();
	/** 许愿树现世**/
	private List<GlobalData>  wishingTreeData=new ArrayList<>();
	/**祈愿排名(跨服、活动) **/
	private List<GlobalData>  qiyuanData=new ArrayList<>();
	
	@Override
	public void beforeDelHeros(List<DelHero> delList, int zoneid) throws Exception {}

	@Override
	public void beforeHefu(int zoneid) throws Exception {
		//玲珑阁
		GlobalData dataLLG = GlobalDataDao.getIns().find(GlobalConst.CROSS_LINGLONGGE,zoneid);
		if(dataLLG != null && dataLLG.getContent() != null && !"".equals(dataLLG.getContent())){
			dataLLG.setZoneid(zoneid);
			lingLongGeData.add(dataLLG);
			logger.info("GlobalConst.CROSS_LINGLONGGE.zid:"+zoneid+" Content:"+dataLLG.getContent());
		}
		HefuDao.getIns().delGlobaldata(GlobalConst.LINGLONGGEHIDS, zoneid);
		//群英榜
		GlobalData dataQy = GlobalDataDao.getIns().find(GlobalConst.HEROESLIST,zoneid);
		if(dataQy != null && dataQy.getContent() != null && !"".equals(dataQy.getContent())){
			dataQy.setZoneid(zoneid);
			heroesListData.add(dataQy);
			logger.info("GlobalConst.HEROESLIST.zid:"+zoneid+" Content:"+dataQy.getContent());
		}
		HefuDao.getIns().delGlobaldata(GlobalConst.HEROESLIST, zoneid);
		//神将送礼 
		GlobalData dataGGSG = GlobalDataDao.getIns().find(GlobalConst.GODGENSENDGIFT_ACT_RANKLIST,zoneid);
		if(dataGGSG != null && dataGGSG.getContent() != null && !"".equals(dataGGSG.getContent())){
			dataGGSG.setZoneid(zoneid);
			crossGodGenSendData.add(dataGGSG);
			logger.info("GlobalConst.GODGENSENDGIFT_ACT_RANKLIST.zid:"+zoneid+" Content:"+dataGGSG.getContent());
		}
		HefuDao.getIns().delGlobaldata(GlobalConst.GODGENSENDGIFT_ACT_RANKLIST, zoneid);
		
		//消费排行活动
		GlobalData dataCR = GlobalDataDao.getIns().find(GlobalConst.CROSS_CONSUMERANK_ACT_CEN,zoneid);
		if(dataCR != null && dataCR.getContent() != null && !"".equals(dataCR.getContent())){
			dataCR.setZoneid(zoneid);
			consumeRankData.add(dataCR);
			logger.info("GlobalConst.GODGENSENDGIFT_ACT_RANKLIST.zid:"+zoneid+" Content:"+dataCR.getContent());
		}
		HefuDao.getIns().delGlobaldata(GlobalConst.CROSS_CONSUMERANK_ACT_CEN, zoneid);

		//豪礼转盘排名活动
		GlobalData dataZhuanPan = GlobalDataDao.getIns().find(GlobalConst.CELEBRATION_HAO_LI_ZHUAN_PAN_RANK,zoneid);
		if(dataZhuanPan != null && dataZhuanPan.getContent() != null && !"".equals(dataZhuanPan.getContent())){
			dataZhuanPan.setZoneid(zoneid);
			zhuanPanRankData.add(dataZhuanPan);
			logger.info("GlobalConst.CELEBRATION_HAO_LI_ZHUAN_PAN_RANK.zid:"+zoneid+" Content:"+dataZhuanPan.getContent());
		}
		HefuDao.getIns().delGlobaldata(GlobalConst.CELEBRATION_HAO_LI_ZHUAN_PAN_RANK, zoneid);
		
		//充值排行活动
		GlobalData dataRR= GlobalDataDao.getIns().find(GlobalConst.CROSS_RECHARGE_RANK_ACT_CEN,zoneid);
		if(dataRR != null && dataRR.getContent() != null && !"".equals(dataRR.getContent())){
			dataRR.setZoneid(zoneid);
			rechargeRankData.add(dataRR);
			logger.info("GlobalConst.CROSS_RECHARGE_RANK_ACT_CEN.zid:"+zoneid+" Content:"+dataRR.getContent());
		}
		HefuDao.getIns().delGlobaldata(GlobalConst.CROSS_RECHARGE_RANK_ACT_CEN, zoneid);
		//鉴定排名
		GlobalData dataLED = GlobalDataDao.getIns().find(GlobalConst.CROSS_EIGHTDOOR_APPRAISERANK_ACT_CEN,zoneid);
		if(dataLED != null && dataLED.getContent() != null && !"".equals(dataLED.getContent())){
			dataLED.setZoneid(zoneid);
			eightDoorData.add(dataLED);
			logger.info("GlobalConst.CROSS_EIGHTDOOR_APPRAISERANK_ACT_CEN.zid:"+zoneid+" Content:"+dataLED.getContent());
		}
		HefuDao.getIns().delGlobaldata(GlobalConst.CROSS_EIGHTDOOR_APPRAISERANK_ACT_CEN, zoneid);
		//神将现世
		GlobalData dataGGH = GlobalDataDao.getIns().find(GlobalConst.CROSS_GODGENTHISLIFE_RANK_ACT_CEN,zoneid);
		if(dataGGH != null && dataGGH.getContent() != null && !"".equals(dataGGH.getContent())){
			dataGGH.setZoneid(zoneid);
			godGenThisData.add(dataGGH);
			logger.info("GlobalConst.CROSS_GODGENTHISLIFE_RANK_ACT_CEN.zid:"+zoneid+" Content:"+dataGGH.getContent());
		}
		HefuDao.getIns().delGlobaldata(GlobalConst.CROSS_GODGENTHISLIFE_RANK_ACT_CEN, zoneid);
		//许愿树排行
		GlobalData dataWTR = GlobalDataDao.getIns().find(GlobalConst.CROSS_WISHINGTREE_RANK_ACT_CEN,zoneid);
		if(dataWTR != null && dataWTR.getContent() != null && !"".equals(dataWTR.getContent())){
			dataWTR.setZoneid(zoneid);
			wishingTreeData.add(dataWTR);
			logger.info("GlobalConst.CROSS_WISHINGTREE_RANK_ACT_CEN.zid:"+zoneid+" Content:"+dataWTR.getContent());
		}
		HefuDao.getIns().delGlobaldata(GlobalConst.CROSS_WISHINGTREE_RANK_ACT_CEN, zoneid);
		//祈愿排名(跨服、活动)
		GlobalData dataQYR = GlobalDataDao.getIns().find(GlobalConst.CROSS_SHAOZHU_QIYUANRANK_ACT_CEN,zoneid);
		if(dataQYR != null && dataQYR.getContent() != null && !"".equals(dataQYR.getContent())){
			dataQYR.setZoneid(zoneid);
			qiyuanData.add(dataQYR);
			logger.info("GlobalConst.CROSS_SHAOZHU_QIYUANRANK_ACT_CEN.zid:"+zoneid+" Content:"+dataQYR.getContent());
		}
		HefuDao.getIns().delGlobaldata(GlobalConst.CROSS_SHAOZHU_QIYUANRANK_ACT_CEN, zoneid);
		
	}

	@Override
	public void afterHefu(int firstZoneid) throws Exception {
		//玲珑阁
		GlobalData globalDataLLG = GlobalCache.getGlobalData(GlobalConst.CROSS_LINGLONGGE);
		LingLongGeFunction.getIns().setBigHeFuData(firstZoneid, lingLongGeData, globalDataLLG);
		GlobalDataDao.getIns().update(globalDataLLG,firstZoneid);
		//群英榜
		GlobalData globalDataqy = GlobalCache.getGlobalData(GlobalConst.HEROESLIST);
		HeroesListFunction.getIns().setBigHeFuData(firstZoneid, heroesListData, globalDataqy);
		GlobalDataDao.getIns().update(globalDataqy,firstZoneid);
	    // 神将送礼
		GlobalData globalDatacgg = GlobalCache.getGlobalData(GlobalConst.GODGENSENDGIFT_ACT_RANKLIST);
		GodGenSendGiftActFunction.getIns().setBigHeFuData(firstZoneid, crossGodGenSendData, globalDatacgg);
		GlobalDataDao.getIns().update(globalDatacgg,firstZoneid);
	    //消费排行活动
		GlobalData globalDataCR = GlobalCache.getGlobalData(GlobalConst.CROSS_CONSUMERANK_ACT_CEN);
		CommonRankFunction.getIns().setConsumeBigHeFuData(firstZoneid, consumeRankData, globalDataCR);
		GlobalDataDao.getIns().update(globalDataCR,firstZoneid);
		//豪礼转盘排名活动
		GlobalData globalDataZhuanPan = GlobalCache.getGlobalData(GlobalConst.CELEBRATION_HAO_LI_ZHUAN_PAN_RANK);
		CommonRankFunction.getIns().setConsumeBigHeFuData(firstZoneid, zhuanPanRankData, globalDataZhuanPan);
		GlobalDataDao.getIns().update(globalDataZhuanPan,firstZoneid);
		//充值排行活动
		GlobalData globalDataRR = GlobalCache.getGlobalData(GlobalConst.CROSS_RECHARGE_RANK_ACT_CEN);
		RechargeRankActFunction.getIns().setRechargeBigHeFuData(firstZoneid, rechargeRankData, globalDataRR);
		GlobalDataDao.getIns().update(globalDataRR,firstZoneid);
		//鉴定排名
		GlobalData globalDataED = GlobalCache.getGlobalData(GlobalConst.CROSS_EIGHTDOOR_APPRAISERANK_ACT_CEN);
		EightDoorAppraiseRankActFunction.getIns().setBigHeFuData(firstZoneid, eightDoorData, globalDataED);
		GlobalDataDao.getIns().update(globalDataED,firstZoneid);
		//神将显世
		GlobalData globalDataGGHL = GlobalCache.getGlobalData(GlobalConst.CROSS_GODGENTHISLIFE_RANK_ACT_CEN);
		CommonRankFunction.getIns().setConsumeBigHeFuData(firstZoneid, godGenThisData, globalDataGGHL);
		GlobalDataDao.getIns().update(globalDataGGHL,firstZoneid);
		//许愿树
		GlobalData globalDataWTR = GlobalCache.getGlobalData(GlobalConst.CROSS_WISHINGTREE_RANK_ACT_CEN);
		CommonRankFunction.getIns().setConsumeBigHeFuData(firstZoneid, wishingTreeData, globalDataWTR);
		GlobalDataDao.getIns().update(globalDataWTR,firstZoneid);
		//祈愿排名(跨服、活动)
		GlobalData globalDataQYR = GlobalCache.getGlobalData(GlobalConst.CROSS_SHAOZHU_QIYUANRANK_ACT_CEN);
		ShaoZhuQiYuanRankActFunction.getIns().setCentryBigHeFuData(firstZoneid, qiyuanData, globalDataQYR);
		GlobalDataDao.getIns().update(globalDataQYR,firstZoneid);
		
	}

	@Override
	public void heCrossZu(int zoneid) throws Exception {
		//玲珑阁
		GlobalData globalDataLLG = GlobalCache.getGlobalData(GlobalConst.CROSS_LINGLONGGE);
		LingLongGeFunction.getIns().setCrossBigHeZuData(lingLongGeData, globalDataLLG);
		GlobalDataDao.getIns().update(globalDataLLG,zoneid);
		//群英榜
		GlobalData globalDataqy = GlobalCache.getGlobalData(GlobalConst.HEROESLIST);
		HeroesListFunction.getIns().setCrossBigHeZuData(heroesListData, globalDataqy);
		GlobalDataDao.getIns().update(globalDataqy,zoneid);
		// 神将送礼
		GlobalData globalDatacgg = GlobalCache.getGlobalData(GlobalConst.GODGENSENDGIFT_ACT_RANKLIST);
		GodGenSendGiftActFunction.getIns().setCrossBigHeZuData(crossGodGenSendData, globalDatacgg);
		GlobalDataDao.getIns().update(globalDatacgg,zoneid);
		//消费排行活动
		GlobalData globalDataCR = GlobalCache.getGlobalData(GlobalConst.CROSS_CONSUMERANK_ACT_CEN);
		CommonRankFunction.getIns().setCrossConsumeHeZuData(consumeRankData, globalDataCR);
		GlobalDataDao.getIns().update(globalDataCR,zoneid);
		//豪礼转盘排名活动
		GlobalData globalDataZhuanPan = GlobalCache.getGlobalData(GlobalConst.CELEBRATION_HAO_LI_ZHUAN_PAN_RANK);
		CommonRankFunction.getIns().setCrossConsumeHeZuData(zhuanPanRankData, globalDataZhuanPan);
		GlobalDataDao.getIns().update(globalDataZhuanPan,zoneid);
		//充值排行活动
		GlobalData globalDataRR = GlobalCache.getGlobalData(GlobalConst.CROSS_RECHARGE_RANK_ACT_CEN);
		RechargeRankActFunction.getIns().setRechargeRankHeZuData( rechargeRankData, globalDataRR);
		GlobalDataDao.getIns().update(globalDataRR,zoneid);
		//鉴定排名
		GlobalData globalDataED = GlobalCache.getGlobalData(GlobalConst.CROSS_EIGHTDOOR_APPRAISERANK_ACT_CEN);
		EightDoorAppraiseRankActFunction.getIns().setCrossHeZuData(eightDoorData, globalDataED);
		GlobalDataDao.getIns().update(globalDataED,zoneid);
		//神将显世
		GlobalData globalDataGGHL = GlobalCache.getGlobalData(GlobalConst.CROSS_GODGENTHISLIFE_RANK_ACT_CEN);
		CommonRankFunction.getIns().setCrossConsumeHeZuData( godGenThisData, globalDataGGHL);
		GlobalDataDao.getIns().update(globalDataGGHL,zoneid);
		//许愿树
		GlobalData globalDataWTR = GlobalCache.getGlobalData(GlobalConst.CROSS_WISHINGTREE_RANK_ACT_CEN);
		CommonRankFunction.getIns().setCrossConsumeHeZuData(wishingTreeData, globalDataWTR);
		GlobalDataDao.getIns().update(globalDataWTR,zoneid);
		//祈愿排名(跨服、活动)
		GlobalData globalDataQYR = GlobalCache.getGlobalData(GlobalConst.CROSS_SHAOZHU_QIYUANRANK_ACT_CEN);
		ShaoZhuQiYuanRankActFunction.getIns().setCrossHeZuData(qiyuanData, globalDataQYR);
		GlobalDataDao.getIns().update(globalDataQYR,zoneid);
	}

}
