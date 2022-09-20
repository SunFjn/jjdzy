package com.teamtop.system.cdkey;

import java.util.List;

import com.teamtop.system.cdkey.model.CDkeyData;
import com.teamtop.util.mybatis.BaseMapper;

/**
 * @author Sam 激活码Mapper类
 */
public interface CDkeyMapper extends BaseMapper<CDkeyData> {
	public List<Object> findAllCDkeyData();
	public void updateByCDkey(CDkeyData cdkeyData);
}
