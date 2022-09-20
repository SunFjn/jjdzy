package com.teamtop.system.tigerPass.cross;

import java.util.List;

import com.teamtop.system.tigerPass.model.TigerPassEmployer;
import com.teamtop.util.mybatis.BaseMapper;

public interface TigerPassEmployerMapper  extends BaseMapper<TigerPassEmployer>{
	
	/**
	 * 查找本服所有参赛数据
	 * @author lobbyer
	 */
	public List<Object> findallTigerPassEmployer() throws Exception;
	/**
	 * 清空本地排行角色数据
	 * @author lobbyer
	 */
	public void truncate() throws Exception;

}
