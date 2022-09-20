package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_bzt_261;
public class Config_bzt_261 extends ConfigBase<Struct_bzt_261> {
    private static Config_bzt_261 ins = null;
    public static Config_bzt_261 getIns(){
        if(ins==null){
            ins = new Config_bzt_261();
        }
        return ins;
    }
    private Config_bzt_261(){
        put(1,new Struct_bzt_261(1,280,0,0,"0"));
        put(2,new Struct_bzt_261(2,300,4,0,"0"));
        put(3,new Struct_bzt_261(3,320,6,0,"0"));
        put(4,new Struct_bzt_261(4,340,7,0,"0"));
        put(5,new Struct_bzt_261(5,360,8,0,"0"));
        put(6,new Struct_bzt_261(6,380,9,0,"0"));
        put(7,new Struct_bzt_261(7,400,10,0,"0"));
        put(8,new Struct_bzt_261(8,420,12,0,"0"));
        put(9,new Struct_bzt_261(9,0,0,350,"[[4,0,38888]]"));
        put(10,new Struct_bzt_261(10,0,0,400,"[[4,0,68888]]"));
    }
    public void reset(){
        ins = null;
    }
}