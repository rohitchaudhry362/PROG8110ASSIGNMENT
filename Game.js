const GameState = Object.freeze({
    WELCOME:   Symbol("welcome"),
    CONTINUE:  Symbol("continue"),
    COURSE_SELECTED: Symbol("course_selected"),
    STUDENT_STATUS: Symbol("student_status"),
    INTERNATIONAL_INSURANCE_SELECTION: Symbol("international_insurance_selection"),
    DOMESTIC_INSURANCE_SELECTION: Symbol("domestic_insurance_selection"),
    EXTRA_FEES_SELECTION: Symbol("extra_fees_selection"),
    CAREER_SERVICES_FEES_SELECTION: Symbol("career_services_fees_selection"),
    CSI_EVENT_FEES : Symbol("csi_event_fees"),
    ORIENTATION: Symbol("orientation"),
    REVIEW : Symbol("review")
});

const nInternationalInsurance = 1000;
const nDomesticInsurance = 400;
const nCASInternationalFees = 15450;
const nCADInternationalFees = 16200;
const nPMInternationalFees = 15980;
const nCASDomesticFees = 5450;
const nCADDomesticFees = 6200;
const nPMDomesticFees = 5980;
const nCareerServiceFees = 20;
const nCSIEventFees = 25;
const nOrientationFees = 20;

module.exports = class Game{
    oStudentChoice = { Course : "" , InternationalStudent : true, TotalFees : 0 };
    constructor(){
        this.stateCur = GameState.WELCOME;
    }
    
    makeAMove(sInput)
    {
        let sReply = "";
        switch(this.stateCur){
            case GameState.WELCOME:
                sReply = "Welcome to the conestoga college admission portal.Do you want to CONTINUE or GO BACK?";
                this.stateCur = GameState.CONTINUE;
                break;
            case GameState.CONTINUE:
                if(sInput.toLowerCase().match("continue")){
                    sReply = "Here is the list of courses.\n Select one of them.\n" + 
                    "1)CAD - Computer Application Development\n" + 
                    "2)CAS - Computer Application Security\n" +
                    "3)PM - Project Management\n\n\n" + 
                    "Write the initials to select the course\n"+
                    "For Ex: CAD";
                    this.stateCur = GameState.COURSE_SELECTED;
                }else{
                    sReply ="Thanks for visiting conestoga admission portal.\n See you again !";   
                    this.stateCur = GameState.WELCOME;
                }
                break;
            case GameState.COURSE_SELECTED:
                if(sInput.toLowerCase().match("cad")){
                    this.oStudentChoice.Course = "cad";
                    sReply = "Congratulations! You have selected the course Computer Application Development.\n";
                }else if(sInput.toLowerCase().match("cas")){
                    this.oStudentChoice.Course = "cas";
                    sReply = "Congratulations! You have selected the course Computer Application Security.\n";
                }else if(sInput.toLowerCase().match("pm")){
                    this.oStudentChoice.Course = "pm";
                    sReply = "Congratulations! You have selected the course Project Management.\n";
                }else{
                    sReply = "Can you please provide the valid choice? \nValid options are: CAD,CAS or PM.";
                    this.stateCur = GameState.COURSE_SELECTED;
                    break;
                }
                sReply += "Are you an INTERNATIONAL student or DOMESTIC?"
                this.stateCur = GameState.STUDENT_STATUS;    
                break;
            case GameState.STUDENT_STATUS:
                if(sInput.toLowerCase().match("international")){
                    this.oStudentChoice.InternationalStudent = true;
                    if(this.oStudentChoice.Course == "cad")
                        this.oStudentChoice.TotalFees += nCADInternationalFees;
                    if(this.oStudentChoice.Course == "cas")
                        this.oStudentChoice.TotalFees += nCASInternationalFees;
                    if(this.oStudentChoice.Course == "pm")
                        this.oStudentChoice.TotalFees += nPMInternationalFees;
                    sReply = "You have confirmed that you are an international student.\n" +
                    "Do you want to include International student medical insurance? \nYES or NO?\n";
                    this.stateCur = GameState.INTERNATIONAL_INSURANCE_SELECTION;
                }else if(sInput.toLowerCase().match("domestic")){
                    this.oStudentChoice.InternationalStudent = false;
                    if(this.oStudentChoice.Course == "cad")
                        this.oStudentChoice.TotalFees += nCADDomesticFees;
                    if(this.oStudentChoice.Course == "cas")
                        this.oStudentChoice.TotalFees += nCASDomesticFees;
                    if(this.oStudentChoice.Course == "pm")
                        this.oStudentChoice.TotalFees += nPMDomesticFees;
                    sReply = "You have confirmed that you are a domestic student.\n" +
                    "Do you want to include domestic student medical insurance? YES or NO?\n";
                    this.stateCur = GameState.DOMESTIC_INSURANCE_SELECTION;
                }else{
                    sReply = "You have entered the wrong choice.\n Valid options: INTERNATIONAL or DOMESTIC\n";
                    this.stateCur = GameState.STUDENT_STATUS;
                }
                break;
            case GameState.INTERNATIONAL_INSURANCE_SELECTION:
                if(sInput.toLowerCase().match("yes")){
                    sReply = "International Student Medical Insurance is included which costs $"+
                    +nInternationalInsurance +"/program.\n";
                    this.oStudentChoice.TotalFees += nInternationalInsurance;
                }else if(sInput.toLowerCase().match("no")){
                    sReply = "International Student Medical Insurance is excluded.\n";
                }
                else{
                    sReply = "Wrong choice provided.\n"+
                    "Can you please select the option again?\n YES or NO\n";
                    this.stateCur = GameState.INTERNATIONAL_INSURANCE_SELECTION;
                    break;    
                }
                sReply += "Do you want to include Career Services Fees?\nYES or NO?";
                this.stateCur = GameState.CAREER_SERVICES_FEES_SELECTION;
                break;
            case GameState.DOMESTIC_INSURANCE_SELECTION:
                if(sInput.toLowerCase().match("yes")){
                    this.oStudentChoice.TotalFees += nDomesticInsurance;
                    sReply = "Domestic Student Medical Insurance is included which costs $" + 
                    +nDomesticInsurance +"/program.\n";
                }else if(sInput.toLowerCase().match("no")){
                    sReply = "Domestic Student Medical Insurance is excluded.\n";
                }
                else{
                    sReply = "Wrong choice provided.\n"+
                    "Can you please select the option again?\n YES or NO\n";
                    this.stateCur = GameState.DOMESTIC_INSURANCE_SELECTION;
                    break;       
                }
                sReply += "Do you want to include Career Services Fees?\n YES or NO\n";
                this.stateCur = GameState.CAREER_SERVICES_FEES_SELECTION;
                break;
            case GameState.CAREER_SERVICES_FEES_SELECTION:
                if(sInput.toLowerCase().match("yes")){
                    this.oStudentChoice.TotalFees += nCareerServiceFees;
                    sReply = "Career Services Fee is included which costs $" + 
                    +nCareerServiceFees +"/program.\n";
                }else if(sInput.toLowerCase().match("no")){
                    sReply = "Career Service Fee is excluded.\n";        
                }
                else{
                    sReply = "Wrong choice provided.\n"+
                    "Can you please select the option again?\n YES or NO";
                    this.stateCur = GameState.CAREER_SERVICES_FEES_SELECTION;
                    break;       
                }
                sReply += "Do you want to include CSI Events Fees?YES or NO\n";
                this.stateCur = GameState.CSI_EVENT_FEES;
                break;
            case GameState.CSI_EVENT_FEES:
                if(sInput.toLowerCase().match("yes")){
                    this.oStudentChoice.TotalFees += nCSIEventFees;
                    sReply = "CSI Event Fee is included which costs $" + 
                    +nCSIEventFees +"/program.\n";
                }else if(sInput.toLowerCase().match("no")){
                    sReply = "CSI Event Fee is excluded.\n";        
                }
                else{
                    sReply = "Wrong choice provided.\n"+
                    "Can you please select the option again?\n YES or NO";
                    this.stateCur = GameState.CSI_EVENT_FEES;
                    break;                          
                }
                sReply += "Do you want to attend the orientation on the first day of classes?\nYES or NO\n";
                this.stateCur = GameState.ORIENTATION;
                break;
            case GameState.ORIENTATION:
                    if(sInput.toLowerCase().match("yes")){
                        this.oStudentChoice.TotalFees += nOrientationFees;
                        sReply = "Orientation Fee is included which costs $" + 
                        +nOrientationFees +"/program.\n";
                    }
                    else if(sInput.toLowerCase().match("no")){
                        sReply = "Orientation Fee is excluded.\n";        
                    }
                    else{
                        sReply = "Wrong choice provided.\n"+
                        "Can you please select the option again?\n YES or NO";
                        this.stateCur = GameState.ORIENTATION;
                        break;                          
                    }
                sReply = "Do you want to review your course selection? YES or NO.";    
                this.stateCur = GameState.REVIEW;
                break;
            case GameState.REVIEW:
                if(sInput.toLowerCase().match("yes")){
                    sReply += "selected course: ";
                if(this.oStudentChoice.Course == "cad")
                    sReply+= "Computer Application Development\n";
                else if(this.oStudentChoice.Course == "cas")
                    sReply+= "Computer Application Security\n";
                else{
                    sReply+= "Project Management\n";
                }
                sReply += "Total amount of fees to be paid: "+ this.oStudentChoice.TotalFees + "\n";    
                }
                sReply += "Thank you for applying at conestoga college";
                this.stateCur = GameState.WELCOME;
                break;
            }
        return([sReply]);
    }
}