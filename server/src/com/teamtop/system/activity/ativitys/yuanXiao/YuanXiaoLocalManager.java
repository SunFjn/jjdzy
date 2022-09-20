package com.teamtop.system.activity.ativitys.yuanXiao;

import java.util.HashMap;

import com.jcraft.jsch.jce.Random;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.AbstractActivityManager;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;
import com.teamtop.util.ProbabilityEvent.RandomUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_xtcs_004;
import excel.config.Config_zyx_775;
import excel.struct.Struct_xtcs_004;
import excel.struct.Struct_zyx_775;

public class YuanXiaoLocalManager extends AbstractActivityManager {
	
	private static YuanXiaoLocalManager ins;

	private YuanXiaoLocalManager() {
		
	}

	public static synchronized YuanXiaoLocalManager getIns() {
		if (ins == null) {
			ins = new YuanXiaoLocalManager();
		}
		return ins;
	}

	@Override
	public void actOpen() {
		
		
	}

	@Override
	public void heroActOpen(Hero hero) {
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_YUANXIAO)) {
				return;
			}
			// 活动开启处理
			YuanXiaoLocal yuanXiaoLocal = (YuanXiaoLocal)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.ACT_YUANXIAO);
			yuanXiaoLocal.setHasGetNum(0);
			HashMap<Integer, Integer> cailiaoMap=new HashMap<>();
			cailiaoMap.put(YuanXiaoConst.CAILIAO_1, 0);
			cailiaoMap.put(YuanXiaoConst.CAILIAO_2, 0);
			cailiaoMap.put(YuanXiaoConst.CAILIAO_3, 0);
			yuanXiaoLocal.setCailiaoMap(cailiaoMap);
			yuanXiaoLocal.setAddNumTime(0);
			yuanXiaoLocal.setFreeNum(0);
			yuanXiaoLocal.setHasGetNum(0);
			YuanXiaoCrossIO.getIns().initYuanXiaoCrossJoiner(hero, yuanXiaoLocal);
		} catch (Exception e) {
			LogTool.error(e, YuanXiaoLocalManager.class, "heroActOpen has wrong");
		}
		
		
	}

	@Override
	public void actEnd() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void heroActEnd(Hero hero) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public ActivityData getActivityData(Hero hero, ActivityInfo activityInfo) {
		YuanXiaoLocal yuanXiaoLocal=new YuanXiaoLocal();
		yuanXiaoLocal.setHid(hero.getId());
		HashMap<Integer, Integer> cailiaoMap=new HashMap<>();
		
		cailiaoMap.put(YuanXiaoConst.CAILIAO_1, 0);
		cailiaoMap.put(YuanXiaoConst.CAILIAO_2, 0);
		cailiaoMap.put(YuanXiaoConst.CAILIAO_3, 0);
		yuanXiaoLocal.setCailiaoMap(cailiaoMap);
		
		yuanXiaoLocal.setAddNumTime(0);
		yuanXiaoLocal.setFreeNum(0);
		yuanXiaoLocal.setHasGetNum(0);
		
		return yuanXiaoLocal;
	}

	@Override
	public Class<?> getActivityData() {
		// TODO Auto-generated method stub
		return YuanXiaoLocal.class;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		return YuanXiaoLocalEvent.getIns();
	}

	@Override
	public void openUI(Hero hero) {
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_YUANXIAO)) {
				return;
			}
			// 活动开启处理
			YuanXiaoLocal yuanXiaoLocal = (YuanXiaoLocal)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.ACT_YUANXIAO);
			YuanXiaoCrossIO.getIns().LTCgetMyYuanXiaoInfo(hero, yuanXiaoLocal);
			int addNumTime = yuanXiaoLocal.getAddNumTime();
			int currentTime = TimeDateUtil.getCurrentTime();
			if (addNumTime==0||addNumTime>currentTime) {
				addNumTime=currentTime;
				yuanXiaoLocal.setAddNumTime(currentTime);
			}
			int lastTime=currentTime-addNumTime;
			int time=lastTime%3600;
			int addNum=lastTime/3600;
			int addfreenum=0;
			if (addNum>0) {
				if (yuanXiaoLocal.getHasGetNum()<YuanXiaoConst.MAX_FREENUM) {
					if (addNum>YuanXiaoConst.MAX_FREENUM-yuanXiaoLocal.getHasGetNum()) {
						addfreenum=YuanXiaoConst.MAX_FREENUM-yuanXiaoLocal.getHasGetNum();
					}else {
						addfreenum=addNum;
					}
					yuanXiaoLocal.setAddNumTime(currentTime);
					yuanXiaoLocal.setFreeNum(yuanXiaoLocal.getFreeNum()+addfreenum);
				}else {
					addfreenum=0;
					time=0;
				}
			}
			HashMap<Integer, Integer> cailiaoMap = yuanXiaoLocal.getCailiaoMap();
			Integer cailiao1 = cailiaoMap.get(YuanXiaoConst.CAILIAO_1);
			Integer cailiao2 = cailiaoMap.get(YuanXiaoConst.CAILIAO_2);
			Integer cailiao3 = cailiaoMap.get(YuanXiaoConst.CAILIAO_3);
			YuanXiaoLocalSender.sendCmd_11630(hero.getId(), yuanXiaoLocal.getFreeNum(), time,cailiao1,cailiao2,cailiao3);
		} catch (Exception e) {
			LogTool.error(e, YuanXiaoLocalManager.class, "YuanXiaoLocalManage openUI  has wrong");
			
		}
		
	}
	/**
	 *  打开抢夺材料界面 11631
	 * @param hero
	 */
	public void openBattle(Hero hero,int type) {
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_YUANXIAO)) {
				return;
			}
			YuanXiaoLocal yuanXiaoLocal = (YuanXiaoLocal)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.ACT_YUANXIAO);
			YuanXiaoCrossIO.getIns().LTCgetList(hero, type, yuanXiaoLocal);
		} catch (Exception e) {
			LogTool.error(e, YuanXiaoLocalManager.class, "YuanXiaoLocalManage openBattle has wrong");
		}
		
	}

	public void battleHid(Hero hero, int type,long ghid) {
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_YUANXIAO)) {
				return;
			}
			YuanXiaoLocal yuanXiaoLocal = (YuanXiaoLocal)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.ACT_YUANXIAO);
			
			YuanXiaoCrossIO.getIns().LTCbattleHid(hero, ghid, type, yuanXiaoLocal);
			
			
		} catch (Exception e) {
			LogTool.error(e, YuanXiaoLocalManager.class, "YuanXiaoLocalManage battleHid has wrong");
		}
		
	}

	public void refresh(Hero hero, int type) {
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_YUANXIAO)) {
				return;
			}
			YuanXiaoLocal yuanXiaoLocal = (YuanXiaoLocal)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.ACT_YUANXIAO);
			int currentTime = TimeDateUtil.getCurrentTime();
			int freeReshTime = yuanXiaoLocal.getFreeReshTime();
			if (currentTime-freeReshTime>=YuanXiaoConst.FREECD) {
				//免费刷新
				int reshBattleList = YuanXiaoCrossIO.getIns().reshBattleList(yuanXiaoLocal, type);
				if (reshBattleList==1) {
					//刷新成功
					yuanXiaoLocal.setFreeReshTime(currentTime);
					return;
				}
			}else  {
				Struct_xtcs_004 struct_xtcs_004 = Config_xtcs_004.getIns().get(YuanXiaoConst.RESHCONST);
				if(UseAddUtil.canUse(hero, struct_xtcs_004.getOther())) {
					int reshBattleList = YuanXiaoCrossIO.getIns().reshBattleList(yuanXiaoLocal, type);
					if (reshBattleList==1) {
						//刷新成功
						UseAddUtil.use(hero, struct_xtcs_004.getOther(), SourceGoodConst.YUANXIAO_RESH, true);
						return;
					}
				}else {
					 YuanXiaoLocalSender.sendCmd_11636(yuanXiaoLocal.getId(),2);
					 return;
				}
				
			}
		} catch (Exception e) {
			LogTool.error(e, YuanXiaoLocalManager.class, "YuanXiaoLocalManage refresh has wrong");
		}
		
	}
	/**
	 * 做汤圆
	 * @param hero
	 */
	public void make(Hero hero) {
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_YUANXIAO)) {
				return;
			}
			YuanXiaoLocal yuanXiaoLocal = (YuanXiaoLocal)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.ACT_YUANXIAO);
			YuanXiaoCrossIO.getIns().LTCgetMyYuanXiaoInfo(hero, yuanXiaoLocal);
			int periods = yuanXiaoLocal.getPeriods();
			Struct_zyx_775 struct_zyx_775 = Config_zyx_775.getIns().get(periods);
			HashMap<Integer, Integer> cailiaoMap = yuanXiaoLocal.getCailiaoMap();
			HashMap<Integer, Integer> costMap=new HashMap<Integer, Integer>();
			
			int[][] cl = struct_zyx_775.getCl();
			for (int i = 0; i < cl.length; i++) {
				int[] js = cl[i];
				int sysId = js[0];
				int needNum = js[2];
				if (!cailiaoMap.containsKey(sysId)) {
					YuanXiaoLocalSender.sendCmd_11638(hero.getId(), 1, 0, 0, cailiaoMap.get(YuanXiaoConst.CAILIAO_1),
							cailiaoMap.get(YuanXiaoConst.CAILIAO_2), cailiaoMap.get(YuanXiaoConst.CAILIAO_3));
					return;
				}
				Integer hasNum = cailiaoMap.get(sysId);
				if (hasNum<needNum) {
					YuanXiaoLocalSender.sendCmd_11638(hero.getId(), 1, 0, 0, cailiaoMap.get(YuanXiaoConst.CAILIAO_1),
							cailiaoMap.get(YuanXiaoConst.CAILIAO_2), cailiaoMap.get(YuanXiaoConst.CAILIAO_3));
					return;
				}
				costMap.put(sysId, needNum);
			}
			//使用材料
			boolean useRest = YuanXiaoCrossIO.getIns().LTCusecailiao(yuanXiaoLocal, costMap);
			if (useRest) {
				int[][] reward = null;
				int[][] jl = struct_zyx_775.getJl();
				ProbabilityEventModel probabilityEventModel = new ProbabilityEventModel();
				for (int[] up : jl) {
					int[][] data = new int[1][];
					data[0] = new int[]{up[0], up[1], up[2]};
					probabilityEventModel.addProbabilityEvent(up[3], data);
				}
				reward = (int[][]) ProbabilityEventUtil.getEventByProbability(probabilityEventModel);// 随机
				UseAddUtil.add(hero, reward, SourceGoodConst.YUANXIAO_REWARD, null, false);
				
				cailiaoMap = yuanXiaoLocal.getCailiaoMap();
				YuanXiaoLocalSender.sendCmd_11638(hero.getId(), 0,reward[0][0], reward[0][2], cailiaoMap.get(YuanXiaoConst.CAILIAO_1),
						cailiaoMap.get(YuanXiaoConst.CAILIAO_2), cailiaoMap.get(YuanXiaoConst.CAILIAO_3));
				return;
			}
		} catch (Exception e) {
			LogTool.error(e, YuanXiaoLocalManager.class, "YuanXiaoLocalManage make has wrong");
		}
		
	}

	public void getCaiLiao(Hero hero) {
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_YUANXIAO)) {
				return;
			}
			// 活动开启处理
			YuanXiaoLocal yuanXiaoLocal = (YuanXiaoLocal)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.ACT_YUANXIAO);
			int freeNum = yuanXiaoLocal.getFreeNum();
			if (freeNum>0) {
				for (int i = 0; i < freeNum; i++) {
					//领取材料
					int key = RandomUtil.getRandomNumInAreas(YuanXiaoConst.CAILIAO_1, YuanXiaoConst.CAILIAO_3);
					UseAddUtil.add(hero, key, 1, SourceGoodConst.YUANXIAO_ADDFEEL, true);
				}
				yuanXiaoLocal.setFreeNum(0);
				yuanXiaoLocal.setHasGetNum(yuanXiaoLocal.getHasGetNum()+freeNum);
				YuanXiaoLocalSender.sendCmd_11642(hero.getId(), 0, yuanXiaoLocal.getHasGetNum(), yuanXiaoLocal.getFreeNum());
				YuanXiaoFunction.getIns().changeCaiLiaoNum(yuanXiaoLocal);
				return;
			}
			YuanXiaoLocalSender.sendCmd_11642(hero.getId(), 1, yuanXiaoLocal.getHasGetNum(), yuanXiaoLocal.getFreeNum());
			return;
			
		} catch (Exception e) {
			LogTool.error(e, YuanXiaoLocalManager.class, "YuanXiaoLocalManage getCaiLiao has wrong");
		}
		
	}

}
