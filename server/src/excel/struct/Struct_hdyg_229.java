package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * H_229_活动预告表.xlsx
 */
public class Struct_hdyg_229 {
    /**索引id*/
    private int id;
    /**活动id*/
    private int[] sysid;
    /**预告开启时间*/
    private String start;
    /**活动结束时间*/
    private String end;
    /**活动时间（秒）*/
    private int time;
    /**开启星期*/
    private int[] week;
    /**优先级*/
    private int yx;
    /**
     * 索引id
     */
    public int getId() {
        return id;
    }
    /**
     * 活动id
     */
    public int[] getSysid() {
        return sysid;
    }
    /**
     * 预告开启时间
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
     * 活动时间（秒）
     */
    public int getTime() {
        return time;
    }
    /**
     * 开启星期
     */
    public int[] getWeek() {
        return week;
    }
    /**
     * 优先级
     */
    public int getYx() {
        return yx;
    }
    public Struct_hdyg_229(int id,String sysid,String start,String end,int time,String week,int yx) {
        this.id = id;
        this.sysid = ExcelJsonUtils.toObj(sysid,int[].class);
        this.start = start;
        this.end = end;
        this.time = time;
        this.week = ExcelJsonUtils.toObj(week,int[].class);
        this.yx = yx;
    }
}