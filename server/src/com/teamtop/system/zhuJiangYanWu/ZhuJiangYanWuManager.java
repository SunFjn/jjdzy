package com.teamtop.system.zhuJiangYanWu;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.battle.BattleConst;
import com.teamtop.system.daytask.DayTaskConst;
import com.teamtop.system.daytask.DayTaskFunction;
import com.teamtop.system.event.backstage.events.flowHero.FlowHeroEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalSender;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.hero.XTCS004Const;
import com.teamtop.system.robot.CrossHeroBaseRobot;
import com.teamtop.system.robot.RobotFunction;
import com.teamtop.system.wujiang.WuJiang;
import com.teamtop.system.wujiang.WuJiangModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_xtcs_004;
import excel.config.Config_zjywdl_005;
import excel.config.Config_zjywwj_005;
import excel.struct.Struct_xtcs_004;
import excel.struct.Struct_zjywdl_005;
import excel.struct.Struct_zjywwj_005;

public class ZhuJiangYanWuManager {
	private static ZhuJiangYanWuManager ins = null;

	public static ZhuJiangYanWuManager getIns() {
		if (ins == null) {
			ins = new ZhuJiangYanWuManager();
		}
		return ins;
	}

	public void login(Hero hero) {
		ZhuJiangYanWuSender.sendCmd_4712(hero.getId(), 1);
	}
	
	public void openUI(Hero hero) {
		try {
			ZhuJiangYanWu zhuJiangYanWu = hero.getZhuJiangYanWu();
			WuJiang wujiang = hero.getWujiang();
			HashMap<Integer, WuJiangModel> wujiangs = wujiang.getWujiangs();
			List<Object[]> sendData = new ArrayList<>();
			Map<Integer, Integer> initMap = ZhuJiangYanWuCache.getIndexZhuJiangYanWuMap();
			List<Struct_zjywwj_005> sortList = Config_zjywwj_005.getIns().getSortList();
			for (Struct_zjywwj_005 temp : sortList) {
				int indexExcel = temp.getId();
				Integer idWJ = initMap.get(indexExcel);
				if (idWJ == null) {
					sendData.add(new Object[] { indexExcel, 0, 0 });
				} else if (wujiangs.containsKey(idWJ)) {
					sendData.add(new Object[] { indexExcel, idWJ, ZhuJiangYanWuConst.JI_HUO_YES });
				} else {
					sendData.add(new Object[] { indexExcel, idWJ, ZhuJiangYanWuConst.JI_HUO_NO });
				}
			}
			Struct_xtcs_004 excel = Config_xtcs_004.getIns().get(XTCS004Const.ZHU_JIANG_YAN_WU_NUM);
			int num = excel.getNum();
			ZhuJiangYanWuSender.sendCmd_4714(hero.getId(), 1, sendData.toArray(), num - zhuJiangYanWu.getNumBattled());
		} catch (Exception e) {
			LogTool.error(e, this, "openUI has wrong!");
			}
		}

	public void battle(Hero hero, int index) {
		Struct_zjywwj_005 excel = Config_zjywwj_005.getIns().get(index);
		if(excel==null) {
			//该位置不存在
			ZhuJiangYanWuSender.sendCmd_4716(hero.getId(), 2,0);
			return;
		}
		ZhuJiangYanWu zhuJiangYanWu = hero.getZhuJiangYanWu();
		Struct_xtcs_004 excelXTCS = Config_xtcs_004.getIns().get( XTCS004Const.ZHU_JIANG_YAN_WU_NUM);
		int num = excelXTCS.getNum();
		if(num - zhuJiangYanWu.getNumBattled()<=0) {
			//没有挑战次数
			ZhuJiangYanWuSender.sendCmd_4716(hero.getId(), 3,0);
			return;
		}
		Map<Integer, Integer> initMap = ZhuJiangYanWuCache.getIndexZhuJiangYanWuMap();
		Integer idWJ = initMap.get(index);
		if(idWJ==null|| idWJ==0) {
			//该位置今天没有武将
			ZhuJiangYanWuSender.sendCmd_4716(hero.getId(), 4,0);
			return;
		}

		WuJiang wujiang = hero.getWujiang();
		HashMap<Integer, WuJiangModel> wujiangs = wujiang.getWujiangs();
		boolean contains = wujiangs.containsKey( idWJ);
		if(!contains) {
			Struct_zjywdl_005 excelWJ = Config_zjywdl_005.getIns().get( idWJ);
			int cost = excelWJ.getCost();
			boolean canUse = UseAddUtil.canUse(hero, GameConst.TOOL, cost, ZhuJiangYanWuConst.TOOL_ID);
			if(!canUse) {
				//未激活，演武令不足
				ZhuJiangYanWuSender.sendCmd_4716(hero.getId(), 6,0);
				return;
			}
//			UseAddUtil.use(hero, GameConst.TOOL, cost, ZhuJiangYanWuConst.TOOL_ID, SourceGoodConst.ZJYW_SPEND, true);
		}
		// 每日任务
		DayTaskFunction.getIns().successDayTaskType(hero, DayTaskConst.DATTASK_TYPE29);
		Struct_zjywdl_005 excelWJ = Config_zjywdl_005.getIns().get( idWJ);
		CrossHeroBaseRobot beChaModel = RobotFunction.getIns().createCrossHeroBaseRobot(hero, excelWJ.getRate()/1000);
		beChaModel.setJob( idWJ);
		beChaModel.setName(excelWJ.getName());
		beChaModel.setNameZoneid(excelWJ.getName());
		beChaModel.setId( beChaModel.getId()*-1);//旭哥叫的
		beChaModel.setTitleId(0);
		beChaModel.setOfficial(0);
		beChaModel.setCountryType(0);
		HeroFunction.getIns().sendBattleHeroAttr(hero, beChaModel);
		ZhuJiangYanWuSender.sendCmd_4716(hero.getId(), 1,beChaModel.getId());
		String usesys = hero.getTempData().getAccount().getUsesys();
		FlowHeroEvent.addJoinSystemFlow(hero.getId(), hero.getLevel(), hero.getVipLv(), hero.getCreateJob(),
				hero.getTotalStrength(), SystemIdConst.ZHU_JIANG_YAN_WU, hero.getZoneid(), hero.getPf(), usesys,
				hero.getReincarnationLevel());
	}
	
	public void initWJ() {
		try {
			Map<Integer, Integer> wjMap = ZhuJiangYanWuCache.getIndexZhuJiangYanWuMap();
			wjMap.clear();
			Map<Integer, ProbabilityEventModel> proMap = ZhuJiangYanWuCache.getZhuJiangYanWuProMap();
			List<Struct_zjywwj_005> excelList = Config_zjywwj_005.getIns().getSortList();
			Set<Integer> setNoSame = new HashSet<>();// 记录选中的武将，每个武将不重复
			int startTime = 0;
			int endTime = 0;
			for (Struct_zjywwj_005 excel : excelList) {
				int index = excel.getId();
				if (index == ZhuJiangYanWuConst.CHAT_BOSS_INDEX) {
					// 广播boss特殊处理
					String hstart = excel.getHstart();
					String hend = excel.getHend();
					startTime = TimeDateUtil.getTimeIntByStrTime(hstart, "yyyy-MM-dd hh:mm:ss");
					endTime = TimeDateUtil.getTimeIntByStrTime(hend, "yyyy-MM-dd hh:mm:ss");
					int currentTime = TimeDateUtil.getCurrentTime();
					if (currentTime < startTime || currentTime > endTime) {
						// 不在配置表的时间范围内
						continue;
					}
				}
				for (int i = 0; i < 100; i++) {
					ProbabilityEventModel pe = proMap.get(index);
					Object eventByProbability = ProbabilityEventUtil.getEventByProbability(pe);
					if (eventByProbability == null)
						continue;
					int idWJ = (int) eventByProbability;
					boolean contains = setNoSame.contains(idWJ);
					if (contains)
						continue;

					wjMap.put(index, idWJ);
					setNoSame.add(idWJ);
					break;
				}
			}
		} catch (Exception e) {
			LogTool.error(e, this, "openUI has wrong!");
		}
	}

	public void battleEnd(Hero hero, int index, int result) {
		Struct_zjywwj_005 excel = Config_zjywwj_005.getIns().get(index);
		if(excel==null) {
			//该位置不存在
			ZhuJiangYanWuSender.sendCmd_4718(hero.getId(), 2);
			return;
		}
		ZhuJiangYanWu zhuJiangYanWu = hero.getZhuJiangYanWu();
		Struct_xtcs_004 excelXTCS = Config_xtcs_004.getIns().get( XTCS004Const.ZHU_JIANG_YAN_WU_NUM);
		int num = excelXTCS.getNum();
		if(num - zhuJiangYanWu.getNumBattled()<=0) {
			//没有挑战次数
			ZhuJiangYanWuSender.sendCmd_4718(hero.getId(), 3);
			return;
		}
		Map<Integer, Integer> initMap = ZhuJiangYanWuCache.getIndexZhuJiangYanWuMap();
		Integer idWJ = initMap.get(index);
		if(idWJ==null|| idWJ==0) {
			//该位置今天没有武将
			ZhuJiangYanWuSender.sendCmd_4718(hero.getId(), 4);
			return;
		}
		if(result!=BattleConst.RESULT_ATT_WIN) {
			//战斗失败
			ZhuJiangYanWuSender.sendCmd_4718(hero.getId(), 7);
			GlobalSender.sendCmd_262(hero.getId(), 2, new Object[][] {});
			return;
		}
		
		WuJiang wujiang = hero.getWujiang();
		HashMap<Integer, WuJiangModel> wujiangs = wujiang.getWujiangs();
		boolean contains = wujiangs.containsKey( idWJ);
		if(!contains) {
			Struct_zjywdl_005 excelWJ = Config_zjywdl_005.getIns().get( idWJ);
			int cost = excelWJ.getCost();
			boolean canUse = UseAddUtil.canUse(hero, GameConst.TOOL, cost, ZhuJiangYanWuConst.TOOL_ID);
			if(!canUse) {
				//道具不足
				ZhuJiangYanWuSender.sendCmd_4718(hero.getId(), 6);
				return;
			}
			UseAddUtil.use(hero, GameConst.TOOL, cost, ZhuJiangYanWuConst.TOOL_ID, SourceGoodConst.ZJYW_SPEND, true);
		}
		
		List<Object[]> dropTips = new ArrayList<Object[]>();
		//奖励提示
		List<int[]> dropArr = new ArrayList<int[]>();
		//发放奖励
		List<ProbabilityEventModel> pelist =ZhuJiangYanWuCache.getZhuJiangYanWuAwardsProMap().get(idWJ);
		int size = pelist.size();
		for (int a = 0; a < size; a++) {
			ProbabilityEventModel pe = pelist.get(a);
			int[] js = (int[]) ProbabilityEventUtil.getEventByProbability(pe);
			if (js != null) {
				int type = js[0];
				if (type == GameConst.GENDROP) {
					int num1 = js[2];
					ProbabilityEventModel droppe = HeroCache.getDrop(js[1]);
					for (int j = 1; j <= num1; j++) {
						js = (int[]) ProbabilityEventUtil.getEventByProbability(droppe);
						dropArr.add(js);
						dropTips.add(new Object[] { js[0], js[1], js[2], GlobalConst.YTPE_0_WAI});
					}
				} else {
					dropArr.add(js);
					dropTips.add(new Object[] { js[0], js[1], js[2], GlobalConst.YTPE_0_WAI });
				}
			}
		}
		
		zhuJiangYanWu.setNumBattled( zhuJiangYanWu.getNumBattled()+1);
		int[][] drops = new int[dropArr.size()][];
		dropArr.toArray(drops);
		UseAddUtil.add(hero, drops, SourceGoodConst.ZJYW_ADD, UseAddUtil.getDefaultMail(), true);
		GlobalSender.sendCmd_262(hero.getId(), result, dropTips.toArray());
		ZhuJiangYanWuSender.sendCmd_4718(hero.getId(), 1);
		openUI(hero);
	}
}
