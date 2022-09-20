package excel.struct;
/**
 * B_200_BOSS提示表.xlsx
 */
public class Struct_bossts_200 {
    /**索引id*/
    private int id;
    /**系统id*/
    private int sysid;
    /**子副本*/
    private int fb;
    /**
     * 索引id
     */
    public int getId() {
        return id;
    }
    /**
     * 系统id
     */
    public int getSysid() {
        return sysid;
    }
    /**
     * 子副本
     */
    public int getFb() {
        return fb;
    }
    public Struct_bossts_200(int id,int sysid,int fb) {
        this.id = id;
        this.sysid = sysid;
        this.fb = fb;
    }
}