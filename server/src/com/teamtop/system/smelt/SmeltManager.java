package com.teamtop.system.smelt;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.bag.BagFunction;
import com.teamtop.system.bag.BagGrid;
import com.teamtop.system.equip.EquipConst;
import com.teamtop.system.equip.model.Equip;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.smelt.model.Smelt;
import com.teamtop.system.task.TaskUserConst;
import com.teamtop.system.task.TaskUserFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_zhuangbei_204;
import excel.config.Config_zhuansheng_705;
import excel.struct.Struct_zhuangbei_204;


/**
 * 熔炼逻辑处理类
 * @author lobbyer
 * @date 2017年3月31日
 */
public class SmeltManager {
	private static SmeltManager ins;
	public static SmeltManager getIns(){
		if(ins == null) {
			ins = new SmeltManager();
		}
		return ins;
	}
	
	/**
	 * 获取熔炼数据
	 * @author lobbyer
	 * @date 2017年3月31日
	 */
	public void getSmelt(Hero hero){
		Smelt smelt = hero.getSmelt();
		SmeltSender.sendCmd_602(hero.getId(), smelt.getLevel(), smelt.getExp());
	}
	
	/**
	 * 一键熔炼装备
	 * @author lobbyer
	 * @param hero
	 * @param type1普通2特殊
	 * @param ids 装备id集合
	 * @date 2017年3月31日
	 */
	public void smelt(Hero hero, int type, Object[] ids) {
		try {
			if (ids.length>500) {
				LogTool.warn("ids.length>500 hero:"+hero.getNameZoneid(), SmeltManager.class);
				return;
			}
			Smelt smelt = hero.getSmelt();
			if(smelt == null) {
				return;
			}
			int ismaxexp=0;
			Struct_zhuangbei_204 zhuangbei_242 = null;
			Map<Long, Equip> notOnBodyEquip = hero.getNotOnBodyEquip();
			if(notOnBodyEquip == null) {
				SmeltSender.sendCmd_604(hero.getId(), type, 3,ismaxexp);
				return;
			}
			Map<Long, BagGrid> equipData = BagFunction.getIns().getEquipData(hero);
			List<Long> delEquip = new ArrayList<Long>();
			Map<Integer,int[]> rewardMap = new HashMap<Integer, int[]>();
			HashMap<Integer, Integer> huobiMap=new HashMap<>();
			HashMap<Integer, Integer> itemMap=new HashMap<>();
			HashMap<Integer, Integer> equipMap=new HashMap<>();
			for(int i=0; i<ids.length; i++){
				Long equipId = (Long) ids[i];
				//只判断在背包的装备
				BagGrid bagGrid = equipData.get(equipId);
				if(bagGrid == null) {
					continue;
				}
				Equip equip = notOnBodyEquip.get(equipId);
				if(equip == null){
					LogTool.warn("hid:"+hero.getId()+" mame:"+hero.getName()+" smelt equip:"+equipId+" is null", this);
					continue;
				}
				if(equip.getState() != EquipConst.IN_BAG){
					continue;
				}
				if(delEquip.contains(equipId)) continue;
				zhuangbei_242 = Config_zhuangbei_204.getIns().get(bagGrid.getSysId());
				//判断是否有熔炼奖励
				if (zhuangbei_242.getReward()==null) {
					LogTool.warn("is no equip:"+equipId, this);
					return;
				}
				delEquip.add(equipId);
				int[][] ronglian = zhuangbei_242.getReward();
				/*for(int[] data:ronglian) {
					int[] num = rewardMap.get(data[0]);
					if(num == null) {
						num = new int[]{data[0],data[1],0};
						rewardMap.put(data[0], num);
					}
					num[2] = num[2] + data[2];
				}*/
			
				for (int[] item :ronglian) {
					if (item[0]==GameConst.EQUIP) {
						//装备
						equipMap.put(item[1], item[2]);
					}else if (item[0]==GameConst.TOOL) {
						//道具
						if (itemMap.containsKey(item[1])) {
							int num=itemMap.get(item[1]);
							itemMap.put(item[1], num+item[2]);
						}else {
							itemMap.put(item[1], item[2]);
						}
					}else {
						//货币
						if (huobiMap.containsKey(item[0])) {
							int num=huobiMap.get(item[0]);
							huobiMap.put(item[0], item[2]+num);
						}else {
							huobiMap.put(item[0], item[2]);
						}
					}
				}
			}
			
			
			
			if(delEquip.isEmpty()) {
				//没有可熔炼的装备
				SmeltSender.sendCmd_604(hero.getId(), type, 4,ismaxexp);
				return;
			}
			if(!UseAddUtil.canUseEquip(hero, delEquip, SourceGoodConst.SMELT)) {
				//背包已满
				SmeltSender.sendCmd_604(hero.getId(), type, 2,ismaxexp);
				return;
			}
			List<int[]> dropArr = new ArrayList<int[]>();
			if (equipMap.size()>0) {
				for (int key:equipMap.keySet()) {
					dropArr.add(new int[] {GameConst.EQUIP, key, equipMap.get(key)});
				}
			}
			if (itemMap.size()>0) {
				for (int key:itemMap.keySet()) {
					dropArr.add(new int[] {GameConst.TOOL, key, itemMap.get(key)});
				}
			}
			if (huobiMap.size()>0) {
				for (int key:huobiMap.keySet()) {
					dropArr.add(new int[] {key, 0, huobiMap.get(key)});
				}
			}
			int[][] drops = new int[dropArr.size()][];
			dropArr.toArray(drops);
			if(!UseAddUtil.canAdd(hero, drops, false)) {
				//背包已满
				SmeltSender.sendCmd_604(hero.getId(), type, 2,ismaxexp);
				return;
			}
			int maxExp=Config_zhuansheng_705.getIns().get(hero.getRebornlv()).getMax();
	
			for (int i = 0; i < drops.length; i++) {
				if (drops[i][0] == GameConst.EXP) {
					int addExp=drops[i][2];
					if ((smelt.getTodayMaxExp()+addExp)<=maxExp) {
						smelt.setTodayMaxExp(addExp+smelt.getTodayMaxExp());
					}else {
						addExp=maxExp-smelt.getTodayMaxExp();
						smelt.setTodayMaxExp(addExp+smelt.getTodayMaxExp());
						ismaxexp=1;
						drops[i][2]=addExp;//修复：达到熔炼上限后，还能继续熔炼，经验也能继续加
					}
					
				}
			}
			UseAddUtil.useEquip(hero, delEquip, true, SourceGoodConst.SMELT, false);
			UseAddUtil.add(hero, drops, SourceGoodConst.SMELT, null, false);
			SmeltSender.sendCmd_604(hero.getId(), type, 1,ismaxexp);
			//任务
			TaskUserFunction.getIns().reshTaskUser(hero, TaskUserConst.TASK_TYPE_22, 1);
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), hero.getName(), "smeltAdvEquip Exception!");
		}
	}
	
	/**
	 * 特殊熔炉熔炼
	 * @author lobbyer
	 * @param hero
	 * @param ids
	 * @date 2017年4月1日
	 */
	public void smeltSpecial(Hero hero,Object[] ids){
	}
}
