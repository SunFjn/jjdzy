package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S_310_三国一统npc表.xlsx
 */
public class Struct_sgytnpc_310 {
    /**npc
	 * 读npc表*/
    private int npc;
    /**本服数量上限*/
    private int num;
    /**本服道具奖励*/
    private int[][] dj;
    /**本服积分奖励*/
    private int jf;
    /**跨服数量上限*/
    private int num1;
    /**跨服道具奖励*/
    private int[][] dj1;
    /**跨服积分奖励*/
    private int jf1;
    /**名字*/
    private String name;
    /**刷出坐标
	 * 0：全地图可行走区域刷新（除了出生点和其他怪物固定刷新点）
	 * 其他：定点刷新
	 * */
    private int[][] zb;
    /**
     * npc
	 * 读npc表
     */
    public int getNpc() {
        return npc;
    }
    /**
     * 本服数量上限
     */
    public int getNum() {
        return num;
    }
    /**
     * 本服道具奖励
     */
    public int[][] getDj() {
        return dj;
    }
    /**
     * 本服积分奖励
     */
    public int getJf() {
        return jf;
    }
    /**
     * 跨服数量上限
     */
    public int getNum1() {
        return num1;
    }
    /**
     * 跨服道具奖励
     */
    public int[][] getDj1() {
        return dj1;
    }
    /**
     * 跨服积分奖励
     */
    public int getJf1() {
        return jf1;
    }
    /**
     * 名字
     */
    public String getName() {
        return name;
    }
    /**
     * 刷出坐标
	 * 0：全地图可行走区域刷新（除了出生点和其他怪物固定刷新点）
	 * 其他：定点刷新
	 * 
     */
    public int[][] getZb() {
        return zb;
    }
    public Struct_sgytnpc_310(int npc,int num,String dj,int jf,int num1,String dj1,int jf1,String name,String zb) {
        this.npc = npc;
        this.num = num;
        this.dj = ExcelJsonUtils.toObj(dj,int[][].class);
        this.jf = jf;
        this.num1 = num1;
        this.dj1 = ExcelJsonUtils.toObj(dj1,int[][].class);
        this.jf1 = jf1;
        this.name = name;
        this.zb = ExcelJsonUtils.toObj(zb,int[][].class);
    }
}