package com.teamtop.util.db.orm;

import java.util.Map;


public interface OrmDmlMapper {
	public void insert(String sql);
	public void update(String sql);
	public Map<String, Object> select(String sql);
	public void delete(Long rid,Class<?> clazz);
	public void insertOnDup(String sql);
}
