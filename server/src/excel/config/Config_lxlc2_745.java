package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_lxlc2_745;
public class Config_lxlc2_745 extends ConfigBase<Struct_lxlc2_745> {
    private static Config_lxlc2_745 ins = null;
    public static Config_lxlc2_745 getIns(){
        if(ins==null){
            ins = new Config_lxlc2_745();
        }
        return ins;
    }
    private Config_lxlc2_745(){
        put(1,new Struct_lxlc2_745(1,1,2,"[[1,431220,1]]",47001));
        put(2,new Struct_lxlc2_745(2,1,3,"[[1,431215,1]]",47002));
        put(3,new Struct_lxlc2_745(3,1,5,"[[1,442004,1]]",47003));
        put(4,new Struct_lxlc2_745(4,2,2,"[[1,433004,1]]",47004));
        put(5,new Struct_lxlc2_745(5,2,3,"[[1,433005,1]]",47005));
        put(6,new Struct_lxlc2_745(6,2,5,"[[1,442004,1]]",47006));
        put(7,new Struct_lxlc2_745(7,3,2,"[[1,431220,1]]",47007));
        put(8,new Struct_lxlc2_745(8,3,3,"[[1,431215,1]]",47008));
        put(9,new Struct_lxlc2_745(9,3,5,"[[1,442004,1]]",47009));
        put(10,new Struct_lxlc2_745(10,4,2,"[[1,433004,1]]",47010));
        put(11,new Struct_lxlc2_745(11,4,3,"[[1,433005,1]]",47011));
        put(12,new Struct_lxlc2_745(12,4,5,"[[1,442004,1]]",47012));
        put(13,new Struct_lxlc2_745(13,5,2,"[[1,431220,1]]",47013));
        put(14,new Struct_lxlc2_745(14,5,3,"[[1,431215,1]]",47014));
        put(15,new Struct_lxlc2_745(15,5,5,"[[1,442004,1]]",47015));
    }
    public void reset(){
        ins = null;
    }
}