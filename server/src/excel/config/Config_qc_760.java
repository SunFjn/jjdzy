package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_qc_760;
public class Config_qc_760 extends ConfigBase<Struct_qc_760> {
    private static Config_qc_760 ins = null;
    public static Config_qc_760 getIns(){
        if(ins==null){
            ins = new Config_qc_760();
        }
        return ins;
    }
    private Config_qc_760(){
        put(500001,new Struct_qc_760(500001,445001,670001,"民兵策","[[1,445001,1]]",20,0,150,3,"活动"));
        put(500002,new Struct_qc_760(500002,445002,670002,"水兵策","[[1,445002,1]]",40,0,150,4,"活动"));
        put(500003,new Struct_qc_760(500003,445003,670003,"枪兵策","[[1,445003,1]]",40,0,150,4,"活动"));
        put(500004,new Struct_qc_760(500004,445004,670004,"刀兵策","[[1,445004,1]]",100,0,150,5,"活动"));
        put(500005,new Struct_qc_760(500005,445005,670005,"弓兵策","[[1,445005,1]]",100,0,150,5,"活动"));
        put(500006,new Struct_qc_760(500006,445006,670006,"蛮兵策","[[1,445006,1]]",100,0,150,5,"活动"));
        put(500007,new Struct_qc_760(500007,445007,670007,"金甲策","[[1,445007,1]]",200,8,70,6,"活动"));
        put(500008,new Struct_qc_760(500008,445008,670008,"万兽策","[[1,445008,1]]",200,8,70,6,"活动"));
    }
    public void reset(){
        ins = null;
    }
}