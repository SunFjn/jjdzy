package excel.struct;
/**
 * F-265-符文有礼表.xlsx
 */
public class Struct_fwreward_265 {
    /**索引id*/
    private int id;
    /**系统*/
    private int sys;
    /**掉落奖励*/
    private String bd;
    /**期数
	 * 1 8-14天
	 * 2 15-21天
	 * 3 22-28天*/
    private int qs;
    /**
     * 索引id
     */
    public int getId() {
        return id;
    }
    /**
     * 系统
     */
    public int getSys() {
        return sys;
    }
    /**
     * 掉落奖励
     */
    public String getBd() {
        return bd;
    }
    /**
     * 期数
	 * 1 8-14天
	 * 2 15-21天
	 * 3 22-28天
     */
    public int getQs() {
        return qs;
    }
    public Struct_fwreward_265(int id,int sys,String bd,int qs) {
        this.id = id;
        this.sys = sys;
        this.bd = bd;
        this.qs = qs;
    }
}