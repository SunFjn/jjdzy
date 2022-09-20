package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X_296_新活动-天降红包系统红包表.xlsx
 */
public class Struct_tjhbsys_296 {
    /**id*/
    private int id;
    /**下一场*/
    private int next;
    /**发放时间*/
    private String time;
    /**红包*/
    private int[][] hb;
    /**可抢数量*/
    private int sl;
    /**是否是当天最后一场*/
    private int end;
    /**
     * id
     */
    public int getId() {
        return id;
    }
    /**
     * 下一场
     */
    public int getNext() {
        return next;
    }
    /**
     * 发放时间
     */
    public String getTime() {
        return time;
    }
    /**
     * 红包
     */
    public int[][] getHb() {
        return hb;
    }
    /**
     * 可抢数量
     */
    public int getSl() {
        return sl;
    }
    /**
     * 是否是当天最后一场
     */
    public int getEnd() {
        return end;
    }
    public Struct_tjhbsys_296(int id,int next,String time,String hb,int sl,int end) {
        this.id = id;
        this.next = next;
        this.time = time;
        this.hb = ExcelJsonUtils.toObj(hb,int[][].class);
        this.sl = sl;
        this.end = end;
    }
}