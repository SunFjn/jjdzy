package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_sysshow_228;
public class Config_sysshow_228 extends ConfigBase<Struct_sysshow_228> {
    private static Config_sysshow_228 ins = null;
    public static Config_sysshow_228 getIns(){
        if(ins==null){
            ins = new Config_sysshow_228();
        }
        return ins;
    }
    private Config_sysshow_228(){
        put(4,new Struct_sysshow_228(4,"[[3,0,50000],[4,0,500]]"));
        put(6,new Struct_sysshow_228(6,"[[3,0,75000],[4,0,500]]"));
        put(9,new Struct_sysshow_228(9,"[[3,0,50000],[4,0,500]]"));
        put(10,new Struct_sysshow_228(10,"[[3,0,75000],[4,0,500]]"));
        put(11,new Struct_sysshow_228(11,"[[3,0,50000],[1,410001,20]]"));
        put(12,new Struct_sysshow_228(12,"[[3,0,75000],[4,0,500]]"));
        put(13,new Struct_sysshow_228(13,"[[3,0,75000],[4,0,500]]"));
        put(15,new Struct_sysshow_228(15,"[[3,0,50000],[4,0,500]]"));
        put(20,new Struct_sysshow_228(20,"[[3,0,100000],[1,400020,2]]"));
        put(28,new Struct_sysshow_228(28,"[[3,0,150000],[4,0,500]]"));
        put(31,new Struct_sysshow_228(31,"[[3,0,100000],[1,411008,2]]"));
        put(35,new Struct_sysshow_228(35,"[[3,0,150000],[1,410006,1]]"));
        put(40,new Struct_sysshow_228(40,"[[3,0,100000],[4,0,500]]"));
        put(50,new Struct_sysshow_228(50,"[[3,0,150000],[4,0,500]]"));
        put(60,new Struct_sysshow_228(60,"[[3,0,150000],[1,470001,2]]"));
        put(80,new Struct_sysshow_228(80,"[[4,0,500],[1,412001,18]]"));
        put(100,new Struct_sysshow_228(100,"[[4,0,500],[1,431207,1]]"));
        put(125,new Struct_sysshow_228(125,"[[4,0,500],[1,412005,28]]"));
        put(150,new Struct_sysshow_228(150,"[[4,0,500],[1,431203,1]]"));
        put(175,new Struct_sysshow_228(175,"[[4,0,500],[1,400176,38]]"));
        put(200,new Struct_sysshow_228(200,"[[4,0,500],[1,413203,1]]"));
        put(250,new Struct_sysshow_228(250,"[[4,0,500],[1,441002,1]]"));
        put(350,new Struct_sysshow_228(350,"[[4,0,500],[1,433011,1]]"));
        put(450,new Struct_sysshow_228(450,"[[4,0,500],[1,441007,1]]"));
        put(500,new Struct_sysshow_228(500,"[[4,0,500],[1,441004,1]]"));
        put(550,new Struct_sysshow_228(550,"[[4,0,500],[1,433010,1]]"));
        put(650,new Struct_sysshow_228(650,"[[4,0,500],[1,441011,1]]"));
        put(750,new Struct_sysshow_228(750,"[[4,0,500],[1,434008,1]]"));
        put(800,new Struct_sysshow_228(800,"[[4,0,500],[1,441003,1]]"));
        put(850,new Struct_sysshow_228(850,"[[4,0,500],[1,441012,1]]"));
        put(950,new Struct_sysshow_228(950,"[[4,0,500],[1,431222,1]]"));
        put(1000,new Struct_sysshow_228(1000,"[[4,0,500],[1,441008,1]]"));
        put(1050,new Struct_sysshow_228(1050,"[[4,0,500],[1,433009,1]]"));
        put(1150,new Struct_sysshow_228(1150,"[[4,0,500],[1,430008,1]]"));
        put(1200,new Struct_sysshow_228(1200,"[[4,0,500],[1,441010,1]]"));
    }
    public void reset(){
        ins = null;
    }
}