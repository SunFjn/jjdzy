package com.teamtop.util.db.blobTable;

import java.util.List;
import java.util.Map;

public interface BlobTableMapper{
	public void save(BlobTable bt) throws Exception;
	public List<BlobTable> findAll(String tbname) throws Exception;
	public void delete(Map<String, Object> map) throws Exception;
}
