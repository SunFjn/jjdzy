package com.teamtop.system.godOfWar;

import java.util.List;

import com.teamtop.system.godOfWar.model.GodOfWarRank;
import com.teamtop.util.mybatis.BaseMapper;

public interface GodOfWarRankMapper extends BaseMapper<GodOfWarRank> {
	public List<Object> findAll();

}
