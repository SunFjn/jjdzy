package com.teamtop.redeploy.platformInfo;

import java.util.List;

import com.teamtop.util.mybatis.BaseMapper;

public interface PlatformMapper extends BaseMapper<PlatformInfo> {

	public List<PlatformInfo> findPlatformInfo() throws Exception;

}
