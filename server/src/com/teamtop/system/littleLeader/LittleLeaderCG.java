package com.teamtop.system.littleLeader;
import com.teamtop.system.hero.Hero;

/**
 * LittleLeaderCG.java
 * 少主
 */
public class LittleLeaderCG{

	private static LittleLeaderCG ins = null;

	public static LittleLeaderCG getIns(){
		if(ins == null){
			ins = new LittleLeaderCG();
		}
		return ins;
	}

	/**
	 * CG 打开少主ui 某分页 5101
	 */
	public void openUi(Hero hero, Object[] datas){
		LittleLeaderManager.getIns().openUi(hero);
	} 
	/**
	 * CG 激活少主 5103
	 * @param index| 少主index| int
	 */
	public void jihuo(Hero hero, Object[] datas){
		int index = (int)datas[0];
		LittleLeaderManager.getIns().jihuo(hero, index);
	} 
	/**
	 * CG 升星少主 5105
	 * @param index| 少主索引| int
	 */
	public void upstar(Hero hero, Object[] datas){
		int index = (int)datas[0];
		LittleLeaderManager.getIns().upstar(hero, index);
	} 
	/**
	 * CG 激活/升阶时装 5107
	 * @param fid| 时装id| int
	 */
	public void jihuofash(Hero hero, Object[] datas){
		int fid = (int)datas[0];
		LittleLeaderManager.getIns().jihuofash(hero, fid);
	} 
	/**
	 * CG 出站小主 5109
	 * @param leadid| 0没小主出站 >1小主id| int
	 */
	public void chuzhan(Hero hero, Object[] datas){
		int leadid = (int)datas[0];
		LittleLeaderManager.getIns().chuzhan(hero, leadid);
	} 
	/**
	 * CG 某个小主穿上时装 5111
	 * @param type| 小主type| int
	 * @param fashid| 小主时装id| int
	 */
	public void changefashion(Hero hero, Object[] datas){
		int type = (int)datas[0];
		int fashid = (int)datas[1];
		LittleLeaderManager.getIns().changefashion(hero, type, fashid);
	} 
	/**
	 * CG 增加亲密度 5113
	 * @param leaderid| 小主序号| int
	 */
	public void upqimidu(Hero hero, Object[] datas){
		int leaderid = (int)datas[0];
		LittleLeaderManager.getIns().upqimidu(hero, leaderid);
	} 
	/**
	 * CG 升级小主的主动技能 5115
	 * @param leadid| 小主id| int
	 */
	public void upSkillLv(Hero hero, Object[] datas){
		int leadid = (int)datas[0];
		LittleLeaderManager.getIns().upSkillLv(hero, leadid);
	} 
	/**
	 * CG洗练小主被动技能 5117
	 * @param leadid| 小主序号| int
	 * @param index| 技能孔| byte
	 * @param type| 洗练方式0 1| byte
	 */
	public void wearSkill(Hero hero, Object[] datas){
		int leadid = (int)datas[0];
		int index = (byte)datas[1];
		int type = (byte)datas[2];
		LittleLeaderManager.getIns().wearSkill(hero, leadid, index, type);
	} 
	/**
	 * CG 替换被动技能 5119
	 * @param leaderid| 小主序号| int
	 * @param skillid| 小主被动位置（0-4）| byte
	 * @param skillid1| 小主被动替换位置| byte
	 */
	public void changeSkills(Hero hero, Object[] datas){
		int leaderid = (int)datas[0];
		int skillid = (byte)datas[1];
		int skillid1 = (byte)datas[2];
		LittleLeaderManager.getIns().changeSkills(hero, leaderid, skillid, skillid1);
	} 
	/**
	 * 领取少主升星奖励 5123
	 * @param index| 升星序号| int
	 */
	public void getStarreward(Hero hero, Object[] datas){
		int index = (int)datas[0];
		LittleLeaderManager.getIns().getStarreward(hero, index);
	} 
	/**
	 * CG 获取所有少主升星奖励领取情况 5121
	 */
	public void starRewardInfo(Hero hero, Object[] datas){
		LittleLeaderManager.getIns().starRewardInfo(hero);
	} 
	/**
	 * 打开六艺界面 5125
	 */
	public void openSixArtsUI(Hero hero, Object[] datas){
		LittleLeaderManager.getIns().openSixArtsUI(hero);
	} 
	/**
	 * 升级六艺 5127
	 * @param index| 少主index  | int
	 * @param id| 六艺id| byte
	 */
	public void upSixArtsLv(Hero hero, Object[] datas){
		int index = (int)datas[0];
		int id = (byte)datas[1];
		LittleLeaderManager.getIns().upSixArtsLv(hero, index, id);
	} 
	/**
	 * 进修 5129
	 * @param index| 少主index| int
	 */
	public void furtherEducation(Hero hero, Object[] datas){
		int index = (int)datas[0];
		LittleLeaderManager.getIns().furtherEducation(hero, index);
	} 
	/**
	 * 考试 5131
	 * @param index| 少主index  | int
	 * @param id| 六艺id| byte
	 */
	public void kaoShi(Hero hero, Object[] datas){
		int index = (int)datas[0];
		int id = (byte)datas[1];
		LittleLeaderManager.getIns().kaoShi(hero, index, id);
	} 
	/**
	 * 打开潜能界面 5133
	 */
	public void openQianNengUI(Hero hero, Object[] datas){
		LittleLeaderManager.getIns().openQianNengUI(hero);
	} 
	/**
	 * 升级潜能：冲穴 5135
	 * @param index| 少主index| int
	 */
	public void upQianneng(Hero hero, Object[] datas){
		int index = (int)datas[0];
		LittleLeaderManager.getIns().upQianneng(hero, index);
	} 
	/**
	 * 服食 5137
	 * @param index| 少主index | int
	 * @param danyaoId| 吞噬丹id | int
	 * @param num| 数量| int
	 */
	public void swallowing(Hero hero, Object[] datas){
		int index = (int)datas[0];
		int danyaoId = (int)datas[1];
		int num = (int)datas[2];
		LittleLeaderManager.getIns().swallowing(hero, index, danyaoId, num);
	} 
}