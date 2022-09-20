package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * G_205_大关卡.xlsx
 */
public class Struct_dgq_205 {
    /**序号*/
    private int ID;
    /**小关卡数*/
    private int[][] guanqia;
    /**通关奖励*/
    private int[][] jiangli;
    /**
     * 序号
     */
    public int getID() {
        return ID;
    }
    /**
     * 小关卡数
     */
    public int[][] getGuanqia() {
        return guanqia;
    }
    /**
     * 通关奖励
     */
    public int[][] getJiangli() {
        return jiangli;
    }
    public Struct_dgq_205(int ID,String guanqia,String jiangli) {
        this.ID = ID;
        this.guanqia = ExcelJsonUtils.toObj(guanqia,int[][].class);
        this.jiangli = ExcelJsonUtils.toObj(jiangli,int[][].class);
    }
}