package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_xsc_731;
public class Config_xsc_731 extends ConfigBase<Struct_xsc_731> {
    private static Config_xsc_731 ins = null;
    public static Config_xsc_731 getIns(){
        if(ins==null){
            ins = new Config_xsc_731();
        }
        return ins;
    }
    private Config_xsc_731(){
        put(1,new Struct_xsc_731(1,20,1,"[[1,440002,1],[1,431209,1],[1,460053,1],[1,410001,5000],[4,0,12500]]",38001));
        put(2,new Struct_xsc_731(2,20,2,"[[1,440002,1],[1,431209,1],[1,460053,1],[1,410001,5000],[4,0,12500]]",38002));
        put(3,new Struct_xsc_731(3,20,3,"[[1,440002,1],[1,431209,1],[1,460053,1],[1,410001,5000],[4,0,12500]]",38003));
        put(4,new Struct_xsc_731(4,21,0,"[[1,431214,1],[1,440006,1],[4,0,200000],[1,400029,4],[2,920170,1]]",38004));
    }
    public void reset(){
        ins = null;
    }
}