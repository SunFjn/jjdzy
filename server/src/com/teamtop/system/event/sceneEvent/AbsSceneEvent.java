package com.teamtop.system.event.sceneEvent;

import com.teamtop.system.hero.Hero;


public abstract class AbsSceneEvent {
	/**
	 * 进入场景前逻辑
	 * @param hero 角色
	 * @return 返回场景唯一id,若是临时副本,可返回0或生成的唯一id.若验证不通过,返回1
	 */
	public int beforeIn(Hero hero,int newSceneSysId){
		return -1;
	}
	/**
	 * 进入场景
	 * @param hero 角色
	 * @param newSceneSysId 新场景系统id
	 * @param newSceneUnitId 新场景唯一id 若无,填0
	 */
	public abstract void in(Hero hero,int newSceneSysId,int newSceneUnitId);
	/**
	 * 进场后逻辑
	 * </br>如果是跑地图的战斗，战斗结束后要加载的场景数据写在这里、战斗弹出来的结算界面都可以放这里
	 * </br>前端根据协议3868的系统ID判断是否需要弹战斗默认结算界面
	 * @param hero 角色
	 */
	public void afterIn(Hero hero){
		
	}
	/**
	 * 点击退出按钮逻辑
	 * @param hero 角色
	 * @return 返回场景唯一id,若是临时副本,可返回0或生成的唯一id.若验证不通过,返回1
	 */
	public abstract int beforeOut(Hero hero);
	/**
	 * 退出场景
	 * @param hero 角色
	 */
	public abstract void out(Hero hero);
	/**
	 * 退出场景后逻辑
	 * @param hero 角色
	 */
	public void afterOut(Hero hero){
		
	}
	/**
	 * 掉线后处理
	 * @param hero 角色
	 * @return 若在此处理,返回true
	 */
	public abstract boolean afterOffline(Hero hero);
	/**
	 * 活动结束后处理
	 * @param hero 角色
	 * @return 若在此处理,返回true
	 */
	public boolean afterActivityOver(Hero hero){
		return false;
	}
	/**
	 * 退队后处理
	 * @param hero 角色
	 * @return 若在此处理,返回true
	 */
	public boolean afterQuitTeam(Hero hero){
		return false;
	}
	/**
	 * 死亡后处理
	 * @param hero 角色
	 * @return 若在此处理,返回true
	 */
	public boolean afterDie(Hero hero){
		return false;
	}
	/**
	 * 今天首次登录
	 * @param hero 角色
	 * @return 若在此处理,返回true
	 */
	public boolean todayFirstLogin(Hero hero){
		return false;
	}
	
	/**
	 * 被踢出帮会
	 * @return
	 */
	public boolean afterQuitGang(Hero hero){
		return false;
	}
	
	/**
	 * 同步特殊NPC
	 */
	public void synchAreaGrid(int preRowCol,int rowCol,Hero hero){
		
	}
}
