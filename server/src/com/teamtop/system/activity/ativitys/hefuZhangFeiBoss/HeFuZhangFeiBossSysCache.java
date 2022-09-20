package com.teamtop.system.activity.ativitys.hefuZhangFeiBoss;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.teamtop.main.RunServerException;
import com.teamtop.system.activity.ativitys.hefuGodGift.HeFuGodGiftSysCache;
import com.teamtop.system.boss.qmboss.QMBossDamgRankModel;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.cache.union.UC;
import com.teamtop.util.log.LogTool;

public class HeFuZhangFeiBossSysCache extends AbsServerEvent{
	/**
	 * boss信息 
	 */
	private static HeFuZhangFeiBossCahce heFuZhangFeiBossCahce=new HeFuZhangFeiBossCahce();
	/**
	 * 当前参与的人
	 */
	private  static ConcurrentHashMap<Long, Hero> inheroMap = UC.reg("zhangFeiBossInheroMap", new ConcurrentHashMap<Long, Hero>());
	/**
	 * 伤害排名
	 */
	private static List<QMBossDamgRankModel> rankList = UC.reg("zhangFeiBossRankList", Collections.synchronizedList(new ArrayList<QMBossDamgRankModel>()));
	/**
	 * 死亡时间
	 */
	private static ConcurrentHashMap<Long, Integer> diehero = UC.reg("zhangFeiBossDiehero", new ConcurrentHashMap<Long,Integer>());
	
	public static HeFuZhangFeiBossCahce getHeFuZhangFeiBossCahce() {
		return heFuZhangFeiBossCahce;
	}

	public static ConcurrentHashMap<Long, Hero> getInheroMap() {
		return inheroMap;
	}

	public static List<QMBossDamgRankModel> getRankList() {
		return rankList;
	}

	public static void setHeFuZhangFeiBossCahce(HeFuZhangFeiBossCahce heFuZhangFeiBossCahce) {
		HeFuZhangFeiBossSysCache.heFuZhangFeiBossCahce = heFuZhangFeiBossCahce;
	}


	public static void setInheroMap(ConcurrentHashMap<Long, Hero> inheroMap) {
		HeFuZhangFeiBossSysCache.inheroMap = inheroMap;
	}


	public static void setRankList(List<QMBossDamgRankModel> rankList) {
		HeFuZhangFeiBossSysCache.rankList = rankList;
	}


	public static ConcurrentHashMap<Long, Integer> getDiehero() {
		return diehero;
	}

	public static void setDiehero(ConcurrentHashMap<Long, Integer> diehero) {
		HeFuZhangFeiBossSysCache.diehero = diehero;
	}

	@Override
	public void startServer() throws RunServerException {
		GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.HEFU_ZHANGFEIBOSS);
		String content = globalData.getContent();
		if (content == null || content.equals("") || content.equals("{}")) {
			setHeFuZhangFeiBossCahce(new HeFuZhangFeiBossCahce());
		} else {
			setHeFuZhangFeiBossCahce(JSONObject.parseObject(content, HeFuZhangFeiBossCahce.class));
		}
	}
	
	@Override
	public void shutdownServer(){
		updateGlobalData();
	}
	
	public static void  updateGlobalData() {
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.HEFU_ZHANGFEIBOSS);
			globalData.setContent(JSON.toJSONString(getHeFuZhangFeiBossCahce()));
			GlobalCache.doSync(globalData);
		} catch (Exception e) {
			LogTool.error(e, HeFuGodGiftSysCache.class, " updateGlobalData exception");
		}

	}

}
