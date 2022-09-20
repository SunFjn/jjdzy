package com.teamtop.system.activity.ativitys.countryTreasure;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.AbstractActivityManager;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.util.ProbabilityEvent.RandomUtil;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_bzcj_753;
import excel.config.Config_bzjc_753;
import excel.config.Config_cjxh_753;
import excel.config.Config_ewjl_753;
import excel.struct.Struct_bzcj_753;
import excel.struct.Struct_bzjc_753;
import excel.struct.Struct_cjxh_753;
import excel.struct.Struct_ewjl_753;

public class CountryTreasureManager extends AbstractActivityManager{
	
	private static CountryTreasureManager ins = null;

	public static CountryTreasureManager getIns() {
		if (ins == null) {
			ins = new CountryTreasureManager();
		}
		return ins;
	}

	private CountryTreasureManager() {
		
	}

	@Override
	public void actOpen() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void heroActOpen(Hero hero) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void actEnd() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void heroActEnd(Hero hero) {
		CountryTreasure countryTreasure = (CountryTreasure) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.ACT_COUNTRYTREASURE);
		
		Map<Integer, Integer> extraRewards = countryTreasure.getExtraRewards();
		for (int key:extraRewards.keySet()) {
			Integer state = extraRewards.get(key);
			if (state==GameConst.REWARD_1) {
				extraRewards.put(key, GameConst.REWARD_2);
				Struct_ewjl_753 struct_ewjl_753 = Config_ewjl_753.getIns().get(key);
				MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.COUNTRY_TREASURE, new Object[] { MailConst.COUNTRY_TREASURE }, struct_ewjl_753.getJl());
			}
			
		}
		
	}

	@Override
	public ActivityData getActivityData(Hero hero, ActivityInfo activityInfo) {
		CountryTreasure countryTreasure = new CountryTreasure();
		
		int periods = activityInfo.getPeriods();
		countryTreasure.setHid(hero.getId());
		countryTreasure.setIndexId(activityInfo.getIndex());
		countryTreasure.setActId(activityInfo.getActId());
		countryTreasure.setPeriods(activityInfo.getPeriods());
		
		countryTreasure.setState(0);
		countryTreasure.setLun(1);
		countryTreasure.setCinum(0);
		countryTreasure.setChooseReward(new HashMap<Integer, List<int[]>>());
		countryTreasure.setHasChooseReward(new HashMap<>());
		countryTreasure.setUiInfo(new ArrayList<int[]>());
		countryTreasure.setExtraRewards(new HashMap<>());
		
		List<Struct_ewjl_753> sortList = Config_ewjl_753.getIns().getSortList();
		for (Struct_ewjl_753 ewjl_753:sortList) {
			if (periods==ewjl_753.getQs()) {
				countryTreasure.getExtraRewards().put(ewjl_753.getId(), GameConst.REWARD_0);
			}
		}
		return countryTreasure;
	}

	@Override
	public Class<?> getActivityData() {
		
		return CountryTreasure.class;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		// TODO Auto-generated method stub
		return CountryTreasureEvent.getIns();
	}

	@Override
	public void openUI(Hero hero) {
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_COUNTRYTREASURE)) {
				return;
			}
			CountryTreasure countryTreasure = (CountryTreasure) ActivityFunction.getIns().getActivityData(hero,
					ActivitySysId.ACT_COUNTRYTREASURE);
			
			
			List<Struct_ewjl_753> sortList = Config_ewjl_753.getIns().getSortList();
			for (Struct_ewjl_753 ewjl_753:sortList) {
				if (countryTreasure.getPeriods()==ewjl_753.getQs() && !countryTreasure.getExtraRewards().containsKey(ewjl_753.getId())) {
					countryTreasure.getExtraRewards().put(ewjl_753.getId(), GameConst.REWARD_0);
				}
			}
			Object[] extraRewad=new Object[countryTreasure.getExtraRewards().size()];
			int i=0;
			for (Integer key:countryTreasure.getExtraRewards().keySet()) {
				Struct_ewjl_753 bzjc_753 = Config_ewjl_753.getIns().get(key);
				if (bzjc_753.getQs()==countryTreasure.getPeriods()&&bzjc_753.getLs()==countryTreasure.getLun()) {
					int sate=countryTreasure.getExtraRewards().get(key);
					extraRewad[i]=new Object[] {key,sate};
					i++;
				}
			}
			extraRewad=CommonUtil.removeNull(extraRewad);
			Object[] uiinfos=null;
			if (countryTreasure.getState()==0) {
				//选择奖品界面
			
			}else {
				//抽奖界面
				int size = countryTreasure.getUiInfo().size();
				if (size>0) {
					int a=0;
					uiinfos=new Object[countryTreasure.getUiInfo().size()];
					for (int[]  hasGetRewards:countryTreasure.getUiInfo()) {
						uiinfos[a]=new Object[] {hasGetRewards[0],hasGetRewards[1],hasGetRewards[2],hasGetRewards[3]};
						a++;
					}
				}
				
			}
			int maxLun=getMaxLun(countryTreasure.getPeriods());
			CountryTreasureSender.sendCmd_8650(hero.getId(), countryTreasure.getState(), countryTreasure.getPeriods(), 
					countryTreasure.getLun(), countryTreasure.getCinum(),maxLun, uiinfos, extraRewad);
			return;
		} catch (Exception e) {
			LogTool.error(e, CountryTreasureManager.class, "openUI has wrong");
		}
		
	}
	/**
	 * 选择物品
	 * @param hero
	 * @param items
	 */
	public void chooseItem(Hero hero, Object[] items) {
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_COUNTRYTREASURE)) {
				return;
			}
			CountryTreasure countryTreasure = (CountryTreasure) ActivityFunction.getIns().getActivityData(hero,
					ActivitySysId.ACT_COUNTRYTREASURE);
			if (countryTreasure.getState()==1) {
				LogTool.warn("chooseItem has wrong :countryTreasure.getState()==1", CountryTreasureManager.class);
				return;
			}
			int periods = countryTreasure.getPeriods();
			int mylun = countryTreasure.getLun();
			
			if (countryTreasure.getState()==0) {
				//选择奖品界面
				for(int i=0; i<items.length; i++){
					Object[] itemById = (Object[]) items[i];
					int index=(Integer)itemById[0];
					int jibie=index%10;
					int lun=(index/10)%10;
					int qs=(index/100)%10;
					//验证选取奖励 期数 轮数 
					if (qs!=countryTreasure.getPeriods()||lun!=countryTreasure.getLun()) {
						LogTool.warn(index+" hid :"+hero.getId()+"name: "+hero.getName()+"qs!=countryTreasure.getPeriods()||lun!=countryTreasure.getLun()", CountryTreasureManager.class);
					    return;
					}
					//验证级别奖励 选取个数
					Integer num = CountryTreasureConst.ChooseNum.get(jibie);
					if (num==null) {
						LogTool.warn(index+" hid :"+hero.getId()+"name: "+hero.getName()+"num==null", CountryTreasureManager.class);
					    return;
					}
					Object[] itemids=(Object[])itemById[1];
					int len=itemids.length;
					if (len!=num) {
						LogTool.warn(index+" hid :"+hero.getId()+"name: "+hero.getName()+"len!=num", CountryTreasureManager.class);
					    return;
					}
					//过滤掉重复的下标
					if (len>0) {
						if (len==3) {
							if (itemids[0]==itemids[1]||itemids[1]==itemids[2]||itemids[0]==itemids[2]) {
								LogTool.warn(index+" hid :"+hero.getId()+"name: "+hero.getName()+"itemids[0]==itemids[1]", CountryTreasureManager.class);
								return;
							}
						}else if (len==2) {
							if (itemids[0]==itemids[1]) {
								LogTool.warn(index+" hid :"+hero.getId()+"name: "+hero.getName()+"itemids[0]==itemids[1]", CountryTreasureManager.class);
								return;
							}
						}
						
					}
					
					Struct_bzjc_753 struct_bzjc_753 = Config_bzjc_753.getIns().get(index);
					for (int j = 0; j < itemids.length; j++) {
						int  weizhi = (byte)itemids[j];
						int[] ks = struct_bzjc_753.getBzjc()[weizhi];
						if (ks==null) {
							LogTool.warn(index+" hid :"+hero.getId()+"name: "+hero.getName()+"ks==null", CountryTreasureManager.class);
						    return;
						}
						int[] copyArray=new int[ks.length];
						System.arraycopy(ks, 0, copyArray, 0, ks.length);
						if (!countryTreasure.getChooseReward().containsKey(index)) {
							countryTreasure.getChooseReward().put(index, new ArrayList<>());
						}
						countryTreasure.getChooseReward().get(index).add(copyArray);
						LogTool.info(index+" hid :"+hero.getId()+"name: "+hero.getName()+" weizhi:"+weizhi+" chooseItem Success", CountryTreasureManager.class);
					}
				}
				int ptRewardIndex=periods*100+mylun*10+CountryTreasureConst.REWARD_SYS;
				int[][] bzjc = Config_bzjc_753.getIns().get(ptRewardIndex).getBzjc();
				//系统奖池直接添加
				for (int i = 0; i < bzjc.length; i++) {
					int[] js = bzjc[i];
					int[] copyArray=new int[js.length];
					System.arraycopy(js, 0, copyArray, 0, js.length);
					if (!countryTreasure.getChooseReward().containsKey(ptRewardIndex)) {
						countryTreasure.getChooseReward().put(ptRewardIndex, new ArrayList<>());
					}
					countryTreasure.getChooseReward().get(ptRewardIndex).add(copyArray);
				}
				countryTreasure.setState(1);
				CountryTreasureSender.sendCmd_8652(hero.getId(), 0);
				return;
				
			}
		} catch (Exception e) {
			LogTool.error(e, CountryTreasureManager.class, "chooseItem has wrong");
		}
		
	}
	/**
	 * 抽奖
	 * @param hero
	 * @param index
	 */
	public void getreward(Hero hero, int index) {
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_COUNTRYTREASURE)) {
				return;
			}
			CountryTreasure countryTreasure = (CountryTreasure) ActivityFunction.getIns().getActivityData(hero,
					ActivitySysId.ACT_COUNTRYTREASURE);
			if (countryTreasure.getState()==0) {
				//选择奖励界面
				LogTool.warn("getreward has wrong :countryTreasure.getState()==0", CountryTreasureManager.class);
				return;
			}
			List<int[]> uiInfo = countryTreasure.getUiInfo();
			if (uiInfo.size()>0) {
				for (int[]  hasGetRewards:uiInfo) {
					if (hasGetRewards[3]==index) {
						//此位置已经被翻牌过
						LogTool.warn("uiInfo.get(index)!=null index"+index, CountryTreasureManager.class);
						CountryTreasureSender.sendCmd_8654(hero.getId(), 1, 0, 0, 0, index);
						return;
					}
				}
				
			}
			int indexNum=countryTreasure.getCinum()+1;
			Struct_cjxh_753 struct_cjxh_753 = Config_cjxh_753.getIns().get(indexNum);
			if (struct_cjxh_753==null) {
				LogTool.warn("hero hid:"+hero.getId()+" index:"+index, CountryTreasureManager.class);
				return;
			}
			int qs=countryTreasure.getPeriods();
			int lun = countryTreasure.getLun();
			if (UseAddUtil.canUse(hero, struct_cjxh_753.getXh())) {
				UseAddUtil.use(hero, struct_cjxh_753.getXh(), SourceGoodConst.COUNTRYTREASURE_COST, true);
				for (Struct_bzcj_753 bzcj_753:Config_bzcj_753.getIns().getSortList()) {
					if (bzcj_753.getQs()==qs&&bzcj_753.getLs()==lun&&indexNum>=bzcj_753.getCs()[0][0]&&indexNum<=bzcj_753.getCs()[0][1]) {
						int[][] bzjc = bzcj_753.getBzjc();
						
						if (bzjc[0].length>1) {
							int length=bzjc[0].length;
							List<Integer> randomList = RandomUtil.getMultiRandomNumInArea(0, length-1,length);
							//按照随机数组下标顺序 来去奖池里抽东西
							for (int i = 0; i < randomList.size(); i++) {
								int rewardindex =bzjc[0][randomList.get(i)];
								if (getRewardFromChi(hero,countryTreasure, rewardindex, index)) {
									break;
								}
							}
						}else if(bzjc[0].length==1){
							//只有一个奖池供玩家抽取
							if (getRewardFromChi(hero,countryTreasure, bzjc[0][0], index)) {
								break;
							}
						}
						
					}
				}
			}
			CountryTreasureSender.sendCmd_8654(hero.getId(), 2, 0, 0, 0, index);
		} catch (Exception e) {
			LogTool.error(e, CountryTreasureManager.class, "getreward has wrong");
		}
		
	}
	/**
	 * 从某个奖池里抽取奖励 
	 * @param countryTreasure
	 * @param rewardindex 目标奖池
	 * @param index 第几次抽取
	 */
	public boolean getRewardFromChi(Hero hero,CountryTreasure countryTreasure,int rewardindex,int index) {
		boolean isSuccess=false;
		List<int[]> list = countryTreasure.getChooseReward().get(rewardindex);
		if (list.size()>0) {
			//玩家对应奖池里还有物品
			if (list.size()>1) {
				//剩余物品大于1
				int size=list.size();
				int randomNumIn = RandomUtil.getRandomNumInAreas(0, size-1);
				
				int[] js = list.get(randomNumIn);
				int[][] js1=new int[1][];
				js1[0]=js;
				UseAddUtil.add(hero, js1, SourceGoodConst.COUNTRYTREASURE_REWARD, UseAddUtil.getDefaultMail(), true);
				
				int[] copyArray=new int[js.length+1];
				System.arraycopy(js, 0, copyArray, 0, js.length);
				copyArray[js.length]=index;
				
				List<int[]> list2 = countryTreasure.getHasChooseReward().get(rewardindex);
				if (list2==null) {
					list2=new ArrayList<int[]>();
					countryTreasure.getHasChooseReward().put(rewardindex, list2);
				}
				list2.add(copyArray);
				list.remove(randomNumIn);
				countryTreasure.getUiInfo().add(copyArray);
				//
				countryTreasure.setCinum(countryTreasure.getCinum()+1);
				CountryTreasureSender.sendCmd_8654(hero.getId(), 0, copyArray[0], copyArray[1], copyArray[2], index);
				isSuccess=true;
			}else if (list.size()==1){
				//剩余物品1件
				int[] js = list.get(0);
				
				int[][] js1=new int[1][];
				js1[0]=js;
				UseAddUtil.add(hero, js1, SourceGoodConst.COUNTRYTREASURE_REWARD, UseAddUtil.getDefaultMail(), true);
				
				int[] copyArray=new int[js.length+1];
				System.arraycopy(js, 0, copyArray, 0, js.length);
				copyArray[js.length]=index;
				
				List<int[]> list2 = countryTreasure.getHasChooseReward().get(rewardindex);
				if (list2==null) {
					list2=new ArrayList<int[]>();
					countryTreasure.getHasChooseReward().put(rewardindex, list2);
				}
				list.remove(0);
				list2.add(copyArray);
				countryTreasure.getUiInfo().add(copyArray);
				//
				countryTreasure.setCinum(countryTreasure.getCinum()+1);
				CountryTreasureSender.sendCmd_8654(hero.getId(), 0, copyArray[0], copyArray[1], copyArray[2], index);
				isSuccess=true;
			}
			if (isSuccess) {
				//抽奖成功
				List<Struct_ewjl_753> sortList = Config_ewjl_753.getIns().getSortList();
				for (Struct_ewjl_753 ewjl_753:sortList) {
					if (countryTreasure.getPeriods()==ewjl_753.getQs() && countryTreasure.getLun()==ewjl_753.getLs()
							&&countryTreasure.getExtraRewards().get(ewjl_753.getId())==GameConst.REWARD_0&&countryTreasure.getCinum()==ewjl_753.getKqsl()) {
						countryTreasure.getExtraRewards().put(ewjl_753.getId(), GameConst.REWARD_1);
						CountryTreasureSender.sendCmd_8656(hero.getId(), ewjl_753.getId(), GameConst.REWARD_1);
					}
				}
			}
			
		}
		return isSuccess;
	}
	/**
	 * 获取
	 * @param hero
	 * @param index
	 */
	public void getExrReward(Hero hero, int index) {
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_COUNTRYTREASURE)) {
				return;
			}
			CountryTreasure countryTreasure = (CountryTreasure) ActivityFunction.getIns().getActivityData(hero,
					ActivitySysId.ACT_COUNTRYTREASURE);
			Struct_ewjl_753 struct_ewjl_753 = Config_ewjl_753.getIns().get(index);
			Integer state = countryTreasure.getExtraRewards().get(index);
			if (state==GameConst.REWARD_1) {
				UseAddUtil.add(hero, struct_ewjl_753.getJl(), 1, SourceGoodConst.COUNTRYTREASURE_EXT_REWARD, UseAddUtil.getDefaultMail(), true);
				countryTreasure.getExtraRewards().put(index, GameConst.REWARD_2);
				CountryTreasureSender.sendCmd_8656(hero.getId(), index, GameConst.REWARD_2);
			}
			//
			if (isNextLun(countryTreasure)&&countryTreasure.getLun()<getMaxLun(countryTreasure.getPeriods())) {
				//重置 轮数加1
				countryTreasure.setLun(countryTreasure.getLun()+1);
				countryTreasure.getChooseReward().clear();
				countryTreasure.getHasChooseReward().clear();
				countryTreasure.getUiInfo().clear();
				countryTreasure.setState(0);
				countryTreasure.setCinum(0);
				openUI(hero);
			}
		} catch (Exception e) {
			LogTool.error(e, CountryTreasureManager.class, "getExrReward has wrong");
		}
	}
	/**
	 * 判断x期 x轮 是否额外奖励都已经领取了 
	 * @param countryTreasure
	 * @return
	 */
	public boolean isNextLun(CountryTreasure countryTreasure) {
		for (Integer key:countryTreasure.getExtraRewards().keySet()) {
			Struct_ewjl_753 bzjc_753 = Config_ewjl_753.getIns().get(key);
			if (bzjc_753.getQs()==countryTreasure.getPeriods()&&bzjc_753.getLs()==countryTreasure.getLun()&&countryTreasure.getExtraRewards().get(key)!=GameConst.REWARD_2) {
				return false;
			}
		}
		return true;
		
	}
	
	/**
	 * 获取某一期的最大轮数
	 * @param qs
	 * @return
	 */
	public int getMaxLun(int qs) {
		int maxLun=0;
		List<Struct_bzjc_753> sortList = Config_bzjc_753.getIns().getSortList();
		for (Struct_bzjc_753 bzjc_753:sortList) {
			if (bzjc_753.getQs()==qs&&bzjc_753.getLs()>maxLun) {
				maxLun=bzjc_753.getLs();
			}
		}
		return maxLun;
		
	}

	public void getleftReward(Hero hero) {
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_COUNTRYTREASURE)) {
				return;
			}
			CountryTreasure countryTreasure = (CountryTreasure) ActivityFunction.getIns().getActivityData(hero,
					ActivitySysId.ACT_COUNTRYTREASURE);
			if (countryTreasure.getState()==0) {
				//选择奖励界面
				return;
			}
			Object[] leftRewards=new Object[15];
			int i=0;
			for (Integer key:countryTreasure.getChooseReward().keySet()) {
				List<int[]> list = countryTreasure.getChooseReward().get(key);
				if (list.size()>0) {
					for (int j = 0; j < list.size(); j++) {
						int[] ks = list.get(j);
						leftRewards[i]=new Object[] {ks[0],ks[1],ks[2]};
						i++;
					}
				}
			}
			leftRewards=CommonUtil.removeNull(leftRewards);
			CountryTreasureSender.sendCmd_8658(hero.getId(), leftRewards);
		} catch (Exception e) {
			LogTool.error(e, CountryTreasureManager.class, "getleftReward has wrong");
		}
		
	}

}
