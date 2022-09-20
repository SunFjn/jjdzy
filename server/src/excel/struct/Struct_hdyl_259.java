package excel.struct;
/**
 * H_259_活动预览表.xlsx
 */
public class Struct_hdyl_259 {
    /**索引id*/
    private int id;
    /**天数
	 * 
	 * 1-7：周一至周日
	 * 1X：开服第X天
	 * */
    private int day;
    /**系统id*/
    private int sysid;
    /**活动开启时间*/
    private String start;
    /**活动结束时间*/
    private String end;
    /**是否跨服*/
    private int kf;
    /**是否重要*/
    private int zy;
    /**前往界面*/
    private int open;
    /**开服7天需关闭的活动*/
    private int close;
    /**开服第X天开启（X天前不显示）*/
    private int kq;
    /**
     * 索引id
     */
    public int getId() {
        return id;
    }
    /**
     * 天数
	 * 
	 * 1-7：周一至周日
	 * 1X：开服第X天
	 * 
     */
    public int getDay() {
        return day;
    }
    /**
     * 系统id
     */
    public int getSysid() {
        return sysid;
    }
    /**
     * 活动开启时间
     */
    public String getStart() {
        return start;
    }
    /**
     * 活动结束时间
     */
    public String getEnd() {
        return end;
    }
    /**
     * 是否跨服
     */
    public int getKf() {
        return kf;
    }
    /**
     * 是否重要
     */
    public int getZy() {
        return zy;
    }
    /**
     * 前往界面
     */
    public int getOpen() {
        return open;
    }
    /**
     * 开服7天需关闭的活动
     */
    public int getClose() {
        return close;
    }
    /**
     * 开服第X天开启（X天前不显示）
     */
    public int getKq() {
        return kq;
    }
    public Struct_hdyl_259(int id,int day,int sysid,String start,String end,int kf,int zy,int open,int close,int kq) {
        this.id = id;
        this.day = day;
        this.sysid = sysid;
        this.start = start;
        this.end = end;
        this.kf = kf;
        this.zy = zy;
        this.open = open;
        this.close = close;
        this.kq = kq;
    }
}