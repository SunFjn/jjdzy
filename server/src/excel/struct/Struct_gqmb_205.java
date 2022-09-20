package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * G_205_关卡目标.xlsx
 */
public class Struct_gqmb_205 {
    /**序号*/
    private int ID;
    /**关卡数*/
    private int gq;
    /**目标奖励*/
    private int[][] mb;
    /**
     * 序号
     */
    public int getID() {
        return ID;
    }
    /**
     * 关卡数
     */
    public int getGq() {
        return gq;
    }
    /**
     * 目标奖励
     */
    public int[][] getMb() {
        return mb;
    }
    public Struct_gqmb_205(int ID,int gq,String mb) {
        this.ID = ID;
        this.gq = gq;
        this.mb = ExcelJsonUtils.toObj(mb,int[][].class);
    }
}