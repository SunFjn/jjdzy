package excel.struct;
/**
 * X_320_新活动-消费砸蛋超级金蛋表.xlsx
 */
public class Struct_xhdxfzdcjjdb_320 {
    /**id*/
    private int id;
    /**超级金蛋次数*/
    private int cs;
    /**奖励*/
    private String jl;
    /**是否大奖
	 * 1；大奖
	 * */
    private int dj;
    /**期数*/
    private int qs;
    /**
     * id
     */
    public int getId() {
        return id;
    }
    /**
     * 超级金蛋次数
     */
    public int getCs() {
        return cs;
    }
    /**
     * 奖励
     */
    public String getJl() {
        return jl;
    }
    /**
     * 是否大奖
	 * 1；大奖
	 * 
     */
    public int getDj() {
        return dj;
    }
    /**
     * 期数
     */
    public int getQs() {
        return qs;
    }
    public Struct_xhdxfzdcjjdb_320(int id,int cs,String jl,int dj,int qs) {
        this.id = id;
        this.cs = cs;
        this.jl = jl;
        this.dj = dj;
        this.qs = qs;
    }
}