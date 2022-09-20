package com.teamtop.util.common;

/**
 * 分页信息
 */
public class PageArg {

	/**
	 * 总数
	 */
	private int totalCount = 0;

	/**
	 * 当前页
	 */
	private int currentPage = 1;

	/**
	 * 每页大小
	 */
	private int pageSize = 20;

	/**
	 * 总页数
	 */
	private int totalPage = 0;
	
	/**
	 * 数据开始位置(从0开始)
	 */
	private int startIndex = 0;
	
	/**
	 * 当前页数据的结束位置
	 */
	private int endIndex = 0;

	/**
	 * @param currentPage
	 *            当前页
	 * @param pageSize
	 *            每页条数
	 */
	public PageArg(int currentPage, int pageSize) {
		setCurrentPage(currentPage);
		setPageSize(pageSize);
	}

	public PageArg() {
		setTotalCount(0);
		setCurrentPage(1);
	}


	public int getEndIndex() {
		return endIndex;
	}

	public void setEndIndex(int endIndex) {
		this.endIndex = endIndex;
	}

	public int getTotalCount() {
		return totalCount;
	}

	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
		computeTotalPage();
		computeEndIndex();
	}

	/**
	 * 计算总页数
	 */
	private void computeTotalPage() {
		totalPage = totalCount / pageSize;
		if (totalCount % pageSize != 0) {
			totalPage = totalPage + 1;
		}
	}

	public int getCurrentPage() {
		return currentPage;
	}

	public void setCurrentPage(int currentPage) {
		this.currentPage = currentPage;
		computeStartIndex();
		computeEndIndex();
	}

	private void computeStartIndex() {
		this.startIndex = (currentPage - 1) * pageSize;
	}
	
	private void computeEndIndex() {
		int tempEndIndex = this.startIndex + pageSize - 1;
		if(tempEndIndex >= totalCount){
			tempEndIndex = totalCount-1;
		}
		this.endIndex = tempEndIndex;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
		computeTotalPage();
		computeStartIndex();
		computeEndIndex();
	}

	public int getStartIndex() {
		return startIndex;
	}

	public void setStartIndex(int startIndex) {
		this.startIndex = startIndex;
	}

	public int getTotalPage() {
		return totalPage;
	}

	public void setTotalPage(int totalPage) {
		this.totalPage = totalPage;
	}
}
