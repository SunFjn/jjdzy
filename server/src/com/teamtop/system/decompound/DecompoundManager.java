package com.teamtop.system.decompound;

import java.util.Set;
import java.util.TreeSet;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.equip.model.Equip;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.wujiang.WuJiangManager;
import com.teamtop.system.wujiang.WuJiangSender;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_decompose_204;
import excel.config.Config_zhuangbei_204;
import excel.struct.Struct_decompose_204;

public class DecompoundManager {
	
	private static DecompoundManager ins = null;

	public static DecompoundManager getIns() {
		if (ins == null) {
			ins = new DecompoundManager();
		}
		return ins;
	}

	public void fejie(Hero hero, int goalid, int num) {
		try {
			if (num<=0) {
				return;
			}
			Struct_decompose_204 struct_decompose_204 = Config_decompose_204.getIns().get(goalid);
			int type=struct_decompose_204.getType();
			int[][] consume=CommonUtil.copyArrayAndNum(struct_decompose_204.getConsume(), num);
			int[][] data = new int[1][];
			data[0] = new int[]{type,goalid,num};
			int[][] maxConsume=CommonUtil.arrayPlusArrays(consume, data);
			int[][] reward=CommonUtil.copyArrayAndNum(struct_decompose_204.getReward(), num);
			
			if (UseAddUtil.canUse(hero, maxConsume)) {
				UseAddUtil.use(hero, maxConsume, SourceGoodConst.COST_FENJIE, true);
				UseAddUtil.add(hero, reward, SourceGoodConst.INCOME_FENJIE, null, true);
				DecompoundSender.sendCmd_2682(hero.getId(), 0, goalid, num);
				return;
			}
			DecompoundSender.sendCmd_2682(hero.getId(),1, goalid, num);
			return;
		} catch (Exception e) {
			LogTool.error(e, DecompoundManager.class, "fejie has wrong");
		}
		
	}
	/**
	 * 一键分解
	 * @param hero
	 */
	public void onekeyfenjie(Hero hero,Object[] equiparr,Object[] itemarr) {
		try {
			int[][] maxConsume=new int[][] {};
			int[][] sumreward=new int[][] {};
			Set<Long> fenjieEquip=new TreeSet<>();
			for (int i = 0; i < equiparr.length; i++) {
				long equipId = (long) equiparr[i];
				Equip equip = hero.getNotOnBodyEquip(equipId);
				if(equip == null){
					LogTool.warn("hid:"+hero.getId()+", onekeyfenjie warn, equip not exists, equipId:"+equipId, DecompoundManager.class);
					return;
				}
				int sysId = equip.getSysId();
				Struct_decompose_204 struct_decompose_204 = Config_decompose_204.getIns().get(sysId);
                if (struct_decompose_204==null) {
                	LogTool.warn("hid:"+hero.getId()+"struct_decompose_204==null:"+sysId, DecompoundManager.class);
					return;
				}
                maxConsume=CommonUtil.arrayPlusArraysItems(maxConsume, struct_decompose_204.getConsume());
				sumreward=CommonUtil.arrayPlusArraysItems(sumreward, struct_decompose_204.getReward());
                fenjieEquip.add(equipId);
			}
			Object[] itemarr1=new Object[itemarr.length];
			for (int i = 0; i < itemarr.length; i++) {
				Object[] object = (Object[]) itemarr[i];
				int itemid=(int)object[0];
                int num=(int)object[1];
                Struct_decompose_204 struct_decompose_204 = Config_decompose_204.getIns().get(itemid);
                if (struct_decompose_204==null) {
                	LogTool.warn("hid:"+hero.getId()+"struct_decompose_204==null:"+itemid, DecompoundManager.class);
					return;
				}
				int type=struct_decompose_204.getType();
				int[][] consume=CommonUtil.copyArrayAndNum(struct_decompose_204.getConsume(), num);
				int[][] data = new int[1][];
				data[0] = new int[]{type,itemid,num};
				int[][] Consume=CommonUtil.arrayPlusArraysItems(consume, data);
				maxConsume=CommonUtil.arrayPlusArraysItems(maxConsume, Consume);
				int[][] reward=CommonUtil.copyArrayAndNum(struct_decompose_204.getReward(), num);
				sumreward=CommonUtil.arrayPlusArraysItems(sumreward, reward);
				itemarr1[i]=new Object[] {itemid,num};
			}
			
			if (UseAddUtil.canUse(hero, maxConsume)) {
				//装备移除
				Object[] equiparr1=new Object[fenjieEquip.size()];
				int i=0;
				for (long  fengjieId: fenjieEquip) {
					UseAddUtil.useEquip(hero, fengjieId, true, SourceGoodConst.ONEKEY_FENJIE_EQUIP, false);
					equiparr1[i]=new Object[] {fengjieId};
					i++;
				}
				UseAddUtil.use(hero, maxConsume, SourceGoodConst.ONEKEY_FENJIE, true);
				UseAddUtil.add(hero, sumreward, SourceGoodConst.ONEKEY_FENJIE, null, true);
				Object[] sumreward1=new Object[sumreward.length];
				for (int j = 0; j < sumreward.length; j++) {
					sumreward1[j]=new Object[] {sumreward[j][0],sumreward[j][1],sumreward[j][2],};
				}
				DecompoundSender.sendCmd_2684(hero.getId(), 0, equiparr1,itemarr1, sumreward1);
				return;
			}
			return;
			
		} catch (Exception e) {
			LogTool.error(e, DecompoundManager.class, "onekeyfenjie has wrong");
		}
		
	}
	
	
}
