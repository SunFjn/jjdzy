package com.teamtop.system.event.backstage.events.flowMMCache;


public class B_FlowMMCache {
	//唯一id
	private long id;
	//操作时间
	private int time;
	//缓存自定义名称
	private String cacheName;
	//缓存所在类名字
	private String className;
	//操作时间，1:新增，2:更新，3:查询，4:删除
//	private int operType;
	//缓存对象总数量
	private int sizeAll;
	//调用者
//	private String caller;
	//第一层缓存类型
	private String cacheType1;
	//第一层缓存大小
	private int size1;
	//第二层缓存类型
	private String cacheType2;
	//第二层缓存大小
	private int size2;
	//第三层缓存类型
	private String cacheType3;
	//第三层缓存大小
	private int size3;
	//第四层缓存类型
	private String cacheType4;
	//第四层缓存大小
	private int size4;
	
	public B_FlowMMCache(){
	}
	
	public String getCacheName() {
		return cacheName;
	}
	public void setCacheName(String cacheName) {
		this.cacheName = cacheName;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public int getTime() {
		return time;
	}
	public void setTime(int time) {
		this.time = time;
	}
	public String getClassName() {
		return className;
	}
	public void setClassName(String className) {
		this.className = className;
	}
	public int getSizeAll() {
		return sizeAll;
	}
	public void setSizeAll(int sizeAll) {
		this.sizeAll = sizeAll;
	}

	public String getCacheType1() {
		return cacheType1;
	}

	public void setCacheType1(String cacheType1) {
		this.cacheType1 = cacheType1;
	}

	public int getSize1() {
		return size1;
	}

	public void setSize1(int size1) {
		this.size1 = size1;
	}

	public String getCacheType2() {
		return cacheType2;
	}

	public void setCacheType2(String cacheType2) {
		this.cacheType2 = cacheType2;
	}

	public int getSize2() {
		return size2;
	}

	public void setSize2(int size2) {
		this.size2 = size2;
	}

	public String getCacheType3() {
		return cacheType3;
	}

	public void setCacheType3(String cacheType3) {
		this.cacheType3 = cacheType3;
	}

	public int getSize3() {
		return size3;
	}

	public void setSize3(int size3) {
		this.size3 = size3;
	}

	public String getCacheType4() {
		return cacheType4;
	}

	public void setCacheType4(String cacheType4) {
		this.cacheType4 = cacheType4;
	}

	public int getSize4() {
		return size4;
	}

	public void setSize4(int size4) {
		this.size4 = size4;
	}

	@Override
	public String toString() {
		return new StringBuilder().append(FlowMMCacheEvent.ID_INCRE).append(time)
				.append(FlowMMCacheEvent.QU).append("'"+cacheName+"'")
				.append(FlowMMCacheEvent.QU).append("'"+className+"'").append(FlowMMCacheEvent.QU).append(sizeAll)
				.append(FlowMMCacheEvent.QU).append("'"+cacheType1+"'").append(FlowMMCacheEvent.QU).append(size1)
				.append(FlowMMCacheEvent.QU).append("'"+cacheType2+"'").append(FlowMMCacheEvent.QU).append(size2)
				.append(FlowMMCacheEvent.QU).append("'"+cacheType3+"'").append(FlowMMCacheEvent.QU).append(size3)
				.append(FlowMMCacheEvent.QU).append("'"+cacheType4+"'").append(FlowMMCacheEvent.QU).append(size4)
				.append(FlowMMCacheEvent.RIGHT).toString();
	}
}
