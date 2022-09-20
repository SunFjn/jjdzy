package com.teamtop.system.longZhongDui;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.main.RunServerException;
import com.teamtop.system.country.fightNorthAndSouth.FightNSSysCache;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroConst;
import com.teamtop.system.longZhongDui.model.LongZhongDuiCache;
import com.teamtop.system.longZhongDui.model.LongZhongDuiRankModel;
import com.teamtop.util.db.trans.ObjStrTransUtil;
import com.teamtop.util.log.LogTool;

public class LongZhongDuiSysCache extends AbsServerEvent {
	public volatile static boolean isStart = false;
	/** 隆中对缓存 **/
	private static LongZhongDuiCache longZhongDuiCache;

	public static void setLongZhongDuiCache(LongZhongDuiCache longZhongDuiCache) {
		LongZhongDuiSysCache.longZhongDuiCache = longZhongDuiCache;
	}

	public static LongZhongDuiCache getLongZhongDuiCache() {
		return longZhongDuiCache;
	}

	@Override
	public void startServer() throws RunServerException {
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.LONGZHONGDUI);
			String content = globalData.getContent();
			if (content == null || content.equals("") || content.equals("{}")) {
				initLongZhongDui();
			} else {
				LongZhongDuiCache obj = ObjStrTransUtil.toObj(content, LongZhongDuiCache.class);
				setLongZhongDuiCache(obj);
			}

			if (LongZhongDuiFunction.getIns().isOpen()) {
				if (!isInit()) {
					LongZhongDuiFunction.getIns().initRandomTopicAndAnswer();
				}
				LongZhongDuiSysCache.isStart = true;
			}

		} catch (Exception e) {
			LogTool.error(e, LongZhongDuiCache.class, "LongZhongDuiCache startServer has wrong");
		}
	}

	/**
	 * 是否初始化过
	 * 
	 * @return
	 */
	public boolean isInit() {
		List<LongZhongDuiRankModel> longZhongDuiRankList = longZhongDuiCache.getLongZhongDuiRankList();
		int size = longZhongDuiRankList.size();
		if (size > 0) {
			LongZhongDuiRankModel longZhongDuiRankModel = longZhongDuiRankList.get(0);
			long hid = longZhongDuiRankModel.getHid();
			Hero hero = HeroCache.getHero(hid, HeroConst.FIND_TYPE_BASIC);
			int myScore = hero.getLongZhongDui().getMyScore();
			int score = longZhongDuiRankModel.getScore();
			if (myScore == score) {
				return true;
			}
		}
		return false;
	}

	public void initLongZhongDui() {
		LongZhongDuiCache longZhongDuiCache = new LongZhongDuiCache();
		longZhongDuiCache.setTopicAndAnswerList(new ArrayList<List<Integer>>());
		longZhongDuiCache.setLongZhongDuiRankList(new ArrayList<LongZhongDuiRankModel>());
		longZhongDuiCache.setJoinMap(new ConcurrentHashMap<Long, Long>());
		setLongZhongDuiCache(longZhongDuiCache);

	}

	@Override
	public void shutdownServer() {
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.LONGZHONGDUI);
			globalData.setContent(ObjStrTransUtil.toStr(getLongZhongDuiCache()));
			GlobalCache.doSync(globalData);
		} catch (Exception e) {
			LogTool.error(e, FightNSSysCache.class, "LongZhongDuiCache shutdownServer has wrong");
		}
	}
}
