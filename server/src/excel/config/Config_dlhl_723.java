package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_dlhl_723;
public class Config_dlhl_723 extends ConfigBase<Struct_dlhl_723> {
    private static Config_dlhl_723 ins = null;
    public static Config_dlhl_723 getIns(){
        if(ins==null){
            ins = new Config_dlhl_723();
        }
        return ins;
    }
    private Config_dlhl_723(){
        put(1,new Struct_dlhl_723(1,1,1,"[[4,0,288]]"));
        put(2,new Struct_dlhl_723(2,2,1,"[[4,0,288],[1,411001,5]]"));
        put(3,new Struct_dlhl_723(3,3,1,"[[4,0,488],[1,411001,10]]"));
        put(4,new Struct_dlhl_723(4,4,1,"[[4,0,888],[1,411001,10],[1,411001,10]]"));
        put(5,new Struct_dlhl_723(5,1,2,"[[4,0,288]]"));
        put(6,new Struct_dlhl_723(6,2,2,"[[4,0,288],[1,411003,5]]"));
        put(7,new Struct_dlhl_723(7,3,2,"[[4,0,488],[1,411003,10]]"));
        put(8,new Struct_dlhl_723(8,4,2,"[[4,0,888],[1,411003,10],[1,411003,10]]"));
        put(9,new Struct_dlhl_723(9,1,3,"[[4,0,288]]"));
        put(10,new Struct_dlhl_723(10,2,3,"[[4,0,288],[1,411008,5]]"));
        put(11,new Struct_dlhl_723(11,3,3,"[[4,0,488],[1,411008,10]]"));
        put(12,new Struct_dlhl_723(12,4,3,"[[4,0,888],[1,411008,10],[1,411008,10]]"));
        put(13,new Struct_dlhl_723(13,1,4,"[[4,0,288]]"));
        put(14,new Struct_dlhl_723(14,2,4,"[[4,0,288],[1,411007,5]]"));
        put(15,new Struct_dlhl_723(15,3,4,"[[4,0,488],[1,411007,10]]"));
        put(16,new Struct_dlhl_723(16,4,4,"[[4,0,888],[1,411007,10],[1,411007,10]]"));
        put(17,new Struct_dlhl_723(17,1,5,"[[4,0,288]]"));
        put(18,new Struct_dlhl_723(18,2,5,"[[4,0,288],[411005,0,5]]"));
        put(19,new Struct_dlhl_723(19,3,5,"[[4,0,488],[411005,0,10]]"));
        put(20,new Struct_dlhl_723(20,4,5,"[[4,0,888],[411005,0,10],[411005,0,10]]"));
        put(21,new Struct_dlhl_723(21,1,6,"[[4,0,288]]"));
        put(22,new Struct_dlhl_723(22,2,6,"[[4,0,288],[1,411002,5]]"));
        put(23,new Struct_dlhl_723(23,3,6,"[[4,0,488],[1,411002,10]]"));
        put(24,new Struct_dlhl_723(24,4,6,"[[4,0,888],[1,411002,10],[1,411002,10]]"));
        put(25,new Struct_dlhl_723(25,1,7,"[[4,0,288]]"));
        put(26,new Struct_dlhl_723(26,2,7,"[[4,0,288],[1,410003,5]]"));
        put(27,new Struct_dlhl_723(27,3,7,"[[4,0,488],[1,410003,10]]"));
        put(28,new Struct_dlhl_723(28,4,7,"[[4,0,888],[1,410003,10],[1,410005,1]]"));
    }
    public void reset(){
        ins = null;
    }
}