package com.teamtop.util.mybatis;

import java.util.List;

public interface DataBasePropMapper {
	public List<DataBaseProp> getProp();
	public void insert(DataBaseProp db);
}
