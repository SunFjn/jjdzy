package com.teamtop.cross;

import java.util.List;
import java.util.Map;

import com.teamtop.util.mybatis.BaseMapper;

public interface RoomMatchMapper extends BaseMapper<RoomMatch>{
	public List<Map<String, Object>> findAll() throws Exception;
}
