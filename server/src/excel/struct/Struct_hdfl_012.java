package excel.struct;
/**
 * H_012_活动分类表.xlsx
 */
public class Struct_hdfl_012 {
    /**编号*/
    private int bianhao;
    /**系统ID*/
    private int id;
    /**期数*/
    private int qs;
    /**开启时间*/
    private int open;
    /**结束时间*/
    private int end;
    /**冲突系统*/
    private int sys;
    /**是否判断*/
    private int pd;
    /**
     * 编号
     */
    public int getBianhao() {
        return bianhao;
    }
    /**
     * 系统ID
     */
    public int getId() {
        return id;
    }
    /**
     * 期数
     */
    public int getQs() {
        return qs;
    }
    /**
     * 开启时间
     */
    public int getOpen() {
        return open;
    }
    /**
     * 结束时间
     */
    public int getEnd() {
        return end;
    }
    /**
     * 冲突系统
     */
    public int getSys() {
        return sys;
    }
    /**
     * 是否判断
     */
    public int getPd() {
        return pd;
    }
    public Struct_hdfl_012(int bianhao,int id,int qs,int open,int end,int sys,int pd) {
        this.bianhao = bianhao;
        this.id = id;
        this.qs = qs;
        this.open = open;
        this.end = end;
        this.sys = sys;
        this.pd = pd;
    }
}