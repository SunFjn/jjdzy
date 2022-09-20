package com.teamtop.system.openDaysSystem;

import java.util.List;

import com.teamtop.system.openDaysSystem.model.AbsOpenDaysSystemModel;
import com.teamtop.util.mybatis.BaseMapper;

public interface OpenDaysSystemMapper extends BaseMapper<AbsOpenDaysSystemModel> {

	public List<AbsOpenDaysSystemModel> findHeroOpSys(long hid);

	public void insertData(AbsOpenDaysSystemModel data);

	public void saveOpSysData(String sql);

}
