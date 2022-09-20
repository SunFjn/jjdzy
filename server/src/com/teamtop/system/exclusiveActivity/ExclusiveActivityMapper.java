package com.teamtop.system.exclusiveActivity;

import com.teamtop.system.exclusiveActivity.model.ExclusiveActivityData;
import com.teamtop.util.mybatis.BaseMapper;

public interface ExclusiveActivityMapper extends BaseMapper<ExclusiveActivityData> {

	public ExclusiveActivityData findHeroExAct(long hid);

	public void insertData(ExclusiveActivityData data);

	public void saveExActData(String sql);

	public void deleteExAct(String sql);

}
