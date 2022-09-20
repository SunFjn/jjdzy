package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_qy_235;
public class Config_qy_235 extends ConfigBase<Struct_qy_235> {
    private static Config_qy_235 ins = null;
    public static Config_qy_235 getIns(){
        if(ins==null){
            ins = new Config_qy_235();
        }
        return ins;
    }
    private Config_qy_235(){
        put(1,new Struct_qy_235(1,"[[1,411001,1]]",10));
        put(2,new Struct_qy_235(2,"[[1,411002,1]]",10));
        put(3,new Struct_qy_235(3,"[[1,411003,1]]",10));
        put(4,new Struct_qy_235(4,"[[1,411008,1]]",10));
        put(5,new Struct_qy_235(5,"[[1,411007,1]]",10));
        put(6,new Struct_qy_235(6,"[[1,411005,1]]",10));
        put(7,new Struct_qy_235(7,"[[1,411004,1]]",10));
    }
    public void reset(){
        ins = null;
    }
}