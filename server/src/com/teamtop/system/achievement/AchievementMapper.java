package com.teamtop.system.achievement;

import com.teamtop.system.achievement.model.Achievement;
import com.teamtop.util.mybatis.BaseMapper;

public interface AchievementMapper extends BaseMapper<Achievement> {
	/**
	 * @author lobbyer
	 */
	public Achievement updateInfo() throws Exception;
	
	public Object findAchievement(long hid) throws Exception;
}
