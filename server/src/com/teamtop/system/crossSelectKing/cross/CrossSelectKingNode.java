package com.teamtop.system.crossSelectKing.cross;

import com.teamtop.util.cache.CacheModel;
import com.teamtop.util.db.trans.FieldOrder;

/**
 * 16强节点数据
 * @author lobbyer
 * @date 2016年6月21日
 */
public class CrossSelectKingNode extends CacheModel {
	@FieldOrder(order = 1)
	private int id;
	@FieldOrder(order = 2)
	private long id1;//角色id
	@FieldOrder(order = 3)
	private long id2;//角色id
	@FieldOrder(order = 4)
	private int term;//第几届
	@FieldOrder(order = 5)
	private int bang;//哪个榜对呀转生区间
	@FieldOrder(order = 6)
	private int round;//第几轮
	@FieldOrder(order = 7)
	private int count;//第几场
	@FieldOrder(order = 8)
	private int pos;//节点索引(从0到30)
	@FieldOrder(order = 9)
	private int state;//状态 1未激活 2快要打 3正在打 4已打完
	@FieldOrder(order = 10)
	private int win;//战斗结果 0未有结果, 1为ID1赢, 2为ID2赢
	/**跨服大分区（兼容周日关服）*/
	@FieldOrder(order = 11)
	private int partId;

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public long getId1() {
		return id1;
	}
	public void setId1(long id1) {
		this.id1 = id1;
	}
	public long getId2() {
		return id2;
	}
	public void setId2(long id2) {
		this.id2 = id2;
	}
	public int getTerm() {
		return term;
	}
	public void setTerm(int term) {
		this.term = term;
	}
	public int getBang() {
		return bang;
	}
	public void setBang(int bang) {
		this.bang = bang;
	}
	public int getPos() {
		return pos;
	}
	public void setPos(int pos) {
		this.pos = pos;
	}
	public int getState() {
		return state;
	}
	public void setState(int state) {
		this.state = state;
	}
	public int getWin() {
		return win;
	}
	public void setWin(int win) {
		this.win = win;
	}
	public int getRound() {
		return round;
	}
	public void setRound(int round) {
		this.round = round;
	}
	public int getCount() {
		return count;
	}
	public void setCount(int count) {
		this.count = count;
	}
	public CrossSelectKingNode(){super();}
	
	public int getPartId() {
		return partId;
	}
	public void setPartId(int partId) {
		this.partId = partId;
	}
	public CrossSelectKingNode(int index,long id1, long id2,  int pos,int term,int bang,int round,int count,int partId) {
		super();
		this.id = index;
		this.id1 = id1;
		this.id2 = id2;
		this.pos = pos;
		this.term = term;
		this.bang = bang;
		this.round=round;
		this.count=count;
		this.state = 1;
		this.partId=partId;
	}
}
