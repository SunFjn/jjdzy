package com.teamtop.system.smelt;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.system.hero.FightCalcConst;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.smelt.model.Smelt;
import com.teamtop.util.log.LogTool;

import excel.config.Config_ronglian_204;
import excel.struct.Struct_ronglian_204;
/**
 * 进阶装备熔炉接口类
 * @author lobbyer
 * @date 2016年10月21日
 */
public class SmeltFunction {
	private static SmeltFunction ins;
	public static SmeltFunction getIns(){
		if(ins == null) {
			ins =  new SmeltFunction();
		}
		return ins;
	}
	
	
	/**
	 * 加经验升级
	 * @param smelt
	 */
	public void addExp(Hero hero ,int exp){
		Smelt smelt = hero.getSmelt();
		if(smelt == null) return;
		try {
			smelt.setExp(smelt.getExp() + exp);
			List<Struct_ronglian_204> configs = Config_ronglian_204.getIns().getSortList();
			boolean flag = false;
			for(int i=smelt.getLevel();i<configs.size() ; i++){
				Struct_ronglian_204 struct = configs.get(i);
				int upgradeExp =  struct.getRonglian();
				
				if(smelt.getExp() >= upgradeExp){
					if (upgradeExp==0) {
						//已经是最大级了
						return;
					}
					int defExp = smelt.getExp() - upgradeExp;
					smelt.setExp(defExp);
					smelt.setLevel(struct.getLevel()+1);
					flag = true;
				}else{
					break;
				}
			}
			//更新数据
			SmeltSender.sendCmd_602(hero.getId(), smelt.getLevel(), smelt.getExp());
			if(flag){
				//更新战力
				FightCalcFunction.setRecalcAll(hero, FightCalcConst.SMELT,SystemIdConst.SMELT_SYSID);
			}
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), hero.getName(), "addExp:"+exp+" level:"+smelt.getLevel()+" exp:"+smelt.getExp()+" Exception!");
		}
		
	}
	
	/**
	 * 获取角色熔炉信息
	 * @author lobbyer
	 * @param hero
	 * @param isOther 是否查看他人
	 * @return
	 * @date 2016年10月20日
	 */
	public Map<Object,Object> getRongLuAttributeInfo(Hero hero , boolean isOther){
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.FUN_SMELT)) {
			return null;
		}
		Smelt ronglu = hero.getSmelt();
		if(ronglu == null) return null;

		Map<Object,Object> info = new HashMap<Object, Object>();
		return info;
	}
	
	/**
	 * GM熔炼修改等级经验
	 * @author lobbyer
	 * @param hero
	 * @param param
	 * @date 2017年3月31日
	 */
	public void GMSmelt(Hero hero,String[] param) {
		Smelt smelt = hero.getSmelt();
		if(smelt == null) return;
		int lv = Integer.parseInt(param[0]);
		int exp = Integer.parseInt(param[1]);
		if(lv <=0) lv = 0;
		smelt.setLevel(lv);
		smelt.setExp(exp);
		SmeltSender.sendCmd_602(hero.getId(), smelt.getLevel(), smelt.getExp());
		//更新战力
		FightCalcFunction.setRecalcAll(hero, FightCalcConst.SMELT,SystemIdConst.SMELT_SYSID);
	}
	
}
