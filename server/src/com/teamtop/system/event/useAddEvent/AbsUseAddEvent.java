package com.teamtop.system.event.useAddEvent;

import java.util.List;

import com.teamtop.system.hero.Hero;
import com.teamtop.util.log.LogTool;

public abstract class AbsUseAddEvent{
	/**
	 * 货币canUse
	 * @param hero
	 * @param num
	 * @return
	 */
	public boolean canUseHuobi(Hero hero,long num){
		return false;
	};
	/**
	 * 货币use
	 * @param hero
	 * @param num
	 * @return
	 */
	public long useHuobi(Hero hero,long num,int reason){
		return 0l;
	};
	/**
	 * 货币canAdd
	 * @param hero
	 * @param num
	 * @return
	 */
	public boolean canAddHuobi(Hero hero,long num){
		return false;
	};
	/**
	 * 货币add
	 * @param hero
	 * @param num
	 * @return
	 */
	public long addHuobi(Hero hero,long num){
		return 0l;
	};
	/**
	 * 货币流水
	 * @param hero
	 * @param num
	 * @param add
	 * @param reason
	 */
	public void flowRecHuobi(Hero hero,long num,boolean add,int reason){
		
	};
	public abstract boolean canUse(Hero hero,int num,int id);
	public abstract long use(Hero hero,int num,int id, int reason);
	public abstract boolean canAdd(Hero hero,int num,int id);
	public abstract long add(Hero hero,int num,int id);
	public abstract void flowRec(Hero hero,int num,int id,boolean add,int reason);
	public abstract void useInsertCode(Hero hero,long num,int id);
	public abstract void addInsertCode(Hero hero,long num,int id);
	/**
	 * 手动领取时才添加判断、若自动掉落不需判断
	 * @author lobbyer
	 * @date 2017年3月28日
	 */
	public boolean canAdd(Hero hero, int[][] data,boolean sendMail) {
		return false;
	}
	public List<long[]> add(Hero hero, int[][] data, int reason,MailInfo sendMail,boolean notice) {
		return null;
	}

	public void flowRecBase(Hero hero, int num, int id, boolean add, int reason) {
		try {
			flowRec(hero, num, id, add, reason);
		} catch (Exception e) {
			LogTool.error(e, this, hero.getId(), "",
					"useAddEvent id=" + id + ", num=" + num + ", add=" + add + ", reason=" + reason);
		}
	}
	
	/**
	 * 添加到仓库
	 * @param hero
	 * @param data
	 * @param reason
	 * @param sendMail
	 * @param notice
	 * @return
	 */
	public List<long[]> addToStore(Hero hero, int[][] data, int reason,MailInfo sendMail,boolean notice) {
		return null;
	}
	
	/**
	 * 装备添加使用判断
	 * @author lobbyer
	 * @param data[long:唯一id,int:系统sysId]
	 * @date 2017年3月28日
	 */
	public void addEquip(Hero hero,long[][] data, int reason, MailInfo sendMail, boolean notice) {
		
	}
	public boolean canUseEquip(Hero hero,List<Long> ids,int reason){
		return false;
	}
	public boolean useEquip(Hero hero,List<Long> ids, boolean canDel, int reason, boolean notice){
		return false;
	}
}
