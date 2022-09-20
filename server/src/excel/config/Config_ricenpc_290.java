package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_ricenpc_290;
public class Config_ricenpc_290 extends ConfigBase<Struct_ricenpc_290> {
    private static Config_ricenpc_290 ins = null;
    public static Config_ricenpc_290 getIns(){
        if(ins==null){
            ins = new Config_ricenpc_290();
        }
        return ins;
    }
    private Config_ricenpc_290(){
        put(342001,new Struct_ricenpc_290(342001,1,"[[10,0,50],[1,400024,1],[1,402026,1]]",200,"0",0,60,1,"[[1953,1706]]"));
        put(342002,new Struct_ricenpc_290(342002,1,"[[10,0,50],[1,400024,1],[1,402026,1]]",200,"0",0,60,1,"[[1450,2119]]"));
        put(342003,new Struct_ricenpc_290(342003,1,"[[10,0,50],[1,400024,1],[1,402026,1]]",200,"0",0,60,1,"[[2382,2101]]"));
        put(342004,new Struct_ricenpc_290(342004,20,"[[10,0,5],[1,400021,1]]",15,"0",0,0,0,"0"));
    }
    public void reset(){
        ins = null;
    }
}