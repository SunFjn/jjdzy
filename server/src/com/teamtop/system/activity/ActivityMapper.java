package com.teamtop.system.activity;

import java.util.List;

import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.util.mybatis.BaseMapper;

public interface ActivityMapper extends BaseMapper<ActivityData>{

	public List<ActivityData> findHeroAct(long hid);

	public void insertData(ActivityData data);

	public void saveActData(String sql);

	public void deleteAct(String sql);

}
