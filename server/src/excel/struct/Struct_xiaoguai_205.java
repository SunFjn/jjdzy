package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * G_205_关卡小怪.xlsx
 */
public class Struct_xiaoguai_205 {
    /**编号*/
    private int bh;
    /**怪物列表(monsterList)
	 * 备注:
	 * 
	 * [无用字段,默认为1],[NPC_ID],[数量]*/
    private int[][] m;
    /**小怪掉落*/
    private String dl;
    /**
     * 编号
     */
    public int getBh() {
        return bh;
    }
    /**
     * 怪物列表(monsterList)
	 * 备注:
	 * 
	 * [无用字段,默认为1],[NPC_ID],[数量]
     */
    public int[][] getM() {
        return m;
    }
    /**
     * 小怪掉落
     */
    public String getDl() {
        return dl;
    }
    public Struct_xiaoguai_205(int bh,String m,String dl) {
        this.bh = bh;
        this.m = ExcelJsonUtils.toObj(m,int[][].class);
        this.dl = dl;
    }
}