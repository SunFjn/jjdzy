package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_zsfl_019;
public class Config_zsfl_019 extends ConfigBase<Struct_zsfl_019> {
    private static Config_zsfl_019 ins = null;
    public static Config_zsfl_019 getIns(){
        if(ins==null){
            ins = new Config_zsfl_019();
        }
        return ins;
    }
    private Config_zsfl_019(){
        put(100001,new Struct_zsfl_019(100001,1));
        put(101001,new Struct_zsfl_019(101001,2));
        put(102001,new Struct_zsfl_019(102001,3));
        put(200001,new Struct_zsfl_019(200001,4));
        put(201001,new Struct_zsfl_019(201001,5));
        put(202001,new Struct_zsfl_019(202001,6));
        put(203001,new Struct_zsfl_019(203001,7));
        put(204001,new Struct_zsfl_019(204001,5));
        put(205001,new Struct_zsfl_019(205001,6));
        put(206001,new Struct_zsfl_019(206001,6));
        put(207001,new Struct_zsfl_019(207001,4));
    }
    public void reset(){
        ins = null;
    }
}