package com.teamtop.system.battleVixens;

import java.util.List;

import com.teamtop.system.battleVixens.model.BattleVixens;
import com.teamtop.util.mybatis.BaseMapper;

public interface BattleVixensMapper extends BaseMapper<BattleVixens> {
	public List<Object> initRank(int todayZeroTime);
}
