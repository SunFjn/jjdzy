package com.teamtop.system.title;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.HeroOpTaskRunnable;
import com.teamtop.system.bag.BagSender;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.guanqia.GuanqiaConst;
import com.teamtop.system.guanqia.GuanqiaFunction;
import com.teamtop.system.hero.FightCalcConst;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroConst;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.mybatis.DaoUtil;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_chenghao_702;
import excel.config.Config_daoju_204;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_chenghao_702;
import excel.struct.Struct_daoju_204;
import excel.struct.Struct_xtcs_004;

public class TitleFunction {
	private static TitleFunction ins = null;

	public static TitleFunction getIns(){
		if(ins == null){
			ins = new TitleFunction();
		}
		return ins;
	}
	
	public void init(Hero hero){
		TitleModel title = hero.getTitleModel();
		if(title==null){
			title = new TitleModel();
			hero.setTitleModel(title);
		}
	}

	/** 检测使用元宝激活称号 */
	public void useYunabaoAddTitle(Hero hero) {
		long totalConsumeGlod = hero.getTotalConsumeGlod();
		Map<Integer, List<Struct_chenghao_702>> titleActivateTypeMap = TitleCache.getTitleActivateTypeMap();
		List<Struct_chenghao_702> list = titleActivateTypeMap.get(TitleActivateType.CONSUME_ACT.getActivateType());
		if (list == null) {
			return;
		}
		for (Struct_chenghao_702 title : list) {
			int[][] condtion = title.getCondtion();
			if (totalConsumeGlod >= condtion[0][2]) {
				TitleModel titleModel = hero.getTitleModel();
				if (titleModel != null && titleModel.getHasMap().containsKey(title.getID())) {
					continue;
				}
				TitleFunction.getIns().addTitle(hero.getId(), title.getID());
			}
		}
	}

	/** 战力激活称号 */
	public void strengthAddTitle(final Hero hero, final long strength) {
		OpTaskExecutorService.DefaultService.execute(new HeroOpTaskRunnable() {

			@Override
			public void run() {
				strengthAddTitleHandle(hero, strength);
			}

			@Override
			public Object getSession() {
				return hero.getId();
			}
		});
	}

	/** 战力激活称号 */
	public void strengthAddTitleHandle(Hero hero, long strength) {
		try {
			Map<Integer, List<Struct_chenghao_702>> titleActivateTypeMap = TitleCache.getTitleActivateTypeMap();
			List<Struct_chenghao_702> list = titleActivateTypeMap.get(TitleActivateType.STRENGTH_ACT.getActivateType());
			if (list == null) {
				return;
			}
			TitleModel titleModel = hero.getTitleModel();
			if (titleModel == null) {
				return;
			}
			Set<Integer> titleSet = titleModel.getTitleSet();
			for (Struct_chenghao_702 title : list) {
				int[][] condtion = title.getCondtion();
				if (strength >= condtion[0][2]) {
					addTitle(hero.getId(), title.getID());
					titleSet.add(title.getID());
				}
			}
		} catch (Exception e) {
			LogTool.error(e, TitleFunction.class, hero.getId(), hero.getName(), "strengthAddTitle Exception!");
		}
	}

	/**
	 * 获得称号，记录称号状态及计算战力均在此方法内
	 * @param hero
	 * @param titleId
	 * @throws Exception 
	 */
	public void addTitle(final long hid, final int titleId) {
		Struct_chenghao_702 title = Config_chenghao_702.getIns().get(titleId);
		Hero hero = HeroCache.getHero(hid, HeroConst.FIND_TYPE_TITLE);
		TitleModel titleModel = hero.getTitleModel();
		if (titleModel == null) {
			return;
		}
		Set<Integer> titleSet = titleModel.getTitleSet();
		if (title.getType() == TitleType.Forever.getType()
				&& (titleModel.getHasMap().containsKey(title.getID()) || titleSet.contains(title.getID()))) {
			return;
		}
		int[][] email = title.getEmail();
		if (email != null) {
			if (titleModel.getHasMap().containsKey(title.getID()) || titleSet.contains(title.getID())) {
				return;
			}
			int[] award = new int[] { GameConst.TOOL, email[0][1], 1, 0 };
			int[][] fujianData = new int[1][];
			fujianData[0] = award;
			MailFunction.getIns().sendMailWithFujianData(hid, email[0][0],
					new Object[] { email[0][0], title.getName() }, fujianData);
		} else {
			OpTaskExecutorService.DefaultService.execute(new HeroOpTaskRunnable() {

				@Override
				public void run() {
					addTitleHandle(hid, titleId, false);
				}

				@Override
				public Object getSession() {
					return hid;
				}
			});
		}
	}

	/**
	 * 获得称号，记录称号状态及计算战力均在此方法内
	 * 
	 * @param hero
	 * @param titleId
	 * @param isTool
	 */
	protected boolean addTitleHandle(long hid, int titleId, boolean isTool) {
		try {
			Hero hero = HeroCache.getHero(hid);
			if (hero == null) {
				// List<String> tempTbs = new ArrayList<String>();
				// tempTbs.add("titlemodel");
				hero = HeroCache.getHero(hid, HeroConst.FIND_TYPE_TITLE);//HeroDao.getIns().findWithInclude(hid, tempTbs);
			}
			LogTool.info(hid, hero.getName(), "TitleFunction start add titleId=" + titleId, TitleFunction.class);
			TitleModel title = hero.getTitleModel();
			if(title==null){
				init(hero);
				title = hero.getTitleModel();
			}
			Map<Integer, TitleInfo> hasMap = title.getHasMap();
			Struct_chenghao_702 titleData = Config_chenghao_702.getIns().get(titleId);
			if (titleData == null) {
				return false;
			}
			if(hasMap.containsKey(titleId)){
				TitleInfo titleInfo = hasMap.get(titleId);
				if (titleData.getType() == TitleType.Forever.getType()) {
					Struct_xtcs_004 struct_changshu_101 = Config_xtcs_004.getIns().get(TitleConst.MIX_LEVEL_INDEX);
					int maxLevel = struct_changshu_101.getNum();
					if (isTool) {
						if(titleInfo.getLevel()>=maxLevel) {
							TitleModelSender.sendCmd_514(hid, 0, 2, 0);
							return false;
						}else {							
							titleInfo.setLevel(titleInfo.getLevel() + 1);
							LogTool.info(hid, hero.getName(), "title upgrade title="+titleId+", level="+titleInfo.getLevel(), TitleFunction.class);
						}
					}
				}
				titleInfo.setTimeGet(TimeDateUtil.getCurrentTime());
				titleInfo.setState(TitleConst.HAD_ACTIVATE);
				if (!hero.isOnline()) {
					DaoUtil.update(title, hero.getZoneid());
				}
			}else{
				TitleInfo info = new TitleInfo();
				// if (titleData.getType() == TitleType.Forever.getType()) {
				// info.setState(TitleConst.CAN_ACTIVATE);
				// } else {
				info.setState(TitleConst.HAD_ACTIVATE);
				// }
				int[][] condtion = titleData.getCondtion();
				if (condtion != null) {
					for (int[] arr : condtion) {
						if (arr[0] == TitleActivateType.TOOL_ACT.getActivateType() || titleData.getEmail() != null) {
							info.setLevel(1);
						}
					}
				}
				info.setTimeGet(TimeDateUtil.getCurrentTime());
				hasMap.put(titleId, info);
				// 重新计算战力
				if (hero.isOnline()) {
					// 穿戴最新称号
					TitleModelManager.getIns().handleTitle(hero, 1, titleId);
					TitleModelManager.getIns().openTitle(hero);
					if (!isTool) {
						FightCalcFunction.setRecalcAll(hero, FightCalcConst.TITLE_WEAR,SystemIdConst.TITLE_SYSID);
					}
				} else {
					DaoUtil.update(title, hero.getZoneid());
				}
				LogTool.info(hid, hero.getName(), "TitleFunction add titleId=" + titleId, TitleFunction.class);
			}
			if (hero.isOnline()) {
				GuanqiaFunction.getIns().updateExpAddition(hero, GuanqiaConst.ADD_TYPE1, titleId);
			}
		} catch (Exception e) {
			LogTool.error(e, this, "addTitle hid:"+hid+" tid:"+titleId+" Exception!");
			return false;
		}
		return true;
	}

	/**
	 * 移除称号
	 * 
	 * @param hid
	 * @param titleId //称号id
	 */
	public void removeTitle(final long hid, final int titleId) {
		OpTaskExecutorService.DefaultService.execute(new HeroOpTaskRunnable() {

			@Override
			public void run() {
				removeTitleHandle(hid, titleId);
			}

			@Override
			public Object getSession() {
				return hid;
			}
		});
	}

	private void removeTitleHandle(long hid, int titleId) {
		try {
			Hero hero = HeroCache.getHero(hid);
			if (hero == null) {
				hero = HeroCache.getHero(hid, HeroConst.FIND_TYPE_TITLE);
			}
			TitleModel title = hero.getTitleModel();
			if(title==null){
				init(hero);
				title = hero.getTitleModel();
			}
			Map<Integer, TitleInfo> hasMap = title.getHasMap();
			if(hasMap.containsKey(titleId)){
				LogTool.info(hid, hero.getName(), "TitleFunction remove titleId=" + titleId, TitleFunction.class);
				hasMap.remove(titleId);
				if(title.getWearTitleId()==titleId){
					title.setWearTitleId(0);
					hero.setTitleId(0);
				}
				if(hero.isOnline()){
					//重新计算战力
					FightCalcFunction.setRecalcAll(hero, FightCalcConst.TITLE_WEAR,SystemIdConst.TITLE_SYSID);
					TitleModelSender.sendCmd_508(hero.getId(), titleId);
				}else{
					DaoUtil.update(hero.getTitleModel(), hero.getZoneid());
				}
				Struct_chenghao_702 titleData = Config_chenghao_702.getIns().get(titleId);
				MailFunction.getIns().sendMailWithFujianData(hero.getId(), MailConst.MAIL_ID_TITLE_REMOVE, new Object[]{MailConst.MAIL_ID_TITLE_REMOVE, titleData.getName()},new int[0][]);
			}
		} catch (Exception e) {
			LogTool.error(e, this, "remove hid:"+hid+" tid:"+titleId+" Exception!");
		}
	}
	
	/**
	 * 检查时限称号是否过期（系统调用）
	 * 
	 * @param hero
	 */
	public void checkOverTime(final Hero hero) {
		OpTaskExecutorService.DefaultService.execute(new HeroOpTaskRunnable() {

			@Override
			public void run() {
				checkOverTimeHandle(hero);
			}

			@Override
			public Object getSession() {
				return hero.getId();
			}
		});
	}

	/**
	 * 检查时限称号是否过期
	 * 
	 * @param hero
	 */
	private void checkOverTimeHandle(Hero hero) {
		try {
			TitleModel title = hero.getTitleModel();
			if (title != null) {
				Map<Integer, TitleInfo> hasMap = title.getHasMap();
				if (hasMap.size() == 0)
					return;
				Set<Entry<Integer, TitleInfo>> entry = hasMap.entrySet();
				Iterator<Entry<Integer, TitleInfo>> iter = entry.iterator();
				int curTime = TimeDateUtil.getCurrentTime();
				boolean removeFlag = false;
				boolean replaceFlag = false;
				List<Integer> removeIdList = new ArrayList<>();
				for (; iter.hasNext();) {
					Entry<Integer, TitleInfo> next = iter.next();
					int tid = next.getKey();
					Struct_chenghao_702 titleData = Config_chenghao_702.getIns().get(tid);
					TitleInfo info = next.getValue();
					int type = titleData.getType();
					if (type > TitleType.Forever.getType() && (curTime - info.getTimeGet()) >= type) {
						if (tid == title.getWearTitleId()) {
							replaceFlag = true;
						}
						removeIdList.add(tid);
						removeFlag = true;
					}
				}
				if (removeFlag) {
					for (int removeId : removeIdList) {
						try {
							removeTitle(hero.getId(), removeId);
						} catch (Exception e) {
							LogTool.error(e, TitleFunction.class,
									"remove title err,hid:" + hero.getId() + ",titleid:" + removeId);
						}
					}
					if (replaceFlag) {// 移除的正是身上穿戴的，随机寻找一个已有的装备上
						if (title.getWearTitleId() == 0) {
							hasMap = title.getHasMap();
							for (int tid : hasMap.keySet()) {
								TitleInfo titleInfo = hasMap.get(tid);
								if (titleInfo.getState() == TitleConst.HAD_ACTIVATE) {
									TitleModelManager.getIns().handleTitle(hero, 1, tid);
								}
							}
						}
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, TitleFunction.class, hero.getId(), hero.getName(), "");
		}
	}
	
	/**
	 * 使用道具添加称号
	 * @param hero
	 * @param sysid
	 * @param num   对于永久称号，这个数量没有意义；
	 */
	public boolean useItemAddTitle(Hero hero, int sysId, int num){
		Struct_daoju_204 item = Config_daoju_204.getIns().get(sysId);
		String use = item.getUse();
		// 根据道具配置信息获取到称号id
		int titleId = Integer.parseInt(use);
		boolean result = false;
		int useNum = 0;
		for (int i = 0; i < num; i++) {
			result = addTitleHandle(hero.getId(), titleId, true);
			if (result) {
				useNum += 1;
			} else {
				break;
			}
		}
		UseAddUtil.use(hero, GameConst.TOOL, useNum, sysId, SourceGoodConst.USE_MATERIAL);
		BagSender.sendCmd_208(hero.getId(), 1);
		if (useNum > 0) {
			FightCalcFunction.setRecalcAll(hero, FightCalcConst.TITLE_UPGRADE,SystemIdConst.TITLE_SYSID);
			TitleModel titleModel = hero.getTitleModel();
			if (titleModel != null) {
				TitleInfo titleInfo = titleModel.getHasMap().get(titleId);
				if (titleInfo != null && titleInfo.getLevel() > 1) {
					TitleModelSender.sendCmd_514(hero.getId(), 1, titleId, titleInfo.getLevel());
				}
			}
		}
		return false;
	}
	/**
	 * 和服删除称号
	 * @param hid
	 * @param titleId
	 */
	public void heFuRemoveTitle(long hid, int titleId) {
		try {
			Hero hero =  HeroCache.getHero(hid, HeroConst.FIND_TYPE_TITLE);
			TitleModel title = hero.getTitleModel();
			if(title!=null){
				Map<Integer, TitleInfo> hasMap = title.getHasMap();
				if(hasMap.containsKey(titleId)){
					LogTool.info(hid, hero.getName(), "heFuRemoveTitle titleId=" + titleId, TitleFunction.class);
					hasMap.remove(titleId);
					if(title.getWearTitleId()==titleId){
						title.setWearTitleId(0);
						hero.setTitleId(0);
						
					}
					DaoUtil.update(hero.getTitleModel(), hero.getZoneid());
					Struct_chenghao_702 titleData = Config_chenghao_702.getIns().get(titleId);
					MailFunction.getIns().sendMailWithFujianData(hero.getId(), MailConst.MAIL_ID_TITLE_REMOVE, new Object[]{MailConst.MAIL_ID_TITLE_REMOVE, titleData.getName()},new int[0][]);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, this, "remove hid:"+hid+" tid:"+titleId+" Exception!");
		}
	}
	
}
