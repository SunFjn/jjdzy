package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_ystfsp_752;
public class Config_ystfsp_752 extends ConfigBase<Struct_ystfsp_752> {
    private static Config_ystfsp_752 ins = null;
    public static Config_ystfsp_752 getIns(){
        if(ins==null){
            ins = new Config_ystfsp_752();
        }
        return ins;
    }
    private Config_ystfsp_752(){
        put(1000,new Struct_ystfsp_752(1000,2001,"[[102,0],[103,0],[104,0]]",0,"[[1,410402,5]]"));
        put(2001,new Struct_ystfsp_752(2001,2002,"[[102,1120000],[103,12000],[104,12000]]",400000,"[[1,410402,10]]"));
        put(2002,new Struct_ystfsp_752(2002,3001,"[[102,2240000],[103,24000],[104,24000]]",800000,"[[1,410402,15]]"));
        put(3001,new Struct_ystfsp_752(3001,3002,"[[102,3920000],[103,42000],[104,42000]]",1400000,"[[1,410402,30]]"));
        put(3002,new Struct_ystfsp_752(3002,4001,"[[102,5600000],[103,60000],[104,60000]]",2000000,"[[1,410402,50]]"));
        put(4001,new Struct_ystfsp_752(4001,4002,"[[102,9240000],[103,99000],[104,99000]]",3300000,"[[1,410402,70]]"));
        put(4002,new Struct_ystfsp_752(4002,5001,"[[102,14000000],[103,150000],[104,150000]]",5000000,"[[1,410402,160]]"));
        put(5001,new Struct_ystfsp_752(5001,5002,"[[102,21840000],[103,234000],[104,234000]]",7800000,"[[1,410402,260]]"));
        put(5002,new Struct_ystfsp_752(5002,6001,"[[102,33600000],[103,360000],[104,360000]]",12000000,"[[1,410402,290]]"));
        put(6001,new Struct_ystfsp_752(6001,6002,"[[102,45360000],[103,486000],[104,486000]]",16200000,"[[1,410402,310]]"));
        put(6002,new Struct_ystfsp_752(6002,0,"[[102,56000000],[103,600000],[104,600000]]",20000000,"0"));
    }
    public void reset(){
        ins = null;
    }
}