package com.teamtop.hefu;

import java.util.List;
import java.util.Map;


/**
 * 合服
 * @author hepl
 *
 */
public interface HefuMapper {
	/**
	 * 找出合服需要删除的角色数据
	 * @param params
	 * @return
	 */
	public List<DelHero> getDelHero(Map<String,Object> params);
	/**
	 * 删除玩家关联的表
	 * @param params
	 */
	public void delExtra(Map<String,Object> params);
	/**
	 * 重置指定表某字段 设置为"",0等
	 */
	public void resetByUpdate(Map<String, Object> params) ;
	/**
	 * 获取需要转移的数据
	 * @param tbname 表名
	 * @return
	 */
	public List<Object> getMoveData(String tbname);
	/**
	 * 转移数据（插入）
	 * @param params
	 */
	public void moveData(Map<String,Object> params);
	/**
	 * 清空数据 
	 * @param tbname
	 */
	public void truncateData(String tbname);
	/**
	 * 找出所有角色名字数据
	 * @return
	 */
	public List<HefuHeroName> getAllHeroName();
	/**
	 * 修改角色名字
	 * @param hn
	 */
	public void updateHeroName(HefuHeroName hn);
	/**
	 * 删除已读没有附件的邮件
	 * @param hn
	 */
	public void delReadNoFjMail();
	/**
	 * 删除公共数据
	 * @param type
	 */
	public void delGlobaldata(int type);
	/**
	 * 删除挖矿里的脏数据
	 */
	public void del_crossMine();
	/**
	 * 删除crosskingrank 错误的数据
	 */
	public void del_crosskingrank();
	/**
	 *  删除crosszhuluheroinfo 错误的数据
	 */
	public void del_crosszhuluheroinfo();
	/**
	 * 删除crossSelectKing 错误的数据
	 */
	public void del_crossSelectKing();
	
	public void del_tigerPassEmployer();
	/**
	 * 找出crosskingrank中 最大npc序号
	 */
	public Integer getMaxNpcId();
	/**
	 * 找出crossselectkingnode中 最大nodeIndex序号
	 */
	public Integer getMaxNodeIndex();
	
	
	

}
