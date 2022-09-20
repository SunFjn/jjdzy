package excel.struct;
/**
 * S-261-三国庆典-活跃有礼表.xlsx
 */
public class Struct_sghyyl_261 {
    /**索引id*/
    private int id;
    /**活动期数*/
    private int qs;
    /**系统*/
    private int sys;
    /**掉落奖励*/
    private String bd;
    /**
     * 索引id
     */
    public int getId() {
        return id;
    }
    /**
     * 活动期数
     */
    public int getQs() {
        return qs;
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
    public Struct_sghyyl_261(int id,int qs,int sys,String bd) {
        this.id = id;
        this.qs = qs;
        this.sys = sys;
        this.bd = bd;
    }
}