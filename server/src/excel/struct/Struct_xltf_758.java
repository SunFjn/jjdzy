package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X_758_修炼天赋奖励.xlsx
 */
public class Struct_xltf_758 {
    /**id*/
    private int id;
    /**普通奖励
	 * 道具类型，道具id，道具数量，概率，是否广播*/
    private String pt;
    /**高级奖励
	 * 道具类型，道具id，道具数量，概率，是否广播*/
    private String gj;
    /**展示奖励*/
    private int[][] zs;
    /**抽奖一次*/
    private int[][] cj1;
    /**抽奖十次*/
    private int[][] cj2;
    /**
     * id
     */
    public int getId() {
        return id;
    }
    /**
     * 普通奖励
	 * 道具类型，道具id，道具数量，概率，是否广播
     */
    public String getPt() {
        return pt;
    }
    /**
     * 高级奖励
	 * 道具类型，道具id，道具数量，概率，是否广播
     */
    public String getGj() {
        return gj;
    }
    /**
     * 展示奖励
     */
    public int[][] getZs() {
        return zs;
    }
    /**
     * 抽奖一次
     */
    public int[][] getCj1() {
        return cj1;
    }
    /**
     * 抽奖十次
     */
    public int[][] getCj2() {
        return cj2;
    }
    public Struct_xltf_758(int id,String pt,String gj,String zs,String cj1,String cj2) {
        this.id = id;
        this.pt = pt;
        this.gj = gj;
        this.zs = ExcelJsonUtils.toObj(zs,int[][].class);
        this.cj1 = ExcelJsonUtils.toObj(cj1,int[][].class);
        this.cj2 = ExcelJsonUtils.toObj(cj2,int[][].class);
    }
}