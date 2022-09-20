package excel.struct;
/**
 * B_261_八阵图鉴定幸运表.xlsx
 */
public class Struct_bztluck_261 {
    /**序号*/
    private int id;
    /**幸运值
	 * 达到指定幸运值必中奖励*/
    private int xingyunzhi;
    /**奖励*/
    private String jiangli;
    /**
     * 序号
     */
    public int getId() {
        return id;
    }
    /**
     * 幸运值
	 * 达到指定幸运值必中奖励
     */
    public int getXingyunzhi() {
        return xingyunzhi;
    }
    /**
     * 奖励
     */
    public String getJiangli() {
        return jiangli;
    }
    public Struct_bztluck_261(int id,int xingyunzhi,String jiangli) {
        this.id = id;
        this.xingyunzhi = xingyunzhi;
        this.jiangli = jiangli;
    }
}