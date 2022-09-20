package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * Z_256_转生炼魂表.xlsx
 */
public class Struct_zhuanshenglh_256 {
    /**序号*/
    private int id;
    /**部位1*/
    private int[][] bw1;
    /**部位2*/
    private int[][] bw2;
    /**部位3*/
    private int[][] bw3;
    /**部位4*/
    private int[][] bw4;
    /**战力*/
    private int fight;
    /**升级经验*/
    private int exp;
    /**
     * 序号
     */
    public int getId() {
        return id;
    }
    /**
     * 部位1
     */
    public int[][] getBw1() {
        return bw1;
    }
    /**
     * 部位2
     */
    public int[][] getBw2() {
        return bw2;
    }
    /**
     * 部位3
     */
    public int[][] getBw3() {
        return bw3;
    }
    /**
     * 部位4
     */
    public int[][] getBw4() {
        return bw4;
    }
    /**
     * 战力
     */
    public int getFight() {
        return fight;
    }
    /**
     * 升级经验
     */
    public int getExp() {
        return exp;
    }
    public Struct_zhuanshenglh_256(int id,String bw1,String bw2,String bw3,String bw4,int fight,int exp) {
        this.id = id;
        this.bw1 = ExcelJsonUtils.toObj(bw1,int[][].class);
        this.bw2 = ExcelJsonUtils.toObj(bw2,int[][].class);
        this.bw3 = ExcelJsonUtils.toObj(bw3,int[][].class);
        this.bw4 = ExcelJsonUtils.toObj(bw4,int[][].class);
        this.fight = fight;
        this.exp = exp;
    }
}