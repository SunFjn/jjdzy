package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_bztsf_261;
public class Config_bztsf_261 extends ConfigBase<Struct_bztsf_261> {
    private static Config_bztsf_261 ins = null;
    public static Config_bztsf_261 getIns(){
        if(ins==null){
            ins = new Config_bztsf_261();
        }
        return ins;
    }
    private Config_bztsf_261(){
        put(1,new Struct_bztsf_261(1,1016,"[[1,411016,3]]",10));
        put(2,new Struct_bztsf_261(2,1026,"[[1,411016,3]]",10));
        put(3,new Struct_bztsf_261(3,1036,"[[1,411016,3]]",10));
        put(4,new Struct_bztsf_261(4,1046,"[[1,411016,3]]",10));
        put(5,new Struct_bztsf_261(5,1056,"[[1,411016,3]]",10));
        put(6,new Struct_bztsf_261(6,1066,"[[1,411016,3]]",10));
        put(7,new Struct_bztsf_261(7,1006,"[[1,411016,3]]",0));
    }
    public void reset(){
        ins = null;
    }
}